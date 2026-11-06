package com.cryptovista.ui.trading;

import com.cryptovista.service.FinancialMath;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.service.TenantContext;
import com.cryptovista.service.TradingSimulationEngine;
import com.cryptovista.ui.components.DisclosurePanel;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.math.BigDecimal;

public class TradingPanel extends JPanel {
    private final TradingSimulationEngine tradingEngine;
    private final DefaultTableModel fillsModel;
    private final JTextField qtyField;
    private final JLabel cashLabel;
    private final JLabel notionalVal;
    private final JLabel feeVal;
    private final JLabel totalVal;
    private boolean isBuySide = true;
    private final String accountId = "VA-88392";
    private final BigDecimal btcRefPrice = new BigDecimal("5924800.00");

    public TradingPanel() {
        this.tradingEngine = ServiceRegistry.getInstance().getTradingEngine();

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Simulated Trading Engine");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        JPanel topDetails = new JPanel(new FlowLayout(FlowLayout.RIGHT, 12, 0));
        topDetails.setOpaque(false);
        cashLabel = new JLabel("Virtual Cash: ₹" + tradingEngine.getCashBalance(accountId));
        cashLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        topDetails.add(cashLabel);

        StatusBadge modeBadge = new StatusBadge("SIMULATION ONLY • ZERO RISK", StatusBadge.Type.SIMULATED);
        topDetails.add(modeBadge);
        header.add(topDetails, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Split Layout
        JPanel centerGrid = new JPanel(new GridLayout(1, 2, 16, 0));
        centerGrid.setOpaque(false);

        // Left: Order Entry Form Card
        FlatCard orderCard = new FlatCard();
        orderCard.setLayout(new BoxLayout(orderCard, BoxLayout.Y_AXIS));

        JLabel formTitle = new JLabel("Place Simulated Order");
        formTitle.setFont(ThemeConstants.FONT_SECTION);
        formTitle.setAlignmentX(Component.LEFT_ALIGNMENT);
        orderCard.add(formTitle);
        orderCard.add(Box.createVerticalStrut(12));

        // Side selector
        JPanel sidePanel = new JPanel(new GridLayout(1, 2, 8, 0));
        sidePanel.setOpaque(false);
        sidePanel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 36));
        RectangularButton buyBtn = new RectangularButton("BUY BTC", RectangularButton.Style.PRIMARY);
        RectangularButton sellBtn = new RectangularButton("SELL BTC", RectangularButton.Style.OUTLINE);

        buyBtn.addActionListener(e -> { isBuySide = true; updateEstimates(); });
        sellBtn.addActionListener(e -> { isBuySide = false; updateEstimates(); });

        sidePanel.add(buyBtn);
        sidePanel.add(sellBtn);
        sidePanel.setAlignmentX(Component.LEFT_ALIGNMENT);
        orderCard.add(sidePanel);
        orderCard.add(Box.createVerticalStrut(12));

        // Quantity field
        JLabel qtyLabel = new JLabel("Quantity (BTC):");
        qtyLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        qtyLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        orderCard.add(qtyLabel);

        qtyField = new JTextField("0.25");
        qtyField.setFont(ThemeConstants.FONT_BODY);
        qtyField.setMaximumSize(new Dimension(Integer.MAX_VALUE, 32));
        qtyField.setAlignmentX(Component.LEFT_ALIGNMENT);
        qtyField.addActionListener(e -> updateEstimates());
        orderCard.add(qtyField);
        orderCard.add(Box.createVerticalStrut(12));

        // Notional Calculation Box
        FlatCard calcBox = new FlatCard(ThemeConstants.BG_PAGE, ThemeConstants.BORDER);
        calcBox.setLayout(new GridLayout(4, 2, 4, 4));
        calcBox.setMaximumSize(new Dimension(Integer.MAX_VALUE, 110));
        calcBox.add(new JLabel("Reference Price:"));
        calcBox.add(new JLabel("₹59,24,800.00"));
        calcBox.add(new JLabel("Estimated Notional:"));
        notionalVal = new JLabel("₹14,81,200.00");
        calcBox.add(notionalVal);
        calcBox.add(new JLabel("Simulated Fee (0.10%):"));
        feeVal = new JLabel("₹1,481.20");
        calcBox.add(feeVal);
        JLabel totalHeader = new JLabel("Total Simulated Cost:");
        totalHeader.setFont(ThemeConstants.FONT_BODY_BOLD);
        totalVal = new JLabel("₹14,82,681.20");
        totalVal.setFont(ThemeConstants.FONT_BODY_BOLD);
        calcBox.add(totalHeader);
        calcBox.add(totalVal);
        calcBox.setAlignmentX(Component.LEFT_ALIGNMENT);
        orderCard.add(calcBox);
        orderCard.add(Box.createVerticalStrut(16));

        // Submit action
        RectangularButton submitBtn = new RectangularButton("Submit Simulated Order", RectangularButton.Style.PRIMARY);
        submitBtn.setMaximumSize(new Dimension(Integer.MAX_VALUE, 40));
        submitBtn.setAlignmentX(Component.LEFT_ALIGNMENT);
        submitBtn.addActionListener(e -> executeOrder());
        orderCard.add(submitBtn);

        centerGrid.add(orderCard);

        // Right: Order Book & Execution Log Card
        FlatCard bookCard = new FlatCard();
        bookCard.setLayout(new BorderLayout(0, 12));

        JLabel bookTitle = new JLabel("Recent Simulated Fills & Audit Trail");
        bookTitle.setFont(ThemeConstants.FONT_SECTION);
        bookCard.add(bookTitle, BorderLayout.NORTH);

        String[] fillCols = {"Order ID", "Asset", "Side", "Quantity", "Fill Price", "Status"};
        fillsModel = new DefaultTableModel(fillCols, 0) {
            @Override
            public boolean isCellEditable(int row, int col) { return false; }
        };

        // Initial default fills
        fillsModel.addRow(new Object[]{"SIM-90241", "BTC", "BUY", "0.25 BTC", "₹59,24,800", "FILLED"});
        fillsModel.addRow(new Object[]{"SIM-88412", "ETH", "BUY", "1.40 ETH", "₹2,84,350", "FILLED"});
        fillsModel.addRow(new Object[]{"SIM-81093", "SOL", "BUY", "11.50 SOL", "₹14,820", "FILLED"});

        JTable fillsTable = new JTable(fillsModel);
        fillsTable.setFont(ThemeConstants.FONT_TABLE);
        fillsTable.setRowHeight(28);
        bookCard.add(new JScrollPane(fillsTable), BorderLayout.CENTER);

        centerGrid.add(bookCard);
        add(centerGrid, BorderLayout.CENTER);

        // Bottom Disclosure
        DisclosurePanel disclosure = new DisclosurePanel(
                "Simulated order book transactions are purely virtual. No actual crypto private keys, wallets, or exchange brokerages are accessed."
        );
        add(disclosure, BorderLayout.SOUTH);

        updateEstimates();
    }

    private void updateEstimates() {
        try {
            BigDecimal qty = new BigDecimal(qtyField.getText().trim());
            BigDecimal notional = FinancialMath.calculateNotional(qty, btcRefPrice);
            BigDecimal fee = FinancialMath.calculateFee(notional, new BigDecimal("0.0010"));
            BigDecimal total = FinancialMath.calculateTotalCost(notional, fee, isBuySide);

            notionalVal.setText("₹" + notional);
            feeVal.setText("₹" + fee);
            totalVal.setText("₹" + total);
        } catch (Exception ignored) {}
    }

    private void executeOrder() {
        try {
            BigDecimal qty = new BigDecimal(qtyField.getText().trim());
            if (qty.compareTo(BigDecimal.ZERO) <= 0) {
                JOptionPane.showMessageDialog(this, "Quantity must be positive.", "Validation Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            String orderId = "SIM-" + (int)(10000 + Math.random() * 90000);
            TradingSimulationEngine.OrderCommand cmd = new TradingSimulationEngine.OrderCommand(
                    orderId,
                    TenantContext.getTenantId(),
                    accountId,
                    "BTC",
                    isBuySide,
                    qty,
                    btcRefPrice,
                    "IDEMP-" + System.currentTimeMillis()
            );

            TradingSimulationEngine.ExecutionResult result = tradingEngine.executeSimulatedOrder(cmd);
            if (result.success()) {
                fillsModel.insertRow(0, new Object[]{orderId, "BTC", isBuySide ? "BUY" : "SELL", qty + " BTC", "₹59,24,800.00", "FILLED"});
                cashLabel.setText("Virtual Cash: ₹" + result.remainingCashINR());
                JOptionPane.showMessageDialog(this, "Simulated " + (isBuySide ? "BUY" : "SELL") + " order executed successfully.\nDouble-entry ledger journal posted.", "Simulated Fill Confirmed", JOptionPane.INFORMATION_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this, "Execution Rejected: " + result.message(), "Order Rejected", JOptionPane.WARNING_MESSAGE);
            }
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
