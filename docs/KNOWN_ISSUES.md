# CryptoVista X Enterprise — Known Issues & Limitations

**Document Version:** 4.1  
**Last Updated:** 2026-11-06  

---

## 1. Active Issues
*None.* All current test suites pass 100%.

## 2. Platform Constraints & Documented Disclosures
1. **Host Environment Swing Headless Display:**
   - In headless server or remote runner environments without an active X11 / Windows desktop session, `GraphicsEnvironment.isHeadless()` triggers virtual mode. The web workstation dashboard (`web/dashboard.html`) serves as the active graphical UI accessible via browser on port 8080.
2. **Deterministic Mock vs External Data:**
   - Simulated cryptocurrency market movements use a deterministic Brownian motion random walk when external feeds are offline. Synthetic feeds are explicitly tagged `isMock: true` with visible disclosures.
3. **Pure Simulated Trading:**
   - All orders, cash balances, and token holdings are virtual. No real fiat deposit, real crypto withdrawal, or real exchange order execution is ever performed.

