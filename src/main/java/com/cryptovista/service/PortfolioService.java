package com.cryptovista.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.*;

/**
 * Portfolio Intelligence & NAV Reconciliation Service.
 * Implements strict BigDecimal calculations per SRS §4.15 (PORT-001 through PORT-012).
 */
public class PortfolioService {
    private final TradingSimulationEngine tradingEngine;
    private final MarketDataService marketDataService;

    public record PortfolioPosition(
            String symbol,
            BigDecimal quantity,
            BigDecimal costBasisINR,
            BigDecimal currentPriceINR,
            BigDecimal currentValuationINR,
            BigDecimal unrealizedPnlINR,
            BigDecimal allocationWeightPercent
    ) {}

    public record PortfolioValuationSummary(
            String accountId,
            BigDecimal totalNavINR,
            BigDecimal investedCapitalINR,
            BigDecimal availableCashINR,
            BigDecimal unrealizedPnlINR,
            BigDecimal returnPercentage,
            List<PortfolioPosition> positions,
            Instant timestamp
    ) {}

    public PortfolioService(TradingSimulationEngine tradingEngine, MarketDataService marketDataService) {
        this.tradingEngine = tradingEngine;
        this.marketDataService = marketDataService;
    }

    public PortfolioValuationSummary getPortfolioValuation(String accountId) {
        BigDecimal cash = tradingEngine.getCashBalance(accountId);
        List<PortfolioPosition> positions = new ArrayList<>();
        BigDecimal totalHoldingsValuation = BigDecimal.ZERO;
        BigDecimal totalInvestedCost = BigDecimal.ZERO;

        for (MarketDataService.MarketQuote quote : marketDataService.getAllQuotes()) {
            BigDecimal qty = tradingEngine.getHolding(accountId, quote.symbol());
            if (qty.compareTo(BigDecimal.ZERO) > 0) {
                BigDecimal currentVal = FinancialMath.calculateNotional(qty, quote.priceINR());
                // Simulated cost basis calculation (for demo: initial ref price - unrealized gain)
                BigDecimal costBasis = quote.priceINR().multiply(new BigDecimal("0.92")).setScale(FinancialMath.SCALE_CURRENCY, FinancialMath.ROUNDING);
                BigDecimal invested = FinancialMath.calculateNotional(qty, costBasis);
                BigDecimal pnl = currentVal.subtract(invested);

                totalHoldingsValuation = totalHoldingsValuation.add(currentVal);
                totalInvestedCost = totalInvestedCost.add(invested);

                positions.add(new PortfolioPosition(
                        quote.symbol(),
                        qty,
                        costBasis,
                        quote.priceINR(),
                        currentVal,
                        pnl,
                        BigDecimal.ZERO // calculated below once total NAV is computed
                ));
            }
        }

        BigDecimal totalNav = totalHoldingsValuation.add(cash);

        // Compute weights
        List<PortfolioPosition> weightedPositions = new ArrayList<>();
        for (PortfolioPosition pos : positions) {
            BigDecimal weight = totalNav.compareTo(BigDecimal.ZERO) > 0
                    ? pos.currentValuationINR().divide(totalNav, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100")).setScale(2, RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;

            weightedPositions.add(new PortfolioPosition(
                    pos.symbol(), pos.quantity(), pos.costBasisINR(), pos.currentPriceINR(),
                    pos.currentValuationINR(), pos.unrealizedPnlINR(), weight
            ));
        }

        BigDecimal totalUnrealizedPnl = totalHoldingsValuation.subtract(totalInvestedCost);
        BigDecimal returnPercent = totalInvestedCost.compareTo(BigDecimal.ZERO) > 0
                ? totalUnrealizedPnl.divide(totalInvestedCost, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100")).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return new PortfolioValuationSummary(
                accountId,
                totalNav,
                totalInvestedCost,
                cash,
                totalUnrealizedPnl,
                returnPercent,
                weightedPositions,
                Instant.now()
        );
    }
}

