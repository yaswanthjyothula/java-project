package com.cryptovista.ui.markets;

import com.cryptovista.ui.components.DisclosurePanel;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class MarketsPanel extends JPanel {
    private final DefaultTableModel tableModel;

    public MarketsPanel() {
        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Digital Asset Market Intelligence");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 0));
        actions.setOpaque(false);
        JTextField searchField = new JTextField(16);
        searchField.setText("Filter assets...");
        actions.add(searchField);

        RectangularButton refreshBtn = new RectangularButton("Refresh Feeds", RectangularButton.Style.OUTLINE);
        actions.add(refreshBtn);
        header.add(actions, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Table Card
        FlatCard tableCard = new FlatCard();
        tableCard.setLayout(new BorderLayout(0, 12));

        String[] columns = {"Symbol", "Asset Name", "Reference Price (INR)", "24h Move", "24h Volume", "Market Cap", "Attribution"};
        Object[][] data = {
            {"BTC", "Bitcoin", "₹59,24,800.00", "+2.45%", "₹1,84,250 Cr", "₹116.8 L Cr", "CoinGecko Benchmark"},
            {"ETH", "Ethereum", "₹2,84,350.00", "-0.82%", "₹89,400 Cr", "₹34.2 L Cr", "CoinGecko Benchmark"},
            {"SOL", "Solana", "₹14,820.00", "+5.12%", "₹32,100 Cr", "₹6.8 L Cr", "CoinGecko Benchmark"},
            {"XRP", "XRP", "₹52.40", "+1.18%", "₹12,450 Cr", "₹2.9 L Cr", "CoinGecko Benchmark"},
            {"ADA", "Cardano", "₹34.80", "-1.45%", "₹4,120 Cr", "₹1.2 L Cr", "CoinGecko Benchmark"}
        };
        tableModel = new DefaultTableModel(data, columns) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        JTable table = new JTable(tableModel);
        table.setFont(ThemeConstants.FONT_TABLE);
        table.setRowHeight(32);
        table.getTableHeader().setFont(ThemeConstants.FONT_TABLE_BOLD);
        table.getTableHeader().setBackground(ThemeConstants.BG_PAGE);
        tableCard.add(new JScrollPane(table), BorderLayout.CENTER);

        add(tableCard, BorderLayout.CENTER);

        // Bottom Disclosure
        DisclosurePanel disclosure = new DisclosurePanel(
            "Prices are reference benchmark feeds for internal portfolio evaluation. CryptoVista X does not connect to live custodial crypto exchange order routing."
        );
        add(disclosure, BorderLayout.SOUTH);
    }
}

