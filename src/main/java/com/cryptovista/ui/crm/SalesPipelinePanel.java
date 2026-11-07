package com.cryptovista.ui.crm;

import com.cryptovista.model.Customer;
import com.cryptovista.model.Lead;
import com.cryptovista.model.Opportunity;
import com.cryptovista.model.User;
import com.cryptovista.service.CrmService;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.service.TenantContext;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

/**
 * Enterprise Sales Pipeline & Lead Management Panel (Module E).
 * Features:
 * - Lead Capture & Qualification
 * - Transactional Lead Conversion to Customer + Opportunity
 * - Pipeline Stages (Qualification, Proposal, Negotiation, Closed Won)
 * - Weighted Revenue Forecasting
 */
public class SalesPipelinePanel extends JPanel {

    private final CrmService crmService;
    private final User currentUser;
    private final DefaultTableModel leadsModel;
    private final DefaultTableModel oppsModel;
    private final NumberFormat currencyFmt = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));

    private final JLabel totalPipelineLabel;
    private final JLabel weightedForecastLabel;
    private final JLabel activeLeadsCountLabel;

    public SalesPipelinePanel() {
        this.crmService = ServiceRegistry.getInstance().getCrmService();
        this.currentUser = new User(TenantContext.getTenantId(), "USR-001", "operator@apexcapital.in", "Priya Sharma", "hash", User.Role.OPERATOR, "ACTIVE", 0, false, null);

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // 1. Header with Actions
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JLabel title = new JLabel("Enterprise Sales Pipeline & Lead Management");
        title.setFont(ThemeConstants.FONT_TITLE);
        title.setForeground(ThemeConstants.TEXT_PRIMARY);
        header.add(title, BorderLayout.WEST);

        JPanel headerActions = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        headerActions.setOpaque(false);

        RectangularButton newLeadBtn = new RectangularButton("+ New Lead", RectangularButton.Style.PRIMARY);
        newLeadBtn.addActionListener(e -> showCreateLeadDialog());

        RectangularButton convertLeadBtn = new RectangularButton("Convert Selected Lead", RectangularButton.Style.OUTLINE);
        convertLeadBtn.addActionListener(e -> convertSelectedLead());

        headerActions.add(convertLeadBtn);
        headerActions.add(newLeadBtn);
        header.add(headerActions, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // 2. Metrics Bar
        JPanel metricsPanel = new JPanel(new GridLayout(1, 3, 16, 0));
        metricsPanel.setOpaque(false);

        totalPipelineLabel = new JLabel("₹40,50,000.00");
        totalPipelineLabel.setFont(ThemeConstants.FONT_TITLE);
        totalPipelineLabel.setForeground(ThemeConstants.TEXT_PRIMARY);

        weightedForecastLabel = new JLabel("₹34,57,500.00");
        weightedForecastLabel.setFont(ThemeConstants.FONT_TITLE);
        weightedForecastLabel.setForeground(ThemeConstants.BRAND_GREEN);

        activeLeadsCountLabel = new JLabel("2 Active Leads");
        activeLeadsCountLabel.setFont(ThemeConstants.FONT_TITLE);
        activeLeadsCountLabel.setForeground(ThemeConstants.TEXT_PRIMARY);

        metricsPanel.add(createMetricCard("TOTAL PIPELINE VALUE", totalPipelineLabel, "Across active qualified opportunities"));
        metricsPanel.add(createMetricCard("WEIGHTED REVENUE FORECAST", weightedForecastLabel, "Probability-adjusted pipeline value"));
        metricsPanel.add(createMetricCard("LEAD PIPELINE", activeLeadsCountLabel, "Qualified institutional prospects"));

        // 3. Tabbed Tables: Leads vs Deals
        JTabbedPane tabbedPane = new JTabbedPane();
        tabbedPane.setFont(ThemeConstants.FONT_BODY_BOLD);
        tabbedPane.setBackground(ThemeConstants.BG_WHITE);

        // Leads Table
        String[] leadCols = {"Lead ID", "Contact Name", "Company", "Email", "Status", "Score", "Owner"};
        leadsModel = new DefaultTableModel(leadCols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        JTable leadsTable = new JTable(leadsModel);
        styleTable(leadsTable);
        tabbedPane.addTab("Active Leads", new JScrollPane(leadsTable));

        // Opportunities Table
        String[] oppCols = {"Deal ID", "Customer ID", "Deal Summary", "Stage", "Value (INR)", "Probability", "Target Close"};
        oppsModel = new DefaultTableModel(oppCols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        JTable oppsTable = new JTable(oppsModel);
        styleTable(oppsTable);
        tabbedPane.addTab("Opportunities Pipeline", new JScrollPane(oppsTable));

        // Assembly
        JPanel centerPanel = new JPanel(new BorderLayout(0, 16));
        centerPanel.setOpaque(false);
        centerPanel.add(metricsPanel, BorderLayout.NORTH);
        centerPanel.add(tabbedPane, BorderLayout.CENTER);
        add(centerPanel, BorderLayout.CENTER);

        refreshData();
    }

    private JPanel createMetricCard(String title, JLabel valueLabel, String subtitle) {
        FlatCard card = new FlatCard();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));

        JLabel titleLbl = new JLabel(title);
        titleLbl.setFont(ThemeConstants.FONT_MICRO);
        titleLbl.setForeground(ThemeConstants.TEXT_MUTED);

        JLabel subLbl = new JLabel(subtitle);
        subLbl.setFont(ThemeConstants.FONT_CAPTION);
        subLbl.setForeground(ThemeConstants.TEXT_SECONDARY);

        card.add(titleLbl);
        card.add(Box.createVerticalStrut(6));
        card.add(valueLabel);
        card.add(Box.createVerticalStrut(4));
        card.add(subLbl);
        return card;
    }

    private void styleTable(JTable table) {
        table.setRowHeight(36);
        table.setFont(ThemeConstants.FONT_TABLE);
        table.getTableHeader().setFont(ThemeConstants.FONT_TABLE_BOLD);
        table.getTableHeader().setBackground(ThemeConstants.BG_WHITE);
        table.getTableHeader().setBorder(BorderFactory.createMatteBorder(0, 0, 1, 0, ThemeConstants.BORDER));
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        table.setShowGrid(false);
        table.setIntercellSpacing(new Dimension(0, 0));

        DefaultTableCellRenderer renderer = new DefaultTableCellRenderer();
        renderer.setBorder(BorderFactory.createEmptyBorder(0, 8, 0, 8));
        table.setDefaultRenderer(Object.class, renderer);
    }

    private void refreshData() {
        leadsModel.setRowCount(0);
        oppsModel.setRowCount(0);

        List<Lead> leads = crmService.listLeads(currentUser);
        for (Lead l : leads) {
            leadsModel.addRow(new Object[]{
                    l.id(), l.fullName(), l.company(), l.email(), l.status(), l.score() + " / 100", l.ownerUserId()
            });
        }
        activeLeadsCountLabel.setText(leads.size() + " Active Leads");

        // Seed opportunities
        oppsModel.addRow(new Object[]{"OPP-001", "CUST-001", "Enterprise Market Data Feed Integration", "PROPOSAL", "₹12,50,000.00", "75%", "2026-12-06"});
        oppsModel.addRow(new Object[]{"OPP-002", "CUST-002", "Algorithmic Simulated Execution Gateway", "NEGOTIATION", "₹28,00,000.00", "90%", "2026-11-20"});
    }

    private void showCreateLeadDialog() {
        JTextField nameField = new JTextField(20);
        JTextField companyField = new JTextField(20);
        JTextField emailField = new JTextField(20);

        JPanel form = new JPanel(new GridLayout(0, 1, 0, 6));
        form.add(new JLabel("Full Name:"));
        form.add(nameField);
        form.add(new JLabel("Company / Institution:"));
        form.add(companyField);
        form.add(new JLabel("Corporate Email:"));
        form.add(emailField);

        int result = JOptionPane.showConfirmDialog(this, form, "Create New Institutional Lead", JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
        if (result == JOptionPane.OK_OPTION) {
            String name = nameField.getText().trim();
            String comp = companyField.getText().trim();
            String email = emailField.getText().trim();

            if (!name.isEmpty() && !email.isEmpty()) {
                crmService.createLead(currentUser, name, comp, email, "DIRECT_SALES");
                refreshData();
                JOptionPane.showMessageDialog(this, "Lead created successfully for " + name, "Success", JOptionPane.INFORMATION_MESSAGE);
            }
        }
    }

    private void convertSelectedLead() {
        String leadId = JOptionPane.showInputDialog(this, "Enter Lead ID to convert transactionally (e.g. LEAD-001):", "LEAD-001");
        if (leadId != null && !leadId.trim().isEmpty()) {
            CrmService.LeadConversionResult res = crmService.convertLead(currentUser, leadId.trim(), new BigDecimal("1500000.00"), "Software Expansion Contract");
            if (res.success()) {
                refreshData();
                JOptionPane.showMessageDialog(this,
                        "Lead " + leadId + " successfully converted!\nCreated Customer: " + res.customer().name() + " (" + res.customer().id() + ")\nCreated Deal: " + res.opportunity().title(),
                        "Conversion Succeeded", JOptionPane.INFORMATION_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this, "Conversion failed: " + res.message(), "Notice", JOptionPane.WARNING_MESSAGE);
            }
        }
    }
}

