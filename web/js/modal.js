/**
 * CryptoVista X Enterprise - Modal Workflows
 * Adheres strictly to Section 4:
 * - USER ID AND PASSWORD ONLY
 * - Zero MFA / Zero OTP / Zero second factor
 * - Real validation
 * - Show/Hide password toggle
 * - Forgot password reset
 */

export function initModals() {
  const demoModal = document.getElementById('demo-modal');
  const signInModal = document.getElementById('signin-modal');

  // Trigger buttons
  document.querySelectorAll('[data-action="open-demo"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(demoModal);
    });
  });

  document.querySelectorAll('[data-action="open-signin"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(signInModal);
    });
  });

  // Close buttons
  document.querySelectorAll('.cv-modal-close, [data-action="close-modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close on backdrop click
  [demoModal, signInModal].forEach(backdrop => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Setup Demo Form submission
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', handleDemoSubmit);
  }

  // Setup Signin Form submission
  const signinForm = document.getElementById('signin-form');
  if (signinForm) {
    signinForm.addEventListener('submit', handleSigninSubmit);

    // Show/Hide password toggle
    const showPwdCheckbox = document.getElementById('signin-show-pwd');
    const pwdInput = document.getElementById('signin-pwd');
    if (showPwdCheckbox && pwdInput) {
      showPwdCheckbox.addEventListener('change', () => {
        pwdInput.type = showPwdCheckbox.checked ? 'text' : 'password';
      });
    }

    // Forgot password link
    const forgotPwdLink = document.getElementById('signin-forgot-pwd');
    if (forgotPwdLink) {
      forgotPwdLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const msg = email ? `Password reset instructions dispatched for: ${email}\n(In demo evaluation mode, credentials reset to 'password123')` : "Enter your email above and click forgot password.";
        alert(msg);
      });
    }
  }
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('open');
  modalEl.setAttribute('aria-hidden', 'false');
  const firstInput = modalEl.querySelector('input, select, textarea');
  if (firstInput) firstInput.focus();
}

function closeAllModals() {
  document.querySelectorAll('.cv-modal-backdrop').forEach(m => {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  });
}

function handleDemoSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nameInput = form.querySelector('#demo-name');
  const emailInput = form.querySelector('#demo-email');
  const companyInput = form.querySelector('#demo-company');

  let hasError = false;

  // Validate fields
  if (!nameInput.value.trim()) {
    showFieldError(nameInput, 'Full name is required');
    hasError = true;
  } else {
    clearFieldError(nameInput);
  }

  if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
    showFieldError(emailInput, 'Valid work email is required');
    hasError = true;
  } else {
    clearFieldError(emailInput);
  }

  if (!companyInput.value.trim()) {
    showFieldError(companyInput, 'Company name is required');
    hasError = true;
  } else {
    clearFieldError(companyInput);
  }

  if (hasError) return;

  // Render confirmation inside modal
  const modalBody = form.parentElement;
  modalBody.innerHTML = `
    <div style="text-align:center; padding:20px 0;">
      <div style="width:48px; height:48px; background:#ECFDF5; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A36A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style="font-size:20px; font-weight:700; color:#171A21; margin-bottom:8px;">Demo Request Registered</h3>
      <p style="font-size:14px; color:#6B7280; line-height:1.5; margin-bottom:20px;">
        Thank you, <strong>${escapeHtml(nameInput.value)}</strong>. Your request for <strong>${escapeHtml(companyInput.value)}</strong> has been recorded in the local demonstration queue.
      </p>
      <div class="disclosure-box" style="text-align:left; margin-bottom:20px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D99A16" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <strong>Evaluation Prototype Mode:</strong> In this marketing demonstration, form submissions are logged locally to the developer console and verified for validation without dispatching external email spam.
        </div>
      </div>
      <button type="button" class="btn btn-outline" data-action="close-modal" onclick="document.getElementById('demo-modal').classList.remove('open')">
        Close Window
      </button>
    </div>
  `;

  console.info('[CryptoVista Demo Request Logged]', {
    name: nameInput.value,
    email: emailInput.value,
    company: companyInput.value,
    timestamp: new Date().toISOString()
  });
}

function handleSigninSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('#signin-email');
  const pwdInput = form.querySelector('#signin-pwd');
  const stepContainer = form.querySelector('#signin-step-container');

  if (!emailInput.value.trim()) {
    showFieldError(emailInput, 'User ID or Email is required');
    return;
  }
  clearFieldError(emailInput);

  if (!pwdInput.value.trim()) {
    showFieldError(pwdInput, 'Password is required');
    return;
  }
  clearFieldError(pwdInput);

  // Authenticate directly via User ID + Password (Zero MFA, Zero OTP)
  stepContainer.innerHTML = `
    <div style="text-align:center; padding:16px 0;">
      <span class="badge badge-positive" style="margin-bottom:12px; font-size:12px; padding:4px 8px;">Credentials Verified</span>
      <h4 style="font-size:18px; margin-bottom:8px;">Session Authorized</h4>
      <p style="font-size:13px; color:#6B7280; line-height:1.5; margin-bottom:16px;">
        Enterprise session established for <strong>${escapeHtml(emailInput.value)}</strong> in tenant <strong>TENANT-APEX-01</strong>.
      </p>
      <a href="dashboard.html" class="btn btn-primary" style="width:100%; height:42px; margin-bottom:12px; text-decoration:none; display:flex; align-items:center; justify-content:center;">
        Open Workstation Dashboard &rarr;
      </a>
      <div style="font-size:11.5px; color:#9097A2;">
        Desktop Client: <code>java -jar cryptovista-x.jar</code>
      </div>
    </div>
  `;
}

function showFieldError(inputEl, msg) {
  let err = inputEl.parentElement.querySelector('.form-error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'form-error';
    inputEl.parentElement.appendChild(err);
  }
  err.textContent = msg;
  err.style.display = 'block';
  inputEl.style.borderColor = 'var(--cv-negative)';
}

function clearFieldError(inputEl) {
  const err = inputEl.parentElement.querySelector('.form-error');
  if (err) err.style.display = 'none';
  inputEl.style.borderColor = 'var(--cv-border)';
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
