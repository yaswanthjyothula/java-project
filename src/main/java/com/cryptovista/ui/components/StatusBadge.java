package com.cryptovista.ui.components;

import com.cryptovista.ui.theme.ThemeConstants;
import javax.swing.*;
import java.awt.*;

public class StatusBadge extends JLabel {
    public enum Type { SIMULATED, POSITIVE, NEGATIVE, NEUTRAL, ACCENT }

    private final Type type;

    public StatusBadge(String text, Type type) {
        super(text, SwingConstants.CENTER);
        this.type = type;
        init();
    }

    private void init() {
        setFont(ThemeConstants.FONT_MICRO);
        setBorder(BorderFactory.createEmptyBorder(2, 6, 2, 6));

        switch (type) {
            case SIMULATED -> setForeground(new Color(146, 64, 14));
            case POSITIVE -> setForeground(ThemeConstants.POSITIVE);
            case NEGATIVE -> setForeground(ThemeConstants.NEGATIVE);
            case ACCENT -> setForeground(ThemeConstants.BRAND_GREEN);
            case NEUTRAL -> setForeground(ThemeConstants.TEXT_SECONDARY);
        }
    }

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int w = getWidth();
        int h = getHeight();

        switch (type) {
            case SIMULATED -> {
                g2.setColor(new Color(254, 243, 199));
                g2.fillRect(0, 0, w, h);
                g2.setColor(new Color(252, 211, 77));
                g2.drawRect(0, 0, w - 1, h - 1);
            }
            case POSITIVE -> {
                g2.setColor(ThemeConstants.POSITIVE_BG);
                g2.fillRect(0, 0, w, h);
            }
            case NEGATIVE -> {
                g2.setColor(ThemeConstants.NEGATIVE_BG);
                g2.fillRect(0, 0, w, h);
            }
            case ACCENT -> {
                g2.setColor(ThemeConstants.SOFT_GREEN);
                g2.fillRect(0, 0, w, h);
            }
            case NEUTRAL -> {
                g2.setColor(ThemeConstants.BG_PAGE);
                g2.fillRect(0, 0, w, h);
                g2.setColor(ThemeConstants.BORDER);
                g2.drawRect(0, 0, w - 1, h - 1);
            }
        }

        g2.dispose();
        super.paintComponent(g);
    }
}

