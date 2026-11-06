package com.cryptovista.ui.shell;

import com.cryptovista.ui.admin.AuditLogPanel;
import com.cryptovista.ui.admin.SecurityAdminPanel;
import com.cryptovista.ui.crm.Customer360Panel;
import com.cryptovista.ui.crm.SalesPipelinePanel;
import com.cryptovista.ui.dashboard.DashboardPanel;
import com.cryptovista.ui.markets.MarketsPanel;
import com.cryptovista.ui.operations.WorkflowApprovalsPanel;
import com.cryptovista.ui.portfolio.PortfolioPanel;
import com.cryptovista.ui.service.SupportTicketsPanel;
import com.cryptovista.ui.theme.ThemeConstants;
import com.cryptovista.ui.trading.TradingPanel;
import javax.swing.*;
import java.awt.*;

public class MainFrame extends JFrame {
    private final CardLayout cardLayout = new CardLayout();
    private final JPanel contentCards = new JPanel(cardLayout);

    public MainFrame() {
        super("CryptoVista X Enterprise — Multi-Tenant Workstation");
        initUI();
    }

    private void initUI() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setPreferredSize(new Dimension(1366, 768));
        setMinimumSize(new Dimension(1024, 640));
        getContentPane().setBackground(ThemeConstants.BG_PAGE);
        setLayout(new BorderLayout());

        // Top Bar
        TopBar topBar = new TopBar();
        add(topBar, BorderLayout.NORTH);

        // Sidebar Navigation with routing callback
        NavigationSidebar sidebar = new NavigationSidebar(this::navigateToRoute);
        add(sidebar, BorderLayout.WEST);

        // Content Area with CardLayout
        contentCards.setBackground(ThemeConstants.BG_PAGE);
        contentCards.add(new DashboardPanel(), "VIEW_DASHBOARD");
        contentCards.add(new MarketsPanel(), "VIEW_MARKETS");
        contentCards.add(new TradingPanel(), "VIEW_TRADING");
        contentCards.add(new PortfolioPanel(), "VIEW_PORTFOLIO");
        contentCards.add(new Customer360Panel(), "VIEW_CUSTOMER_360");
        contentCards.add(new SalesPipelinePanel(), "VIEW_SALES_PIPELINE");
        contentCards.add(new SupportTicketsPanel(), "VIEW_SUPPORT_TICKETS");
        contentCards.add(new WorkflowApprovalsPanel(), "VIEW_APPROVALS");
        contentCards.add(new SecurityAdminPanel(), "VIEW_SECURITY_ADMIN");
        contentCards.add(new AuditLogPanel(), "VIEW_AUDIT_LOG");

        add(contentCards, BorderLayout.CENTER);

        pack();
        setLocationRelativeTo(null);
    }

    public void navigateToRoute(String routeKey) {
        cardLayout.show(contentCards, routeKey);
    }
}

