# BGC 2.0 — ROADMAP

**Version:** 1.6  
**Owner:** Roderick Wells (Commander)  
**Purpose:** This is the phased delivery plan for the BGC V2.0 rebuild. Every feature is slotted into a phase and wave with dependencies tracked. This document answers: "What do we build, in what order, and why?"  
**Logic File Reference:** Every item in this roadmap maps to a section in the Logic File (v2.5). If the Logic File doesn't define it, it doesn't ship.  
**Status Tracking:** Update status as work progresses. Every status change gets a dated entry in the Changelog at the bottom.

---

## ROADMAP FORMATTING GUIDE — DASHBOARD COMPATIBILITY

This Roadmap file is parsed by a live dashboard. Follow these formatting rules so the dashboard can read it correctly.

### What the dashboard reads

**Build queues:** `## PHASE N — NAME` headings, `### Wave` sub-headings, and markdown tables inside them. The parser reads these columns (case-insensitive): `#` (item ID), `Feature` or `Item` (name), `Detail` or `Description` (detail text), `Depends On` or `Dependencies` (comma-separated IDs), `Status`. Extra columns like `Logic File` are ignored.

**Status values recognized:** `COMPLETED` or `✅ Done (date)` → done. `Partially built` or text containing "partial" → partial. `In progress` → in progress. `NOT STARTED` or `Not started` → todo. Items with "decision deferred" in detail text → blocked. Backtick wrapping (e.g. `` `COMPLETED` ``) is fine — the parser strips them.

**Other sections the dashboard reads:**
- `## What's Already Built` — Foundation tab. Uses `###` sub-headings with bullet point lists.
- `## Recommended Build Sequence` — Build Sequence tab. Plain text or ASCII art (NO code fences).
- `## Items Needing Discussion` — Open Decisions tab. Markdown table with columns: Item, What to decide, Phase target. Items with ✅ in the Item column show as resolved.
- `## Changelog` — Dashboard Changelog tab. Markdown table with 3 columns: Date, Version, Changes.

**Sections the dashboard skips:** `## Phase Overview`, `## Group Roles`, `## Product Decisions`, `## Tracking`, `## Dependency Map`, `### Phase N Exit Criteria` (checkbox sections).

### Formatting rules

- Do NOT use Markdown fenced code blocks (three consecutive backtick characters) anywhere in this file — they break the dashboard's JavaScript parser.
- Do NOT change `##` heading text for sections the dashboard reads.
- Do NOT nest tables inside tables.
- Do NOT put pipe characters `|` inside table cell text — breaks column parsing.
- New phases, waves, items, changelog entries, and discussion items can be added freely.
- Prose paragraphs between sections are ignored by the parser — safe to add.

---

## PHASE OVERVIEW

| Phase | Name | Goal | Entry Criteria |
|-------|------|------|----------------|
| **Phase 0** | Foundation | Stack, schema, auth, i18n — nothing works without this | Figma → Lovable handoff complete |
| **Phase 1** | Core Directory | Users can browse, search, filter, and view groups | Phase 0 complete |
| **Phase 2** | Business Flows | Users can submit, claim, and manage groups. Admin can review. Emails fire. | Phase 1 complete |
| **Phase 3** | Backfill & Data | Directory populated with real groups from external sources | Phase 2 Wave 1 complete (schema ready) |
| **Phase 4** | Launch Prep | SEO, analytics, error tracking, security hardening, QA | Phase 2 complete, Phase 3 in progress |
| **Phase 5** | Post-Launch | Lifecycle automation, community features, operational emails | Site is public |

---

## PHASE 0 — FOUNDATION

**Goal:** Get the technical foundation in place. Nothing visible to users yet, but everything that comes after depends on this.

### Wave 0.1 — Frontend Shell

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 0.1.1 | Lovable → Antigravity handoff | Push Figma prototype through Lovable, deploy to Antigravity. Verify all pages/routes render. | Figma prototype finalized | `COMPLETED` | §1 |
| 0.1.2 | Inventory mock data | Catalog every piece of hardcoded mock data in the Lovable output (groups, enums, users). | 0.1.1 | `COMPLETED` | Context §5 |
| 0.1.3 | Route structure verified | Confirm all routes match Logic File URL structure. Fix any Lovable-generated routes that don't match. | 0.1.1 | `COMPLETED` | §17 |

### Wave 0.2 — Supabase & Schema

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 0.2.1 | Supabase project setup | Create project, configure environment, establish connection from Antigravity. | 0.1.1 | `COMPLETED` | §18 |
| 0.2.2 | Core schema: groups table | All fields per Logic File §18 including source, status enum, claimed boolean, catchline, neighborhood, primary_venue, submitted_by. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.3 | Core schema: social links table | Separate relational table for group contact methods / platform URLs. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.4 | Core schema: meetup events table | Separate table for scraped Meetup RSS event data. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.5 | Core schema: group claims table | Fields: relationship, relationship_other, contact_email, phone, additional_details, documentation, status. Partial unique index: UNIQUE(group_id) WHERE status IN ('pending', 'approved'). Per Logic File v2.2 §18. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.6 | Core schema: group reports table | Report reason enum (6 locked values) + description + reporter email. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.7 | Core schema: users table | Extensions: name, phone, zip, prefer_language, user_role, avatar, newsletter_opt_in. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.8 | Core schema: followed groups table | User-to-group relation for follow system. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.9 | Core schema: edit suggestions table | For community edit suggestion queue. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.10 | Enum tables | Separate tables for: categories (6 locked values), tags (16 locked values), languages, experience levels (4), frequencies (5), privacy levels (2), report reasons (6 locked values), claim relationships (7 values). All with localized display values (en, zh, es, ja). See Logic File v2.2 §18 for all locked enum values. | 0.2.1 | `COMPLETED` | §18 |
| 0.2.11 | Seed data import | Import all mock data from Lovable output into Supabase enum tables and groups table. Remove hardcoded data from frontend. | 0.2.10, 0.1.2 | `COMPLETED` | Context §5 |

### Wave 0.3 — Auth & i18n

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 0.3.1 | Supabase Auth setup | Email + password registration and login. Session management. Role storage (user_role field). | 0.2.7 | `COMPLETED` | §4 |
| 0.3.2 | Email verification on registration | Verification email sent on signup. Claim and follow blocked until verified. Submission exempt (guests can submit). Unverified user blocking UI. | 0.3.1 | `COMPLETED` | §4, §10, §22 |
| 0.3.3 | OAuth: Google | Google login via Supabase Auth. Skip email verification for OAuth users. | 0.3.1 | `COMPLETED` | §4 |
| 0.3.4 | OAuth: Facebook | Facebook login via Supabase Auth. | 0.3.1 | `COMPLETED` | §4 |
| 0.3.5 | OAuth: Discord | Discord login via Supabase Auth. | 0.3.1 | `COMPLETED` | §4 |
| 0.3.6 | Password reset flow | Forgot password → email → reset link. | 0.3.1 | `COMPLETED` | §4 |
| 0.3.7 | Dicebear avatar generation | Auto-generate SVG avatar on account creation. | 0.3.1 | `COMPLETED` | §4 |
| 0.3.8 | Route guards | Auth-required routes redirect to login. Admin routes check server-side role. Submission route allows guests. | 0.3.1 | `COMPLETED` | §3, §10 |
| 0.3.9 | i18n framework | Translation library, language selector in nav, t() function, locale persistence. | 0.1.1 | `COMPLETED` | §2 |
| 0.3.10 | Translation dictionaries | All UI strings in en, zh, es, ja. Enum display values localized. | 0.3.9, 0.2.10 | `COMPLETED` | §2 |
| 0.3.11 | Role-aware navigation | Nav menu items differ per role (guest/registered/moderator/admin). Language selector visible. | 0.3.1, 0.3.9 | `COMPLETED` | §3 |
| 0.3.12 | Moderator role in role system | Moderator role functional: approve/reject suggestions, submit without review, pre-verified groups. Nav aware of moderator. | 0.3.1 | `COMPLETED` | §3 |

### Wave 0.4 — Auth & Routing Wiring

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 0.4.1 | Wire registration to Supabase | Connect SignUpPage to authService.signUp. Remove setTimeout simulation. Ensure Supabase Auth creates user record. | 0.3.1 | `NOT STARTED` | §4 |
| 0.4.2 | Wire SignUpPage OAuth buttons | SignUpPage social buttons currently use setTimeout. Connect to authService.signInWithProvider same as SignInPage. | 0.3.3, 0.3.4, 0.3.5 | `NOT STARTED` | §4 |
| 0.4.3 | Fix OAuth redirect completion | SignInPage calls signInWithProvider but does not follow data.url for browser redirect. Add window.location.assign(data.url) or equivalent. Verify callback flow. | 0.3.3 | `NOT STARTED` | §4 |
| 0.4.4 | Enforce email verification on claim and follow | Route guards only check role === guest. Add email_confirmed_at check. Block unverified users from claim form and follow toggle with UI message per Logic File §4. | 0.3.2 | `NOT STARTED` | §4, §10 |
| 0.4.5 | Post-login redirect | Replace history.length navigation with ?next= parameter pattern. AuthCallbackPage must preserve pre-auth URL instead of always redirecting to /. | 0.3.8 | `NOT STARTED` | §4 |
| 0.4.6 | Fix broken sign-up link | SignUpPage links to /sign-in but route is /signin. Fix link path. | 0.1.3 | `NOT STARTED` | — |
| 0.4.7 | Kill PocketBase dead code | Remove src/stores/enums.ts (Vue/Pinia store referencing PocketBase). Verify no other PocketBase references remain. | — | `NOT STARTED` | — |

### Phase 0 Exit Criteria
- [x] All routes render from Antigravity
- [x] Supabase connected with full schema deployed
- [x] All mock data imported into Supabase, zero hardcoded data in frontend
- [ ] Auth working end-to-end: registration, email+password login, Google, Facebook, Discord OAuth
- [ ] Email verification enforced for claim/follow (submission exempt)
- [x] i18n working across all four locales
- [x] Route guards functional (guests can access submit)
- [x] Role-aware nav rendering correctly (all four roles)
- [x] Moderator role functional
- [ ] Post-login redirect returns user to intended page
- [ ] No dead code from previous stack (PocketBase)

---

## PHASE 1 — CORE DIRECTORY

**Goal:** A user can browse the directory, search, filter, view group cards, view group detail pages, and see the map. The site looks and feels like a real directory.

### Wave 1.1 — Group Cards & Directory Browse

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 1.1.1 | Group card component | 3-column layout: 128px thumbnail, content area (name, shield, catchline, description, tags, language icons, contact icons, privacy badge), CTA button. | Phase 0 complete | `COMPLETED` | §12 |
| 1.1.2 | Badge/shield system | All 4 status shields + privacy badges. Priority order enforced. Correct colors, icons, clickability. | Phase 0 complete | `COMPLETED` | §9 |
| 1.1.3 | Blue organizer checkmark | CheckCircle2, text-blue-500, next to organizer name when isClaimed + isVerified. On cards AND detail. | 1.1.2 | `COMPLETED` | §9 |
| 1.1.4 | CTA conditional logic | "View Group" default. "Login to View" when private + guest. | 1.1.1, 0.3.1 | `COMPLETED` | §12, §10 |
| 1.1.5 | Directory page — list view | Group cards displayed vertically with infinite scroll. Connected to Supabase groups query. | 1.1.1 | `COMPLETED` | §11 |
| 1.1.6 | Directory page — search | Text query across group name and description. | 1.1.5 | `COMPLETED` | §11 |

### Wave 1.2 — Filters

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 1.2.1 | Category filter | 6 locked values from enum table. Multi-select, collapsible panel. | 1.1.5, 0.2.10 | `COMPLETED` | §11 |
| 1.2.2 | Experience Level filter | Beginner Friendly, Intermediate, Advanced, All Levels. Multi-select, collapsible panel. | 1.1.5 | `COMPLETED` | §11 |
| 1.2.3 | Meeting Frequency filter | Weekly, Bi-weekly, Monthly, Ad Hoc, Custom. Multi-select, collapsible panel. | 1.1.5 | `COMPLETED` | §11 |
| 1.2.4 | Privacy filter | Public, Private. Multi-select, collapsible panel. | 1.1.5 | `COMPLETED` | §11 |
| 1.2.5 | Tags filter | 16 locked values. Multi-select, collapsible panel. | 1.1.5, 0.2.10 | `COMPLETED` | §11 |
| 1.2.6 | Language filter | Dynamic from enum table. Multi-select, collapsible panel. | 1.1.5, 0.2.10 | `COMPLETED` | §11 |
| 1.2.7 | Combined filter logic | AND logic across filter categories. Verify combined filters narrow correctly. | 1.2.1–1.2.6 | `COMPLETED` | §11 |

### Wave 1.3 — Map & Geolocation

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 1.3.1 | Map view (Leaflet) | Interactive map with group pins. Tab toggle between list and map. | 1.1.5 | `COMPLETED` | §11 |
| 1.3.2 | Viewport filtering | Groups in list update based on map viewport bounding box. | 1.3.1 | `COMPLETED` | §11 |
| 1.3.3 | ZIP code + radius search | ZIP input with distance radius in miles. | 1.1.5 | `COMPLETED` | §11 |
| 1.3.4 | "Locate Me" GPS button | Request browser GPS, center map on location. | 1.3.1 | `COMPLETED` | §11 |
| 1.3.5 | IP geolocation fallback | Fall back to ipapi.co when GPS denied. | 1.3.4 | `COMPLETED` | §11 |

### Wave 1.4 — Group Detail Page

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 1.4.1 | Group detail page | Full layout: description, catchline, tags, languages, experience, frequency, location (neighborhood/city/state/zip), contact methods, organizer info. | Phase 0 complete | `COMPLETED` | §13 |
| 1.4.2 | 13 platform integrations | Display for all platforms: Meetup, Discord, WhatsApp, Facebook, Website, Email, Twitter/X, Instagram, BGG, Reddit, Telegram, Warhorn, Aftergame. | 1.4.1 | `COMPLETED` | §13 |
| 1.4.3 | Facebook Page vs Group display | Pages = embedded timeline widget. Groups = link card only. | 1.4.2 | `COMPLETED` | §13, §20 |
| 1.4.4 | Discord widget embed | Render Discord widget for servers with widgets enabled. | 1.4.2 | `COMPLETED` | §13 |
| 1.4.5 | ~~Meetup RSS event display~~ | Moved to Phase 3 (after Meetup connector 3.1.1). No data to display until connector runs. | — | `MOVED` | §13 |
| 1.4.6 | Guest access control on detail | Discord/WhatsApp hidden from guests (locked + prompt). Facebook hidden from guests + private groups. Meetup only if public. Private groups redirect to sign-in. | 1.4.1, 0.3.1 | `COMPLETED` | §10, §13 |
| 1.4.7 | Report listing | Report link on every group page. Reason enum (6 locked values) + description + email (optional). Goes to admin queue. | 1.4.1 | `COMPLETED` | §13 |
| 1.4.8 | Detail page action CTA — three states | Unclaimed → "Claim This Group" (auto-populates claim form). Claimed + owner → "Edit This Group". Claimed + non-owner → "Submit Your Group". | 1.4.1 | `COMPLETED` | §13 |

### Wave 1.5 — City/State Pages & 404

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 1.5.1 | State index pages | `/groups/:state/` with unique H1, meta title, meta description, filtered group list. | 1.1.5 | `COMPLETED` | §17 |
| 1.5.2 | City index pages | `/groups/:state/:city/` with unique H1, meta title, meta description, filtered group list. | 1.1.5 | `COMPLETED` | §17 |
| 1.5.3 | 404 page | Branded 404 with redirect CTA. | 0.1.1 | `COMPLETED` | — |

### Wave 1.6 — Directory Data Integrity

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 1.6.1 | Filter pending groups from directory | groupService.getGroups() must filter by status = active. DirectoryPage must not show pending, inactive, or archived groups to non-admin users. | 0.2.2 | `NOT STARTED` | §10 |
| 1.6.2 | Rename groupType to category | Rename groupType variable, prop, filter, and all references to category throughout the frontend. Values stay the same (6 locked). | 1.2.1 | `NOT STARTED` | §11 |
| 1.6.3 | Replace hardcoded tag arrays with Supabase fetch | Delete all hardcoded playstyleOptions arrays. Fetch from enum_tags table. Ensure all 16 values render. Rename UI references from playstyle to tags. | 0.2.10 | `NOT STARTED` | §11, §18 |
| 1.6.4 | Fix owner identity check | GroupDetailPage uses user.name === group.organizer (string match). Replace with user.id === group.owner_id. | 0.2.2, 0.3.1 | `NOT STARTED` | §13 |
| 1.6.5 | Supabase RLS — groups table | Add Row Level Security policies: pending groups visible only to owner + admin. Public active groups readable by all. Admin full access. | 0.2.2 | `NOT STARTED` | §10, §22 |

### Phase 1 Exit Criteria
- [x] Directory browse works with all 6 filters (collapsible multi-select panels)
- [x] Map view with viewport filtering works
- [x] Geolocation (GPS + IP fallback) works
- [x] Group cards display correctly with all badges, catchline, tags, icons
- [x] Group detail page shows all 13 platforms with correct access control
- [x] Detail page CTA shows correct state (Claim / Edit / Submit Your Group)
- [x] City/state index pages render with unique content
- [x] Infinite scroll loads correctly
- [x] All terminology matches Logic File §23
- [ ] Directory query excludes non-active groups
- [ ] groupType renamed to category
- [ ] Tags fetched from Supabase (16 values, not hardcoded)
- [ ] Owner identity check uses user ID, not display name
- [ ] RLS policies on groups table

---

## PHASE 2 — BUSINESS FLOWS

**Goal:** Users can submit groups, claim listings, and manage their profile. Admin can review everything. Emails fire on all critical triggers. This phase creates the business asset.

### Wave 2.1 — Image Handling

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.1.1 | Cover image upload + crop | Drag-and-drop, 16:9 forced aspect ratio, 10MB max, WebP compression. | Phase 1 complete | `COMPLETED` | §19 |
| 2.1.2 | Banner image upload + crop | 3:1 forced aspect ratio. Same upload/crop behavior as cover. | 2.1.1 | `COMPLETED` | §19 |
| 2.1.3 | Image validation | Reject non-images and files over 10MB. Clear error messaging. | 2.1.1 | `COMPLETED` | §19 |

### Wave 2.2 — Submission Flow

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.2.1 | Submission form | Step-by-step form with all fields per Logic File v2.2. Image upload integrated. Online presence / social links section included. Guest submission supported with warning banner. | 2.1.1 | `COMPLETED` | §5 |
| 2.2.2 | Form validation | Client-side + server-side. All required fields enforced. | 2.2.1 | `COMPLETED` | §5 |
| 2.2.3 | CAPTCHA on submission | Cloudflare Turnstile or reCAPTCHA integrated. Required for guests and logged-in users. | 2.2.1 | `COMPLETED` | §5, §22 |
| 2.2.4 | ~~Server-side rate limiting~~ | Moved to Phase 4 (4.3.5). Not needed until site is public. | — | `MOVED` | §22 |
| 2.2.5 | Confirmation preview dialog | Preview all entered data before final submit. User confirms. | 2.2.1 | `COMPLETED` | §5 |
| 2.2.6 | Submission → admin queue | Record created with status: pending. Hidden from directory. submitted_by field set if logged in, null if guest. | 2.2.1, 0.2.2 | `COMPLETED` | §5 |
| 2.2.7 | Edit mode | Same form pre-populates when owner/admin accesses with group ID param. | 2.2.1 | `COMPLETED` | §5 |

### Wave 2.3 — Claim Flow

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.3.1 | Claim form | Group auto-populated from listing CTA (or searchable dropdown if accessed directly). Relationship to Group dropdown, contact email, phone (optional), additional details (optional), documentation upload (required per Logic File v2.3 §6), verification agreement checkbox. | Phase 1 complete | `COMPLETED` | §6 |
| 2.3.2 | Already-claimed guard (dropdown) | Dropdown filters out groups with owner_id. Claimed groups don't appear. | 2.3.1 | `COMPLETED` | §6 |
| 2.3.3 | Already-claimed guard (DB) | Partial unique index UNIQUE(group_id) WHERE status IN ('pending', 'approved') on claims table. Allows resubmission after rejection. | 0.2.5 | `COMPLETED` | §6, §18 |
| 2.3.4 | Claim confirmation preview | Preview all entered data before final submit. | 2.3.1 | `COMPLETED` | §6 |
| 2.3.5 | CAPTCHA on claim | Cloudflare Turnstile or reCAPTCHA. | 2.3.1 | `COMPLETED` | §22 |
| 2.3.6 | Claim → pending in dashboard | Claim record created. Visible in profile as pending. | 2.3.1, 2.5.1 | `COMPLETED` | §6, §14 |

### Wave 2.4 — Email System

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.4.1 | Email service integration (Resend) | Wire Resend SDK into backend, integrate email triggers per Logic File §16 email chain. Use test/dev account. Production credential swap happens Phase 4. | — | `COMPLETED` | §16 |
| 2.4.2 | Email #0: Registration verification | Fires on signup. Verification link. | 2.4.1, 0.3.2 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.3 | ~~Email #1: Claim verification~~ | REMOVED per Logic File v2.3. Documentation upload replaces email token as trust signal. | — | `REMOVED` | — |
| 2.4.4 | Email #2: Submission confirmation | Group name, estimated review time. Logged-in submitters only. | 2.4.1, 2.2.1 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.5 | Email #3: Admin new-submission alert | Group name, location, link to admin panel. | 2.4.1, 2.2.6 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.6 | Email #4: Admin new-claim alert | Claimant info, group name, documentation summary, link to admin panel. | 2.4.1, 2.3.1 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.7 | Email #5: Claim approved | Confirmation, link to dashboard. | 2.4.1, 2.6.3 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.8 | Email #6: Claim rejected | Rejection reason, resubmit option. | 2.4.1, 2.6.3 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.9 | Email #7: Submission approved | Group is live, link to listing, invite to claim. Logged-in submitters only. | 2.4.1, 2.6.2 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.10 | Email #8: Submission rejected | Reason, re-submit option. Logged-in submitters only. | 2.4.1, 2.6.2 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.11 | Email #9: Listing reported — admin | Group name, reason, reporter note, link to queue. | 2.4.1, 1.4.7 | `Partially built — UI copy exists, no send function` | §16 |
| 2.4.12 | Email #13: Password reset | Reset link, expiration. | 2.4.1, 0.3.6 | `Partially built — Supabase Auth handles delivery via dashboard config` | §16 |

### Wave 2.5 — Profile Page

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.5.1 | Profile page — owned groups | List of claimed/approved groups with status, delete/cancel actions. | Phase 1 complete, 0.3.1 | `COMPLETED` | §14 |
| 2.5.2 | Profile page — followed groups | Tab labeled "Followed Groups" (NOT "Favorites"). Heart icon for toggle. Toggle follow from cards and detail. Persists across sessions. | 2.5.1 | `COMPLETED` | §14 |
| 2.5.3 | Profile page — pending claims | Pending/approved/rejected claim status visible. Queries claims table. | 2.5.1, 2.3.6 | `COMPLETED` | §14 |
| 2.5.4 | Edit profile | Modal/inline editing: display name, phone, zip, preferred language. | 2.5.1 | `COMPLETED` | §14 |
| 2.5.5 | Settings page | Change password. Newsletter subscription toggle. | 0.3.1 | `COMPLETED` | §14 |

### Wave 2.6 — Admin Panel

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.6.1 | Admin panel — structure | Tabs: "Pending Submissions" (NOT "Pending Approvals"), claims, users, reports, full directory. Server-side admin role enforcement. | 0.3.8 | `COMPLETED` | §15 |
| 2.6.2 | Admin — submission review | Approve/reject submissions. Single and bulk. Triggers emails #7/#8 (logged-in submitters only). | 2.6.1, 2.2.6 | `COMPLETED` | §15 |
| 2.6.3 | Admin — claim review | Approve/reject claims. Sets owner_id + claimed boolean. Triggers badge change. Triggers emails #5/#6. | 2.6.1, 2.3.6 | `COMPLETED` | §15 |
| 2.6.4 | Admin — user management | View users, ban toggle, verification override. | 2.6.1 | `COMPLETED` | §15 |
| 2.6.5 | Admin — report queue | View reported listings, take action (edit, delete, dismiss). | 2.6.1, 1.4.7 | `COMPLETED` | §15 |
| 2.6.6 | Admin — edit any group | Edit any listing. Triggers email #11 if group is claimed. | 2.6.1 | `COMPLETED` | §15 |
| 2.6.7 | Admin — mark verified | Set is_verified on claimed groups. Updates shield to green Verified. Adds blue checkmark. | 2.6.1 | `COMPLETED` | §15, §9 |
| 2.6.8 | Admin — bulk actions | Checkboxes, select-all, batch approve/reject on submissions and claims tabs. | 2.6.1 | `COMPLETED` | §15 |

### Wave 2.7 — Supabase Wiring

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.7.1 | Wire submission form to Supabase | Replace addGroup local state mutation with supabase.from('groups').insert(). Set status: pending, source: manual, submitted_by (user ID or null for guest). Remove alert(). Add error handling. | 2.2.1, 0.2.2 | `NOT STARTED` | §5 |
| 2.7.2 | Wire claim form to Supabase | Replace claimGroup local state mutation with supabase.from('group_claims').insert(). Include all form fields per §18. Documentation upload to Supabase Storage. | 2.3.1, 0.2.5 | `NOT STARTED` | §6 |
| 2.7.3 | Claim form — documentation required | Change documentation upload from optional to required. Add client-side and server-side validation. Update form UI to reflect required status. Per Logic File v2.3 §6. | 2.7.2 | `NOT STARTED` | §6 |
| 2.7.4 | Shield reflects pending claim | After claim submission, group shield must change from "Claim This Group" to "Pending Verification" immediately. Currently shield only updates when isClaimed is set by admin. | 2.7.2, 1.1.2 | `NOT STARTED` | §9 |
| 2.7.5 | Claim dropdown excludes pending claims | Claim dropdown filters isClaimed only. Must also exclude groups with a pending claim record in group_claims table. | 2.7.2 | `NOT STARTED` | §6 |
| 2.7.6 | Wire admin approve/reject to Supabase | Admin submission approve must update groups.status to active via Supabase. Admin claim approve must set owner_id, claimed = true, is_verified = false via Supabase. Reject must update claim/group status. All via Supabase, not local state. | 2.6.2, 2.6.3 | `NOT STARTED` | §15 |
| 2.7.7 | Wire follow toggle to Supabase | Replace local state follow with supabase.from('followed_groups').insert/delete. Persist across sessions. | 2.5.2, 0.2.8 | `NOT STARTED` | §14 |
| 2.7.8 | Wire profile to Supabase | Profile page must query real data: owned groups from groups table, followed groups from followed_groups, pending claims from group_claims. Remove hardcoded location and join date. | 2.5.1, 0.2.2 | `NOT STARTED` | §14 |
| 2.7.9 | CAPTCHA integration — all three forms | Install Cloudflare Turnstile SDK. Add sitekey. Wire token validation to submission, claim, and registration form submit handlers. Server-side token verification. Replace placeholder divs. | 2.2.3, 2.3.5 | `NOT STARTED` | §22 |
| 2.7.10 | Resend email wiring | Connect Resend API to all email trigger points. Build send functions and templates for emails #0, #2–#9, #13. Wire to submission, claim, admin, and auth flows. Owner: Young. Uses dev/test Resend credentials until Phase 4. | 2.4.1 | `NOT STARTED` | §16 |
| 2.7.11 | Claim guard — partial unique index | Replace bare UNIQUE(group_id) on group_claims with partial unique index: UNIQUE(group_id) WHERE status IN ('pending', 'approved'). Allows new claims after rejection. Per Logic File v2.3 §6. | 0.2.5 | NOT STARTED | §6, §18 |
| 2.7.12 | Group name uniqueness — partial unique index | Add partial unique index UNIQUE(name, city, state) WHERE status != 'deleted' on groups table. Prevents duplicate group names in the same location while freeing names on soft delete. Add 'deleted' to status enum. Per Logic File v2.3 §7, §18. | 0.2.2 | NOT STARTED | §7, §18 |
| 2.7.13 | Admin suspend/reinstate action | Add suspend and reinstate buttons to admin panel. Suspend sets status to 'suspended', hides from directory. Reinstate sets status back to 'active'. Triggers Email #14 on suspend. Per Logic File v2.4 §7, §15. | 2.6.1 | NOT STARTED | §7, §15 |
| 2.7.14 | Email #14: Group suspended — owner | Owner notified when admin suspends their group. Includes reason and contact info. | 2.4.1 | NOT STARTED | §16 |
| 2.7.15 | CTA hides on pending claim | When a pending claim exists for a group, detail page CTA changes from "Claim This Group" to "Submit Your Group". Claimant who submitted the pending claim sees no CTA. Per Logic File v2.4 §13. | 2.7.2, 1.4.8 | NOT STARTED | §13 |

### Wave 2.8 — Testing Bugs (March 21 Audit)

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.8.1 | ZIP code lookup fix | ZIP code input on submission form pulls incorrect state (e.g., DC ZIP returns AL). Replace with a reliable, current ZIP code data source that correctly resolves city + state. | 2.2.1 | `NOT STARTED` | §5 |
| 2.8.2 | Submission form — single page rebuild | Convert multi-step wizard to single-page form. All fields visible on one scrollable page. Remove wizard step transitions. Full field list per Logic File v2.5 §5. | 2.2.1 | `NOT STARTED` | §5 |
| 2.8.3 | Submission form — field list update | Ensure all fields match Logic File v2.5 §5 field table. Add: Submission Note (optional, admin-only visibility). Make Category, Experience Level, Frequency required. Remove external_url from form. | 2.8.2 | `NOT STARTED` | §5, §18 |
| 2.8.4 | Submission form — inline validation | Implement real-time inline validation on all fields. Errors shown as user completes each field, not only on submit. ZIP validation confirms lookup. Image validation per §19. | 2.8.2 | `NOT STARTED` | §5 |
| 2.8.5 | Guest warning copy update | Update guest submission warning to: "You are submitting as a guest. This group will be listed as unclaimed and anyone can claim it. Sign in now to automatically claim this group upon submission." | 2.8.2 | `NOT STARTED` | §5 |
| 2.8.6 | Submission page header copy | Replace header with: "Share your board game community with thousands of enthusiasts. Fill out the form below to create a searchable directory entry." | 2.8.2 | `NOT STARTED` | §5 |
| 2.8.7 | Default placeholder images | When no Group Photo or Group Banner is uploaded, system assigns a branded BGC default placeholder. Not a broken image or empty space. | 2.1.1 | `NOT STARTED` | §19 |
| 2.8.8 | Map clustering | Implement marker clustering on map view. Nearby markers bubble together with count. Zoom in to break apart. Individual markers show group photo thumbnail and name. | 1.3.1 | `NOT STARTED` | §11 |
| 2.8.9 | Directory card — Organized by + checkmark | Ensure "Organized by [name]" line with blue checkmark (text-blue-500) displays on every card where isClaimed + isVerified. Currently missing on some cards. | 1.1.3 | `NOT STARTED` | §9, §12 |
| 2.8.10 | Directory card — Verified badge sentence case | Change Verified badge from uppercase to sentence case ("Verified" not "VERIFIED"). Applies to all badges on cards and detail page. | 1.1.2 | `NOT STARTED` | §9 |
| 2.8.11 | Directory card — Meeting Frequency calendar icon | Add calendar icon next to Meeting Frequency display on cards and detail page. | 1.1.1 | `NOT STARTED` | §11, §12 |
| 2.8.12 | Directory card — badge tooltips | Badge icon tooltips not displaying on hover. Fix tooltip rendering on all badges (cards and detail page). | 1.1.2 | `NOT STARTED` | §9 |
| 2.8.13 | Directory card — tag truncation verification | Verify tag truncation is wired to real data: display first 5 tags, then "+N" for overflow. Not just visual — must work with dynamic data. | 1.1.1 | `NOT STARTED` | §12 |
| 2.8.14 | Directory card — tag pill styling | Remove colored backgrounds from tag pills. Use light shade background with black text on cards and detail page. | 1.1.1 | `NOT STARTED` | §12, §13 |
| 2.8.15 | Directory card — heart icon repositioning | Move heart icon below "View Group" CTA button. Hide heart entirely for non-logged-in users (not disabled, completely hidden). | 1.1.1 | `NOT STARTED` | §12, §14 |
| 2.8.16 | Directory — infinite scroll fix | Replace "Discover More Groups" button with true infinite scroll. Page should auto-load more groups as user scrolls. Per Logic File §11. | 1.1.5 | `NOT STARTED` | §11 |
| 2.8.17 | Detail page — Verified badge styling | Fix Verified badge on detail page: must use same color tokens as card (bg-green-50 + green text), not solid bg-green-500 + white text. Add white border or drop-shadow for legibility on hero. Per §9 Option C. | 1.4.1 | `NOT STARTED` | §9 |
| 2.8.18 | Detail page — follow button guest-hide | Hide "Follow this group" button entirely for non-logged-in users on detail page. | 1.4.1 | `NOT STARTED` | §13, §14 |
| 2.8.19 | Detail page — Meetup i18n key fix | Meetup section showing "common.upcoming" raw i18n key instead of translated text. Fix key resolution. | 1.4.2 | `NOT STARTED` | §13 |
| 2.8.20 | Detail page — organizer checkmark color | Fix organizer checkmark from text-blue-400 to text-blue-500 on detail page. Must match cards. | 1.4.1 | `NOT STARTED` | §9 |
| 2.8.21 | Processing group visibility bug | A processing (pending) group showed "pending approval" message when clicked in directory. Pending groups must never appear in the public directory — only visible to submitter + admin. Verify directory query filters correctly and RLS enforces. | 1.6.5 | `NOT STARTED` | §9, §10 |
| 2.8.22 | Image field rename — group_photo + group_banner | Rename `image` field to `group_photo` in schema and all frontend references. Add `group_banner` field. Update all UI labels to "Group Photo" and "Group Banner". | 0.2.2 | `NOT STARTED` | §18, §19, §23 |
| 2.8.23 | Submission note field | Add `submission_note` field to groups table. Text field, optional. Visible only in admin review queue. Not shown on cards or detail pages. Wire to submission form and admin panel. | 0.2.2, 2.8.2 | `NOT STARTED` | §5, §18 |

### Phase 2 Exit Criteria
- [x] Groups can be submitted by anyone (guest + logged-in) with full form + image crop + CAPTCHA + preview
- [x] Groups can be claimed with guards, preview, and required documentation upload
- [x] Admin can approve/reject submissions and claims (single + bulk)
- [ ] Submission form writes to Supabase (not local state)
- [ ] Claim form writes to Supabase with documentation to Storage
- [ ] Admin actions persist to Supabase
- [ ] Follow toggle persists to Supabase
- [ ] Profile reads from Supabase (no hardcoded data)
- [ ] All launch-critical emails (#0, #2–#4) fire correctly via Resend
- [ ] All pre-backfill emails (#5–#9) fire correctly via Resend
- [ ] CAPTCHA functional on submission, claim, and registration (not placeholder)
- [ ] Shield updates immediately on claim submission
- [ ] Badge system reflects all state changes correctly
- [ ] Admin role enforced server-side
- [ ] Submission form is single-page (no wizard)
- [ ] All submission form fields match Logic File v2.5 §5
- [ ] ZIP code lookup returns correct city/state
- [ ] Inline validation works on all required fields
- [ ] Default placeholder images display when no photo/banner uploaded
- [ ] Map clustering functional (bubble, zoom, image+name)
- [ ] All directory card bugs fixed (organized by, badge case, tooltips, tag truncation, tag styling, heart position, infinite scroll)
- [ ] All detail page bugs fixed (verified badge, follow button, tag styling, Meetup i18n, checkmark color)
- [ ] Processing/pending groups not visible in public directory
- [ ] Image fields renamed to group_photo / group_banner

---

## PHASE 3 — BACKFILL & DATA

**Goal:** Populate the directory with real groups from external sources. 500+ groups minimum before public launch.

### Wave 3.1 — Connector Infrastructure

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 3.1.1 | Meetup connector | RSS-based, queue-triggered. Pulls by location. Parses event name, time, URL, location, description. | 0.2.2, 0.2.4 | `NOT STARTED` | §20 |
| 3.1.2 | Meetup — dedup logic | Same external URL = same group. Never create duplicates. | 3.1.1 | `NOT STARTED` | §20 |
| 3.1.3 | Meetup — retry + backoff | Exponential backoff, rate-limit handling, error logging. | 3.1.1 | `NOT STARTED` | §20 |
| 3.1.4 | Meetup — auto-schedule | Re-scrape active groups every 60–90 days. | 3.1.1 | `NOT STARTED` | §20 |
| 3.1.5 | Meetup — import logging | Log groups pulled, skipped (with reason), duplicates detected, errors. Per-item logging. | 3.1.1 | `NOT STARTED` | §20 |
| 3.1.6 | Facebook connector assessment | Document exactly what data is accessible via API. Decision: full connector, URL only, or skip. | 0.2.2 | `NOT STARTED` | §20 |
| 3.1.7 | Discord connector | Widget API for servers with widgets enabled. Pull server metadata: name, description, invite, member count. Geographic anchor validation. | 0.2.2 | `NOT STARTED` | §20 |
| 3.1.8 | Meetup RSS event display | Parsed event data with pagination on group detail page. Moved from Phase 1 (was 1.4.5) — requires Meetup connector data. | 3.1.1, 0.2.4 | `NOT STARTED` | §13 |

### Wave 3.2 — Backfill Runs

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 3.2.1 | Meetup backfill — top 50 US cities | Geographic pulls by city. Batched jobs, not concurrent mass inserts. | 3.1.1–3.1.5 | `NOT STARTED` | §20 |
| 3.2.2 | Data quality review | Spot-check 20+ imported groups. Verify: source field set, no duplicates, location populated, URL valid. | 3.2.1 | `NOT STARTED` | §20 |
| 3.2.3 | Admin data cleanup | Admin reviews imported data quality. Clean up bad entries. | 3.2.2, 2.6.1 | `NOT STARTED` | §20 |
| 3.2.4 | 500+ groups verified | Minimum 500 groups live in directory before public launch. 1,000+ preferred. | 3.2.1–3.2.3 | `NOT STARTED` | — |

### Phase 3 Exit Criteria
- [ ] Meetup connector pulling real data reliably
- [ ] Dedup, retry, and logging all working
- [ ] 500+ groups imported and cleaned
- [ ] Source field correctly set on all imported records
- [ ] Facebook connector assessed (decision documented)
- [ ] Discord connector tested if data available

---

## PHASE 4 — LAUNCH PREP

**Goal:** Everything needed before the site goes public. SEO, analytics, error tracking, security hardening, and QA.

### Wave 4.1 — SEO

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 4.1.1 | Dynamic meta tags | Unique `<title>` and `<meta description>` on every public route, generated from data. | Phase 1 complete | `NOT STARTED` | §17 |
| 4.1.2 | JSON-LD structured data | schema.org/Organization on all group pages. All required fields. | Phase 1 complete | `NOT STARTED` | §17 |
| 4.1.3 | Auto-generated sitemap.xml | Dynamic from database. All active groups + city/state pages. Regenerates on changes. | Phase 1 complete, Phase 3 started | `NOT STARTED` | §17 |
| 4.1.4 | robots.txt | Public routes allowed, admin/api blocked, sitemap URL included. | 4.1.3 | `NOT STARTED` | §17 |
| 4.1.5 | Dynamic rendering | Edge worker or prerender service detects bots, serves real HTML. CSR SPA must not serve empty shells to crawlers. | Phase 1 complete | `NOT STARTED` | §17 |
| 4.1.6 | Google Search Console | Property created, DNS verified, sitemap submitted. | 4.1.3 | `NOT STARTED` | §21 |

### Wave 4.2 — Analytics & Error Tracking

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 4.2.1 | Google Analytics (GA4) | Property created, tracking integrated. Custom events: group page view, claim click, submission start/complete, claim complete. | Phase 1 complete | `NOT STARTED` | §21 |
| 4.2.2 | Sentry — frontend | Frontend SDK. Alerts on unhandled exceptions. Email alerts to Roderick + Young. | Phase 1 complete | `NOT STARTED` | §21 |
| 4.2.3 | Sentry — backend | Backend SDK. Alerts on 5xx, failed emails, connector failures. | Phase 2 complete | `NOT STARTED` | §21 |

### Wave 4.3 — Security Hardening

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 4.3.1 | ~~CAPTCHA on registration~~ | Moved to Phase 2 (covered by 2.7.9 — all three forms done together). | — | `MOVED` | §22 |
| 4.3.2 | Input sanitization audit | Verify all user input, RSS content, and map data is sanitized before database storage. XSS prevention. | Phase 2 complete | `NOT STARTED` | §22 |
| 4.3.3 | Secrets audit | Confirm all secrets in env vars, .env excluded from git, DB port not exposed. | Phase 2 complete | `NOT STARTED` | §22 |
| 4.3.4 | CORS configuration | Production CORS config. | Phase 2 complete | `NOT STARTED` | §22 |
| 4.3.5 | Server-side rate limiting | Rate limit on all public POST endpoints (submission, claim, registration, report). Moved from Phase 2 (was 2.2.4). | Phase 2 complete | `NOT STARTED` | §22 |

### Wave 4.4 — QA & Polish

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 4.4.1 | Terminology audit | Spot-check 10+ pages. All UI text matches Logic File §23. Verify "Followed Groups" (not "Favorites"), "Pending Submissions" (not "Pending Approvals"), all badge labels. | All UI complete | `NOT STARTED` | §23 |
| 4.4.2 | Badge display — all states | Create or find groups in all states. Verify each badge: icon, color, background, clickability, priority order. | 1.1.2, 2.6.7 | `NOT STARTED` | §9 |
| 4.4.3 | Mobile testing | Full submit, claim, and directory flows on real iOS and Android devices. | All flows complete | `NOT STARTED` | — |
| 4.4.4 | Lighthouse performance | Target 85+ on mobile. Fix image optimization, font loading, bundle size if needed. | Phase 1 complete | `NOT STARTED` | §17 |
| 4.4.5 | Claim flow end-to-end test | Real non-technical person completes full claim flow. Every friction point resolved. | Phase 2 complete | `NOT STARTED` | §6 |
| 4.4.6 | Privacy policy page | Legally required before public launch. | — | `COMPLETED` | — |
| 4.4.7 | Google Maps API — Primary Venue | Integrate Google Maps Places API autocomplete on the Primary Venue field in the submission form. Requires API key from Roderick. Owner: Roderick provides API key to Young. | 2.8.2 | `NOT STARTED` | §5 |
| 4.4.8 | State/City browse pages — verification | Verify /groups/:state and /groups/:state/:city routes are functional (not just shells). If shells only, Young builds functional pages with filtered group lists. Design polish deferred. | 1.5.1 | `NOT STARTED` | §17 |

### Wave 4.X — Infrastructure Credential Migration

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 4.X.1 | Credential swap: Email (Resend) | Roderick creates production Resend account, configures SPF/DKIM/DMARC, swaps API key in .env | 2.4.1 complete | `NOT STARTED` | §16 |
| 4.X.2 | Credential swap: Maps (Google) | Roderick creates production Google Maps API key, swaps in .env | 4.4.7 complete | `NOT STARTED` | §17 |
| 4.X.3 | Credential swap: Analytics (GA4) | Roderick creates GA4 property + tracking ID, swaps in .env | 4.2.1 complete | `NOT STARTED` | §21 |
| 4.X.4 | Credential swap: Error tracking (Sentry) | Roderick creates Sentry project + DSN, swaps in .env | 4.2.2, 4.2.3 complete | `NOT STARTED` | §21 |
| 4.X.5 | Verification: All services on production creds | Roderick + Young test all integrations end-to-end on production credentials | 4.X.1–4.X.4 | `NOT STARTED` | — |

### Phase 4 Exit Criteria
- [ ] Every public page has unique meta tags
- [ ] JSON-LD on all group pages, validated
- [ ] Sitemap live, submitted to Search Console
- [ ] Dynamic rendering serving real HTML to bots
- [ ] GA4 live and receiving data
- [ ] Sentry live on frontend + backend
- [ ] All security items pass
- [ ] Terminology audit clean
- [ ] Lighthouse 85+ mobile
- [ ] Claim flow tested by non-technical person
- [x] Privacy policy live

---

## PHASE 5 — POST-LAUNCH

**Goal:** First 30–60 days after public launch. Lifecycle automation, community features, and operational emails.

### Wave 5.1 — Post-Launch Emails

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 5.1.1 | Email #10: Listing reported — owner | Owner notified when their listing is flagged. | 2.4.1 | `NOT STARTED` | §16 |
| 5.1.2 | Email #11: Admin edited listing — owner | Owner notified when admin edits their listing. | 2.4.1 | `NOT STARTED` | §16 |
| 5.1.3 | Email #12: Inactive warning — owner | Group marked inactive, deleted in 60 days, reactivation link. | 2.4.1, 5.2.1 | `NOT STARTED` | §16 |

### Wave 5.2 — Lifecycle Automation

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 5.2.1 | Unclaimed group 180-day archival | Automated job: active unclaimed groups with no claim/edit for 180 days → archived. | Phase 2 complete | `NOT STARTED` | §7 |
| 5.2.2 | Claimed group 90-day inactivity | Automated job: claimed groups with no owner activity for 90 days → inactive + warning email. | Phase 2 complete, 5.1.3 | `NOT STARTED` | §7 |
| 5.2.3 | Inactive 60-day archival | Inactive claimed groups with no response for 60 days → archived. | 5.2.2 | `NOT STARTED` | §7 |
| 5.2.4 | Archived 30-day deletion | All archived groups → soft-deleted (status set to 'deleted') after 30 days. Row retained for audit. | 5.2.1, 5.2.3 | `NOT STARTED` | §7 |
| 5.2.5 | Clock reset logic | Activity resets: owner login/edit resets 90-day. Approved edit suggestion resets 180-day. Claim submission resets 180-day. | 5.2.1–5.2.4 | `NOT STARTED` | §7 |

### Wave 5.3 — Community Features

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 5.3.1 | Community edit suggestions | Suggestion form on unclaimed groups only. Admin/mod review queue. Approved suggestions update listing + reset 180-day clock. | Phase 2 complete | `NOT STARTED` | §8 |
| 5.3.2 | Moderator role activation | Enable moderator permissions: approve/reject suggestions, submit without review. | 0.3.1, 5.3.1 | `NOT STARTED` | §3 |
| 5.3.3 | Edit suggestion tracking fields | Add submitted_by (user ID or null for guest), contact_email (optional), supporting_details (optional) to edit_suggestions table. Per Logic File v2.4 §18. | 0.2.9 | NOT STARTED | §8, §18 |

### Phase 5 Exit Criteria
- [ ] All 13 emails (#0, #2–#13) working (Email #1 removed in v2.3)
- [ ] Email #14 (group suspended) working
- [ ] Lifecycle timers running (180-day, 90-day, 60-day, 30-day)
- [ ] Clock resets working correctly
- [ ] Community edit suggestions live for unclaimed groups
- [ ] Moderator role functional

---

## DEPENDENCY MAP — CRITICAL CHAINS

These are the sequences where one thing blocks the next. If any item in the chain stalls, everything downstream is blocked.

**Chain 1: Foundation → Everything**
Lovable handoff → Supabase setup → Schema → Auth → Route guards → All features

**Chain 2: Seed Data**
Lovable handoff → Inventory mock data → Enum tables created → Seed import → Remove hardcoded data

**Chain 3: Business Flow**
Submission form (guests allowed) → Admin panel → Submission review → Emails #2,#3,#7,#8
Auth → Claim form → Claim guards → Admin claim review → Emails #4,#5,#6

**Chain 4: SEO → Public Launch**
City/state pages → Meta tags → JSON-LD → Sitemap → Dynamic rendering → Search Console → Go public

**Chain 5: Backfill → Public Launch**
Schema (source + status fields) → Meetup connector → Backfill runs → Data quality review → 500+ groups → Go public

**Chain 6: Lifecycle Automation**
Email system → Inactive warning email → Lifecycle timers → Clock reset logic

---

## What's Already Built (reference — not in the build queue)

### Figma Prototype ✅
- Complete visual design for all pages
- Component library and design system
- Serves as design specification for the build

### Lovable Output ✅
- Figma → Lovable code generation complete
- All pages and routes rendered in Antigravity
- Visual reference only — code rebuilt from scratch against Logic File
- Structural issues identified: no backend, no real auth, mock data mutations, terminology violations

### 10 Gap Analysis Decisions ✅
- Guest submission allowed (Logic File §5)
- "Followed Groups" terminology with heart icon (Logic File §14, §23)
- Claim form fields rewritten (Logic File §6, §18)
- 16 tags locked (Logic File §11, §18)
- Moderator role confirmed for V2 (Logic File §3)
- Report reasons locked — 6 values (Logic File §18)
- Collapsible multi-select filter panels (Logic File §11)
- All 5 frequency values confirmed (Logic File §11)
- Categories locked — 6 values (Logic File §11, §18)
- Detail page CTA — three states (Logic File §13, §23)

---

## Recommended Build Sequence

Phase 0 (Foundation) ─────────── FIRST
  ↓  Stack, schema, auth, i18n — nothing works without this
Phase 1 (Core Directory) ─────── AFTER Phase 0
  ↓  Browse, search, filter, view groups — the site looks real
Phase 2 (Business Flows) ─────── AFTER Phase 1
  ↓  Submit, claim, admin, emails — creates the business asset
Phase 3 (Backfill & Data) ────── AFTER Phase 2 Wave 1 (schema ready)
  ↓  Populate directory with real groups from external sources
Phase 4 (Launch Prep) ────────── AFTER Phase 2 complete, Phase 3 in progress
  ↓  SEO, analytics, error tracking, security, QA
Phase 5 (Post-Launch) ────────── AFTER site is public
     Lifecycle automation, community features, operational emails

---

## Items Needing Discussion

| Item | What to decide | Phase target |
|------|---------------|--------------|
| **✅ D1: groupType filter** | RESOLVED: groupType is the Category filter under a wrong name. Same 6 values. Rename to category in frontend. Item 1.6.2. | Phase 1 |
| **✅ D2: enum_playstyles table** | RESOLVED: Kill PocketBase dead code (src/stores/enums.ts). Rename enum_playstyles to enum_tags in Supabase if it exists, or create enum_tags with all 16 values. Replace hardcoded playstyleOptions arrays. Item 0.4.7 + 1.6.3. | Phase 0/1 |
| **✅ D3: Email service provider** | RESOLVED: Resend confirmed. Young wires SDK and triggers (2.4.1 / 2.7.10) with dev/test account. Production Resend + DNS in Phase 4 (Wave 4.X). | Phase 2 |
| **✅ D4: Meetup RSS event display** | RESOLVED: Moved to Phase 3 as item 3.1.8. No data to display until connector runs. | Phase 3 |
| **D5: Google Maps API key** | Roderick needs to create Google Maps API key and provide to Young for Primary Venue autocomplete (4.4.7). | Phase 4 |

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| March 2026 | v1.0 | V2 Roadmap created |
| March 2026 | v1.1 | Updated per Figma+Cursor gap analysis reconciliation — 10 decisions integrated |
| March 18, 2026 | v1.1 | Status updates from codebase audit — Phase 0 foundational items marked COMPLETED |
| March 18, 2026 | v1.1 | Created followed_groups and group_edit_suggestions tables |
| March 19, 2026 | v1.1 | Directory refactor, SEO index pages, admin modals, submission and claim UI, Dicebear avatars |
| March 19, 2026 | v1.1 | OAuth and password reset fully implemented with Supabase |
| March 20, 2026 | v1.1 | Privacy Policy, Terms of Service, CAPTCHA placeholders, Phase 1 and 2 UI finalized |
| March 21, 2026 | v1.2 | Dashboard compatibility update — added formatting guide, build sequence, discussion items, dashboard changelog. Fixed code fences in dependency map. |
| March 21, 2026 | v1.3 | Codebase audit update. Added wiring waves: 0.4 (7 items), 1.6 (5 items), 2.7 (10 items). Split 2.4.1 into Roderick (Resend+DNS) and Young (wiring). Removed Email #1 (claim verification token) per Logic File v2.3. Moved 1.4.5 to Phase 3 (3.1.8). Moved 2.2.4 rate limiting to Phase 4 (4.3.5). Moved 4.3.1 CAPTCHA registration to Phase 2 (2.7.9). Updated email statuses to Partially built. Resolved D1–D4. Updated all exit criteria for wiring requirements. |
| March 21, 2026 | v1.4 | Added 2.7.11 (claim guard partial index) and 2.7.12 (group name uniqueness partial index) from logic bug audit. Logic File bumped to v2.3. |
| March 21, 2026 | v1.5 | Logic audit fixes. Removed Email #1 from Chain 3. Updated 0.2.5 and 2.3.3 to partial unique index. Updated 5.2.4 to soft-delete language. Added 2.7.13 (admin suspend/reinstate), 2.7.14 (Email #14), 2.7.15 (CTA pending claim logic), 5.3.3 (edit suggestion tracking fields). Logic File bumped to v2.4. |
| March 21, 2026 | v1.6 | Testing audit. Added Wave 2.8 (23 items) for bugs found during Roderick testing: submission form single-page rebuild, ZIP lookup fix, field list update, inline validation, guest warning copy, header copy, default placeholder images, map clustering, directory card fixes (organized by, badge case, calendar icon, tooltips, tag truncation, tag styling, heart repositioning, infinite scroll), detail page fixes (verified badge styling, follow button guest-hide, Meetup i18n, checkmark color), processing group visibility bug, image field rename, submission note field. Added 4.4.7 (Google Maps API for venue) and 4.4.8 (state/city browse verification). Logic File bumped to v2.5. |
| March 22, 2026 | v1.7 | Infrastructure model change: Young builds with dev/test credentials; Roderick migrates to production accounts Phase 4. Removed ownership blocking from agent.md Rule 7. Merged 2.4.1a+1b into single 2.4.1 item. Added Wave 4.X (5 items) for credential swap + verification. Updated Logic File §16 DNS language. |

---

## DETAILED CHANGELOG

| Date | Phase | Item | Change | Author |
|------|-------|------|--------|--------|
| March 2026 | — | All | V2 Roadmap v1.0 created | Roderick Wells |
| March 2026 | — | Multiple | V1.1: Updated per Figma+Cursor gap analysis reconciliation. Groups table adds primary_venue and submitted_by fields (0.2.2). Claims table fields rewritten per Logic File v2.2 §6 (0.2.5). Enum tables add claim_relationships, locked values specified (0.2.10). Email verification scoped to claim/follow only, submission exempt (0.3.2). Route guards allow guest submission access (0.3.8). Moderator role item added (0.3.12). Tags filter updated to 16 values (1.2.5). Detail page three-state CTA item added (1.4.8). Submission form adds guest support and social links section (2.2.1). Claim form fields updated (2.3.1). Profile followed groups terminology enforced (2.5.2). Admin tab naming corrected (2.6.1). Terminology audit expanded (4.4.1). Chain 3 updated for guest submission. Logic File reference updated to v2.2. | Roderick Wells |
| March 18, 2026 | — | All | Updated roadmap status based on codebase audit. Marked Phase 0 foundational items as COMPLETED (Supabase connection, core schema, basic auth, seed data). | Antigravity |
| March 18, 2026 | Phase 0/2 | 0.2.8, 2.5.2 | Created `followed_groups` table in Supabase and updated `supabase_schema.sql`. Updated ProfilePage and GroupDetailPage terminologies to use "Followed Groups" instead of "Favorites". | Antigravity |
| March 18, 2026 | Phase 0 | 0.2.9 | Created `group_edit_suggestions` table in Supabase. Backfilled `group_claims` and `group_edit_suggestions` documentation in `supabase_schema.sql`. | Antigravity |
| March 19, 2026 | Phase 1/2 | Multiple | Refactored DirectoryPage with sidebar filters, infinite scroll, and mobile drawer. Created Groups/Events SEO index pages and custom 404. Implemented admin rejection modals. Added multi-step submission and claim UI flows. Added Dicebear avatar logic. | Antigravity |
| March 20, 2026 | Phase 2/4 | 4.4.6 | Created Privacy Policy and Terms of Service pages. Added CAPTCHA placeholders to forms. Finalized all Phase 1 and 2 UI/Logic flows. | Antigravity |
| March 19, 2026 | Phase 0 | Auth | Fully implemented OAuth (Google, Facebook, Discord) and Password Reset flows with actual Supabase integration. Created ForgotPassword, ResetPassword, and AuthCallback pages. Updated Profiles trigger to include name, email, and avatar. | Antigravity |
| March 21, 2026 | Multiple | Multiple | V1.3: Codebase audit — 6 scans revealed UI shells not wired to Supabase. Added Wave 0.4 (auth wiring, OAuth fixes, email verification enforcement, dead code cleanup — 7 items). Added Wave 1.6 (directory status filter, groupType rename, hardcoded tags replacement, owner ID fix, RLS — 5 items). Added Wave 2.7 (submission/claim/admin/follow Supabase wiring, shield logic, CAPTCHA real integration, Resend email wiring — 10 items). Split 2.4.1 into 2.4.1a (Roderick: Resend account + DNS) and 2.4.1b (Young: Resend SDK + templates). Removed 2.4.3 Email #1 (claim verification token dropped per Logic File v2.3 — documentation upload is the trust signal). Claim form documentation changed from optional to required (2.3.1 description updated, new item 2.7.3). Moved 1.4.5 Meetup RSS display to Phase 3 as 3.1.8. Moved 2.2.4 rate limiting to Phase 4 as 4.3.5. Moved 4.3.1 CAPTCHA registration to Phase 2 covered by 2.7.9. Updated email items 2.4.2–2.4.12 from COMPLETED to Partially built. Resolved all 4 discussion items (D1–D4). Updated exit criteria for Phases 0, 1, 2, 5. | Roderick Wells |
| March 21, 2026 | Phase 2/4 | Multiple | V1.6: Testing audit — 25 items added. Wave 2.8 created with 23 bug fixes from Roderick testing session. Key changes: submission form rebuilt as single page (2.8.2), ZIP lookup fix (2.8.1), field list updated per Logic File v2.5 (2.8.3), inline validation (2.8.4), guest warning + header copy (2.8.5-6), default placeholder images (2.8.7), map clustering (2.8.8), 8 directory card fixes (2.8.9-16), 4 detail page fixes (2.8.17-20), processing group visibility (2.8.21), image field rename (2.8.22), submission note (2.8.23). Added Phase 4 items: Google Maps API for venue autocomplete (4.4.7), state/city browse verification (4.4.8). Added D5 to discussion items. Updated Logic File reference to v2.5. | Roderick Wells |

---

*BGC 2.0 Roadmap · Version 1.6 · Controlled by Roderick Wells · Confidential*
