package com.cryptovista.ui.dashboard;

import com.cryptovista.ui.components.DisclosurePanel;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;

public class DashboardPanel extends JPanel {
    public DashboardPanel() {
        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header Title
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setOpaque(false);
        JLabel titleLabel = new JLabel("Enterprise Operations Dashboard");
        titleLabel.setFont(ThemeConstants.FONT_TITLE);
        titleLabel.setForeground(ThemeConstants.TEXT_PRIMARY);
        headerPanel.add(titleLabel, BorderLayout.WEST);

        JLabel timeLabel = new JLabel("Tenant: TENANT-APEX-01 • Timezone: IST (UTC+05:30)");
        timeLabel.setFont(ThemeConstants.FONT_CAPTION);
        timeLabel.setForeground(ThemeConstants.TEXT_MUTED);
        headerPanel.add(timeLabel, BorderLayout.EAST);
        add(headerPanel, BorderLayout.NORTH);

        // Center Content Container
        JPanel centerContainer = new JPanel();
        centerContainer.setLayout(new BoxLayout(centerContainer, BoxLayout.Y_AXIS));
        centerContainer.setOpaque(false);

        // 1. KPI Metric Row
        JPanel kpiRow = new JPanel(new GridLayout(1, 4, 12, 0));
        kpiRow.setOpaque(false);
        kpiRow.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));

        kpiRow.add(createKpiCard("Simulated Portfolio NAV", "₹24,85,420.00", "+14.2% Unrealized", StatusBadge.Type.SIMULATED));
        kpiRow.add(createKpiCard("Total Enterprise Accounts", "142 Accounts", "3 Onboarding", StatusBadge.Type.ACCENT));
        kpiRow.add(createKpiCard("Active Deal Pipeline", "₹48,50,000 ARR", "6 Stage-Gated", StatusBadge.Type.POSITIVE));
        kpiRow.add(createKpiCard("Open Support Tickets", "4 Tickets", "0 SLA Breaches", StatusBadge.Type.NEUTRAL));

        centerContainer.add(kpiRow);
        centerContainer.add(Box.createVerticalStrut(16));

        // 2. Middle Row: Market Snapshot & CRM Preview
        JPanel middleRow = new JPanel(new GridLayout(1, 2, 12, 0));
        middleRow.setOpaque(false);
        middleRow.setMaximumSize(new Dimension(Integer.MAX_VALUE, 260));

        // Market Overview Card
        FlatCard marketCard = new FlatCard();
        marketCard.setLayout(new BorderLayout(0, 8));
        JLabel marketTitle = new JLabel("Digital Asset Reference Watchlist");
        marketTitle.setFont(ThemeConstants.FONT_SECTION);
        marketCard.add(marketTitle, BorderLayout.NORTH);

        String[] mktCols = {"Asset", "Price (INR)", "24h Move", "Source"};
        Object[][] mktData = {
            {"Bitcoin (BTC)", "₹59,24,800.00", "+2.45%", "Sample Reference"},
            {"Ethereum (ETH)", "₹2,84,350.00", "-0.82%", "Sample Reference"},
            {"Solana (SOL)", "₹14,820.00", "+5.12%", "Sample Reference"},
            {"XRP", "₹52.40", "+1.18%", "Sample Reference"}
        };
        JTable mktTable = new JTable(mktData, mktCols);
        mktTable.setFont(ThemeConstants.FONT_TABLE);
        mktTable.setRowHeight(28);
        marketCard.add(new JScrollPane(mktTable), BorderLayout.CENTER);
        middleRow.add(marketCard);

        // CRM SLA Snapshot Card
        FlatCard crmCard = new FlatCard();
        crmCard.setLayout(new BorderLayout(0, 8));
        JLabel crmTitle = new JLabel("Active Customer 360 & SLA Queue");
        crmTitle.setFont(ThemeConstants.FONT_SECTION);
        crmCard.add(crmTitle, BorderLayout.NORTH);

        String[] crmCols = {"Customer", "Stage", "SLA Clock", "Owner"};
        Object[][] crmData = {
            {"Apex Digital Capital", "Active Enterprise", "3h 40m remaining", "Priya Sharma"},
            {"Kavach Risk Systems", "KYC Synthetic Review", "5h 10m remaining", "Rahul Verma"},
            {"Zenith FinTech Lab", "Contract Proposal", "1h 15m remaining", "Priya Sharma"}
        };
        JTable crmTable = new JTable(crmData, crmCols);
        crmTable.setFont(ThemeConstants.FONT_TABLE);
        crmTable.setRowHeight(28);
        crmCard.add(new JScrollPane(crmTable), BorderLayout.CENTER);
        middleRow.add(crmCard);

        centerContainer.add(middleRow);
        centerContainer.add(Box.createVerticalStrut(16));

        // 3. Disclosure Banner at Bottom
        DisclosurePanel disclosure = new DisclosurePanel(
            "CryptoVista X Enterprise operates strictly as a simulation and business workflow platform. Virtual balances and trading execution do not represent real-world assets or custodial cryptocurrency transactions."
        );
        centerContainer.add(disclosure);

        JScrollPane mainScroll = new JScrollPane(centerContainer);
        mainScroll.setBorder(null);
        mainScroll.setOpaque(false);
        mainScroll.getViewport().setOpaque(false);
        add(mainScroll, BorderLayout.CENTER);
    }

    private JPanel createKpiCard(String label, String value, String sub, StatusBadge.Type badgeType) {
        FlatCard card = new FlatCard();
        card.setLayout(new BorderLayout(0, 4));

        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);
        JLabel lbl = new JLabel(label);
        lbl.setFont(ThemeConstants.FONT_CAPTION);
        lbl.setForeground(ThemeConstants.TEXT_SECONDARY);
        top.add(lbl, BorderLayout.WEST);

        StatusBadge badge = new StatusBadge(badgeType.name(), badgeType);
        top.add(badge, BorderLayout.EAST);
        card.add(top, BorderLayout.NORTH);

        JLabel valLbl = new JLabel(value);
        valLbl.setFont(ThemeConstants.FONT_SUBTITLE);
        valLbl.setForeground(ThemeConstants.TEXT_PRIMARY);
        card.add(valLbl, BorderLayout.CENTER);

        JLabel subLbl = new JLabel(sub);
        subLbl.setFont(ThemeConstants.FONT_MICRO);
        subLbl.setForeground(ThemeConstants.BRAND_GREEN);
        card.add(subLbl, BorderLayout.SOUTH);

        return card;
    }
}

