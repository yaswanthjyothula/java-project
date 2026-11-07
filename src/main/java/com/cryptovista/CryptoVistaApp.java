package com.cryptovista;

import com.cryptovista.api.CryptoVistaApiServer;
import com.cryptovista.ui.auth.LoginDialog;
import com.cryptovista.ui.shell.MainFrame;
import javax.swing.*;
import java.awt.GraphicsEnvironment;

public class CryptoVistaApp {
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("  CryptoVista X Enterprise — Desktop Workstation");
        System.out.println("  Version: 4.2.0 | Runtime: Java 21 LTS");
        System.out.println("  Authentication: User ID & Password ONLY (Zero MFA)");
        System.out.println("=================================================");

        // 1. Start Localhost REST API Service (Pure JSON, Zero HTML)
        int port = 8080;
        try {
            CryptoVistaApiServer apiServer = new CryptoVistaApiServer(port);
            apiServer.start();
            System.out.println("[INFO] Localhost Backend Server: http://localhost:" + port + "/");
        } catch (Exception e) {
            System.err.println("[WARN] Could not start REST server on port " + port + ": " + e.getMessage());
        }

        // 2. Launch GUI if not headless
        if (GraphicsEnvironment.isHeadless()) {
            System.out.println("[INFO] Running in headless environment. REST API Server is actively listening on http://localhost:" + port + "/");
            try {
                // Keep server thread alive
                Thread.currentThread().join();
            } catch (InterruptedException ignored) {}
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
                System.out.println("[INFO] CryptoVista X Desktop Workstation started successfully.");
            } else {
                System.out.println("[INFO] Authentication dialog closed. Backend API remains active.");
            }
        });
    }
}
