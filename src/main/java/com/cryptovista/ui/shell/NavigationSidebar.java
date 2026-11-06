package com.cryptovista.ui.shell;

import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class NavigationSidebar extends JPanel {
    private final Consumer<String> onNavigate;
    private final List<NavItem> navItems = new ArrayList<>();
    private NavItem activeItem;

    public NavigationSidebar(Consumer<String> onNavigate) {
        this.onNavigate = onNavigate;
        setLayout(new BorderLayout());
        setPreferredSize(new Dimension(ThemeConstants.SIDEBAR_WIDTH, 700));
        setBackground(ThemeConstants.BG_WHITE);
        setBorder(BorderFactory.createMatteBorder(0, 0, 0, 1, ThemeConstants.BORDER));

        JPanel contentPanel = new JPanel();
        contentPanel.setLayout(new BoxLayout(contentPanel, BoxLayout.Y_AXIS));
        contentPanel.setBackground(ThemeConstants.BG_WHITE);
        contentPanel.setBorder(BorderFactory.createEmptyBorder(12, 8, 12, 8));

        // Overview
        addGroupHeader(contentPanel, "OVERVIEW");
        addNavigationLink(contentPanel, "Dashboard", "VIEW_DASHBOARD", true);

        // Markets and portfolio
        addGroupHeader(contentPanel, "MARKETS & PORTFOLIO");
        addNavigationLink(contentPanel, "Markets", "VIEW_MARKETS", false);
        addNavigationLink(contentPanel, "Trading Simulation", "VIEW_TRADING", false);
        addNavigationLink(contentPanel, "Portfolio", "VIEW_PORTFOLIO", false);

        // CRM
        addGroupHeader(contentPanel, "CRM");
        addNavigationLink(contentPanel, "Customer 360", "VIEW_CUSTOMER_360", false);
        addNavigationLink(contentPanel, "Leads & Pipeline", "VIEW_SALES_PIPELINE", false);

        // Service
        addGroupHeader(contentPanel, "SERVICE & SLA");
        addNavigationLink(contentPanel, "Support Tickets", "VIEW_SUPPORT_TICKETS", false);

        // Operations
        addGroupHeader(contentPanel, "OPERATIONS");
        addNavigationLink(contentPanel, "Workflow Approvals", "VIEW_APPROVALS", false);

        // Control
        addGroupHeader(contentPanel, "CONTROL");
        addNavigationLink(contentPanel, "Security & Roles", "VIEW_SECURITY_ADMIN", false);
        addNavigationLink(contentPanel, "Audit Log", "VIEW_AUDIT_LOG", false);

        JScrollPane scrollPane = new JScrollPane(contentPanel);
        scrollPane.setBorder(null);
        scrollPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        scrollPane.getVerticalScrollBar().setUnitIncrement(14);
        add(scrollPane, BorderLayout.CENTER);
    }

    private void addGroupHeader(JPanel parent, String title) {
        JLabel header = new JLabel(title);
        header.setFont(ThemeConstants.FONT_MICRO);
        header.setForeground(ThemeConstants.TEXT_MUTED);
        header.setBorder(BorderFactory.createEmptyBorder(14, 8, 4, 8));
        header.setAlignmentX(Component.LEFT_ALIGNMENT);
        parent.add(header);
    }

    private void addNavigationLink(JPanel parent, String label, String routeKey, boolean isDefault) {
        NavItem item = new NavItem(label, routeKey);
        navItems.add(item);
        parent.add(item);

        if (isDefault) {
            setActive(item);
        }
    }

    private void setActive(NavItem item) {
        if (activeItem != null) {
            activeItem.setSelected(false);
        }
        activeItem = item;
        activeItem.setSelected(true);
        if (onNavigate != null) {
            onNavigate.accept(item.routeKey);
        }
    }

    private class NavItem extends JPanel {
        private final String routeKey;
        private final JLabel labelComp;
        private boolean isSelected = false;
        private boolean isHovered = false;

        public NavItem(String text, String routeKey) {
            this.routeKey = routeKey;
            setLayout(new BorderLayout());
            setMaximumSize(new Dimension(Integer.MAX_VALUE, 34));
            setPreferredSize(new Dimension(210, 34));
            setOpaque(false);
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

            labelComp = new JLabel(text);
            labelComp.setFont(ThemeConstants.FONT_BODY);
            labelComp.setForeground(ThemeConstants.TEXT_PRIMARY);
            labelComp.setBorder(BorderFactory.createEmptyBorder(0, 10, 0, 8));
            add(labelComp, BorderLayout.CENTER);

            addMouseListener(new MouseAdapter() {
                @Override
                public void mouseEntered(MouseEvent e) {
                    isHovered = true;
                    repaint();
                }

                @Override
                public void mouseExited(MouseEvent e) {
                    isHovered = false;
                    repaint();
                }

                @Override
                public void mouseClicked(MouseEvent e) {
                    setActive(NavItem.this);
                }
            });
        }

        public void setSelected(boolean sel) {
            this.isSelected = sel;
            labelComp.setFont(sel ? ThemeConstants.FONT_BODY_BOLD : ThemeConstants.FONT_BODY);
            labelComp.setForeground(sel ? ThemeConstants.BRAND_GREEN : ThemeConstants.TEXT_PRIMARY);
            repaint();
        }

        @Override
        protected void paintComponent(Graphics g) {
            if (isSelected) {
                g.setColor(ThemeConstants.SOFT_GREEN);
                g.fillRoundRect(2, 2, getWidth() - 4, getHeight() - 4, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
                g.setColor(ThemeConstants.BRAND_GREEN);
                g.fillRect(0, 4, 3, getHeight() - 8);
            } else if (isHovered) {
                g.setColor(ThemeConstants.BG_PAGE);
                g.fillRoundRect(2, 2, getWidth() - 4, getHeight() - 4, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
            }
            super.paintComponent(g);
        }
    }
}

