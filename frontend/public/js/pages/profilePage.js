/**
 * CryptoVista X Enterprise - Module 15: User Profile and Personal Settings (Pages 126 – 130)
 * Operator profile, credentials, UI preferences, and security sessions
 */

import { store } from '../state.js';

export function renderProfilePage(subRoute = 'overview') {
  const user = store.getState().currentUser;

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Operator Profile & Security Preferences</h1>
        <p class="page-subtitle">Personal account information, notification settings, and password management.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <span class="badge badge-positive">AUTHENTICATED OPERATOR</span>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/profile" class="tab-link ${subRoute === 'overview' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'overview' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'overview' ? '2px solid var(--cv-brand-green)' : 'none'};">My Profile</a>
      <a href="#/app/profile/password" class="tab-link ${subRoute === 'password' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'password' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'password' ? '2px solid var(--cv-brand-green)' : 'none'};">Change Password</a>
      <a href="#/app/profile/preferences" class="tab-link ${subRoute === 'preferences' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'preferences' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'preferences' ? '2px solid var(--cv-brand-green)' : 'none'};">Preferences</a>
    </div>

    ${subRoute === 'password' ? `
      <!-- Change Password Form -->
      <div class="panel" style="max-width:540px;">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">Update Password</h3>
        <p style="font-size:12.5px; color:var(--cv-text-secondary); margin-bottom:20px;">
          Password update requires single-step validation of current credentials.
        </p>
        <form onsubmit="event.preventDefault(); alert('Password successfully changed.'); location.hash='#/app/profile';">
          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input type="password" required class="form-input" placeholder="Current password">
          </div>
          <div class="form-group">
            <label class="form-label">New Password</label>
            <input type="password" required minlength="8" class="form-input" placeholder="Minimum 8 characters">
          </div>
          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label">Confirm New Password</label>
            <input type="password" required minlength="8" class="form-input" placeholder="Confirm new password">
          </div>
          <button type="submit" class="btn btn-primary" style="padding:10px 20px;">Change Password</button>
        </form>
      </div>
    ` : subRoute === 'preferences' ? `
      <!-- Preferences Form -->
      <div class="panel" style="max-width:640px;">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">Display & Workstation Preferences</h3>
        <form onsubmit="event.preventDefault(); alert('Preferences saved.');">
          <div class="form-group">
            <label class="form-label">Display Theme</label>
            <select class="form-select">
              <option selected>Groww Clean Light (Default)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Number & Currency Format</label>
            <select class="form-select">
              <option selected>Indian Numbering (₹ Lakhs & Crores)</option>
              <option>Western Standard ($ Millions & Billions)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label">Order Confirmation Dialog</label>
            <label style="font-size:13px; color:var(--cv-text-secondary); display:flex; align-items:center; gap:8px;">
              <input type="checkbox" checked> Always preview simulated order before ledger settlement
            </label>
          </div>
          <button type="submit" class="btn btn-primary" style="padding:10px 20px;">Save Preferences</button>
        </form>
      </div>
    ` : `
      <!-- Profile Overview -->
      <div class="panel" style="max-width:640px;">
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px; border-bottom:1px solid var(--cv-border); padding-bottom:20px;">
          <div style="width:52px; height:52px; background:var(--cv-brand-green); color:#FFF; font-size:20px; font-weight:800; border-radius:3px; display:flex; align-items:center; justify-content:center;">
            ${user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'OP'}
          </div>
          <div>
            <div style="font-size:18px; font-weight:800; color:var(--cv-text-primary);">${user.fullName}</div>
            <div style="font-size:12.5px; color:var(--cv-text-muted);">${user.email}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; font-size:13px;">
          <div>
            <div style="color:var(--cv-text-muted); font-size:11px; font-weight:700;">USER IDENTIFIER</div>
            <div style="font-weight:600; margin-top:2px;">${user.id}</div>
          </div>
          <div>
            <div style="color:var(--cv-text-muted); font-size:11px; font-weight:700;">ASSIGNED ROLE</div>
            <div style="margin-top:2px;"><span class="badge badge-neutral">${user.role}</span></div>
          </div>
          <div>
            <div style="color:var(--cv-text-muted); font-size:11px; font-weight:700;">ACTIVE TENANT</div>
            <div style="font-weight:600; margin-top:2px;">${store.getState().tenantId}</div>
          </div>
          <div>
            <div style="color:var(--cv-text-muted); font-size:11px; font-weight:700;">AUTHENTICATION MODE</div>
            <div style="margin-top:2px;"><span class="badge badge-positive">Single-Step (Zero MFA)</span></div>
          </div>
        </div>
      </div>
    `}
  `;
}
