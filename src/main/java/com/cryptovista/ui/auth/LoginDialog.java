package com.cryptovista.ui.auth;

import com.cryptovista.service.AuthService;
import com.cryptovista.service.ServiceRegistry;
import com.cryptovista.ui.components.RectangularButton;
import com.cryptovista.ui.theme.ThemeConstants;

import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

/**
 * Enterprise Login Dialog.
 * Requirement: USER ID AND PASSWORD ONLY.
 * Features:
 * - User ID field
 * - Password field
 * - Login button
 * - Show/Hide password toggle
 * - Forgot password option
 * - Appropriate validation and error feedback
 * - ZERO MFA / ZERO OTP
 */
public class LoginDialog extends JDialog {

    private final JTextField userIdField = new JTextField(24);
    private final JPasswordField passwordField = new JPasswordField(24);
    private final JCheckBox showPasswordCheckbox = new JCheckBox("Show password");
    private final JLabel errorLabel = new JLabel(" ");
    private final RectangularButton loginButton = new RectangularButton("Sign In to Workstation", RectangularButton.Style.PRIMARY);
    private final JButton forgotPasswordButton = new JButton("Forgot password?");

    private boolean authenticated = false;
    private AuthService.SessionRecord currentSession = null;

    public LoginDialog(Frame owner) {
        super(owner, "Sign In — CryptoVista X Enterprise", true);
        initUI();
    }

    private void initUI() {
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        setResizable(false);
        getContentPane().setBackground(ThemeConstants.BG_WHITE);

        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));
        mainPanel.setBackground(ThemeConstants.BG_WHITE);
        mainPanel.setBorder(BorderFactory.createEmptyBorder(36, 40, 36, 40));

        // 1. Brand Header
        JLabel brandTitle = new JLabel("CryptoVista X Enterprise");
        brandTitle.setFont(ThemeConstants.FONT_TITLE);
        brandTitle.setForeground(ThemeConstants.TEXT_PRIMARY);
        brandTitle.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel brandSubtitle = new JLabel("Digital asset intelligence. Enterprise operations. One connected platform.");
        brandSubtitle.setFont(ThemeConstants.FONT_CAPTION);
        brandSubtitle.setForeground(ThemeConstants.TEXT_MUTED);
        brandSubtitle.setAlignmentX(Component.CENTER_ALIGNMENT);

        JSeparator sep = new JSeparator();
        sep.setForeground(ThemeConstants.BORDER);
        sep.setMaximumSize(new Dimension(380, 1));
        sep.setAlignmentX(Component.CENTER_ALIGNMENT);

        // 2. Input Fields
        JPanel formPanel = new JPanel(new GridLayout(0, 1, 0, 6));
        formPanel.setBackground(ThemeConstants.BG_WHITE);
        formPanel.setMaximumSize(new Dimension(380, 260));

        JLabel userLabel = new JLabel("User ID or Enterprise Email");
        userLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        userLabel.setForeground(ThemeConstants.TEXT_SECONDARY);

        userIdField.setFont(ThemeConstants.FONT_BODY);
        userIdField.setText("operator@apexcapital.in"); // Demo preset
        userIdField.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(ThemeConstants.BORDER, 1),
                BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));

        JLabel passLabel = new JLabel("Password");
        passLabel.setFont(ThemeConstants.FONT_BODY_BOLD);
        passLabel.setForeground(ThemeConstants.TEXT_SECONDARY);

        passwordField.setFont(ThemeConstants.FONT_BODY);
        passwordField.setText("password123"); // Demo preset
        passwordField.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(ThemeConstants.BORDER, 1),
                BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));

        // Show/Hide password toggle
        showPasswordCheckbox.setBackground(ThemeConstants.BG_WHITE);
        showPasswordCheckbox.setFont(ThemeConstants.FONT_CAPTION);
        showPasswordCheckbox.setForeground(ThemeConstants.TEXT_SECONDARY);
        showPasswordCheckbox.setFocusPainted(false);
        showPasswordCheckbox.addActionListener(e -> {
            if (showPasswordCheckbox.isSelected()) {
                passwordField.setEchoChar((char) 0);
            } else {
                passwordField.setEchoChar('•');
            }
        });

        // Error Feedback Label
        errorLabel.setFont(ThemeConstants.FONT_CAPTION);
        errorLabel.setForeground(ThemeConstants.NEGATIVE);
        errorLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        formPanel.add(userLabel);
        formPanel.add(userIdField);
        formPanel.add(Box.createVerticalStrut(4));
        formPanel.add(passLabel);
        formPanel.add(passwordField);
        formPanel.add(showPasswordCheckbox);

        // 3. Actions Row
        JPanel optionsRow = new JPanel(new BorderLayout());
        optionsRow.setBackground(ThemeConstants.BG_WHITE);
        optionsRow.setMaximumSize(new Dimension(380, 30));

        forgotPasswordButton.setFont(ThemeConstants.FONT_CAPTION);
        forgotPasswordButton.setForeground(ThemeConstants.BRAND_GREEN);
        forgotPasswordButton.setBorderPainted(false);
        forgotPasswordButton.setContentAreaFilled(false);
        forgotPasswordButton.setFocusPainted(false);
        forgotPasswordButton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        forgotPasswordButton.addActionListener(e -> showForgotPasswordDialog());

        optionsRow.add(forgotPasswordButton, BorderLayout.EAST);

        // Login Button
        loginButton.setMaximumSize(new Dimension(380, 42));
        loginButton.setAlignmentX(Component.CENTER_ALIGNMENT);
        loginButton.addActionListener(e -> attemptLogin());

        // Keyboard Enter listener
        KeyAdapter enterKey = new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    attemptLogin();
                }
            }
        };
        userIdField.addKeyListener(enterKey);
        passwordField.addKeyListener(enterKey);

        // Security Notice
        JLabel securityNotice = new JLabel("Single-step password authentication. No MFA required.");
        securityNotice.setFont(ThemeConstants.FONT_CAPTION);
        securityNotice.setForeground(ThemeConstants.TEXT_MUTED);
        securityNotice.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Assembly
        mainPanel.add(brandTitle);
        mainPanel.add(Box.createVerticalStrut(4));
        mainPanel.add(brandSubtitle);
        mainPanel.add(Box.createVerticalStrut(18));
        mainPanel.add(sep);
        mainPanel.add(Box.createVerticalStrut(18));
        mainPanel.add(formPanel);
        mainPanel.add(optionsRow);
        mainPanel.add(Box.createVerticalStrut(6));
        mainPanel.add(errorLabel);
        mainPanel.add(Box.createVerticalStrut(12));
        mainPanel.add(loginButton);
        mainPanel.add(Box.createVerticalStrut(16));
        mainPanel.add(securityNotice);

        setContentPane(mainPanel);
        pack();
        setLocationRelativeTo(getOwner());
    }

    private void attemptLogin() {
        errorLabel.setText(" ");
        String userId = userIdField.getText();
        String password = new String(passwordField.getPassword());

        if (userId.trim().isEmpty()) {
            errorLabel.setText("Please enter your User ID or Email.");
            userIdField.requestFocus();
            return;
        }
        if (password.trim().isEmpty()) {
            errorLabel.setText("Please enter your password.");
            passwordField.requestFocus();
            return;
        }

        loginButton.setEnabled(false);
        loginButton.setText("Verifying Credentials...");

        // Perform backend credential validation
        AuthService authService = ServiceRegistry.getInstance().getAuthService();
        AuthService.AuthResult result = authService.login(userId, password);

        if (result.success()) {
            this.authenticated = true;
            this.currentSession = result.session();
            dispose();
        } else {
            loginButton.setEnabled(true);
            loginButton.setText("Sign In to Workstation");
            errorLabel.setText(result.message());
            passwordField.setText("");
            passwordField.requestFocus();
        }
    }

    private void showForgotPasswordDialog() {
        String input = JOptionPane.showInputDialog(
                this,
                "Enter your User ID or Email to reset your password:\n(In demo mode, password resets to 'password123')",
                "Reset Password",
                JOptionPane.QUESTION_MESSAGE
        );
        if (input != null && !input.trim().isEmpty()) {
            boolean reset = ServiceRegistry.getInstance().getAuthService().resetPassword(input.trim(), "password123");
            if (reset) {
                JOptionPane.showMessageDialog(this, "Password has been successfully reset to: password123", "Password Reset", JOptionPane.INFORMATION_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this, "User ID not found in tenant directory.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public AuthService.SessionRecord getCurrentSession() {
        return currentSession;
    }
}
