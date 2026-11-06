package com.cryptovista.ui.service;

import com.cryptovista.model.SupportTicket;
import com.cryptovista.model.TicketInternalNote;
import com.cryptovista.model.User;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.service.TenantContext;
import com.cryptovista.service.TicketService;
import com.cryptovista.ui.components.FlatCard;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.components.StatusBadge;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class SupportTicketsPanel extends JPanel {
    private final TicketService ticketService;
    private final User currentUser;
    private final DefaultTableModel ticketModel;
    private final JPanel convPanel;
    private final JLabel tName;
    private final StatusBadge slaBadge;
    private String activeTicketId = "TK-1082";

    public SupportTicketsPanel() {
        this.ticketService = ServiceRegistry.getInstance().getTicketService();
        this.currentUser = new User(TenantContext.getTenantId(), "USR-001", "operator@apexcapital.in", "Priya Sharma", "hash", User.Role.SUPPORT_AGENT, "ACTIVE", 0, false, null);

        setLayout(new BorderLayout(0, 16));
        setBackground(ThemeConstants.BG_PAGE);
        setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        JLabel title = new JLabel("Enterprise Support & SLA Management");
        title.setFont(ThemeConstants.FONT_TITLE);
        header.add(title, BorderLayout.WEST);

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 0));
        actions.setOpaque(false);
        actions.add(new StatusBadge("SLA ESCALATION CLOCK ACTIVE", StatusBadge.Type.POSITIVE));
        header.add(actions, BorderLayout.EAST);
        add(header, BorderLayout.NORTH);

        // Center Split: Left Ticket Queue (360px), Right Ticket Detail
        JPanel split = new JPanel(new BorderLayout(16, 0));
        split.setOpaque(false);

        // Ticket List Card
        FlatCard listCard = new FlatCard();
        listCard.setPreferredSize(new Dimension(360, 500));
        listCard.setLayout(new BorderLayout(0, 8));

        JLabel qTitle = new JLabel("Active Ticket Queue");
        qTitle.setFont(ThemeConstants.FONT_SECTION);
        listCard.add(qTitle, BorderLayout.NORTH);

        String[] cols = {"Ticket ID", "Customer ID", "Priority", "Status"};
        ticketModel = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int r, int c) { return false; }
        };
        JTable table = new JTable(ticketModel);
        table.setRowHeight(30);
        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() != -1) {
                activeTicketId = (String) ticketModel.getValueAt(table.getSelectedRow(), 0);
                loadTicketConversation(activeTicketId);
            }
        });

        listCard.add(new JScrollPane(table), BorderLayout.CENTER);
        split.add(listCard, BorderLayout.WEST);

        // Right Detail Card
        FlatCard detailCard = new FlatCard();
        detailCard.setLayout(new BorderLayout(0, 12));

        // Top info
        JPanel topInfo = new JPanel(new BorderLayout());
        topInfo.setOpaque(false);
        tName = new JLabel("Ticket #TK-1082: API Webhook Latency Check");
        tName.setFont(ThemeConstants.FONT_SUBTITLE);
        topInfo.add(tName, BorderLayout.WEST);

        slaBadge = new StatusBadge("SLA: 3h 40m REMAINING", StatusBadge.Type.ACCENT);
        topInfo.add(slaBadge, BorderLayout.EAST);
        detailCard.add(topInfo, BorderLayout.NORTH);

        // Center Messages & Internal Notes
        convPanel = new JPanel();
        convPanel.setLayout(new BoxLayout(convPanel, BoxLayout.Y_AXIS));
        convPanel.setOpaque(false);

        detailCard.add(new JScrollPane(convPanel), BorderLayout.CENTER);

        // Reply Action Bar with choice to send customer reply or add confidential internal note
        JPanel actionArea = new JPanel(new BorderLayout(0, 8));
        actionArea.setOpaque(false);

        JPanel replyBar = new JPanel(new BorderLayout(8, 0));
        replyBar.setOpaque(false);
        JTextField replyField = new JTextField("Draft note or customer reply...");
        replyBar.add(replyField, BorderLayout.CENTER);

        RectangularButton addNoteBtn = new RectangularButton("+ Add Confidential Note", RectangularButton.Style.OUTLINE);
        addNoteBtn.addActionListener(e -> {
            String noteText = replyField.getText().trim();
            if (noteText.isEmpty() || noteText.startsWith("Draft")) {
                JOptionPane.showMessageDialog(this, "Please enter note text.", "Empty Note", JOptionPane.WARNING_MESSAGE);
                return;
            }
            ticketService.addInternalNote(currentUser, activeTicketId, noteText);
            replyField.setText("");
            loadTicketConversation(activeTicketId);
        });

        RectangularButton sendReplyBtn = new RectangularButton("Send Customer Message", RectangularButton.Style.PRIMARY);
        sendReplyBtn.addActionListener(e -> {
            JOptionPane.showMessageDialog(this, "Message sent to customer channel.", "Dispatched", JOptionPane.INFORMATION_MESSAGE);
            replyField.setText("");
        });

        JPanel btns = new JPanel(new FlowLayout(FlowLayout.RIGHT, 6, 0));
        btns.setOpaque(false);
        btns.add(addNoteBtn);
        btns.add(sendReplyBtn);
        replyBar.add(btns, BorderLayout.EAST);

        actionArea.add(replyBar, BorderLayout.CENTER);
        detailCard.add(actionArea, BorderLayout.SOUTH);

        split.add(detailCard, BorderLayout.CENTER);
        add(split, BorderLayout.CENTER);

        refreshTickets();
        loadTicketConversation(activeTicketId);
    }

    private void refreshTickets() {
        ticketModel.setRowCount(0);
        List<SupportTicket> list = ticketService.listTickets();
        for (SupportTicket t : list) {
            ticketModel.addRow(new Object[]{t.id(), t.customerId(), t.priority(), t.status()});
        }
    }

    private void loadTicketConversation(String ticketId) {
        tName.setText("Ticket #" + ticketId);
        convPanel.removeAll();

        // Customer Message Box
        FlatCard custMsg = new FlatCard(ThemeConstants.BG_WHITE, ThemeConstants.BORDER);
        custMsg.setLayout(new BorderLayout(0, 4));
        custMsg.setMaximumSize(new Dimension(Integer.MAX_VALUE, 90));
        JLabel custHeader = new JLabel("<html><b>Customer Inbound Message:</b> <span style='color:#6B7280; font-size:11px;'>10:15 IST</span></html>");
        custMsg.add(custHeader, BorderLayout.NORTH);
        JLabel custBody = new JLabel("<html>We observed a 450ms latency spike in the test sandbox during market feed replay at 09:30 IST. Could you please confirm if this was scheduled maintenance?</html>");
        custMsg.add(custBody, BorderLayout.CENTER);
        convPanel.add(custMsg);
        convPanel.add(Box.createVerticalStrut(12));

        // Render Internal Notes (CONFIDENTIAL - segregated per SUP-004)
        List<TicketInternalNote> notes = ticketService.getInternalNotes(currentUser, ticketId);
        for (TicketInternalNote n : notes) {
            FlatCard internalNote = new FlatCard(new Color(255, 251, 235), new Color(252, 211, 77));
            internalNote.setLayout(new BorderLayout(0, 4));
            internalNote.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));
            JLabel noteHeader = new JLabel("<html><b>[CONFIDENTIAL OPERATOR NOTE]</b> <span style='color:#92400E; font-size:11px;'>" + n.authorUserId() + " • " + n.createdAt() + "</span></html>");
            noteHeader.setForeground(new Color(146, 64, 14));
            internalNote.add(noteHeader, BorderLayout.NORTH);
            JLabel noteBody = new JLabel("<html>" + n.noteContent() + "</html>");
            noteBody.setForeground(new Color(120, 53, 15));
            internalNote.add(noteBody, BorderLayout.CENTER);
            convPanel.add(internalNote);
            convPanel.add(Box.createVerticalStrut(8));
        }

        convPanel.revalidate();
        convPanel.repaint();
    }
}
