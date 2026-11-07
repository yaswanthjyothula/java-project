/**
 * CryptoVista X Enterprise - Module 9: Customer Operations & Support (Pages 63 – 78)
 * Real-time SLA Countdowns, Ticket Details, Confidential Internal Notes (SUP-004), and Customer Success
 */

import { renderBreadcrumbs, renderPageHeader, renderStatusBadge } from '../components/designSystem.js';
import { fetchTickets } from '../api.js';
import { store } from '../state.js';

let localTickets = null;

export async function renderSupportPage(subRoute = 'tickets', paramId = null) {
  const state = store.getState();
  if (!localTickets) {
    localTickets = await fetchTickets();
    if (localTickets.length === 2) {
      localTickets.push(
        { id: 'TCK-003', ticketNumber: 'TCK-1096', customerId: 'CUST-003', subject: 'Wealth desk onboarding API key provisioning', priority: 'MEDIUM', status: 'RESOLVED', slaMinutesRemaining: 0, internalNotes: 'Provisioned scoped read-only keys for wealth dashboard.' },
        { id: 'TCK-004', ticketNumber: 'TCK-1097', customerId: 'CUST-001', subject: 'Whitelisted corporate IP range subnet update (/28)', priority: 'CRITICAL', status: 'OPEN', slaMinutesRemaining: 142, internalNotes: 'Restricted note: Verified RFC 1918 CIDR block with network admin.' }
      );
    }
  }

  // Page 70: Ticket Details View
  if (subRoute === 'details' && paramId) {
    const ticket = localTickets.find(t => t.id === paramId || t.ticketNumber === paramId) || localTickets[0] || {
      id: paramId, ticketNumber: 'TCK-1094', customerId: 'CUST-001', subject: 'Simulated matching engine latency benchmark on ETH limit orders', priority: 'HIGH', status: 'IN_PROGRESS', slaMinutesRemaining: 180, internalNotes: 'Internal triage ongoing.'
    };

    return `
      <div>
        ${renderPageHeader(
          `Incident ${ticket.ticketNumber || ticket.id} — Details & SLA`,
          `Priority incident triage with strictly segregated confidential operations notes`,
          [
            { label: 'Customer Operations', href: '#/app/customer-operations/support' },
            { label: 'Tickets', href: '#/app/customer-operations/support/tickets' },
            { label: ticket.ticketNumber || ticket.id }
          ],
          [
            { label: 'Customer 360 &rarr;', variant: 'btn-outline', onclick: `location.hash='#/app/crm/customers/${ticket.customerId || 'CUST-001'}';` },
            { label: ticket.status === 'RESOLVED' ? 'Resolved' : 'Mark Resolved', variant: 'btn-primary', onclick: `resolveTicketAction('${ticket.id}')` }
          ]
        )}

        <div class="kpi-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">CRITICALITY LEVEL</div>
            <div class="kpi-value" style="font-size:18px;">${renderStatusBadge(ticket.priority)}</div>
            <div class="kpi-delta">Contracted SLA Response</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">INCIDENT STATUS</div>
            <div class="kpi-value" style="font-size:18px;">${renderStatusBadge(ticket.status)}</div>
            <div class="kpi-delta">Active Queue</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">SLA COUNTDOWN</div>
            <div class="kpi-value" style="font-family:monospace; font-size:18px; color:${ticket.slaMinutesRemaining > 0 ? 'var(--cv-brand-green)' : 'var(--cv-text-muted)'};">
              ${ticket.status === 'RESOLVED' ? 'Compliant' : `${ticket.slaMinutesRemaining || 180} mins`}
            </div>
            <div class="kpi-delta">Within 4h P1 Window</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">ASSIGNED CLIENT</div>
            <div class="kpi-value" style="font-size:16px;">
              <a href="#/app/crm/customers/${ticket.customerId || 'CUST-001'}" style="color:var(--cv-brand-green); text-decoration:none;">
                ${ticket.customerId || 'CUST-001'} &rarr;
              </a>
            </div>
            <div class="kpi-delta">Bharat Digital Custody</div>
          </div>
        </div>

        <div class="panel" style="margin-bottom:20px;">
          <div class="panel-header">
            <span class="panel-title">Incident Summary & Client Communications</span>
            <span class="badge badge-neutral">EXTERNAL TICKET VIEW</span>
          </div>
          <div style="font-size:13.5px; font-weight:600; color:var(--cv-text-primary); margin-bottom:8px;">
            ${ticket.subject}
          </div>
          <p style="font-size:13px; line-height:1.6; color:var(--cv-text-secondary);">
            The institutional trading desk reported latency during simulated batch limit order fills during high market volatility. Algorithmic matching core logs are under investigation.
          </p>
        </div>

        <!-- Strict Information Segregation Panel (SUP-004) -->
        <div class="panel" style="border-left:4px solid #868E96; background:#F8F9FA;">
          <div class="panel-header">
            <span class="panel-title" style="color:#212529;">Confidential Internal Operations Note (SUP-004)</span>
            <span class="badge badge-neutral" style="background:#E9ECEF; color:#495057;">PHYSICALLY SEGREGATED</span>
          </div>
          <div style="font-size:12.5px; line-height:1.6; color:#495057; font-family:monospace; background:#FFFFFF; padding:12px; border:1px solid #CED4DA; border-radius:3px;">
            [CONFIDENTIAL - OPERATORS ONLY]: ${ticket.internalNotes || 'Internal triage initiated. Root cause pinned to synthetic provider polling jitter.'}
          </div>
          <div style="margin-top:10px; font-size:11px; color:#6C757D;">
            Notice: In compliance with specification SUP-004, this internal operations note is strictly restricted to authenticated operators and is never broadcast to external customer channels.
          </div>
        </div>

        <div style="margin-top:20px; display:flex; gap:12px;">
          <a href="#/app/customer-operations/support/tickets" class="btn btn-outline" style="font-size:12px;">&larr; Back to Ticket Queue</a>
          <a href="#/app/customer-operations/support/sla" class="btn btn-outline" style="font-size:12px;">View SLA Policies &rarr;</a>
          <a href="#/app/crm/customers/${ticket.customerId || 'CUST-001'}" class="btn btn-primary" style="font-size:12px;">Open Customer 360 &rarr;</a>
        </div>
      </div>
    `;
  }

  // Page 72: SLA Policies View
  if (subRoute === 'sla') {
    return `
      <div>
        ${renderPageHeader(
          'Service Level Agreement (SLA) Matrix',
          'Contractual incident response and resolution timelines by priority tier',
          [
            { label: 'Customer Operations', href: '#/app/customer-operations/support' },
            { label: 'SLA Policies' }
          ],
          [
            { label: 'Active Queue &rarr;', variant: 'btn-primary', onclick: `location.hash='#/app/customer-operations/support/tickets';` }
          ]
        )}

        <div class="panel">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Priority Tier</th>
                  <th>First Response Target</th>
                  <th>Resolution Target</th>
                  <th>Escalation Path</th>
                  <th>Current Adherence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge badge-negative">CRITICAL / P1</span></td>
                  <td>&lt; 15 mins</td>
                  <td>4 Hours</td>
                  <td>VP Operations & CTO</td>
                  <td><strong style="color:var(--cv-brand-green);">100.0%</strong></td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">HIGH / P2</span></td>
                  <td>&lt; 30 mins</td>
                  <td>8 Hours</td>
                  <td>Desk Lead</td>
                  <td><strong style="color:var(--cv-brand-green);">99.2%</strong></td>
                </tr>
                <tr>
                  <td><span class="badge badge-info">MEDIUM / P3</span></td>
                  <td>&lt; 2 Hours</td>
                  <td>24 Hours</td>
                  <td>Support Specialist</td>
                  <td><strong style="color:var(--cv-brand-green);">99.6%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Page 67 & 68: Support Dashboard & Ticket Queue
  const openCount = localTickets.filter(t => t.status !== 'RESOLVED').length;
  const criticalCount = localTickets.filter(t => t.priority === 'CRITICAL' && t.status !== 'RESOLVED').length;

  return `
    <div>
      ${renderPageHeader(
        'Enterprise Support & SLA Triage',
        'Real-time incident management with strict internal notes segregation (SUP-004)',
        [
          { label: 'Customer Operations' },
          { label: 'Support Queue' }
        ],
        [
          { label: 'SLA Policies', variant: 'btn-outline', onclick: `location.hash='#/app/customer-operations/support/sla';` },
          { label: '+ Raise Support Incident', variant: 'btn-primary', id: 'btn-raise-ticket' }
        ]
      )}

      <!-- SLA Statistics -->
      <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom:20px;">
        <div class="kpi-card">
          <div class="kpi-label">OPEN INCIDENTS</div>
          <div class="kpi-value">${openCount}</div>
          <div class="kpi-delta">${localTickets.length} Total Incidents</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">CRITICAL / P1</div>
          <div class="kpi-value" style="color:${criticalCount > 0 ? 'var(--cv-negative)' : 'var(--cv-text-primary)'};">${criticalCount}</div>
          <div class="kpi-delta ${criticalCount > 0 ? 'kpi-delta-down' : ''}">4h Response SLA</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">SLA COMPLIANCE</div>
          <div class="kpi-value" style="color:var(--cv-brand-green);">99.4%</div>
          <div class="kpi-delta kpi-delta-up">Exceeding 98.5% Target</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">MEAN TIME TO RESOLVE</div>
          <div class="kpi-value">2h 14m</div>
          <div class="kpi-delta kpi-delta-up">-18% vs Baseline</div>
        </div>
      </div>

      <!-- Ticket Queue Table -->
      <div class="panel">
        <div class="panel-header">
          <span class="panel-title">Active Service Incident Queue</span>
          <span class="badge badge-neutral">Security Segregation Active</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Issue Summary</th>
                <th>Priority</th>
                <th>Status</th>
                <th>SLA Countdown</th>
                <th>Confidential Note (SUP-004)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${localTickets.map(t => `
                <tr>
                  <td style="font-family:monospace; font-weight:600;">
                    <a href="#/app/customer-operations/support/tickets/${t.id}" style="color:var(--cv-brand-green); text-decoration:none;">
                      ${t.ticketNumber || t.id}
                    </a>
                  </td>
                  <td>
                    <a href="#/app/crm/customers/${t.customerId || 'CUST-001'}" style="font-family:monospace; font-size:12px; color:var(--cv-text-primary);">
                      ${t.customerId || 'CUST-001'} &rarr;
                    </a>
                  </td>
                  <td>
                    <a href="#/app/customer-operations/support/tickets/${t.id}" style="font-weight:600; color:var(--cv-text-primary); text-decoration:none;">
                      ${t.subject}
                    </a>
                  </td>
                  <td>${renderStatusBadge(t.priority)}</td>
                  <td>${renderStatusBadge(t.status)}</td>
                  <td>
                    <div style="font-family:monospace; font-size:12px; font-weight:600; color:${t.status === 'RESOLVED' ? 'var(--cv-text-muted)' : 'var(--cv-brand-green)'};">
                      ${t.status === 'RESOLVED' ? 'Compliant' : `${t.slaMinutesRemaining || 240} mins remaining`}
                    </div>
                  </td>
                  <td>
                    <div style="font-size:11px; background:#F1F3F5; padding:4px 8px; border-radius:3px; border-left:2px solid #868E96; color:#495057; max-width:240px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                      [CONFIDENTIAL]: ${t.internalNotes || 'Internal triage in progress.'}
                    </div>
                  </td>
                  <td>
                    <a href="#/app/customer-operations/support/tickets/${t.id}" class="btn btn-outline" style="padding:4px 8px; font-size:11px;">Details &rarr;</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

window.resolveTicketAction = (id) => {
  if (localTickets) {
    const t = localTickets.find(ticket => ticket.id === id || ticket.ticketNumber === id);
    if (t) {
      t.status = 'RESOLVED';
      t.slaMinutesRemaining = 0;
      alert(`Incident ${t.ticketNumber || t.id} has been resolved in compliance with enterprise SLA.`);
      window.dispatchEvent(new Event('hashchange'));
    }
  }
};

export function initSupportListeners() {
  const btnRaise = document.getElementById('btn-raise-ticket');
  if (btnRaise) {
    btnRaise.onclick = () => {
      const subject = prompt('Enter Incident Summary:');
      if (!subject) return;
      const priority = prompt('Priority (CRITICAL, HIGH, MEDIUM, LOW):', 'HIGH') || 'HIGH';
      const internalNote = prompt('Internal Operations Note (Confidential):', 'Internal review initiated.') || 'Confidential note.';

      const newTicket = {
        id: 'TCK-00' + (localTickets.length + 1),
        ticketNumber: 'TCK-10' + (90 + localTickets.length + 1),
        customerId: 'CUST-001',
        subject,
        priority: priority.toUpperCase(),
        status: 'OPEN',
        slaMinutesRemaining: priority.toUpperCase() === 'CRITICAL' ? 240 : 480,
        internalNotes: internalNote
      };
      localTickets.unshift(newTicket);
      window.dispatchEvent(new Event('hashchange'));
    };
  }
}
