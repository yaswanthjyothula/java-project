package com.cryptovista.ui.portfolio;

import com.cryptovista.ui.components.DisclosurePanel;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class PortfolioPanel extends JPanel {
    public PortfolioPanel() {
        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Simulated Portfolio Intelligence");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        StatusBadge badge = new StatusBadge("PORTFOLIO #PF-104 (GROWTH-A)", StatusBadge.Type.ACCENT);
        header.add(badge, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Content
        JPanel center = new JPanel();
        center.setLayout(new BoxLayout(center, BoxLayout.Y_AXIS));
        center.setOpaque(false);

        // KPI Summary
        JPanel kpiRow = new JPanel(new GridLayout(1, 4, 12, 0));
        kpiRow.setOpaque(false);
        kpiRow.setMaximumSize(new Dimension(Integer.MAX_VALUE, 85));

        kpiRow.add(createMiniKpi("Total Portfolio NAV", "₹24,85,420.00", "+14.2% Return"));
        kpiRow.add(createMiniKpi("Invested Capital", "₹21,66,800.00", "Cost Basis: FIFO"));
        kpiRow.add(createMiniKpi("Unrealized P&L", "+₹3,18,620.00", "3 Assets Active"));
        kpiRow.add(createMiniKpi("Available Cash", "₹4,20,500.00", "Simulated INR"));
        center.add(kpiRow);
        center.add(Box.createVerticalStrut(16));

        // Holdings Table Card
        FlatCard tableCard = new FlatCard();
        tableCard.setLayout(new BorderLayout(0, 8));

        JLabel tableTitle = new JLabel("Simulated Asset Holdings & Performance");
        tableTitle.setFont(ThemeConstants.FONT_SECTION);
        tableCard.add(tableTitle, BorderLayout.NORTH);

        String[] cols = {"Asset", "Holding Quantity", "Avg Cost Basis", "Reference Price", "Valuation (INR)", "P&L (INR)", "Weight"};
        Object[][] data = {
            {"Bitcoin (BTC)", "0.32 BTC", "₹55,20,000", "₹59,24,800", "₹18,95,936.00", "+₹1,29,536.00", "76.3%"},
            {"Ethereum (ETH)", "1.40 ETH", "₹2,72,000", "₹2,84,350", "₹3,98,090.00", "+₹17,290.00", "16.0%"},
            {"Solana (SOL)", "11.50 SOL", "₹12,400", "₹14,820", "₹1,70,430.00", "+₹27,830.00", "6.9%"},
            {"Cash Reserve", "INR Cash", "₹1.00", "₹1.00", "₹4,20,500.00", "₹0.00", "16.9%"}
        };
        DefaultTableModel model = new DefaultTableModel(data, cols) {
            @Override
            public boolean isCellEditable(int r, int c) { return false; }
        };

        JTable table = new JTable(model);
        table.setFont(ThemeConstants.FONT_TABLE);
        table.setRowHeight(30);
        tableCard.add(new JScrollPane(table), BorderLayout.CENTER);
        center.add(tableCard);

        add(center, BorderLayout.CENTER);

        // Disclosure
        DisclosurePanel disclosure = new DisclosurePanel(
            "Portfolio returns and net asset valuations are simulated based on deterministic reference pricing. Illustrative data only."
        );
        add(disclosure, BorderLayout.SOUTH);
    }

    private JPanel createMiniKpi(String label, String value, String sub) {
        FlatCard card = new FlatCard();
        card.setLayout(new GridLayout(3, 1, 0, 2));
        JLabel l = new JLabel(label);
        l.setFont(ThemeConstants.FONT_CAPTION);
        l.setForeground(ThemeConstants.TEXT_SECONDARY);
        card.add(l);

        JLabel v = new JLabel(value);
        v.setFont(ThemeConstants.FONT_SECTION);
        v.setForeground(ThemeConstants.TEXT_PRIMARY);
        card.add(v);

        JLabel s = new JLabel(sub);
        s.setFont(ThemeConstants.FONT_MICRO);
        s.setForeground(ThemeConstants.BRAND_GREEN);
        card.add(s);
        return card;
    }
}

