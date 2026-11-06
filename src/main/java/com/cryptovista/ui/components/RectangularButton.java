package com.cryptovista.ui.components;

import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class RectangularButton extends JButton {
    public enum Style { PRIMARY, OUTLINE, TEXT, DANGER }

    private final Style style;
    private boolean isHovered = false;

    public RectangularButton(String text, Style style) {
        super(text);
        this.style = style;
        init();
    }

    private void init() {
        setFont(ThemeConstants.FONT_BODY_BOLD);
        setFocusPainted(false);
        setBorderPainted(false);
        setContentAreaFilled(false);
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        setMargin(new Insets(8, 16, 8, 16));

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
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int width = getWidth();
        int height = getHeight();

        switch (style) {
            case PRIMARY -> {
                g2.setColor(isHovered ? ThemeConstants.BRAND_GREEN_HOVER : ThemeConstants.BRAND_GREEN);
                g2.fillRoundRect(0, 0, width, height, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
                setForeground(ThemeConstants.BG_WHITE);
            }
            case OUTLINE -> {
                g2.setColor(isHovered ? ThemeConstants.BG_PAGE : ThemeConstants.BG_WHITE);
                g2.fillRoundRect(0, 0, width, height, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
                g2.setColor(isHovered ? ThemeConstants.TEXT_SECONDARY : ThemeConstants.BORDER);
                g2.drawRoundRect(0, 0, width - 1, height - 1, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
                setForeground(ThemeConstants.TEXT_PRIMARY);
            }
            case DANGER -> {
                g2.setColor(isHovered ? new Color(180, 50, 50) : ThemeConstants.NEGATIVE);
                g2.fillRoundRect(0, 0, width, height, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
                setForeground(ThemeConstants.BG_WHITE);
            }
            case TEXT -> {
                if (isHovered) {
                    g2.setColor(ThemeConstants.SOFT_GREEN);
                    g2.fillRoundRect(0, 0, width, height, ThemeConstants.RADIUS_BUTTON, ThemeConstants.RADIUS_BUTTON);
                    setForeground(ThemeConstants.BRAND_GREEN);
                } else {
                    setForeground(ThemeConstants.TEXT_PRIMARY);
                }
            }
        }

        g2.dispose();
        super.paintComponent(g);
    }
}

