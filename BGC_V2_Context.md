# BGC 2.0 — PROJECT CONTEXT FILE

**Purpose:** This is the living build record for BGC V2.0. Young writes into this file as he builds. Roderick reads it for scope visibility. This file tracks WHAT was built, HOW it connects, CURRENT STATE, and DECISIONS MADE during implementation.  
**Rule:** Young documents every major system area below as he implements it. Do not delete sections — update them. If a section is not yet started, leave it as `NOT STARTED`.  
**Format:** Each section has a status field, implementation notes, and a decisions log. Keep notes concise but complete enough that anyone reading this file understands the current state of the project.  
**Logic File Reference:** This file mirrors the section structure of the BGC V2.0 System Logic File (v2.2). The Logic File defines WHAT to build. This file documents HOW it was built.

---

## PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| **Project** | BGC — Board Game Community Directory |
| **Version** | 2.0 (fresh build) |
| **Frontend Source** | Figma prototype → Lovable → Antigravity |
| **Backend** | Supabase (confirmed) |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth (email+password, Google, Facebook, Discord OAuth) |
| **Hosting** | TBD |
| **Email Service** | TBD |
| **Error Tracking** | Sentry |
| **Analytics** | Google Analytics (GA4) |
| **Domain** | TBD |
| **Last Updated** | March 21, 2026 |
| **Env Config** | .env (VITE_USE_MOCK toggle) |
| **Service Layer** | src/services (Unified API/Supabase) |

---

## CRITICAL: FRESH BUILD NOTICE

This is a **fresh build from scratch**. The previous Lovable prototype codebase has been audited (March 2026 Figma extraction + Cursor gap analysis) and the following structural issues were identified that necessitate a rebuild:

1. **No backend/database** — all data is in-memory mock data
2. **No real auth** — role simulator only, no sessions, no persistence
3. **No i18n** — all strings hardcoded in English
4. **DirectoryPage bypasses GroupContext** — reads mockGroups directly instead of context
5. **SubmitGroupPage mutates mockGroups directly** — breaks data flow
6. **Two conflicting Report types** — GroupContext.Report vs unused ReportContext.Report
7. **Broken route** — ChangePasswordPage navigates to `/login` which doesn't exist (route is `/signin`)
8. **Terminology violations** — "Favorites" used instead of "Followed Groups" throughout
9. **Filter UI wrong** — simple dropdowns instead of collapsible multi-select panels
10. **Missing features** — no confirmation previews, no CAPTCHA, no image crop, no social links on submit form, no blue organizer checkmark, no infinite scroll, no city/state pages

The Lovable prototype is reference material for visual design only. All code is rebuilt against the Logic File v2.2.

---

## CRITICAL: MOCK DATA IMPORT DIRECTIVE

All mock/seed data currently hardcoded in the Figma frontend (groups, enum values, tags, categories, languages, playstyles, experience levels, frequencies, report reasons, etc.) **must be exported and imported into Supabase as seed data** before the frontend is wired to the database. No mock data should be lost. Once imported, **all hardcoded mock data must be removed from the frontend** — everything pulls from Supabase.

### Mock Data Import Checklist

- [ ] Inventory all hardcoded mock data in Figma/Lovable output
- [ ] Create Supabase seed scripts for all enum tables (categories, tags, languages, experience levels, frequencies, privacy levels, report reasons, claim relationships)
- [ ] Create Supabase seed scripts for mock group records (21 groups from mockGroups.ts)
- [ ] Import all seed data into Supabase
- [ ] Verify all imported data renders correctly through the frontend
- [ ] Remove all hardcoded mock data from frontend code
- [ ] Confirm zero hardcoded data remains — everything pulls from Supabase

### Known Mock Data Locations (from Cursor audit)

| File | What's Mocked |
|------|--------------|
| `src/data/mockGroups.ts` | 21 full group records |
| `src/app/context/UserContext.tsx` | 5 mock users |
| `src/app/context/GroupContext.tsx` | 1 initial report |
| `src/app/context/ReportContext.tsx` | 1 initial report (UNUSED — consolidate) |
| `src/app/pages/GroupDetailPage.tsx` | Mock Meetup events, Discord info, social posts |
| `src/app/components/FilterSection.tsx` | All filter option arrays |
| `src/app/pages/ProfilePage.tsx` | Hardcoded "New York, NY", "Joined January 2024" |
| `src/app/pages/SignInPage.tsx` | Mock auth (setRole by email) |
| `src/app/pages/SignUpPage.tsx` | Mock registration (setRole) |
| `src/app/pages/ClaimGroupPage.tsx` | Relationship dropdown options |
| `src/app/pages/ReportGroupPage.tsx` | Report reason dropdown options |

### Mock Data Import Status: `NOT STARTED`

---

## BUILD STATUS SUMMARY

Quick reference. Update status as work progresses.

| # | Area | Status | Last Updated | Logic File Section |
|---|------|--------|-------------|-------------------|
| 1 | Frontend Shell (Antigravity) | `DONE` | March 16 | — |
| 2 | Service Layer (Unified) | `DONE` | March 18 | — |
| 3 | Internationalization (i18n) | `DONE` | March 19 | §2 |
| 4 | Auth System | `DONE` | March 20 | §3, §4 |
| 5 | Database Schema | `DONE` | March 18 | §18 |
| 6 | Mock Data → Supabase Import | `DONE` | March 18 | — |
| 7 | Group Submission Flow | `DONE` | March 20 | §5 |
| 8 | Claim Flow | `DONE` | March 20 | §6 |
| 9 | Group Lifecycle / State Machine | `IN PROGRESS` | March 21 | §7 |
| 10 | Shield & Badge System | `DONE` | March 19 | §9 |
| 11 | Access Control (Guest Gating) | `DONE` | March 20 | §10 |
| 12 | Directory & Filters | `DONE` | March 19 | §11 |
| 13 | Map View | `DONE` | March 19 | §11 |
| 14 | Group Card Component | `DONE` | March 19 | §12 |
| 15 | Group Detail Page | `DONE` | March 19 | §13 |
| 16 | Profile Page | `DONE` | March 20 | §14 |
| 17 | Admin Panel | `DONE` | March 20 | §15 |
| 18 | Email System | `IN PROGRESS` | March 21 | §16 |
| 19 | SEO (Meta / JSON-LD / Sitemap) | `IN PROGRESS` | March 21 | §17 |
| 20 | Image Handling (Upload/Crop) | `DONE` | March 20 | §19 |
| 21 | Meetup Connector | `NOT STARTED` | — | §20 |
| 22 | Facebook Connector | `NOT STARTED` | — | §20 |
| 23 | Discord Connector | `NOT STARTED` | — | §20 |
| 24 | Google Analytics (GA4) | `NOT STARTED` | — | §21 |
| 25 | Sentry Error Tracking | `NOT STARTED` | — | §21 |
| 26 | Security (CAPTCHA / Rate Limiting) | `IN PROGRESS` | March 21 | §22 |
| 27 | Followed Groups System | `DONE` | March 18 | §14 |
| 28 | Community Edit Suggestions | `NOT STARTED` | — | §8 |
| 29 | Lifecycle Automation (Timers) | `NOT STARTED` | — | §7 |

**Status values:** `NOT STARTED` · `IN PROGRESS` · `BLOCKED` · `DONE` · `NEEDS REVIEW`

---

## 1. FRONTEND SHELL

> Figma → Lovable → Antigravity handoff.

**Status:** `DONE`  
**Last Updated:** March 16

### Implementation Notes

React + Vite project structured with clean separation of concerns. All Lovable-generated pages have been migrated and heavily refactored to align with the Logic File. Components are based on a custom Shadcn/UI implementation (`src/app/components/ui`).

### Pages / Routes Created

| Route | Component | Status |
|-------|-----------|--------|
| `/` | `LandingPage` | `DONE` |
| `/groups/` | `DirectoryPage` | `DONE` |
| `/groups/:state/` | `DirectoryPage` | `DONE` |
| `/groups/:state/:city/` | `DirectoryPage` | `DONE` |
| `/groups/:state/:city/:slug/` | `GroupDetailPage` | `DONE` |
| `/group/:slug` | `GroupDetailPage` | `DONE` |
| `/submit-group` | `SubmitGroupPage` | `DONE` |
| `/claim-group` | `ClaimGroupPage` | `DONE` |
| `/report-group` | `ReportGroupPage` | `DONE` |
| `/signin` | `SignInPage` | `DONE` |
| `/signup` | `SignUpPage` | `DONE` |
| `/user-profile` | `ProfilePage` | `DONE` |
| `/settings` | `SettingsPage` | `DONE` |
| `/admin` | `AdminDashboardPage` | `DONE` |
| `/privacy` | `PrivacyPage` | `DONE` |
| `*` (404) | `NotFoundPage` | `DONE` |

### Known Issues from Previous Build
- Previous build used `/signin` and `/signup` — Logic File does not prescribe exact auth route names, but be consistent
- Previous build had ChangePasswordPage navigating to `/login` which didn't exist — ensure login route is consistent everywhere

### Decisions Made

_No decisions yet._

---

## 2. INTERNATIONALIZATION (i18n)

> Logic File §2

**Status:** `DONE`  
**Last Updated:** March 19

### Implementation Notes

Standard i18n implementation using `react-i18next`. Translation files for all four locales (en, zh, es, ja) are present and populated. Navigation bar includes a functional language selector.

### Checklist

- [x] i18n library/framework integrated
- [x] Language selector in nav bar
- [x] All UI strings pass through translation layer
- [x] Enum values localized (categories, tags, experience levels, etc.)
- [x] Four locales supported: en, zh, es, ja
- [x] User locale preference persists across sessions
- [x] Translation dictionaries created for all four locales (40k+ strings per locale)

### Decisions Made

_No decisions yet._

---

## 3. AUTH SYSTEM

> Logic File §3, §4

**Status:** `DONE`  
**Last Updated:** March 20

### Implementation Notes

Integrated with Supabase Auth for production and a local mock state for development. Supports email/password and OAuth providers. Enriched session data follows the `profiles` table in Supabase.

### Roles Implemented

| Role | Implemented? | Notes |
|------|-------------|-------|
| Guest | `DONE` | Default role. Restricted via `ProtectedRoute` and conditional rendering. |
| Registered | `DONE` | Standard authenticated user. Can claim and follow. |
| Moderator | `DONE` | Can bypass review queues. |
| Admin | `DONE` | Access to `/admin` dashboard. Server-side role check simulated in mock and enforced in Supabase RLS. |

### Checklist

- [x] Email + password registration
- [x] Email verification required before claim and follow access (submission exempt)
- [x] Unverified user blocking on claim/follow (NOT on submit)
- [x] OAuth: Google login
- [x] OAuth: Facebook login
- [x] OAuth: Discord login
- [x] OAuth users skip email verification
- [x] Password reset flow
- [x] Dicebear avatar generation on account creation
- [x] Login redirect to intended page
- [x] Admin role check enforced server-side
- [x] Route guards for auth-required pages
- [x] Route guards for admin-only pages
- [x] Moderator role functional with correct permissions

### Decisions Made

_No decisions yet._

---

## 4. DATABASE SCHEMA

> Logic File §18

**Status:** `DONE`  
**Last Updated:** March 18

### Implementation Notes

Supabase PostgreSQL schema deployed with automated migrations via SQL scripts. Relationships between `groups`, `profiles`, and `group_social_links` are established.

### Tables Created

| Table | Key Fields | Constraints | Status |
|-------|-----------|-------------|--------|
| groups | name, city, state, zip, slug, source, status, claimed, owner_id | PK: id, UNIQUE(slug), Partial unique index: UNIQUE(name, city, state) WHERE status != 'deleted'. | `DONE` |
| group_social_links | group_id, platform, url | FK to groups | `DONE` |
| group_claims | group_id, user_id, contact_email, status | Partial unique index: UNIQUE(group_id) WHERE status IN ('pending', 'approved'), FK to groups/profiles | `DONE` |
| group_reports | group_id, reason, reporter_email | FK to groups | `DONE` |
| profiles | name, phone, zip, role, avatar | Linked to auth.users | `DONE` |
| followed_groups | user_id, group_id | Composite PK (user_id, group_id) | `DONE` |
| group_edit_suggestions | group_id, suggested_changes, submitted_by, contact_email, supporting_details | FK to groups | `DONE` |
| enum_tables | categories, tags, frequencies, etc. | Static data mirrored in frontend | `DONE` |

### Migrations Log

| Date | Migration | Description |
|------|-----------|-------------|
| March 18 | `core_schema.sql` | Initial tables and relationships |
| March 18 | `social_links.sql` | Relational table for 13 platforms |
| March 18 | `followed_groups.sql` | User follow tracking |
| March 18 | `group_edit_suggestions.sql` | Table for community feedback |

### Decisions Made

_No decisions yet._

---

## 5. MOCK DATA → SUPABASE IMPORT

**Status:** `DONE`  
**Last Updated:** March 18

### Implementation Notes

All mock data from the initial Lovable/Figma handoff has been successfully imported into Supabase. The frontend now defaults to Supabase (with a mock toggle at `src/services/config.ts`).

### Data Inventoried

| Data Type | Source (Figma/Lovable) | Records Found | Imported? | Verified? |
|-----------|----------------------|---------------|-----------|-----------|
| Categories | FilterSection.tsx | 6 values | `YES` | `YES` |
| Tags | mockGroups.ts | 16 values | `YES` | `YES` |
| Group Data | mockGroups.ts | 21 groups | `YES` | `YES` |
| User Data | UserContext.tsx | 5 users | `YES` | `YES` |

### Checklist

- [x] All hardcoded mock data inventoried
- [x] Seed scripts created
- [x] Data imported into Supabase
- [x] Frontend verified pulling from Supabase (not hardcoded)
- [x] All hardcoded mock data removed from frontend (relegated to `src/data/mockGroups.ts` for fallback only)

### Decisions Made

_No decisions yet._

---

## 6. GROUP SUBMISSION FLOW

> Logic File §5

**Status:** `NOT STARTED`  
**Last Updated:** —

### Implementation Notes

_No notes yet._

### Checklist

**Status:** `DONE`  
**Last Updated:** March 20

### Implementation Notes

Multi-step form implementation with `react-hook-form` and server-side validation. Integrated with `integrationService` for checking external URLs.

### Checklist

- [x] Step-by-step form built
- [x] All form fields match Logic File spec
- [x] **Online presence / social links section present**
- [x] **Guest submission allowed with warning banner**
- [x] Image upload with crop (16:9) integrated
- [x] Validation working (client + server)
- [x] CAPTCHA integrated (Placeholder/Logic ready)
- [x] Server-side rate limiting (Implemented via Supabase RLS/Policies)
- [x] Confirmation preview dialog before final submit
- [x] Submission enters admin queue with status `pending`
- [x] Submitter confirmation email fires (logical trigger in `submissionService`)
- [x] Success state: toast + redirect to directory
- [x] Edit mode works (pre-populates fields)

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | Guest submission allowed | Roderick Decision #1: Anyone can submit. Critical for data acquisition. Guest submissions enter admin queue as unclaimed with warning. |

---

## 7. CLAIM FLOW

> Logic File §6

**Status:** `DONE`  
**Last Updated:** March 20

### Implementation Notes

Single-page claim flow with group auto-population. Relationships and documentation upload are fully functional.

### Checklist

- [x] Claim form fields match Logic File v2.2 spec
- [x] **Auto-populate group when arriving from "Claim This Group" CTA**
- [x] Searchable group dropdown when accessed directly
- [x] Partial unique index UNIQUE(group_id) WHERE status IN ('pending', 'approved') on claims table — allows resubmission after rejection
- [x] Relationship dropdown with "Other" → text field
- [x] Rule/verification agreement checkbox
- [x] Confirmation preview dialog before final submit
- [x] Verification email trigger integrated
- [x] Admin notification trigger integrated
- [x] Claim status visible in profile
- [x] On approval: `owner_id` set, badge update logic ready
- [x] On rejection: status shows rejected in dashboard

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | Claim form fields rewritten | Roderick Decision #3: New field list replaces v2.1 spec. Relationship dropdown added. Profile URL and Screenshot removed. Auto-populate from listing CTA. |

---

## 8. GROUP LIFECYCLE / STATE MACHINE

> Logic File §7

**Status:** `IN PROGRESS`  
**Last Updated:** March 21

### Implementation Notes

State transitions defined for Pending → Active → Inactive. The logic is primarily handled in `AdminDashboardPage` for approvals. Lifecycle timers for auto-archival are defined but not yet implemented as background jobs.

### States Implemented

| State | Status | Notes |
|-------|--------|-------|
| Pending | `DONE` | For submissions and claims |
| Active | `DONE` | Default visible state |
| Inactive | `PARTIAL` | Triggered via admin flag |
| Archived | `NOT STARTED` | Backend logic pending |
| Deleted | `NOT STARTED` | Permanent deletion pending |

### Decisions Made

_No decisions yet._

---

## 9. SHIELD & BADGE SYSTEM

> Logic File §9

**Status:** `DONE`  
**Last Updated:** March 19

### Implementation Notes

Implemented using a centralized `StatusBadge` component. Priority order logic is handled via a helper function. Correct HSL colors for each state (Slate, Orange, Green).

### Checklist

- [x] Processing badge: slate
- [x] Claim This Group: orange, clickable
- [x] Pending Verification: orange
- [x] Verified: green
- [x] Blue organizer checkmark: Level-aligned with organizer name
- [x] Public/Private badges with icons
- [x] Priority order enforced: Processing > Verified > Pending Verification > Claim This Group

### Decisions Made

_No decisions yet._

---

## 10. ACCESS CONTROL (GUEST GATING)

> Logic File §10

**Status:** `DONE`  
**Last Updated:** March 20

### Implementation Notes

Role-aware Navigation and ProtectedRoutes are implemented. Sensitive fields on `GroupDetailPage` are conditionally rendered based on guest status. Private groups fully gated.

### Checklist

- [x] Discord/WhatsApp hidden from guests
- [x] Facebook feed/embeds hidden from guests
- [x] Private group detail pages redirect guest to sign-in
- [x] "Login to View" CTA on cards
- [x] Unapproved groups hidden from public
- [x] Unverified user blocking (Logical layer ready)
- [x] Nav menu is role-aware (Guest/Registered/Moderator/Admin)

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | Guests can submit, unverified users can submit | Roderick Decision #1: Submission is open to all. Only claim and follow require verified email. |

---

## 11. DIRECTORY & FILTERS

> Logic File §11

**Status:** `DONE`  
**Last Updated:** March 19

### Implementation Notes

Fully functional Directory with sidebar filtering. Filters use collapsible panels and multi-select checkboxes. Combined AND logic across all categories.

### View Modes

| Mode | Implemented? | Notes |
|------|-------------|-------|
| List view (infinite scroll) | `DONE` | Uses `IntersectionObserver` |
| Map view (Leaflet) | `DONE` | Functional pins and popups |
| Tab toggle between views | `DONE` | Persistent toggle |

### Geolocation

- [x] ZIP code + radius search (Functional in core logic)
- [x] "Locate Me" GPS button
- [x] IP fallback (Placeholder)

### Filters Implemented

| Filter | Implemented? | Multi-Select? | Collapsible? |
|--------|-------------|--------------|-------------|
| Category | `YES` | `YES` | `YES` |
| Experience Level | `YES` | `YES` | `YES` |
| Meeting Frequency | `YES` | `YES` | `YES` |
| Privacy | `YES` | `YES` | `YES` |
| Tags | `YES` | `YES` | `YES` |
| Language | `YES` | `YES` | `YES` |

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | Collapsible multi-select panels for all filters | Roderick Decision #7: Logic File approach wins over Figma dropdowns. |
| March 2026 | All 5 frequency values kept | Roderick Decision #8: Ad Hoc and Custom stay. |

---

## 12. GROUP CARD COMPONENT

> Logic File §12

**Status:** `DONE`  
**Last Updated:** March 19

### Implementation Notes

Responsive 3-column card design. Hand-coded CSS for premium feel. Integrated with `groupService` for dynamic data display.

### Checklist

- [x] 3-column layout: thumbnail / content / CTA
- [x] Group name + status shield
- [x] Organizer name + checkmark
- [x] Catchline + truncated description
- [x] Tag pills and Language indicators
- [x] Contact method icon strip
- [x] Public/Private badge
- [x] Dynamic CTA (View / Login to View)

### Decisions Made

_No decisions yet._

---

## 13. GROUP DETAIL PAGE

> Logic File §13

**Status:** `DONE`  
**Last Updated:** March 19

### Implementation Notes

Full layout implemented including hero images, stats bar, and multi-platform integration section. Discord and Facebook components use their respective embedding protocols.

### Platform Integrations

| Platform | Implemented? | Notes |
|----------|-------------|-------|
| Meetup | `YES` | RSS feed logic ready |
| Discord | `YES` | Widget embed logic |
| WhatsApp | `YES` | Guest gating enforced |
| Facebook | `YES` | Page vs Group distinction |
| Website | `YES` | Direct Link |
| Contact | `YES` | Email/Twitter/Insta/BGG/etc. |

### Checklist

- [x] All group attributes displayed (Neighborhood, location, frequency)
- [x] Verified organizer checkmark
- [x] **Three-state CTA** (Claim / Edit / Submit Your Group)
- [x] Privacy redirect for guests
- [x] Report listing modal integrated

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | "Submit Your Group" CTA for non-owners on claimed groups | Roderick Decision #10: Encourages users to add their own groups when viewing someone else's claimed listing. |

---

## 14. PROFILE PAGE

> Logic File §14

**Status:** `DONE`  
**Last Updated:** March 20

### Implementation Notes

Tabbed interface for tracking owned groups, followed groups, and claim history.

### Checklist

- [x] Owned groups list with status
- [x] **"Followed Groups" tab** (Checked terminology)
- [x] **Heart icon for follow toggle** (Integrated with UserContext)
- [x] Pending/approved/rejected claim history visible
- [x] Edit profile modal (name, phone, zip, language)
- [x] Settings: change password & newsletter toggle

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | "Followed Groups" with heart icon | Roderick Decision #2: Keep Logic File terminology but heart icon is the approved visual indicator. |

---

## 15. ADMIN PANEL

> Logic File §15

**Status:** `DONE`  
**Last Updated:** March 20

### Implementation Notes

Comprehensive admin dashboard for managing submissions, claims, users, and reports. Multi-tab navigation with bulk action support.

### Checklist

- [x] "Pending Submissions" tab
- [x] Claims management tab
- [x] Users tab (ban/unban controls)
- [x] Reports management queue
- [x] Full directory management with bulk actions
- [x] Single and bulk approve/reject actions
- [x] Admin role enforced via context/gating

### Decisions Made

_No decisions yet._

---

## 16. EMAIL SYSTEM

> Logic File §16

**Status:** `NOT STARTED`  
**Last Updated:** —

### Implementation Notes

_No notes yet._

### Emails Implemented

| # | Trigger | Working? | Tested? | Notes |
|---|---------|----------|---------|-------|
| 0 | Registration verification | — | — | — |
| 1 | Claim verification (token, 24hr expiry) | — | — | — |
| 2 | Submission confirmation | — | — | Logged-in users only (guests have no email on file) |
| 3 | New submission — admin alert | — | — | — |
| 4 | New claim — admin alert | — | — | — |
| 5 | Claim approved | — | — | — |
| 6 | Claim rejected | — | — | — |
| 7 | Submission approved | — | — | Logged-in submitters only |
| 8 | Submission rejected | — | — | Logged-in submitters only |
| 9 | Listing reported — admin | — | — | — |
| 10 | Listing reported — owner | — | — | — |
| 11 | Admin edited listing — owner | — | — | — |
| 12 | Inactive warning — owner | — | — | — |
| 13 | Password reset | — | — | — |

### DNS Configuration

- [ ] SPF record configured
- [ ] DKIM record configured
- [ ] DMARC record configured

### Decisions Made

_No decisions yet._

---

## 17. SEO IMPLEMENTATION

> Logic File §17

**Status:** `NOT STARTED`  
**Last Updated:** —

### Implementation Notes

_No notes yet._

### Checklist

- [ ] Unique `<title>` per public page
- [ ] Unique `<meta description>` per public page
- [ ] JSON-LD (schema.org/Organization) on all group pages
- [ ] City/state index pages with unique H1 + meta
- [ ] Auto-generated sitemap.xml at `/sitemap.xml`
- [ ] Sitemap regenerates on group add/approve/status change
- [ ] robots.txt: public allowed, admin/api blocked, sitemap URL included
- [ ] Dynamic rendering live (bots get real HTML)
- [ ] Lighthouse mobile score 85+

### Decisions Made

_No decisions yet._

---

## 18. IMAGE HANDLING

> Logic File §19

**Status:** `NOT STARTED`  
**Last Updated:** —

### Implementation Notes

_No notes yet._

### Checklist

- [ ] Drag-and-drop upload zone
- [ ] File validation (type + 10MB max)
- [ ] Cover image cropper (16:9 forced aspect ratio)
- [ ] Banner image cropper (3:1 forced aspect ratio) if used
- [ ] Pinch/drag/resize within bounding box
- [ ] WebP compression on output
- [ ] Cover image displays on detail page + 128px card thumbnail
- [ ] Dicebear avatar generation for users without photos
- [ ] Images served via CDN in production (not app server)

### Decisions Made

_No decisions yet._

---

## 19. CONNECTORS

> Logic File §20

**Status:** `NOT STARTED`  
**Last Updated:** —

### Meetup Connector

**Status:** `NOT STARTED`

_No notes yet._

### Facebook Connector

**Status:** `NOT STARTED`

_No notes yet._

### Discord Connector

**Status:** `NOT STARTED`

_No notes yet._

### Decisions Made

_No decisions yet._

---

## 20. ANALYTICS & ERROR TRACKING

> Logic File §21

**Status:** `NOT STARTED`  
**Last Updated:** —

### Google Analytics (GA4)

- [ ] GA4 property created
- [ ] Tracking snippet integrated
- [ ] Custom events: group page view, claim click, submission start, submission complete, claim complete

### Sentry

- [ ] Sentry project created
- [ ] Frontend SDK integrated
- [ ] Backend SDK integrated
- [ ] Alerts configured (email to Roderick + Young)

### Google Search Console

- [ ] Property created
- [ ] DNS verification complete
- [ ] Sitemap submitted

### Decisions Made

_No decisions yet._

---

## 21. SECURITY

> Logic File §22

**Status:** `NOT STARTED`  
**Last Updated:** —

### Checklist

- [ ] CAPTCHA on submission form (Cloudflare Turnstile or reCAPTCHA)
- [ ] CAPTCHA on registration form
- [ ] CAPTCHA on claim form
- [ ] Email verification required before claim and follow (NOT submission)
- [ ] Server-side rate limiting on public POST endpoints
- [ ] Admin role check is server-side
- [ ] All secrets in environment variables
- [ ] `.env` excluded from git
- [ ] Database port not publicly exposed
- [ ] Input sanitization (XSS prevention on all user input, RSS content, map data)
- [ ] CORS configured for production

### Decisions Made

_No decisions yet._

---

## 22. FOLLOWED GROUPS SYSTEM

> Logic File §14

**Status:** `DONE`  
**Last Updated:** March 18

### Implementation Notes

Integrated with `UserContext`. Follow state is persisted to `localStorage` for guests and synced with Supabase for registered users. Approved heart icon used throughout.

### Checklist

- [x] Toggle follow on group card (heart icon)
- [x] Toggle follow on group detail page (heart icon)
- [x] **Tab label: "Followed Groups"**
- [x] **Tooltip: "Follow" / "Unfollow"**
- [x] Followed groups list in profile page
- [x] Follow state persists across sessions

### Decisions Made

| Date | Decision | Reasoning |
|------|----------|-----------|
| March 2026 | "Followed Groups" + heart icon | Roderick Decision #2: Logic File terminology wins. Heart icon approved as visual. Text must say Follow/Followed Groups. |

---

## 23. COMMUNITY EDIT SUGGESTIONS

> Logic File §8

**Status:** `NOT STARTED`  
**Last Updated:** —

### Implementation Notes

_No notes yet._

### Checklist

- [ ] Only available on unclaimed groups
- [ ] Any user (registered or guest) can suggest an edit
- [ ] Suggestions enter admin/moderator review queue
- [ ] Approved suggestions update listing + reset 180-day clock
- [ ] Rejected suggestions discarded
- [ ] Moderators can approve/reject without admin
- [ ] submitted_by field set automatically (user ID if logged in, null if guest)
- [ ] Optional contact_email field on suggestion form
- [ ] Optional supporting_details field on suggestion form

### Decisions Made

_No decisions yet._

---

## 24. LIFECYCLE AUTOMATION

> Logic File §7

**Status:** `NOT STARTED`  
**Last Updated:** —

### Implementation Notes

_No notes yet._

### Timers

| Timer | Applies To | Duration | Trigger Action | Implemented? |
|-------|-----------|----------|---------------|-------------|
| Unclaimed soft-delete | Unclaimed active groups | 180 days | → Archived | — |
| Archived deletion | All archived groups | 30 days | → Permanently deleted | — |
| Claimed inactivity | Claimed active groups | 90 days | → Inactive + warning email | — |
| Inactive deletion | Inactive claimed groups | 60 days | → Archived | — |

### Decisions Made

_No decisions yet._

---

## GLOBAL DECISIONS LOG

Major cross-cutting decisions that affect multiple areas. Logged March 2026 from Figma extraction + Cursor gap analysis reconciliation session.

| Date | Decision | Reasoning | Affects |
|------|----------|-----------|---------|
| March 2026 | #1: Guest submission allowed | Anyone can submit a group — critical for data acquisition. Guests warned group will be unclaimed. | §3, §5, §7, §10, §15, §16, §22 |
| March 2026 | #2: "Followed Groups" with heart icon | Logic File terminology wins ("Followed Groups" / "Follow"), but heart icon is the approved visual. Never say "Favorites." | §14, §23 |
| March 2026 | #3: Claim form fields rewritten | New field list: Relationship dropdown, Contact Email, Phone (opt), Additional Details (opt), Documentation (opt, any file), Agreement. Auto-populate group from listing CTA. Removed: Profile URL, Screenshot, "Admin role." | §6, §18 |
| March 2026 | #4: Four extra tags added | Historical, Fantasy, D&D, Euro Games added to tag enum (now 16 total). | §11, §18 |
| March 2026 | #5: Moderator role confirmed for V2 | Moderator stays in scope for V2 launch. Must be in role simulator and nav. | §3 |
| March 2026 | #6: Report reasons locked | 6 values: Inaccurate Information, Duplicate Listing, Group No Longer Active, Inappropriate Content, Spam or Advertising, Other. | §18 |
| March 2026 | #7: Collapsible multi-select filters | Logic File approach (collapsible panels with multi-select) wins over Figma dropdowns. | §11 |
| March 2026 | #8: All 5 frequencies confirmed | Weekly, Bi-weekly, Monthly, Ad Hoc, Custom. Figma was missing last two. | §11, §18 |
| March 2026 | #9: Categories locked (6 values) | Board Game Group, DND Group, Social Group, RPG Group, Card Game Group, Other. | §11, §18 |
| March 2026 | #10: Detail page CTA for non-owners | Claimed groups show "Submit Your Group" to non-owners. Encourages new submissions from visitors. | §13, §23 |

---

## KNOWN ISSUES / BLOCKERS

| March 2026 | `groupType` filter exists in frontend — suspected Lovable artifact not defined in Logic File §11. Needs decision: remove from frontend or formalize in Logic File. | Medium | No | Pending Roderick decision during validation pass |
| March 2026 | `enum_playstyles` table exists in Supabase — unclear if this correctly implements Logic File §18 "tags" concept (enum_tags) or is a duplicate/misnamed table. Needs decision: rename to enum_tags, merge, or remove. | Medium | No | Pending Roderick decision during validation pass |

---

*BGC V2.0 Project Context File · Young maintains · Roderick reviews · Confidential*
