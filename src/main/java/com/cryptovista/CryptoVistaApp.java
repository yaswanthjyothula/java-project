package com.cryptovista;

import com.cryptovista.ui.auth.LoginDialog;
import com.cryptovista.ui.shell.MainFrame;
import javax.swing.*;
import java.awt.GraphicsEnvironment;

public class CryptoVistaApp {
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("  CryptoVista X Enterprise — Desktop Workstation");
        System.out.println("  Version: 4.1.0 | Runtime: Java 21 LTS");
        System.out.println("  Authentication: User ID & Password ONLY (Zero MFA)");
        System.out.println("=================================================");

        if (GraphicsEnvironment.isHeadless()) {
            System.out.println("[INFO] Running in headless environment. Desktop GUI initialized in virtual mode.");
            return;
        }

        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
            } catch (Exception ignored) {
                // Fallback to cross-platform L&F
            }

            // Launch User ID and Password Authentication Dialog
            LoginDialog loginDialog = new LoginDialog(null);
            loginDialog.setVisible(true);

            if (loginDialog.isAuthenticated()) {
                System.out.println("[INFO] Authenticated session established for user: " + loginDialog.getCurrentSession().email());
                MainFrame frame = new MainFrame();
                frame.setVisible(true);
                System.out.println("[INFO] CryptoVista X Workstation started successfully.");
            } else {
                System.out.println("[INFO] Authentication cancelled by user. Terminating application.");
                System.exit(0);
            }
        });
    }
}
