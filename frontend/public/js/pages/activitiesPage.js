/**
 * CryptoVista X Enterprise - Module 8: Activities and Tasks (Pages 57 – 62)
 * Client engagements, operations calendar, action tasks, and confidential notes
 */

import { store } from '../state.js';

let localActivities = [
  { id: 'ACT-301', type: 'MEETING', subject: 'Q4 Simulated Trading Portfolio Review', entity: 'Bharat Digital Custody', dueDate: '2026-11-08 14:00', status: 'SCHEDULED', owner: 'Anand Verma' },
  { id: 'ACT-302', type: 'TASK', subject: 'Verify Tier-1 API Subnet Whitelist (/28)', entity: 'Deccan Algorithmic Fund', dueDate: '2026-11-07 17:00', status: 'COMPLETED', owner: 'Neha Sharma' },
  { id: 'ACT-303', type: 'CALL', subject: 'Annual Retainer Fee Negotiation', entity: 'Zenith Family Office Advisors', dueDate: '2026-11-09 11:30', status: 'SCHEDULED', owner: 'Vikram Malhotra' },
  { id: 'ACT-304', type: 'NOTE', subject: 'Confidential Risk Evaluation on ETH Exposure', entity: 'Equitas Treasury Advisory', dueDate: '2026-11-06 10:15', status: 'LOGGED', owner: 'Operator' }
];

export function renderActivitiesPage(subRoute = 'list') {
  const pendingCount = localActivities.filter(a => a.status === 'SCHEDULED').length;

  return `
    <div class="content-header">
      <div>
        <h1 class="page-title">Operations Activities & Task Management</h1>
        <p class="page-subtitle">Client meetings, scheduled tasks, operational follow-ups, and confidential notes.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-primary" id="btn-create-activity">+ Schedule Activity</button>
      </div>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
      <div class="kpi-card">
        <div class="kpi-label">TOTAL ACTIVITIES</div>
        <div class="kpi-value">${localActivities.length}</div>
        <div class="kpi-delta">Tenant: ${store.getState().tenantId}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">UPCOMING / PENDING</div>
        <div class="kpi-value" style="color:#F59E0B;">${pendingCount}</div>
        <div class="kpi-delta">Action Required Today</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">COMPLETED THIS WEEK</div>
        <div class="kpi-value">${localActivities.filter(a => a.status === 'COMPLETED').length}</div>
        <div class="kpi-delta kpi-delta-up">On Schedule</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">CONFIDENTIAL NOTES</div>
        <div class="kpi-value">12</div>
        <div class="kpi-delta">Encrypted & Masked</div>
      </div>
    </div>

    <!-- Sub-navigation tabs -->
    <div style="display:flex; gap:16px; border-bottom:1px solid var(--cv-border); margin-bottom:20px; font-size:13px; font-weight:600;">
      <a href="#/app/activities/list" class="tab-link ${subRoute === 'list' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'list' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'list' ? '2px solid var(--cv-brand-green)' : 'none'};">Activity List</a>
      <a href="#/app/activities/calendar" class="tab-link ${subRoute === 'calendar' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'calendar' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'calendar' ? '2px solid var(--cv-brand-green)' : 'none'};">Calendar View</a>
      <a href="#/app/activities/tasks" class="tab-link ${subRoute === 'tasks' ? 'active-tab' : ''}" style="padding:8px 12px; text-decoration:none; color:${subRoute === 'tasks' ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'}; border-bottom:${subRoute === 'tasks' ? '2px solid var(--cv-brand-green)' : 'none'};">Task Checklist</a>
    </div>

    ${subRoute === 'calendar' ? `
      <!-- Calendar View -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Institutional Engagement Calendar &bull; November 2026</span>
          <span class="badge badge-neutral">IST (UTC+5:30)</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:8px; text-align:center; font-size:12px; font-weight:700; color:var(--cv-text-muted); margin-bottom:12px;">
          <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:8px;">
          ${Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            const hasActivity = day === 7 || day === 8 || day === 9;
            return `
              <div style="background:${day === 7 ? 'var(--cv-soft-green)' : '#FFFFFF'}; border:1px solid var(--cv-border); border-radius:3px; padding:10px; min-height:72px; text-align:left;">
                <div style="font-weight:700; font-size:12px; color:${day === 7 ? 'var(--cv-brand-green)' : 'var(--cv-text-secondary)'};">${day}</div>
                ${hasActivity ? `
                  <div style="font-size:10px; font-weight:600; background:var(--cv-bg-page); border:1px solid var(--cv-border); border-radius:2px; padding:2px 4px; margin-top:4px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                    ${day === 7 ? 'API Subnet Check' : day === 8 ? 'Q4 Portfolio Review' : 'Retainer Call'}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : `
      <!-- Activity Roster View -->
      <div class="panel">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Activity Summary</th>
                <th>Related Entity</th>
                <th>Scheduled Due Time</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${localActivities.map(a => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">${a.id}</td>
                  <td><span class="badge badge-neutral">${a.type}</span></td>
                  <td><strong>${a.subject}</strong></td>
                  <td style="color:var(--cv-text-secondary);">${a.entity}</td>
                  <td style="font-family:monospace; font-size:12px;">${a.dueDate}</td>
                  <td>
                    <span class="badge ${a.status === 'COMPLETED' ? 'badge-positive' : 'badge-neutral'}">
                      ${a.status}
                    </span>
                  </td>
                  <td style="font-size:12px;">${a.owner}</td>
                  <td>
                    ${a.status !== 'COMPLETED' ? `
                      <button class="btn btn-outline btn-complete-act" data-id="${a.id}" style="padding:4px 8px; font-size:11px;">Complete</button>
                    ` : `
                      <span style="font-size:11px; color:var(--cv-text-muted);">Done</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}

export function initActivitiesListeners() {
  const btnCreate = document.getElementById('btn-create-activity');
  if (btnCreate) {
    btnCreate.onclick = () => {
      const subject = prompt('Enter Activity / Task Summary:');
      if (!subject) return;
      const type = prompt('Type (MEETING, TASK, CALL, NOTE):', 'MEETING') || 'MEETING';
      const entity = prompt('Related Client Entity:', 'Bharat Digital Custody') || 'General';

      localActivities.unshift({
        id: 'ACT-' + (localActivities.length + 301),
        type: type.toUpperCase(),
        subject,
        entity,
        dueDate: new Date(Date.now() + 86400000).toISOString().replace('T', ' ').substring(0, 16),
        status: 'SCHEDULED',
        owner: store.getState().currentUser.fullName
      });
      window.dispatchEvent(new Event('hashchange'));
    };
  }

  document.querySelectorAll('.btn-complete-act').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.target.getAttribute('data-id');
      const act = localActivities.find(a => a.id === id);
      if (act) {
        act.status = 'COMPLETED';
        alert(`Activity ${act.id} marked as completed.`);
        window.dispatchEvent(new Event('hashchange'));
      }
    };
  });
}

