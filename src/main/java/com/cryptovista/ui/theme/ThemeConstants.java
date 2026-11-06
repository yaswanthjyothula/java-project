package com.cryptovista.ui.theme;

import java.awt.Color;
import java.awt.Font;

/**
 * CryptoVista X Enterprise - Theme Tokens
 * Strict adherence to Section 5:
 * Groww-inspired precision palette, restrained green accents, rectangular geometry.
 */
public final class ThemeConstants {
    private ThemeConstants() {}

    // Brand Colors
    public static final Color BRAND_GREEN = new Color(0x00, 0xB3, 0x86);         // #00B386
    public static final Color BRAND_GREEN_HOVER = new Color(0x00, 0x8F, 0x6B);   // #008F6B
    public static final Color SOFT_GREEN = new Color(0xE8, 0xF7, 0xF1);          // #E8F7F1
    public static final Color BG_WHITE = new Color(0xFF, 0xFF, 0xFF);            // #FFFFFF
    public static final Color BG_PAGE = new Color(0xF7, 0xF8, 0xFA);             // #F7F8FA
    public static final Color BORDER = new Color(0xE6, 0xE8, 0xEB);              // #E6E8EB
    public static final Color BORDER_SUBTLE = new Color(0xF0, 0xF2, 0xF5);       // #F0F2F5
    public static final Color BORDER_DARK = new Color(0xD1, 0xD5, 0xDB);         // #D1D5DB

    // Text Colors
    public static final Color TEXT_PRIMARY = new Color(0x17, 0x1A, 0x21);        // #171A21
    public static final Color TEXT_SECONDARY = new Color(0x6B, 0x72, 0x80);      // #6B7280
    public static final Color TEXT_MUTED = new Color(0x90, 0x97, 0xA2);          // #9097A2

    // Status Colors
    public static final Color POSITIVE = new Color(0x16, 0xA3, 0x6A);            // #16A36A
    public static final Color POSITIVE_BG = new Color(0xEC, 0xFD, 0xF5);         // #ECFDF5
    public static final Color NEGATIVE = new Color(0xD9, 0x4B, 0x4B);            // #D94B4B
    public static final Color NEGATIVE_BG = new Color(0xFE, 0xF2, 0xF2);         // #FEF2F2
    public static final Color WARNING = new Color(0xD9, 0x9A, 0x16);             // #D99A16
    public static final Color WARNING_BG = new Color(0xFF, 0xFB, 0xEB);         // #FFFBEB
    public static final Color INFO = new Color(0x36, 0x77, 0xD5);                // #3677D5
    public static final Color INFO_BG = new Color(0xEF, 0xF6, 0xFF);            // #EFF6FF

    // Geometry & Radius (Strictly rectangular / 2-4px, no pill shapes)
    public static final int RADIUS_INPUT = 3;
    public static final int RADIUS_BUTTON = 3;
    public static final int RADIUS_CARD = 4;

    // Dimensions
    public static final int SIDEBAR_WIDTH = 240;
    public static final int TOPBAR_HEIGHT = 64;
    public static final int GUTTER_PADDING = 24;

    // Typography
    private static final String FONT_FAMILY = "Segoe UI";
    public static final Font FONT_TITLE = new Font(FONT_FAMILY, Font.BOLD, 22);
    public static final Font FONT_SUBTITLE = new Font(FONT_FAMILY, Font.BOLD, 16);
    public static final Font FONT_SECTION = new Font(FONT_FAMILY, Font.BOLD, 14);
    public static final Font FONT_BODY = new Font(FONT_FAMILY, Font.PLAIN, 13);
    public static final Font FONT_BODY_BOLD = new Font(FONT_FAMILY, Font.BOLD, 13);
    public static final Font FONT_TABLE = new Font(FONT_FAMILY, Font.PLAIN, 12);
    public static final Font FONT_TABLE_BOLD = new Font(FONT_FAMILY, Font.BOLD, 12);
    public static final Font FONT_CAPTION = new Font(FONT_FAMILY, Font.PLAIN, 11);
    public static final Font FONT_MICRO = new Font(FONT_FAMILY, Font.BOLD, 10);
}

