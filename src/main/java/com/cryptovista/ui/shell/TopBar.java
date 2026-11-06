package com.cryptovista.ui.shell;

import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;

public class TopBar extends JPanel {
    public TopBar() {
        setLayout(new BorderLayout());
        setPreferredSize(new Dimension(1000, ThemeConstants.TOPBAR_HEIGHT));
        setBackground(ThemeConstants.BG_WHITE);
        setBorder(BorderFactory.createMatteBorder(0, 0, 1, 0, ThemeConstants.BORDER));

        // Left Brand Label
        JPanel brandPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 18));
        brandPanel.setOpaque(false);

        JLabel brandLabel = new JLabel("<html><span style='font-size:16px; font-weight:bold; color:#171A21;'>CryptoVista </span><span style='font-size:17px; font-weight:800; color:#00B386;'>X</span></html>");
        brandLabel.setFont(ThemeConstants.FONT_TITLE);
        brandPanel.add(brandLabel);

        StatusBadge tierBadge = new StatusBadge("ENTERPRISE", StatusBadge.Type.NEUTRAL);
        brandPanel.add(tierBadge);
        add(brandPanel, BorderLayout.WEST);

        // Center Search Box
        JPanel searchPanel = new JPanel(new GridBagLayout());
        searchPanel.setOpaque(false);
        JTextField searchField = new JTextField(24);
        searchField.setFont(ThemeConstants.FONT_BODY);
        searchField.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(ThemeConstants.BORDER, 1),
            BorderFactory.createEmptyBorder(6, 10, 6, 10)
        ));
        searchField.setText("Search accounts, assets, orders, tickets...");
        searchField.setForeground(ThemeConstants.TEXT_MUTED);
        searchPanel.add(searchField);
        add(searchPanel, BorderLayout.CENTER);

        // Right Tenant / User Status
        JPanel userPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 16, 18));
        userPanel.setOpaque(false);

        StatusBadge tenantBadge = new StatusBadge("TENANT-APEX-01", StatusBadge.Type.ACCENT);
        userPanel.add(tenantBadge);

        JLabel userLabel = new JLabel("Priya Sharma (Operator)");
        userLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        userLabel.setForeground(ThemeConstants.TEXT_PRIMARY);
        userPanel.add(userLabel);

        StatusBadge mfaBadge = new StatusBadge("MFA ACTIVE", StatusBadge.Type.POSITIVE);
        userPanel.add(mfaBadge);

        add(userPanel, BorderLayout.EAST);
    }
}

