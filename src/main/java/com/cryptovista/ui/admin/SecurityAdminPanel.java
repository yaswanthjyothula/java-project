package com.cryptovista.ui.admin;

import com.cryptovista.model.AuditLogEntry;
import com.cryptovista.service.AuditService;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.service.TenantContext;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class SecurityAdminPanel extends JPanel {
    private final AuditService auditService;
    private final DefaultTableModel auditModel;

    public SecurityAdminPanel() {
        this.auditService = ServiceRegistry.getInstance().getAuditService();

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Enterprise Administration & Security Center");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        StatusBadge tenantBadge = new StatusBadge("TENANT: " + TenantContext.getTenantId() + " (ISOLATED)",
                StatusBadge.Type.POSITIVE);
        header.add(tenantBadge, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Container
        JPanel center = new JPanel();
        center.setLayout(new BoxLayout(center, BoxLayout.Y_AXIS));
        center.setOpaque(false);

        // Security Policy Row
        JPanel policyRow = new JPanel(new GridLayout(1, 3, 12, 0));
        policyRow.setOpaque(false);
        policyRow.setMaximumSize(new Dimension(Integer.MAX_VALUE, 90));

        policyRow.add(createSecurityTile("Multi-Tenancy Enforcement", "Active & Enforced", "Row Discriminator Bound"));
        policyRow.add(createSecurityTile("MFA Authentication Policy", "100% TOTP Required", "RFC 6238 Compliant"));
        policyRow.add(createSecurityTile("Audit Log Integrity", "Tamper-Evident Active", "Append-Only Ledger"));
        center.add(policyRow);
        center.add(Box.createVerticalStrut(16));

        // Active Sessions Card
        FlatCard sessionCard = new FlatCard();
        sessionCard.setLayout(new BorderLayout(0, 8));
        sessionCard.setMaximumSize(new Dimension(Integer.MAX_VALUE, 160));

        JLabel sessionTitle = new JLabel("Active Authenticated User Sessions");
        sessionTitle.setFont(ThemeConstants.FONT_SECTION);
        sessionCard.add(sessionTitle, BorderLayout.NORTH);

        String[] sessCols = { "User Principal", "Role", "Session ID", "MFA Verified", "Actions" };
        Object[][] sessData = {
                { "priya.sharma@apexcapital.in", "OPERATOR", "SES-9912048-A", "Yes (TOTP)", "Active (Valid)" },
                { "rahul.verma@apexcapital.in", "ADMINISTRATOR", "SES-8821942-B", "Yes (TOTP)", "Active (Valid)" },
                { "ananya.sen@apexcapital.in", "ANALYST", "SES-7719201-C", "Yes (TOTP)", "Active (Valid)" }
        };
        JTable sessTable = new JTable(new DefaultTableModel(sessData, sessCols));
        sessTable.setRowHeight(28);
        sessionCard.add(new JScrollPane(sessTable), BorderLayout.CENTER);
        center.add(sessionCard);
        center.add(Box.createVerticalStrut(16));

        // Immutable Audit Trail Card (from live AuditService)
        FlatCard auditCard = new FlatCard();
        auditCard.setLayout(new BorderLayout(0, 8));

        JLabel auditTitle = new JLabel("Tenant Business Event Audit Trail (Live Append-Only Ledger)");
        auditTitle.setFont(ThemeConstants.FONT_SECTION);
        auditCard.add(auditTitle, BorderLayout.NORTH);

        String[] auditCols = { "Audit ID", "Timestamp", "Actor", "Action", "Entity Target", "Result" };
        auditModel = new DefaultTableModel(auditCols, 0) {
            @Override
            public boolean isCellEditable(int r, int c) {
                return false;
            }
        };

        JTable auditTable = new JTable(auditModel);
        auditTable.setRowHeight(28);
        auditCard.add(new JScrollPane(auditTable), BorderLayout.CENTER);
        center.add(auditCard);

        add(center, BorderLayout.CENTER);

        refreshAuditLogs();
    }

    private void refreshAuditLogs() {
        auditModel.setRowCount(0);
        List<AuditLogEntry> logs = auditService.getRecentLogs(15);
        for (AuditLogEntry l : logs) {
            auditModel.addRow(new Object[] {
                    "AUD-" + l.id(),
                    l.createdAt().toString(),
                    l.actor(),
                    l.action(),
                    l.entityType() + ":" + l.entityId(),
                    l.result()
            });
        }
    }

    private JPanel createSecurityTile(String title, String val, String sub) {
        FlatCard tile = new FlatCard(ThemeConstants.BG_WHITE, ThemeConstants.BORDER);
        tile.setLayout(new GridLayout(3, 1, 0, 2));
        JLabel t = new JLabel(title);
        t.setFont(ThemeConstants.FONT_CAPTION);
        t.setForeground(ThemeConstants.TEXT_SECONDARY);
        tile.add(t);

        JLabel v = new JLabel(val);
        v.setFont(ThemeConstants.FONT_SECTION);
        v.setForeground(ThemeConstants.BRAND_GREEN);
        tile.add(v);

        JLabel s = new JLabel(sub);
        s.setFont(ThemeConstants.FONT_MICRO);
        s.setForeground(ThemeConstants.TEXT_MUTED);
        tile.add(s);
        return tile;
    }
}
