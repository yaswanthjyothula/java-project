package com.cryptovista.ui.operations;

import com.cryptovista.model.User;
import com.cryptovista.model.WorkflowApproval;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.service.TenantContext;
import com.cryptovista.service.WorkflowService;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class WorkflowApprovalsPanel extends JPanel {
    private final WorkflowService workflowService;
    private final User adminUser;
    private final DefaultTableModel tableModel;
    private final JLabel dTitle;
    private final JLabel customerLabel;
    private final JLabel valueLabel;
    private final JLabel justLabel;
    private String selectedApprovalId = "APP-3301";

    public WorkflowApprovalsPanel() {
        this.workflowService = ServiceRegistry.getInstance().getWorkflowService();
        this.adminUser = new User(TenantContext.getTenantId(), "ADMIN-01", "admin@apexcapital.in", "Rahul Verma",
                "hash", User.Role.TENANT_ADMIN, "ACTIVE", 0, false, null);

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Enterprise Operations • Workflow & Approvals");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        StatusBadge queueBadge = new StatusBadge("MULTI-TIER APPROVAL ENGINE", StatusBadge.Type.ACCENT);
        header.add(queueBadge, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Split
        JPanel split = new JPanel(new BorderLayout(16, 0));
        split.setOpaque(false);

        // Queue Table Card
        FlatCard queueCard = new FlatCard();
        queueCard.setPreferredSize(new Dimension(420, 500));
        queueCard.setLayout(new BorderLayout(0, 8));

        JLabel qTitle = new JLabel("Pending Approval Requests");
        qTitle.setFont(ThemeConstants.FONT_SECTION);
        queueCard.add(qTitle, BorderLayout.NORTH);

        String[] cols = { "Task ID", "Type", "Requester", "Status" };
        tableModel = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int r, int c) {
                return false;
            }
        };
        JTable table = new JTable(tableModel);
        table.setRowHeight(30);
        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() != -1) {
                selectedApprovalId = (String) tableModel.getValueAt(table.getSelectedRow(), 0);
                loadApprovalDetails(selectedApprovalId);
            }
        });
        queueCard.add(new JScrollPane(table), BorderLayout.CENTER);
        split.add(queueCard, BorderLayout.WEST);

        // Detail Action Card
        FlatCard detailCard = new FlatCard();
        detailCard.setLayout(new BorderLayout(0, 16));

        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);
        dTitle = new JLabel("Request #APP-3301: Commercial Discount Override");
        dTitle.setFont(ThemeConstants.FONT_SUBTITLE);
        top.add(dTitle, BorderLayout.WEST);
        top.add(new StatusBadge("DIRECTOR LEVEL REQUIRED", StatusBadge.Type.SIMULATED), BorderLayout.EAST);
        detailCard.add(top, BorderLayout.NORTH);

        JPanel details = new JPanel(new GridLayout(4, 2, 8, 8));
        details.setOpaque(false);
        details.add(new JLabel("Customer Account:"));
        customerLabel = new JLabel("Apex Digital Capital Pvt Ltd");
        details.add(customerLabel);

        details.add(new JLabel("Opportunity:"));
        details.add(new JLabel("Enterprise Simulator Expansion (25 seats)"));

        details.add(new JLabel("Proposed Net Price:"));
        valueLabel = new JLabel("₹4,50,000 / year (15.1% Discount)");
        details.add(valueLabel);

        details.add(new JLabel("Justification:"));
        justLabel = new JLabel("Multi-year commitment (3-year contract lock).");
        details.add(justLabel);

        detailCard.add(details, BorderLayout.CENTER);

        // Action Buttons
        JPanel btnRow = new JPanel(new FlowLayout(FlowLayout.RIGHT, 12, 0));
        btnRow.setOpaque(false);

        RectangularButton rejectBtn = new RectangularButton("Reject Request", RectangularButton.Style.DANGER);
        rejectBtn.addActionListener(e -> {
            try {
                workflowService.reject(adminUser, selectedApprovalId, "Policy threshold exceeded");
                JOptionPane.showMessageDialog(this, "Request " + selectedApprovalId + " rejected.", "Rejected",
                        JOptionPane.INFORMATION_MESSAGE);
                refreshApprovals();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        btnRow.add(rejectBtn);

        RectangularButton approveBtn = new RectangularButton("Approve Discount", RectangularButton.Style.PRIMARY);
        approveBtn.addActionListener(e -> {
            try {
                workflowService.approve(adminUser, selectedApprovalId);
                JOptionPane.showMessageDialog(this,
                        "Request " + selectedApprovalId + " successfully approved and logged to audit trail.",
                        "Approved", JOptionPane.INFORMATION_MESSAGE);
                refreshApprovals();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
        btnRow.add(approveBtn);

        detailCard.add(btnRow, BorderLayout.SOUTH);

        split.add(detailCard, BorderLayout.CENTER);
        add(split, BorderLayout.CENTER);

        refreshApprovals();
    }

    private void refreshApprovals() {
        tableModel.setRowCount(0);
        List<WorkflowApproval> list = workflowService.listPending();
        for (WorkflowApproval a : list) {
            tableModel.addRow(new Object[] { a.id(), a.taskType(), a.requesterUserId(), a.status() });
        }
        if (!list.isEmpty()) {
            selectedApprovalId = list.get(0).id();
            loadApprovalDetails(selectedApprovalId);
        } else {
            dTitle.setText("No Pending Approvals");
            customerLabel.setText("N/A");
            valueLabel.setText("N/A");
            justLabel.setText("Queue is clear.");
        }
    }

    private void loadApprovalDetails(String approvalId) {
        dTitle.setText("Request #" + approvalId);
        List<WorkflowApproval> list = workflowService.listPending();
        WorkflowApproval app = list.stream().filter(a -> a.id().equals(approvalId)).findFirst().orElse(null);
        if (app != null) {
            customerLabel.setText(app.customerId());
            valueLabel.setText("₹" + app.requestedValue());
            justLabel.setText(app.justification());
        }
    }
}
