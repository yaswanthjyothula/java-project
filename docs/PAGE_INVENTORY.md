# CryptoVista X Enterprise — Complete Page Inventory (130 Pages)

This document establishes the exhaustive traceability matrix for all 130 pages across the Public Website and the 15 Authenticated Enterprise Modules, following the Groww-inspired design system (`#00B386` primary, clean visual calm, rectangular geometry, zero emojis, zero purple gradients) and Node.js web architecture.

---

## PART A: PUBLIC WEBSITE (Pages 1 – 13)

| # | Page Name | Route | Module / Section | Status | Description |
|---|-----------|-------|------------------|--------|-------------|
| 1 | Home / Landing Page | `/` or `#/landing` | Public Showcase | Verified | Institutional hero, metrics ribbon, market ticker, module showcase, compliance disclosures |
| 2 | About Us | `#/about` | Public Company | Verified | Company introduction, mission, vision, platform capabilities, executive governance |
| 3 | Product Overview | `#/product` | Public Product | Verified | Comprehensive explanation of Market Intelligence, Simulated Trading, CRM & Analytics |
| 4 | Features Catalogue | `#/features` | Public Product | Verified | Detailed modular matrix of platform capabilities with interactive module filter |
| 5 | Security & Architecture | `#/security` | Public Trust | Verified | Single-step auth policy, tenant isolation, zero-secret exposure, ISO-27001 auditability |
| 6 | Contact Us | `#/contact` | Public Inbound | Verified | Working contact form with server-side validation and persistence |
| 7 | Request Demo | `#/request-demo` | Public Sales | Verified | Lead qualification form saving institutional demo requests to backend store |
| 8 | Searchable FAQ | `#/faq` | Public Support | Verified | Categorized, searchable accordions for institutional, trading and security FAQs |
| 9 | Privacy Policy | `#/privacy` | Public Legal | Verified | GDPR/DPDP-compliant privacy declarations and cryptographic data handling standards |
| 10 | Terms & Conditions | `#/terms` | Public Legal | Verified | Software license agreement and non-custodial simulation regulatory terms |
| 11 | Login Workstation | `#/login` | Public Auth | Verified | Single-step User ID & Password authentication (Strictly ZERO MFA / ZERO OTP) |
| 12 | Forgot Password | `#/forgot-password` | Public Auth | Verified | Corporate password reset token generation and administrative recovery |
| 13 | Reset Password | `#/reset-password` | Public Auth | Verified | Password update gateway with strength policy enforcement |

---

## PART B: AUTHENTICATED APPLICATION (Pages 14 – 130)

### Module 1: Overview & Universal Workstation (Pages 14 – 16)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 14 | Enterprise Dashboard | `#/app/dashboard` | Verified | Consolidated NAV, CRM funnel, SLA queue, market snapshot, recent activity |
| 15 | Notifications Center | `#/app/notifications` | Verified | Real-time system alerts, unread counts, priority categories, mark as read |
| 16 | Global Search | `#/app/search` | Verified | Multi-entity cross-module indexed search across customers, leads, tickets and orders |

### Module 2: Market Intelligence (Pages 17 – 21)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 17 | Market Overview | `#/app/markets` | Verified | Market benchmark ticker, 24h gainers/losers, volume, data freshness indicators |
| 18 | Asset Explorer | `#/app/markets/assets` | Verified | Multi-asset directory with search, sorting, market cap and volume filters |
| 19 | Asset Details | `#/app/markets/assets/:id` | Verified | Detailed asset telemetry, historical price series, buy/sell shortcut |
| 20 | Watchlists | `#/app/markets/watchlists` | Verified | Custom institutional watchlists, asset tracking and alert triggers |
| 21 | Market Movers | `#/app/markets/movers` | Verified | Dedicated high-volatility, top gainers, top losers and volume leaders |

### Module 3: Simulated Trading (Pages 22 – 27)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 22 | Trading Terminal | `#/app/trading` | Verified | Order entry ticket (Market/Limit), slippage model (0.02%), fees (0.10%), order preview |
| 23 | Orders Management | `#/app/trading/orders` | Verified | Open, filled, cancelled, rejected simulated orders with cancellation action |
| 24 | Order Details | `#/app/trading/orders/:id` | Verified | Granular fill history, lifecycle timestamps, execution fees and audit log |
| 25 | Trade History | `#/app/trading/history` | Verified | Chronological trade fill ledger with CSV export and asset filters |
| 26 | Trading Accounts | `#/app/trading/accounts` | Verified | Multi-currency virtual accounts, available cash balances, risk modes |
| 27 | Trading Account Details | `#/app/trading/accounts/:id` | Verified | Sub-account ledger movements, holdings snapshot, realized P&L |

### Module 4: Portfolio Management (Pages 28 – 33)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 28 | Portfolio Overview | `#/app/portfolio` | Verified | Total NAV, asset allocation bar, invested cost basis, unrealized/realized P&L |
| 29 | Asset Holdings | `#/app/portfolio/holdings` | Verified | Position sizes, acquisition cost, market value, return percentage |
| 30 | Holding Details | `#/app/portfolio/holdings/:id` | Verified | Lot-by-lot FIFO cost basis, historical performance, related trades |
| 31 | Portfolio Performance | `#/app/portfolio/performance` | Verified | Daily/monthly return charts, benchmark comparison, volatility metrics |
| 32 | Transaction Ledger | `#/app/portfolio/ledger` | Verified | Double-entry journal vouchers, credits, debits, cash balances |
| 33 | Portfolio Reports | `#/app/portfolio/reports` | Verified | Institutional valuation statements, capital gains statements, CSV export |

### Module 5: CRM Dashboard and Customers (Pages 34 – 41)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 34 | CRM Dashboard | `#/app/crm` | Verified | Customer totals, new acquisitions, pipeline ARR, health scores, SLA pulse |
| 35 | Customer Directory | `#/app/crm/customers` | Verified | Multi-tenant customer list with risk classification, search, lifecycle filters |
| 36 | Create Customer | `#/app/crm/customers/new` | Verified | Customer onboarding form with validation, tier selection and RM assignment |
| 37 | Customer 360 Profile | `#/app/crm/customers/:id` | Verified | 15-tab profile: Overview, Accounts, Contacts, Leads, Opportunities, Activities, Support, etc. |
| 38 | Client Accounts | `#/app/crm/accounts` | Verified | Institutional corporate entity accounts, legal entity identifiers, balances |
| 39 | Account Details | `#/app/crm/accounts/:id` | Verified | Multi-entity mapping, credit lines, fee schedules, assigned contacts |
| 40 | Contact Roster | `#/app/crm/contacts` | Verified | Key stakeholder directory, executive sponsors, finance ops personnel |
| 41 | Contact Details | `#/app/crm/contacts/:id` | Verified | Direct communication channels, activity history, associated accounts |

### Module 6: Lead Management (Pages 42 – 48)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 42 | Lead Dashboard | `#/app/crm/leads` | Verified | Lead velocity, conversion ratios, stage funnel distribution |
| 43 | Lead List | `#/app/crm/leads/list` | Verified | Inbound lead table with proprietary scoring (BANT), status filter |
| 44 | Create Lead | `#/app/crm/leads/new` | Verified | Lead capture form with source attribution and expected contract value |
| 45 | Lead Details | `#/app/crm/leads/:id` | Verified | Lead score breakdown, timeline, notes, one-click conversion to Customer |
| 46 | Lead Assignment | `#/app/crm/leads/assignment` | Verified | Rule-based lead routing matrix, round-robin rep distribution |
| 47 | Lead Sources | `#/app/crm/leads/sources` | Verified | Channel performance analytics (Organic, Partner, Institutional Referral) |
| 48 | Lead Reports | `#/app/crm/leads/reports` | Verified | Funnel drop-off analytics, time-to-conversion metrics |

### Module 7: Sales and Opportunities (Pages 49 – 56)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 49 | Sales Dashboard | `#/app/crm/sales` | Verified | Deal ARR, quota attainment, pipeline weighted forecast |
| 50 | Sales Pipeline Kanban | `#/app/crm/opportunities/pipeline` | Verified | Drag-and-drop opportunity board (Prospecting, Qualification, Proposal, Won, Lost) |
| 51 | Opportunity List | `#/app/crm/opportunities` | Verified | Opportunity roster with deal values, close dates, probability |
| 52 | Create Opportunity | `#/app/crm/opportunities/new` | Verified | Opportunity creation form linked to Customer/Account and software license tier |
| 53 | Opportunity Details | `#/app/crm/opportunities/:id` | Verified | Stage progression history, competitor analysis, pricing discount terms |
| 54 | Pipeline Stages | `#/app/crm/opportunities/stages` | Verified | Stage governance policies, mandatory gate criteria, win probabilities |
| 55 | Sales Forecast | `#/app/crm/sales/forecast` | Verified | Q3/Q4 institutional ARR projection by representative and territory |
| 56 | Sales Reports | `#/app/crm/sales/reports` | Verified | Win/loss ratio analysis, sales cycle duration, executive summary |

### Module 8: Activities and Tasks (Pages 57 – 62)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 57 | Activity Dashboard | `#/app/activities` | Verified | Daily scheduled engagements, pending tasks, overdue reminders |
| 58 | Activity List | `#/app/activities/list` | Verified | Consolidated calls, meetings, client notes with status updates |
| 59 | Operations Calendar | `#/app/activities/calendar` | Verified | Monthly/weekly schedule view for client reviews and renewals |
| 60 | Task Management | `#/app/activities/tasks` | Verified | Action items with priority tags, due dates, assignee completion toggles |
| 61 | Reminders Queue | `#/app/activities/reminders` | Verified | Time-sensitive compliance and SLA follow-up triggers |
| 62 | Confidential Notes | `#/app/activities/notes` | Verified | Internal client notes repository with secret redaction and segregation |

### Module 9: Customer Operations (Pages 63 – 78)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 63 | Onboarding Dashboard | `#/app/customer-operations/onboarding` | Verified | Active onboarding cases, checklist completion velocity, milestone tracker |
| 64 | Onboarding Cases | `#/app/customer-operations/onboarding/cases` | Verified | New client setups, stage tracking (KYC, API Provisioning, UAT) |
| 65 | Onboarding Details | `#/app/customer-operations/onboarding/:id` | Verified | Case checklist items, document upload status, assigned technical lead |
| 66 | Onboarding Checklists | `#/app/customer-operations/onboarding/checklists` | Verified | Institutional checklist templates with mandatory sign-off gates |
| 67 | Support Dashboard | `#/app/customer-operations/support` | Verified | SLA compliance (99.4%), P1/Critical incidents, mean time to resolve (MTTR) |
| 68 | Ticket List | `#/app/customer-operations/support/tickets` | Verified | Support incident queue with priority badges and real-time SLA countdowns |
| 69 | Create Ticket | `#/app/customer-operations/support/tickets/new` | Verified | Incident ticket creation with priority assignment and internal notes |
| 70 | Ticket Details | `#/app/customer-operations/support/tickets/:id` | Verified | Triage thread with strictly segregated confidential internal notes (SUP-004) |
| 71 | Ticket Queues | `#/app/customer-operations/support/queues` | Verified | Departmental routing queues (Trading Ops, Tier-2 Tech, Compliance) |
| 72 | SLA Policies | `#/app/customer-operations/support/sla` | Verified | SLA policy matrix (Critical 4h, High 8h, Medium 24h, Low 48h) |
| 73 | Complaints Register | `#/app/customer-operations/complaints` | Verified | Formal customer complaints log with escalation timelines |
| 74 | Complaint Details | `#/app/customer-operations/complaints/:id` | Verified | Root cause analysis, corrective action plan, executive sign-off |
| 75 | Customer Success Dashboard | `#/app/customer-operations/customer-success` | Verified | Overall portfolio health score, churn risk radar, expansion pipeline |
| 76 | Success Plans | `#/app/customer-operations/customer-success/plans` | Verified | Strategic account growth roadmaps and feature adoption milestones |
| 77 | Customer Health Radar | `#/app/customer-operations/customer-success/health` | Verified | Automated health score calculation (Usage, Support sentiment, Payment) |
| 78 | Renewals Management | `#/app/customer-operations/customer-success/renewals` | Verified | Contract expiration countdowns, 90-day renewal pipeline, upsell tracking |

### Module 10: Campaigns and Communications (Pages 79 – 84)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 79 | Campaign Dashboard | `#/app/communications/campaigns` | Verified | Outreach campaigns, open rates, CTR, conversion attribution |
| 80 | Campaign List | `#/app/communications/campaigns/list` | Verified | Marketing and product announcement campaigns with target segments |
| 81 | Create Campaign | `#/app/communications/campaigns/new` | Verified | Campaign builder with audience criteria and consent management |
| 82 | Campaign Details | `#/app/communications/campaigns/:id` | Verified | Delivery analytics, recipient engagement history, test delivery toggle |
| 83 | Communication History | `#/app/communications/history` | Verified | Comprehensive outbound message audit trail across email and in-app notices |
| 84 | Communication Templates | `#/app/communications/templates` | Verified | Reusable institutional messaging templates with placeholder variables |

### Module 11: Enterprise Management (Pages 85 – 97)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 85 | Employee Dashboard | `#/app/enterprise/employees` | Verified | Staff directory, departmental distribution, headcount overview |
| 86 | Employee List | `#/app/enterprise/employees/list` | Verified | Staff roster with roles, department, contact info and status |
| 87 | Employee Details | `#/app/enterprise/employees/:id` | Verified | Employee profile, assigned accounts, permissions and activity history |
| 88 | Teams Directory | `#/app/enterprise/teams` | Verified | Functional teams (Treasury, Trading Ops, Enterprise Sales, Support) |
| 89 | Departments | `#/app/enterprise/departments` | Verified | Corporate division hierarchy and budget allocations |
| 90 | Vendors Management | `#/app/enterprise/vendors` | Verified | Third-party vendor directory, SLA agreements, security ratings |
| 91 | Vendor Details | `#/app/enterprise/vendors/:id` | Verified | Vendor contracts, compliance certificates, key account managers |
| 92 | Subscriptions Management | `#/app/enterprise/subscriptions` | Verified | Customer software licensing subscriptions, billing tiers, ARR |
| 93 | Subscription Details | `#/app/enterprise/subscriptions/:id` | Verified | License parameters, seats, renewal dates, invoice history |
| 94 | Invoices Ledger | `#/app/enterprise/invoices` | Verified | Invoices register with payment statuses (Paid, Overdue, Draft) |
| 95 | Invoice Details | `#/app/enterprise/invoices/:id` | Verified | Itemized software and support billing statement with tax calculation |
| 96 | Document Repository | `#/app/enterprise/documents` | Verified | Enterprise document management with metadata tagging and access control |
| 97 | Document Details | `#/app/enterprise/documents/:id` | Verified | Document preview, version history, audit access events |

### Module 12: Workflow and Approvals (Pages 98 – 103)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 98 | Workflow Dashboard | `#/app/workflows` | Verified | Active workflow runs, pending approvals count, policy violations |
| 99 | Workflow Definitions | `#/app/workflows/list` | Verified | Registered automated business rules and triggers |
| 100 | Workflow Builder | `#/app/workflows/builder` | Verified | Trigger-condition-action workflow configuration interface |
| 101 | Workflow Details | `#/app/workflows/:id` | Verified | Execution history, step timings, failure/retry logs |
| 102 | Approval Inbox | `#/app/approvals` | Verified | Dual-authorization requests (Commercial discounts >15%, Trading limits) |
| 103 | Approval Details | `#/app/approvals/:id` | Verified | Four-eyes authorization decision form with digital signature audit |

### Module 13: Analytics and Reporting (Pages 104 – 112)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 104 | Analytics Dashboard | `#/app/analytics` | Verified | High-level platform KPIs, gross revenue, active traders, SLA index |
| 105 | Business Performance Reports | `#/app/analytics/business` | Verified | Quarterly executive summaries, revenue trends, customer lifetime value |
| 106 | CRM Reports | `#/app/analytics/crm` | Verified | Lead conversion ratios, customer retention cohorts, health metrics |
| 107 | Sales Reports | `#/app/analytics/sales` | Verified | Rep performance, deal cycle velocity, pipeline stage conversions |
| 108 | Support Reports | `#/app/analytics/support` | Verified | SLA compliance trends, ticket volume by category, first-response time |
| 109 | Trading Analytics | `#/app/analytics/trading` | Verified | Volume distribution by digital asset, order fill ratios, simulated fees |
| 110 | Portfolio Analytics | `#/app/analytics/portfolio` | Verified | Aggregated NAV trends, risk concentration metrics, unrealized gains |
| 111 | Employee Performance | `#/app/analytics/employees` | Verified | Activity completion, ticket resolution volume, sales quota attainment |
| 112 | Report Exports | `#/app/analytics/exports` | Verified | Automated CSV/PDF export generation for compliance audits |

### Module 14: Administration & Security (Pages 113 – 125)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 113 | Administration Dashboard | `#/app/admin` | Verified | Security posture, active sessions, tenant count, error rates |
| 114 | User Management | `#/app/admin/users` | Verified | User roster, account statuses (Active, Locked), tenant assignments |
| 115 | User Details | `#/app/admin/users/:id` | Verified | User credential status, assigned roles, permissions overview |
| 116 | Roles Matrix | `#/app/admin/roles` | Verified | Enterprise roles (`ADMIN`, `OPERATOR`, `MANAGER`, `ANALYST`) |
| 117 | Permissions Directory | `#/app/admin/permissions` | Verified | Granular permission registry (e.g. `NOTE_INTERNAL`, `LEAD_CONVERT`) |
| 118 | Tenant Directory | `#/app/admin/tenants` | Verified | Multi-tenant organization list with data isolation boundaries |
| 119 | Tenant Details | `#/app/admin/tenants/:id` | Verified | Tenant settings, user memberships, quota limits, domain mapping |
| 120 | Tenant Settings | `#/app/admin/settings` | Verified | Enterprise feature flags, currency default (`INR`), branding options |
| 121 | Login History | `#/app/admin/login-history` | Verified | Forensic authentication attempts log (IP address, User ID, Result) |
| 122 | Session Management | `#/app/admin/sessions` | Verified | Active session tokens, expiry times, one-click remote revocation |
| 123 | Audit Logs | `#/app/admin/audit-logs` | Verified | Immutable audit trail with automated secret redaction |
| 124 | Security Events | `#/app/admin/security-events` | Verified | Security alert feed (Rate limit trips, unauthorized tenant attempts) |
| 125 | System Configuration | `#/app/admin/system` | Verified | Runtime environment parameters, database pool stats, cache health |

### Module 15: User Profile & Preferences (Pages 126 – 130)
| # | Page Name | Route | Status | Description |
|---|-----------|-------|--------|-------------|
| 126 | My Profile | `#/app/profile` | Verified | Current user details, role badge, tenant membership, email |
| 127 | Edit Profile | `#/app/profile/edit` | Verified | Update full name, phone number, departmental contact information |
| 128 | Change Password | `#/app/profile/password` | Verified | Password change with policy validation (Zero MFA/OTP required) |
| 129 | My Preferences | `#/app/profile/preferences` | Verified | Date formats, currency format (`₹ INR`), notification thresholds |
| 130 | My Sessions | `#/app/profile/sessions` | Verified | Active device logins with terminate session capability |

---
**Total Inventory Count:** 130 Pages.
**Design & Execution:** Pure Node.js & JavaScript, Zero HTML files, Groww `#00B386` aesthetic.
