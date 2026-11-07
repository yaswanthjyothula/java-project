/**
 * CryptoVista X Enterprise - Modal Components
 * User ID & Password Single-Step Login (Strictly ZERO MFA / ZERO OTP)
 */

import { loginUser } from '../api.js';
import { store } from '../state.js';

export function renderLoginModal() {
  return `
    <div id="login-modal-overlay" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:9999;">
      <div style="background:#FFFFFF; border:1px solid var(--cv-border); border-radius:var(--cv-radius-md); width:420px; box-shadow:var(--cv-shadow-lg); overflow:hidden;">
        
        <div style="padding:24px 28px 16px; border-bottom:1px solid var(--cv-border); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:18px; font-weight:700; color:var(--cv-text-primary); letter-spacing:-0.02em;">CryptoVista X</div>
            <div style="font-size:12px; color:var(--cv-text-muted); margin-top:2px;">Enterprise Authenticated Workstation</div>
          </div>
          <span class="badge badge-positive">SINGLE-STEP AUTH</span>
        </div>

        <form id="login-form" style="padding:28px;">
          <div id="login-error-msg" style="display:none; padding:10px 12px; background:#FEF2F2; border:1px solid #FCA5A5; color:#991B1B; font-size:12px; border-radius:var(--cv-radius-xs); margin-bottom:16px;"></div>

          <div style="margin-bottom:16px;">
            <label style="display:block; font-size:12px; font-weight:600; color:var(--cv-text-secondary); margin-bottom:6px;">USER ID / WORK EMAIL</label>
            <input type="text" id="login-user-id" required value="operator@apexcapital.in" 
                   placeholder="e.g. operator@apexcapital.in"
                   style="width:100%; padding:10px 12px; border:1px solid var(--cv-border); border-radius:var(--cv-radius-xs); font-size:13px; outline:none; transition:border-color 0.15s ease;">
          </div>

          <div style="margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-size:12px; font-weight:600; color:var(--cv-text-secondary);">PASSWORD</label>
              <button type="button" id="btn-toggle-password" style="background:none; border:none; color:var(--cv-primary); font-size:11px; cursor:pointer; font-weight:600; padding:0;">Show</button>
            </div>
            <input type="password" id="login-password" required value="password123" 
                   placeholder="Enter your enterprise password"
                   style="width:100%; padding:10px 12px; border:1px solid var(--cv-border); border-radius:var(--cv-radius-xs); font-size:13px; outline:none; transition:border-color 0.15s ease;">
          </div>

          <button type="submit" id="btn-submit-login" class="btn btn-primary" style="width:100%; justify-content:center; padding:12px; font-size:14px; font-weight:600;">
            Sign In to Workstation
          </button>

          <div style="margin-top:16px; display:flex; justify-content:space-between; font-size:12px;">
            <a href="#" id="link-forgot-password" style="color:var(--cv-text-muted); text-decoration:none;">Forgot password?</a>
            <span style="color:var(--cv-text-muted);">Tenant: TENANT-APEX-01</span>
          </div>

          <div style="margin-top:16px; padding:10px; background:var(--cv-bg); border-radius:var(--cv-radius-xs); font-size:11px; color:var(--cv-text-muted); text-align:center;">
            Strict User ID + Password validation only. Zero MFA/OTP required.
          </div>
        </form>

      </div>
    </div>
  `;
}

export function initLoginModalEvents(onSuccess) {
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error-msg');
  const togglePass = document.getElementById('btn-toggle-password');
  const passInput = document.getElementById('login-password');
  const forgotLink = document.getElementById('link-forgot-password');

  if (togglePass && passInput) {
    togglePass.onclick = () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePass.textContent = isPass ? 'Hide' : 'Show';
    };
  }

  if (forgotLink) {
    forgotLink.onclick = (e) => {
      e.preventDefault();
      alert('Password reset link has been dispatched to your corporate security administrator.');
    };
  }

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const userId = document.getElementById('login-user-id').value.trim();
      const password = passInput.value.trim();

      if (!userId || !password) {
        errorMsg.textContent = 'Please enter both User ID and Password.';
        errorMsg.style.display = 'block';
        return;
      }

      const res = await loginUser(userId, password);
      if (res.status === 'AUTHENTICATED' || res.sessionToken) {
        store.setUser(res.user || { id: 'USR-001', email: userId, fullName: 'Apex Operator', role: 'OPERATOR' });
        const modal = document.getElementById('login-modal-overlay');
        if (modal) modal.remove();
        if (onSuccess) onSuccess();
      } else {
        errorMsg.textContent = res.error || 'Invalid credentials or tenant authorization failed.';
        errorMsg.style.display = 'block';
      }
    };
  }
}

