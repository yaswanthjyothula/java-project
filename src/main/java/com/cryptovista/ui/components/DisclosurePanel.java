package com.cryptovista.ui.components;

import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;

public class DisclosurePanel extends JPanel {
    public DisclosurePanel(String message) {
        setLayout(new BorderLayout(8, 0));
        setBackground(new Color(248, 250, 252));
        setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(ThemeConstants.BORDER, 1),
            BorderFactory.createEmptyBorder(8, 12, 8, 12)
        ));

        JLabel infoIcon = new JLabel("ℹ");
        infoIcon.setFont(ThemeConstants.FONT_BODY_BOLD);
        infoIcon.setForeground(ThemeConstants.INFO);
        add(infoIcon, BorderLayout.WEST);

        JLabel textLabel = new JLabel("<html><b>Disclosure:</b> " + message + "</html>");
        textLabel.setFont(ThemeConstants.FONT_CAPTION);
        textLabel.setForeground(ThemeConstants.TEXT_SECONDARY);
        add(textLabel, BorderLayout.CENTER);
    }
}

