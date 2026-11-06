package com.cryptovista.service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Deterministic Simulated Trading Matching Engine.
 * Enforces:
 * 1. Balanced double-entry financial ledger journals.
 * 2. Non-negative cash and asset balance invariants.
 * 3. Idempotent order command processing.
 */
public class TradingSimulationEngine {
    private static final BigDecimal FEE_RATE = new BigDecimal("0.0010"); // 0.10%

    // In-memory accounts: AccountId -> Cash Balance (INR)
    private final Map<String, BigDecimal> cashBalances = new ConcurrentHashMap<>();
    // Holdings: AccountId -> (Symbol -> Quantity)
    private final Map<String, Map<String, BigDecimal>> assetHoldings = new ConcurrentHashMap<>();
    // Processed Idempotency Keys
    private final Set<String> processedCommands = Collections.newSetFromMap(new ConcurrentHashMap<>());
    // Balanced Ledger Journal Store
    private final List<LedgerJournal> ledgerHistory = Collections.synchronizedList(new ArrayList<>());

    public record OrderCommand(
        String orderId,
        String tenantId,
        String accountId,
        String symbol,
        boolean isBuy,
        BigDecimal quantity,
        BigDecimal referencePrice,
        String idempotencyKey
    ) {}

    public record ExecutionResult(
        boolean success,
        String orderId,
        String message,
        BigDecimal filledQuantity,
        BigDecimal notionalINR,
        BigDecimal feeINR,
        BigDecimal remainingCashINR
    ) {}

    public record LedgerEntry(String accountId, String entryType, BigDecimal amount, String currency) {}
    public record LedgerJournal(String journalId, String referenceOrderId, List<LedgerEntry> entries) {}

    public synchronized void initializeAccount(String accountId, BigDecimal initialCash) {
        cashBalances.put(accountId, initialCash.setScale(FinancialMath.SCALE_CURRENCY, FinancialMath.ROUNDING));
        assetHoldings.put(accountId, new ConcurrentHashMap<>());
    }

    public synchronized BigDecimal getCashBalance(String accountId) {
        return cashBalances.getOrDefault(accountId, BigDecimal.ZERO);
    }

    public synchronized BigDecimal getHolding(String accountId, String symbol) {
        Map<String, BigDecimal> holdings = assetHoldings.get(accountId);
        if (holdings == null) return BigDecimal.ZERO;
        return holdings.getOrDefault(symbol, BigDecimal.ZERO);
    }

    public synchronized ExecutionResult executeSimulatedOrder(OrderCommand cmd) {
        // 1. Idempotency Check
        if (cmd.idempotencyKey() != null && processedCommands.contains(cmd.idempotencyKey())) {
            return new ExecutionResult(false, cmd.orderId(), "DUPLICATE_COMMAND_IGNORED", BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, getCashBalance(cmd.accountId()));
        }

        BigDecimal notional = FinancialMath.calculateNotional(cmd.quantity(), cmd.referencePrice());
        BigDecimal fee = FinancialMath.calculateFee(notional, FEE_RATE);
        BigDecimal currentCash = getCashBalance(cmd.accountId());

        if (cmd.isBuy()) {
            BigDecimal totalRequired = FinancialMath.calculateTotalCost(notional, fee, true);
            if (currentCash.compareTo(totalRequired) < 0) {
                return new ExecutionResult(false, cmd.orderId(), "INSUFFICIENT_VIRTUAL_FUNDS", BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, currentCash);
            }

            // Deduct cash and add asset
            BigDecimal newCash = currentCash.subtract(totalRequired);
            cashBalances.put(cmd.accountId(), newCash);

            Map<String, BigDecimal> holdings = assetHoldings.computeIfAbsent(cmd.accountId(), k -> new ConcurrentHashMap<>());
            BigDecimal currentQty = holdings.getOrDefault(cmd.symbol(), BigDecimal.ZERO);
            holdings.put(cmd.symbol(), currentQty.add(cmd.quantity()));

            // Post balanced ledger journal
            recordLedgerJournal(cmd.orderId(), cmd.accountId(), notional, fee, true);

            if (cmd.idempotencyKey() != null) processedCommands.add(cmd.idempotencyKey());

            return new ExecutionResult(true, cmd.orderId(), "SIMULATED_FILL_COMPLETED", cmd.quantity(), notional, fee, newCash);

        } else {
            // Sell Side
            BigDecimal currentHolding = getHolding(cmd.accountId(), cmd.symbol());
            if (currentHolding.compareTo(cmd.quantity()) < 0) {
                return new ExecutionResult(false, cmd.orderId(), "INSUFFICIENT_ASSET_HOLDINGS", BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, currentCash);
            }

            // Deduct asset and add net cash
            Map<String, BigDecimal> holdings = assetHoldings.get(cmd.accountId());
            holdings.put(cmd.symbol(), currentHolding.subtract(cmd.quantity()));

            BigDecimal netProceeds = FinancialMath.calculateTotalCost(notional, fee, false);
            BigDecimal newCash = currentCash.add(netProceeds);
            cashBalances.put(cmd.accountId(), newCash);

            // Post balanced ledger journal
            recordLedgerJournal(cmd.orderId(), cmd.accountId(), notional, fee, false);

            if (cmd.idempotencyKey() != null) processedCommands.add(cmd.idempotencyKey());

            return new ExecutionResult(true, cmd.orderId(), "SIMULATED_FILL_COMPLETED", cmd.quantity(), notional, fee, newCash);
        }
    }

    private void recordLedgerJournal(String orderId, String accountId, BigDecimal notional, BigDecimal fee, boolean isBuy) {
        List<LedgerEntry> entries = new ArrayList<>();
        String journalId = "JRN-" + UUID.randomUUID();

        if (isBuy) {
            // DEBIT Asset Holding Notional
            entries.add(new LedgerEntry(accountId, "DEBIT", notional, "INR_EQUIV"));
            // DEBIT Fee Expense
            entries.add(new LedgerEntry("SYSTEM_FEE_VAULT", "DEBIT", fee, "INR"));
            // CREDIT Cash Balance (Total Required)
            entries.add(new LedgerEntry(accountId, "CREDIT", notional.add(fee), "INR"));
        } else {
            // DEBIT Cash Balance (Net Proceeds)
            entries.add(new LedgerEntry(accountId, "DEBIT", notional.subtract(fee), "INR"));
            // DEBIT Fee Expense
            entries.add(new LedgerEntry("SYSTEM_FEE_VAULT", "DEBIT", fee, "INR"));
            // CREDIT Asset Holding Notional
            entries.add(new LedgerEntry(accountId, "CREDIT", notional, "INR_EQUIV"));
        }

        // Assert Debits == Credits (Balanced Journal)
        BigDecimal totalDebits = entries.stream()
                .filter(e -> "DEBIT".equals(e.entryType()))
                .map(LedgerEntry::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalCredits = entries.stream()
                .filter(e -> "CREDIT".equals(e.entryType()))
                .map(LedgerEntry::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalDebits.compareTo(totalCredits) != 0) {
            throw new IllegalStateException("UNBALANCED_JOURNAL_DETECTED: Debits=" + totalDebits + ", Credits=" + totalCredits);
        }

        ledgerHistory.add(new LedgerJournal(journalId, orderId, entries));
    }

    public List<LedgerJournal> getLedgerHistory() {
        return Collections.unmodifiableList(ledgerHistory);
    }
}

