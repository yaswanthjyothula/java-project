package com.cryptovista.ui.crm;

import com.cryptovista.model.Customer;
import com.cryptovista.model.Opportunity;
import com.cryptovista.model.SupportTicket;
import com.cryptovista.model.User;
import com.cryptovista.service.CrmService;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.service.TenantContext;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class Customer360Panel extends JPanel {
    private final CrmService crmService;
    private final User currentUser;
    private final DefaultTableModel customerListModel;
    private final DefaultTableModel oppTableModel;
    private final JLabel customerNameLabel;
    private final JLabel customerHealthLabel;
    private final JLabel contractLabel;
    private JTable customerTable;

    public Customer360Panel() {
        this.crmService = ServiceRegistry.getInstance().getCrmService();
        this.currentUser = new User(TenantContext.getTenantId(), "USR-001", "operator@apexcapital.in", "Priya Sharma", "hash", User.Role.OPERATOR, "ACTIVE", 0, false, null);

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Enterprise CRM • Customer 360");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 0));
        actions.setOpaque(false);
        RectangularButton exportBtn = new RectangularButton("Export Audit Report", RectangularButton.Style.OUTLINE);
        exportBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "Audit-controlled CSV export generated and logged to audit trail.", "Export Complete", JOptionPane.INFORMATION_MESSAGE));
        actions.add(exportBtn);

        RectangularButton newCustBtn = new RectangularButton("+ New Customer Account", RectangularButton.Style.PRIMARY);
        newCustBtn.addActionListener(e -> openCreateCustomerDialog());
        actions.add(newCustBtn);
        header.add(actions, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Split: Left Customer List (300px), Right Detail View
        JPanel splitPanel = new JPanel(new BorderLayout(16, 0));
        splitPanel.setOpaque(false);

        // Left Customer Selection Card
        FlatCard listCard = new FlatCard();
        listCard.setPreferredSize(new Dimension(300, 500));
        listCard.setLayout(new BorderLayout(0, 8));

        JLabel listHeader = new JLabel("Enterprise Accounts");
        listHeader.setFont(ThemeConstants.FONT_SECTION);
        listCard.add(listHeader, BorderLayout.NORTH);

        customerListModel = new DefaultTableModel(new String[]{"Account Name", "Stage"}, 0) {
            @Override
            public boolean isCellEditable(int r, int c) { return false; }
        };
        customerTable = new JTable(customerListModel);
        customerTable.setFont(ThemeConstants.FONT_TABLE);
        customerTable.setRowHeight(28);
        customerTable.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && customerTable.getSelectedRow() != -1) {
                int row = customerTable.getSelectedRow();
                String name = (String) customerListModel.getValueAt(row, 0);
                loadCustomerDetails(name);
            }
        });

        listCard.add(new JScrollPane(customerTable), BorderLayout.CENTER);
        splitPanel.add(listCard, BorderLayout.WEST);

        // Right Customer 360 Detail Card
        FlatCard detailCard = new FlatCard();
        detailCard.setLayout(new BorderLayout(0, 16));

        // Top Customer Identity Strip
        JPanel profileTop = new JPanel(new BorderLayout());
        profileTop.setOpaque(false);

        JPanel nameCluster = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 0));
        nameCluster.setOpaque(false);
        customerNameLabel = new JLabel("Apex Digital Capital Pvt Ltd");
        customerNameLabel.setFont(ThemeConstants.FONT_TITLE);
        nameCluster.add(customerNameLabel);
        nameCluster.add(new StatusBadge("ACTIVE ENTERPRISE", StatusBadge.Type.ACCENT));

        customerHealthLabel = new JLabel("HEALTH: 94/100");
        customerHealthLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        customerHealthLabel.setForeground(ThemeConstants.POSITIVE);
        nameCluster.add(customerHealthLabel);
        profileTop.add(nameCluster, BorderLayout.WEST);

        contractLabel = new JLabel("Owner: Priya Sharma • Active Multi-Tenant Account");
        contractLabel.setFont(ThemeConstants.FONT_CAPTION);
        contractLabel.setForeground(ThemeConstants.TEXT_SECONDARY);
        profileTop.add(contractLabel, BorderLayout.EAST);
        detailCard.add(profileTop, BorderLayout.NORTH);

        // Detail Tabs
        JTabbedPane tabs = new JTabbedPane();
        tabs.setFont(ThemeConstants.FONT_BODY_BOLD);

        // Tab 1: Overview & Metrics
        JPanel overviewTab = new JPanel(new GridLayout(2, 2, 12, 12));
        overviewTab.setBackground(ThemeConstants.BG_WHITE);
        overviewTab.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
        overviewTab.add(createDetailTile("Active Annual Contract Value", "₹4,50,000 ARR", "Renewed: Oct 2026"));
        overviewTab.add(createDetailTile("Open Support Tickets", "1 Active (SLA: 3h 40m)", "Severity: Normal"));
        overviewTab.add(createDetailTile("Synthetic KYC Onboarding", "Approved (Mock Dossier)", "Verification: Automated"));
        overviewTab.add(createDetailTile("Stakeholder Contacts", "4 Active Stakeholders", "Primary: Rahul Verma (CEO)"));
        tabs.addTab("Customer Overview", overviewTab);

        // Tab 2: Opportunities & Pipeline
        JPanel oppsTab = new JPanel(new BorderLayout());
        oppTableModel = new DefaultTableModel(new String[]{"Opportunity", "Stage", "Value", "Probability", "Expected Close"}, 0);
        JTable oppTable = new JTable(oppTableModel);
        oppTable.setRowHeight(28);
        oppsTab.add(new JScrollPane(oppTable), BorderLayout.CENTER);
        tabs.addTab("Sales Opportunities", oppsTab);

        // Tab 3: Timeline & Audit History
        JPanel timelineTab = new JPanel();
        timelineTab.setLayout(new BoxLayout(timelineTab, BoxLayout.Y_AXIS));
        timelineTab.setBackground(ThemeConstants.BG_WHITE);
        timelineTab.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
        timelineTab.add(new JLabel("<html><b>Today 14:15 IST:</b> License Expansion Proposal Submitted by Priya Sharma (Log: AUD-44019)</html>"));
        timelineTab.add(Box.createVerticalStrut(8));
        timelineTab.add(new JLabel("<html><b>Yesterday 11:30 IST:</b> SLA Ticket #TK-1082 Assigned to Support Queue by Bot</html>"));
        timelineTab.add(Box.createVerticalStrut(8));
        timelineTab.add(new JLabel("<html><b>02-Nov-2026:</b> Quarterly Review Meeting Completed • Health Score updated from 90 -> 94</html>"));
        tabs.addTab("Activity Timeline", timelineTab);

        detailCard.add(tabs, BorderLayout.CENTER);
        splitPanel.add(detailCard, BorderLayout.CENTER);

        add(splitPanel, BorderLayout.CENTER);

        refreshCustomerList();
    }

    private void refreshCustomerList() {
        customerListModel.setRowCount(0);
        List<Customer> list = crmService.listCustomers(currentUser);
        for (Customer c : list) {
            customerListModel.addRow(new Object[]{c.name(), c.lifecycleStage()});
        }
        if (!list.isEmpty()) {
            customerTable.setRowSelectionInterval(0, 0);
        }
    }

    private void loadCustomerDetails(String customerName) {
        customerNameLabel.setText(customerName);
        List<Customer> list = crmService.listCustomers(currentUser);
        Customer current = list.stream().filter(c -> c.name().equalsIgnoreCase(customerName)).findFirst().orElse(null);
        if (current == null) return;

        customerHealthLabel.setText("HEALTH: " + current.healthScore() + "/100");
        contractLabel.setText("Owner: " + current.ownerUserId() + " • Number: " + current.customerNumber());

        oppTableModel.setRowCount(0);
        CrmService.Customer360Record record = crmService.getCustomer360(currentUser, current.id());
        for (Opportunity o : record.opportunities()) {
            oppTableModel.addRow(new Object[]{o.title(), o.stage(), "₹" + o.value(), o.probability() + "%", o.expectedClose().toString()});
        }
    }

    private void openCreateCustomerDialog() {
        JTextField nameField = new JTextField();
        JComboBox<String> typeSelect = new JComboBox<>(new String[]{"INSTITUTIONAL", "ENTERPRISE", "GROWTH"});

        JPanel form = new JPanel(new GridLayout(2, 2, 8, 8));
        form.add(new JLabel("Organization Name:"));
        form.add(nameField);
        form.add(new JLabel("Customer Type:"));
        form.add(typeSelect);

        int result = JOptionPane.showConfirmDialog(this, form, "Create Enterprise Customer", JOptionPane.OK_CANCEL_OPTION);
        if (result == JOptionPane.OK_OPTION) {
            String name = nameField.getText().trim();
            if (name.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Organization Name cannot be empty", "Validation Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
            try {
                crmService.createCustomer(currentUser, name, (String) typeSelect.getSelectedItem(), currentUser.fullName());
                refreshCustomerList();
                JOptionPane.showMessageDialog(this, "Customer '" + name + "' created successfully.", "Success", JOptionPane.INFORMATION_MESSAGE);
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    private JPanel createDetailTile(String title, String main, String sub) {
        FlatCard tile = new FlatCard(ThemeConstants.BG_PAGE, ThemeConstants.BORDER);
        tile.setLayout(new GridLayout(3, 1, 0, 4));
        JLabel t = new JLabel(title);
        t.setFont(ThemeConstants.FONT_CAPTION);
        t.setForeground(ThemeConstants.TEXT_SECONDARY);
        tile.add(t);

        JLabel m = new JLabel(main);
        m.setFont(ThemeConstants.FONT_SECTION);
        m.setForeground(ThemeConstants.TEXT_PRIMARY);
        tile.add(m);

        JLabel s = new JLabel(sub);
        s.setFont(ThemeConstants.FONT_MICRO);
        s.setForeground(ThemeConstants.BRAND_GREEN);
        tile.add(s);
        return tile;
    }
}
