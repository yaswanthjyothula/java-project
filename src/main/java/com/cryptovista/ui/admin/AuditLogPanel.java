package com.cryptovista.ui.admin;

import com.cryptovista.model.AuditLogEntry;
import com.cryptovista.service.AuditService;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Enterprise Audit Trail & Compliance Panel (Module I).
 * Immutable append-only audit log with automatic secret redaction.
 */
public class AuditLogPanel extends JPanel {

    private final AuditService auditService;
    private final DefaultTableModel tableModel;
    private final JLabel logCountLabel;

    public AuditLogPanel() {
        this.auditService = ServiceRegistry.getInstance().getAuditService();

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // 1. Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JLabel title = new JLabel("Enterprise Security & Immutable Audit Log");
        title.setFont(ThemeConstants.FONT_TITLE);
        title.setForeground(ThemeConstants.TEXT_PRIMARY);
        header.add(title, BorderLayout.WEST);

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        actions.setOpaque(false);

        RectangularButton refreshBtn = new RectangularButton("Refresh Logs", RectangularButton.Style.OUTLINE);
        refreshBtn.addActionListener(e -> loadLogs());
        actions.add(refreshBtn);

        header.add(actions, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // 2. Info Banner
        FlatCard banner = new FlatCard();
        banner.setLayout(new BorderLayout());
        banner.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));

        logCountLabel = new JLabel("Loading audit records...");
        logCountLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        logCountLabel.setForeground(ThemeConstants.TEXT_PRIMARY);

        JLabel secNotice = new JLabel("All secrets, passwords, and sensitive keys are automatically redacted prior to persistence.");
        secNotice.setFont(ThemeConstants.FONT_CAPTION);
        secNotice.setForeground(ThemeConstants.TEXT_MUTED);

        banner.add(logCountLabel, BorderLayout.WEST);
        banner.add(secNotice, BorderLayout.EAST);

        // 3. Audit Table
        String[] columns = {"ID", "Timestamp", "Actor / User ID", "Action", "Entity Type", "Target ID", "Result", "Sanitized Audit Details"};
        tableModel = new DefaultTableModel(columns, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };

        JTable table = new JTable(tableModel);
        table.setRowHeight(36);
        table.setFont(ThemeConstants.FONT_TABLE);
        table.getTableHeader().setFont(ThemeConstants.FONT_TABLE_BOLD);
        table.getTableHeader().setBackground(ThemeConstants.BG_WHITE);
        table.setShowGrid(false);
        table.setIntercellSpacing(new Dimension(0, 0));

        DefaultTableCellRenderer renderer = new DefaultTableCellRenderer();
        renderer.setBorder(BorderFactory.createEmptyBorder(0, 8, 0, 8));
        table.setDefaultRenderer(Object.class, renderer);

        table.getColumnModel().getColumn(0).setPreferredWidth(60);
        table.getColumnModel().getColumn(1).setPreferredWidth(140);
        table.getColumnModel().getColumn(2).setPreferredWidth(180);
        table.getColumnModel().getColumn(3).setPreferredWidth(160);
        table.getColumnModel().getColumn(4).setPreferredWidth(110);
        table.getColumnModel().getColumn(5).setPreferredWidth(100);
        table.getColumnModel().getColumn(6).setPreferredWidth(90);
        table.getColumnModel().getColumn(7).setPreferredWidth(340);

        JPanel centerPanel = new JPanel(new BorderLayout(0, 16));
        centerPanel.setOpaque(false);
        centerPanel.add(banner, BorderLayout.NORTH);
        centerPanel.add(new JScrollPane(table), BorderLayout.CENTER);

        add(centerPanel, BorderLayout.CENTER);

        loadLogs();
    }

    private void loadLogs() {
        tableModel.setRowCount(0);
        List<AuditLogEntry> logs = auditService.getRecentLogs(100);
        for (AuditLogEntry log : logs) {
            tableModel.addRow(new Object[]{
                    log.id(),
                    log.createdAt() != null ? log.createdAt().toString() : "-",
                    log.actor(),
                    log.action(),
                    log.entityType(),
                    log.entityId(),
                    log.result(),
                    log.details()
            });
        }
        logCountLabel.setText("Showing " + logs.size() + " Audit Entries (Tenant Filter Enforced)");
    }
}

