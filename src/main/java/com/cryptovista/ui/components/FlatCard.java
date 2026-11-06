package com.cryptovista.ui.components;

import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;

public class FlatCard extends JPanel {
    private Color backgroundColor;
    private Color borderColor;

    public FlatCard() {
        this(ThemeConstants.BG_WHITE, ThemeConstants.BORDER);
    }

    public FlatCard(Color backgroundColor, Color borderColor) {
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        setOpaque(false);
        setBorder(BorderFactory.createEmptyBorder(16, 16, 16, 16));
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int w = getWidth();
        int h = getHeight();

        g2.setColor(backgroundColor);
        g2.fillRoundRect(0, 0, w, h, ThemeConstants.RADIUS_CARD, ThemeConstants.RADIUS_CARD);

        if (borderColor != null) {
            g2.setColor(borderColor);
            g2.drawRoundRect(0, 0, w - 1, h - 1, ThemeConstants.RADIUS_CARD, ThemeConstants.RADIUS_CARD);
        }

        g2.dispose();
        super.paintComponent(g);
    }
}

