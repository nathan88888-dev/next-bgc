# BGC 2.0 — SYSTEM LOGIC FILE

**Version:** 2.5  
**Owner:** Roderick Wells (Commander)  
**Purpose:** This is the single source of truth for how BGC works. Every rule, condition, state, flow, and behavior is defined here. Young builds against this file. He does not edit it. Roderick controls all changes.  
**Scope:** System behavior only. No marketing strategy, no business KPIs, no timelines, no monetization mechanics.

---

## TABLE OF CONTENTS

1. [What BGC Is](#1-what-bgc-is)
2. [Internationalization (i18n)](#2-internationalization-i18n)
3. [User Roles & Permissions](#3-user-roles--permissions)
4. [Registration & Authentication](#4-registration--authentication)
5. [Group Submission Rules](#5-group-submission-rules)
6. [Claim Flow Rules](#6-claim-flow-rules)
7. [Group Lifecycle — State Machine](#7-group-lifecycle--state-machine)
8. [Community Edit Suggestions](#8-community-edit-suggestions)
9. [Shield & Badge System](#9-shield--badge-system)
10. [Access Control Rules](#10-access-control-rules)
11. [Directory & Filtering Behavior](#11-directory--filtering-behavior)
12. [Group Card Display Rules](#12-group-card-display-rules)
13. [Group Detail Page Rules](#13-group-detail-page-rules)
14. [Profile & Settings Pages](#14-profile--settings-pages)
15. [Admin Panel Behavior](#15-admin-panel-behavior)
16. [Email System — Triggers & Required Content](#16-email-system--triggers--required-content)
17. [SEO Technical Requirements](#17-seo-technical-requirements)
18. [Data Model Requirements](#18-data-model-requirements)
19. [Image Handling](#19-image-handling)
20. [Connector Behavior & Validation](#20-connector-behavior--validation)
21. [Analytics & Error Tracking Behavior](#21-analytics--error-tracking-behavior)
22. [Security Requirements](#22-security-requirements)
23. [Terminology Standards](#23-terminology-standards)
24. [Do NOT Build](#24-do-not-build)

---

## 1. WHAT BGC IS

BGC is a searchable public directory of local board game groups. It is a directory, not a social network. It does not manage events, RSVPs, or group communication.

- Anyone can browse free without an account.
- Anyone — including guests — can submit a group to the directory.
- Group organizers can claim their listing to manage it.
- The homepage is a marketing landing page. Users click through to the directory to browse and discover groups. The homepage does NOT display live directory content — it is a static marketing shell with CTAs to the directory and submit pages.
- The site must rank in search engines for queries like "board game groups near me" and "board game club [city]."

**Core decision filter:** For every feature — ask: "Is this directory functionality or platform functionality?" If it's platform functionality, it does not belong in BGC.

---

## 2. INTERNATIONALIZATION (i18n)

BGC supports multiple languages across the entire UI.

### Supported Locales
- **English (en)** — default
- **Chinese (zh)**
- **Spanish (es)**
- **Japanese (ja)**

### How It Works
- A global i18n system provides a translation function accessible across all components.
- User selects their preferred language via a **language selector** in the navigation bar.
- All UI strings — labels, buttons, tooltips, badges, form fields, error messages, enum display values — must pass through the translation layer.
- Enum values (categories, tags, experience levels, etc.) must be localized into all four supported languages.
- The user's locale preference must persist across sessions.

---

## 3. USER ROLES & PERMISSIONS

Four roles. Each inherits all permissions of the level below it.

### Guest (Unregistered)
- Can browse the full public directory (list and map views).
- Can view public group detail pages.
- Can submit a group to the directory. Guest submissions go to admin review queue as unclaimed. The UI warns the guest that the group will be listed as unclaimed and anyone can claim it.
- Can suggest edits on unclaimed groups.
- **Cannot** see Discord or WhatsApp contact methods on group pages — shown locked with login prompt.
- **Cannot** see Facebook feed on group pages if group is private OR user is guest.
- **Cannot** see private group details — shown "Login to View" CTA instead.
- **Cannot** claim a group.
- **Cannot** follow groups.
- Prompted to sign in for any restricted content not listed above.

### Registered (Account)
- All Guest permissions plus:
- Can claim unclaimed groups.
- Can follow groups.
- Can view claim status in their dashboard (pending/approved/rejected).
- Full access to public and private group details (if logged in).
- **Must verify email before accessing claim and follow features.** Unverified accounts are blocked from claiming and following until email confirmation is complete. Submission is allowed without verification (guests can submit too).

### Moderator (Trusted)
- All Registered permissions plus:
- Can approve/reject community edit suggestions.
- Can submit and edit groups **without admin review** — their submissions go live immediately.
- Moderator-submitted groups are pre-verified. Moderators do not go through the claim flow for groups they submitted.

### Admin (Full)
- All Moderator permissions plus:
- Can approve/reject claims and submissions.
- User management.
- Bulk actions (approve/reject multiple items).
- Full data access.
- Can mark groups as verified.
- Can edit any group listing.
- Can delete groups.

### Navigation
- Navigation menu items differ between Guest, Registered, Moderator, and Admin. The nav must be fully role-aware.
- Language selector visible in nav for all roles.

---

## 4. REGISTRATION & AUTHENTICATION

### Registration
- Required fields: name, email, zip code, password.
- CAPTCHA required on registration form (Cloudflare Turnstile or reCAPTCHA — third-party, not custom).
- On successful registration, a **verification email** is sent to the provided email address.
- The user **cannot access claim or follow features** until they click the verification link and confirm their email. Submission is allowed without verification.
- If a user attempts to use a restricted feature before verifying, the UI must block the action and display a message directing them to check their email.

### Login
- Email + password login.
- **OAuth login supported:** Google, Facebook, Discord.
- OAuth users skip email verification (the OAuth provider has already verified the email).
- Login redirects to the page the user was trying to access, or to the homepage if no redirect target.

### Password Reset
- "Forgot Password" flow: user enters email, receives a password reset link.

### Auto-Generated Avatars
- Users who do not upload a profile photo receive an auto-generated avatar via **Dicebear** (SVG-based).
- The avatar is generated on account creation and displayed wherever a user profile image appears.

---

## 5. GROUP SUBMISSION RULES

- **Any user — including guests — can submit a group.** This is critical for data acquisition. We want all the data we can get.
- Guest submissions display a warning banner: "You are submitting as a guest. This group will be listed as unclaimed and anyone can claim it. Sign in now to automatically claim this group upon submission."
- All public (non-moderator) submissions go to the **admin review queue**. They are hidden from the directory until approved.
- **Moderators** can submit and edit groups without admin review. Their submissions go live immediately.
- CAPTCHA required on the submission form (Cloudflare Turnstile or reCAPTCHA).
- Server-side rate limiting required on the submission endpoint.

### On Successful Submission:
- If user is logged in: submitter receives a **submission confirmation email**.
- If user is a guest: no email (no email address to send to unless collected on form).
- Admin receives a **new submission notification email**.
- Group enters the system with status: `pending`.

### Submission Form Layout
- **Single-page form** — all fields visible on one scrollable page. No multi-step wizard.
- **Page header copy:** "Share your board game community with thousands of enthusiasts. Fill out the form below to create a searchable directory entry."
- The submission form doubles as an **edit form** when accessed by the group owner or an admin with a group ID parameter. Editing uses the same UI but pre-populates all fields.
- `external_url` is NOT on the submission form. It is a backend-only field set by connectors/import scripts. Manual submissions auto-set `source: manual` and leave `external_url` null.

### Submission Form Fields (in order)

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| **Group Name** | Yes | text | |
| **Catchline / Short Bio** | No | text | Short tagline for preview hook on cards |
| **Description** | Yes | textarea | Full description |
| **Group Photo** | No | image upload | 16:9 aspect ratio, crop enforced, 10MB max. See §19. If not provided, system assigns default placeholder. |
| **Group Banner** | No | image upload | 3:1 aspect ratio, crop enforced, 10MB max. See §19. If not provided, system assigns default placeholder. |
| **ZIP Code** | Yes | text | Auto-fills Primary City and State via ZIP lookup. Must use a reliable, current ZIP code data source. |
| **Primary City** | Yes | auto-filled | Populated from ZIP lookup. User can override. |
| **State** | Yes | auto-filled | Populated from ZIP lookup. User can override. |
| **Neighborhood** | No | text | Finer location granularity for dense urban areas |
| **Primary Venue** | No | text | Primary meeting place (e.g., "The Board Room Cafe") |
| **Privacy Type** | Yes | select | Public, Private |
| **Category** | Yes | select | 6 locked values from enum table (see §18) |
| **Experience Level** | Yes | select | 4 locked values from enum table (see §18) |
| **Meeting Frequency** | Yes | select | 5 locked values from enum table (see §18) |
| **Primary Language** | No | select | From languages enum |
| **Tags / Game Preference** | No | multi-select | 16 locked values from enum table (see §18). User can select as many or as few as they want. |
| **Connection Links** | No | URL inputs | Platform URLs for any of the 13 supported platforms (see §18 — Social Links table) |
| **Submission Note** | No | textarea | Free-text note from submitter to admin. Visible only in admin review queue. Not public-facing. |

### Submission Form Validation
- **Real-time inline validation is required.** Validate fields as the user completes them — do not wait until form submission to surface errors.
- All required fields must be validated client-side AND server-side.
- ZIP code validation must confirm the ZIP exists and correctly resolve to a city/state.
- Image uploads validated per §19 rules (file type, size, aspect ratio).
- CAPTCHA validated on submit.
- **Confirmation preview dialog** — before final submission, display all entered data in a preview modal. User confirms before the record is created.
- Success state: toast notification + redirect to directory.

---

## 6. CLAIM FLOW RULES

The claim flow is the most important feature on the site. It converts scraped data into verified organizer accounts — the core business asset.

### Who Can Claim
- Only **registered users** (with verified email) can claim a group.
- Only **unclaimed groups** (no existing `owner_id`) can be claimed.

### Claim Form Entry Points
- **From group detail page:** When a user clicks "Claim This Group" on a listing, the claim form opens with the group **auto-populated**. The user does not need to search.
- **From nav/direct URL:** If the user navigates to the claim form directly (e.g., from a menu link), a **searchable group dropdown** is shown so they can find and select the group to claim.
- In both cases, the dropdown **must filter out** groups that already have an `owner_id`. Already-claimed groups cannot appear.

### Claim Form Fields
- **Group** — auto-populated from the referring listing, or searchable dropdown if accessed directly. Required.
- **Relationship to Group** — select dropdown. Options: Founder, Organizer, Admin, Moderator, Member, Other. If "Other" is selected, a text field appears: "Please specify relationship." Required.
- **Contact email** — contact email for follow-up. Required.
- **Phone number** — optional.
- **Additional details** — free text field for supporting information. Optional.
- **Upload documentation** — file upload, any file type accepted (images, PDF, doc, etc.), 10MB max. **Required.** This is the primary proof of group ownership. Examples: screenshot of admin panel, event photos, group correspondence.
- **Verification agreement** — checkbox. "I certify that I am an authorized representative of this group." Required.

### Claim Guards (Race Condition Prevention)
- The claim autocomplete dropdown **must filter out** groups that already have an `owner_id`. Already-claimed groups cannot appear as claimable.
- A **partial unique index** UNIQUE(group_id) WHERE status IN ('pending', 'approved') **must exist** on the `group_claims` table. This prevents duplicate active claims while allowing new claims to be filed after a previous claim is rejected.
- These two guards together prevent two users from claiming the same group simultaneously.

### Confirmation Preview
- Before final claim submission, display all entered data in a **confirmation preview dialog**. User reviews and confirms before the claim record is created.

### Claim Processing
- All claims require **admin verification**. No auto-approval regardless of data quality.
- **Exception:** Moderator-submitted groups are pre-verified. Moderators do not go through the claim flow for groups they submitted.

### On Claim Submission:
- Admin receives a **new claim notification email**.
- Claim status is visible to the claimant in their profile dashboard at all times (pending/approved/rejected).

### On Claim Approval:
- `owner_id` is set on the group record.
- `claimed` boolean set to `true`.
- Shield changes to "Pending Verification" (awaiting admin verification of the listing itself).
- Owner receives **claim approved email** with link to owner dashboard.
- 90-day activity clock starts.

### On Claim Rejection:
- Claimant receives **claim rejected email** with reason (if provided) and resubmit option.
- Claim shows as `rejected` in their profile dashboard.
- Group remains unclaimed with "Claim This Group" shield.

---

## 7. GROUP LIFECYCLE — STATE MACHINE

This is the definitive state machine. All lifecycle logic is built against these rules.

**"Deleted" is a soft delete.** When a group reaches the Deleted state, its status is set to 'deleted' and the record is retained in the database for audit purposes. The group is hidden from all queries and its name becomes available for reuse in the same location.

**"Suspended" is a manual admin hold.** Only admins can suspend and reinstate groups. Suspension is never automated. All lifecycle timers (180-day, 90-day, 60-day, 30-day) pause while a group is suspended and resume from where they left off on reinstatement.

### 7.1 Unclaimed Groups

| Status | Trigger | Timer | What Happens |
|--------|---------|-------|--------------|
| **Pending** | Submitted by any user (guest or registered) | Awaiting admin review | Hidden from directory. In admin queue. |
| **Active** | Admin/mod approves | 180-day clock starts | Live in directory. Shows "Claim This Group" shield. |
| **Active** | Edit suggestion approved | 180-day clock RESETS | Listing updated. Clock restarts from zero. |
| **Active** | Claim submitted by a user | 180-day clock RESETS | Clock resets regardless of claim outcome. |
| **Suspended** | Admin manually suspends (e.g., after report) | No timer — indefinite until admin acts | Hidden from directory. Visible to admin only. All lifecycle timers paused. |
| **Active** | Admin reinstates suspended group | Timers resume from where they paused | Returns to directory. Previous lifecycle clock resumes. |
| **Archived** | 180 days — no claim, no approved suggestion | 30-day deletion window starts | Hidden from directory. Recoverable by admin. |
| **Deleted** | 30 days in Archived | — | Status set to 'deleted'. Row retained for audit. Hidden from all queries. Name freed for reuse in same location. |

### 7.2 Claimed Groups

| Status | Trigger | Timer | What Happens |
|--------|---------|-------|--------------|
| **Active** | Claim approved by admin | 90-day activity clock starts | Live with "Pending Verification" shield until admin verifies. |
| **Verified** | Admin marks group as verified | 90-day clock continues | Shield changes to green "Verified." Blue organizer checkmark appears. |
| **Active** | Owner logs in OR edits listing | 90-day clock RESETS | Any login or edit counts as activity. |
| **Inactive** | 90 days no owner activity | 60-day clock starts | Status flips to Inactive. Warning email sent to owner: group will be deleted in 60 days. Reactivation link included. |
| **Active** | Owner reactivates (email link or login) | 90-day clock RESETS | Status returns to Active. Clock restarts. |
| **Suspended** | Admin manually suspends | No timer — indefinite until admin acts | Hidden from directory. Visible to owner (with status indicator) and admin. All lifecycle timers paused. |
| **Active** | Admin reinstates suspended group | Timers resume from where they paused | Returns to directory. Previous lifecycle clock resumes. |
| **Archived** | 60 days no response to warning | 30-day deletion window starts | Hidden from directory. Recoverable by admin. |
| **Deleted** | 30 days in Archived | — | Status set to 'deleted'. Row retained for audit. Hidden from all queries. Name freed for reuse in same location. |

**Note:** "Verified" in the table above refers to the admin setting `is_verified: true` on the group record. It is NOT a value in the `status` enum. The group's actual status remains `active`. The Verified shield (§9) displays when `isClaimed: true` AND `isVerified: true`.

---

## 8. COMMUNITY EDIT SUGGESTIONS

- **Only available on unclaimed groups.** Claimed groups are locked — the owner controls their listing entirely.
- Any user (registered or guest) can suggest an edit on an unclaimed group.
- Suggestions go to the admin/moderator review queue.
- **Approved** suggestions update the listing and **reset the 180-day soft-delete clock**.
- **Rejected** suggestions are discarded.
- Moderators can approve or reject suggestions without admin involvement.

---

## 9. SHIELD & BADGE SYSTEM

Shields appear on group cards and detail pages next to the group name. They are the primary trust signal.

### Shield Definitions

| Shield / Badge | Color Spec | Condition | Behavior |
|----------------|-----------|-----------|----------|
| **⏱ Processing** | Slate #64748B text / bg-slate-100 | `status != 'active'` | Clock icon. Static. Group under moderation review. |
| **🛡 Claim This Group** | Orange #EE7B11 text / bg-orange-50 | `isClaimed: false` (active group) | Clickable — navigates to claim flow. Prompts ownership. |
| **🛡 Pending Verification** | Orange #EE7B11 text / bg-orange-50 | `isClaimed: true, isVerified: false` | Static. Owner claimed, awaiting admin verification. |
| **🛡 Verified** | Green #22C55E text / bg-green-50 (near-white) | `isClaimed: true, isVerified: true` | Static. Officially verified by BGC. |
| **⚠ Rejected** | Red text-red-700 / bg-red-100 | `status: 'rejected'` | AlertTriangle icon. Static. **Visible only to the group submitter and admins.** Never shown to public users. Rejected groups do not appear in the directory. |
| **✓ Organizer Checkmark** | Blue text-blue-500 (CheckCircle2 icon) | `isClaimed: true, isVerified: true` | Appears next to organizer name ONLY — separate from shield. Business critical trust indicator. Must be text-blue-500 everywhere (not text-blue-400). |
| **🔒 Private** | Gray bg-gray-100 / text-gray-700 | `privacy: 'Private'` | Lock icon. On group card and detail page. |
| **Public** | Blue bg-blue-100 / text-blue-700 | `privacy: 'Public'` | On group card and detail page. |

### Badge Text Casing
All badge labels must be in **sentence case** (e.g., "Verified", "Pending Verification", "Processing"). Never uppercase or all-caps.

### Badge Priority Order — MUST BE ENFORCED IN CODE

1. **Processing** (`status != 'active'`) — always wins regardless of other flags
2. **Rejected** (`status: 'rejected'`) — only visible to submitter + admin
3. **Verified** (`isClaimed` + `isVerified`)
4. **Pending Verification** (`isClaimed`, not `isVerified`)
5. **Claim This Group** (unclaimed active group)

Only one status shield displays at a time. Privacy badge (Public/Private) displays separately and is not part of the priority stack.

### Badge Styling Consistency
Badge color tokens (background, text, icon color) must be **identical on group cards and group detail pages.** The same component and same CSS classes should render in both locations.

**Detail page hero modifier (Option C):** Because the detail page hero may have a dark or image background, badges on the detail page hero add a `white border` or `drop-shadow` for legibility. The color tokens themselves do not change — only the border/shadow modifier is added.

> **Design options log (for future reference if Option C needs revisiting):**
> - **Option A — Identical everywhere:** One spec, one component, zero ambiguity. Downside: light badges may look washed out on dark hero images.
> - **Option B — Dark-hero variant:** Detail page hero gets a separate "on-dark" treatment (solid bg + white text). Gives visual polish. Downside: two badge specs to maintain, more drift risk.
> - **Option C — Middle ground (CURRENT):** Same color tokens everywhere, add white border or drop-shadow on detail page hero only for legibility. One spec with one modifier.

### Badge Tooltips
All badges must display a tooltip on hover describing what the badge means. Tooltips must render correctly on both group cards and detail pages. The detail page currently has tooltips missing on some badges — this must be fixed.

### Stale/Last-Updated Display
- **NOT displayed at launch.** The "Claim This Group" badge is sufficient.
- Backend tracks `last_updated` for future use.
- This is a future optional enhancement.

---

## 10. ACCESS CONTROL RULES

These are the conditional display rules based on user role and group privacy.

### Guest Restrictions on Group Detail Page

| Content | Condition | Guest Sees Instead |
|---------|-----------|-------------------|
| Discord contact | Always hidden from guests | Locked state + login prompt |
| WhatsApp contact | Always hidden from guests | Locked state + login prompt |
| Facebook feed | Hidden if guest OR group is private (dual condition) | Locked state + login prompt |
| Meetup integration | Only shown if `meetupDetails.privacy = 'Public'` | Nothing — hidden entirely |
| Private group details | Hidden if guest + group is private | "Login to View" CTA |

### Guest Submission Access
- Guests CAN access the submission form. No redirect to sign-in for submission.
- Guest submission form displays a warning banner explaining the group will be unclaimed.

### Guest Redirect Rule
- If a guest visits a private group page, redirect to sign-in — not just content hiding. The page should redirect, not show a stripped version.

### CTA Conditional Logic
- Group card CTA: If group is **private** AND user is **guest** → show "Login to View" instead of "View Group."
- All other combinations → show "View Group."

### Unapproved Group Visibility
- Groups with `status: pending` (not yet approved) are **only visible** to the group owner and admins. Guests and other registered users cannot see or access unapproved group pages.

### Unverified User Blocking
- Registered users who have not verified their email are blocked from: claiming groups and following groups. The UI shows a message directing them to verify their email.
- Submission is NOT blocked for unverified users (guests can submit, so verified email is not a prerequisite for submission).

---

## 11. DIRECTORY & FILTERING BEHAVIOR

### View Modes
The directory supports two view modes, toggled by the user via tabs:
- **List view** — group cards displayed vertically with infinite scroll. As the user scrolls, more groups load automatically. No traditional pagination.
- **Map view** — interactive map (Leaflet-based) displaying group locations as markers. Groups visible in the list update dynamically based on the current map viewport (bounding box filtering).

### Map Clustering
- At zoomed-out levels, nearby group markers must be **clustered** into a single bubble displaying the count of groups in that area.
- As the user zooms in, clusters break apart into individual markers.
- Individual markers must display the **group photo** (thumbnail) and **group name**.
- Clicking a marker opens the group card or navigates to the group detail page.
- Clustering library: Leaflet.markercluster or equivalent.

### Geolocation
- **Primary:** ZIP code input with distance radius (miles).
- **"Locate Me" button:** Requests browser GPS permission. If granted, centers on user location.
- **IP fallback:** If user denies GPS permission, fall back to IP-based geolocation (e.g., `ipapi.co/json/`) to approximate location for initial map centering and nearby results.

### Search
- Text query searches across group name and description fields.

### Required Filters

| Filter | Options | Type |
|--------|---------|------|
| **Category** | Board Game Group, DND Group, Social Group, RPG Group, Card Game Group, Other | Multi-select, collapsible panel |
| **Experience Level** | Beginner Friendly, Intermediate, Advanced, All Levels | Multi-select, collapsible panel |
| **Meeting Frequency** | Weekly, Bi-weekly, Monthly, Ad Hoc, Custom | Multi-select, collapsible panel |
| **Privacy** | Public, Private | Multi-select, collapsible panel |
| **Tags** | Strategy, Casual, Social, RPG, Card Games, Miniatures, Competitive, Cooperative, Party, Light, Medium, Heavy, Historical, Fantasy, D&D, Euro Games | Multi-select, collapsible panel |
| **Language** | (dynamic based on data — languages groups are tagged with) | Multi-select, collapsible panel |

### Filter Display Icons
- **Meeting Frequency** filter and display must include a **calendar icon** as a visual indicator wherever frequency is shown (group cards, detail pages, filter panel).

### Filter Behavior
- All filter sections must be **collapsible**.
- All filters support **multiple simultaneous selections** (multi-select).
- Combined filters narrow results correctly (AND logic across filter categories).

### Explicitly NOT Built
- **Group Size filter** — dropped from scope. Do NOT build.

---

## 12. GROUP CARD DISPLAY RULES

The group card is the primary unit in the directory listing. Layout must match the Figma prototype exactly.

### Layout Structure
- **3-column horizontal layout:**
  - Left: Square 128×128px thumbnail with `object-cover` crop. Uses Group Photo if available, otherwise default placeholder.
  - Middle: Content area.
  - Right: CTA button + follow icon.

### Content Area (Middle Column)
- **Group name** with status shield immediately adjacent (per badge priority rules §9).
- **"Organized by [name]"** line with blue checkmark (CheckCircle2, text-blue-500) if `isClaimed + isVerified`. This line is required on every card — not optional.
- **Catchline** — short tagline displayed as the preview hook. Separate field from description.
- **Description** — truncated with CSS line-clamp (shown below catchline, or as primary text if no catchline exists).
- **Tag pills** visible on card. Styled as **light shade background with black text** — no colored pill backgrounds. If a group has more than 6 tags, display the first 5 and show a "+N" indicator for the remainder (e.g., "+3"). This truncation must be wired to real data, not just visual.
- **Meeting Frequency** displayed with a **calendar icon**.
- **Language and tag icons** — visual indicators for languages displayed on card.
- **Contact method icon strip** — small platform icons as indicators only (not full detail, just icons showing which platforms the group uses).
- **Public/Private badge** — blue for Public, gray + lock for Private.

### CTA Column (Right)
- **"View Group"** button (default).
- If group is **private** AND user is **guest**: **"Login to View"** — redirects to sign-in.
- **Heart icon (Follow toggle)** — positioned below the "View Group" CTA button.
  - **Hidden entirely for guests** (not logged in). Do not show a disabled or grayed-out heart.
  - Visible for logged-in users with verified email only (per §14 follow rules).

---

## 13. GROUP DETAIL PAGE RULES

### Platform Integrations
The group detail page must support display of up to 13 platform integrations:

Meetup, Discord, WhatsApp, Facebook, Website, Email, Twitter/X, Instagram, BoardGameGeek (BGG), Reddit, Telegram, Warhorn, Aftergame.

### Conditional Display Rules
- **Discord:** Hidden entirely from guest users. Shown as locked with login prompt. When visible, can be rendered as an embedded widget (via Discord widget protocol) for servers with widgets enabled.
- **WhatsApp:** Hidden entirely from guest users. Shown as locked with login prompt.
- **Facebook:** Hidden from guests AND when group is private. Both conditions must be checked.
  - **Facebook Pages** — embed a live timeline widget (Facebook Page Plugin).
  - **Facebook Groups** — display as a link/CTA card only. Facebook Groups cannot be embedded. This is a platform constraint.
- **Meetup integration:** Only shown if `meetupDetails.privacy = 'Public'`. Displays parsed RSS event data (event name, link) with pagination.

### Group Attributes Display
- Description (full text).
- Catchline (if present).
- Tags displayed as pills — **light shade background with black text** (same styling as group cards §12). No colored pill backgrounds.
- Languages displayed as visual indicators.
- Experience level.
- Meeting frequency with **calendar icon**.
- Neighborhood, city, state, zip.
- Contact methods with platform icons and links.

### Verified Organizer Display
- Blue CheckCircle2 icon (text-blue-500) next to organizer name when `isClaimed: true` AND `isVerified: true`.
- This appears on the detail page AND on group cards in the directory.
- Must be text-blue-500 on both cards and detail page (not text-blue-400).

### Follow Button on Detail Page
- The "Follow this group" button / heart icon must be **hidden entirely for guests** (not logged in).
- Only visible for logged-in users with verified email (per §14 follow rules).

### Action CTA Rules
The primary action CTA on the group detail page changes based on group ownership and user state:

| Condition | CTA Text | Behavior |
|-----------|----------|----------|
| Group is **unclaimed** (`owner_id` is null) | **"Claim This Group"** | Navigates to claim form with group auto-populated |
| Group is **unclaimed** but has a **pending claim** (record exists in group_claimswithstatus: pending) | **"Submit Your Group"** | Navigates to submission form. Group is spoken for — encourage visitor to add their own group. CTA hidden from the claimant who submitted the pending claim. |
| Group is **claimed** AND user **is the owner** | **"Edit This Group"** | Navigates to edit form (submission form in edit mode) |
| Group is **claimed** AND user **is NOT the owner** | **"Submit Your Group"** | Navigates to submission form (encourages user to add their own group) |

### Privacy Gating
- Private groups visited by guests → redirect to sign-in page. Do not show a stripped version of the page.

### Report Listing
- "Report this listing" link on every group page.
- Reports go to the admin review queue.
- Reporter can include a reason (from predefined enum — see Section 18) and a description note.
- Reporter provides their email for follow-up (optional).

---

## 14. PROFILE & SETTINGS PAGES

The profile is a single consolidated page (not nested sub-routes).

### Profile Page
- **Owned groups list:** Groups the user has claimed and been approved for. Each card shows group status. Owner can delete or cancel submission from here.
- **Followed groups list:** Groups the user has followed (toggle from group card/detail). Cards navigate to group detail.
- **Pending claims:** Claimants must see pending/approved/rejected claim status. The profile must query the claims table, not just show approved groups.
- **Edit profile:** Modal or inline editing for display name, phone number, zip code, preferred language.

### Settings Page
- Change password (current password, new password, confirmation).
- Newsletter subscription checkbox toggle (opt-in for future organizer communications).
- **Appearance section:** Removed from spec. Do NOT build.
- **Privacy section:** Removed from spec. Do NOT build.

### Sign Up
- Required fields: name, email, zip code, password.
- OAuth alternative: Google, Facebook, Discord.

### Followed Groups System
- Toggle follow on group cards and group detail pages.
- **Visual indicator:** Heart icon is the approved UI element for the follow toggle.
- **Guest visibility rule:** The heart icon / follow toggle must be **completely hidden** for non-logged-in users. Do not render a disabled or grayed-out version. The UI should show no trace of the follow feature to guests.
- Followed groups list visible in profile page.
- Follow state must persist across sessions.

**Terminology note:** This feature is called "Followed Groups" — not "Favorites." Use "Followed Groups" in all UI text, labels, and tabs. The heart icon is approved as the visual indicator but the text label must always say "Follow" / "Followed Groups."

---

## 15. ADMIN PANEL BEHAVIOR

### Tabs/Sections
- **Pending submissions:** Groups submitted by users (guests and registered) awaiting approval/rejection.
- **Claims:** Incoming claims awaiting admin review.
- **Users:** User management (including ban toggle, verification override).
- **Reports:** Flagged listings from "Report this listing."
- **Full directory:** Browse and manage all groups in the system.

### Admin Actions
- Approve/reject submissions (single and bulk).
- Approve/reject claims (single and bulk).
- Edit any group listing.
- Delete groups.
- Mark groups as verified.
- View and manage users.
- View report queue and take action.
- Suspend/reinstate groups (manual only — removes from directory during investigation).
- Bulk actions: checkboxes, select-all, batch approve/reject.

### Admin Notifications
- Admin receives email alert on every new submission.
- Admin receives email alert on every new claim.
- Admin receives email alert on every reported listing.

### Admin Auth
- Admin role check must be **server-side**, not just UI-based. This is a security requirement.

---

## 16. EMAIL SYSTEM — TRIGGERS & REQUIRED CONTENT

### Email Infrastructure Rules
- Must send from the real site domain (e.g., `noreply@[domain].com`).
- Email service must send from real domain with proper DNS records (SPF, DKIM, DMARC). DNS configuration happens pre-launch.
- Template style: simple plain text or minimal HTML — transactional, not marketing-style.
- Do NOT use SMTP direct from the server. Use a transactional email service.

### All Email Triggers

| # | Email Trigger | Recipient | Required Content |
|---|--------------|-----------|-----------------|
| 0 | **Registration verification** | New user | Verification link, welcome message, what to do next |
| 2 | **Submission confirmation** | Submitter (logged-in only) | Group name received, estimated review time, what happens next |
| 3 | **New submission — admin alert** | Admin | Group name, location, source URL, link to review in admin panel |
| 4 | **New claim — admin alert** | Admin | Claimant name/email, group name, documentation summary, link to review in admin panel |
| 5 | **Claim approved** | Owner | Confirmation, link to owner dashboard, what they can now manage |
| 6 | **Claim rejected** | Claimant | Rejection reason (if provided), how to appeal or re-submit |
| 7 | **Submission approved** | Submitter (if logged-in submitter) | Group is live, link to listing, invite to claim it |
| 8 | **Submission rejected** | Submitter (if logged-in submitter) | Reason (if provided), option to re-submit with corrections |
| 9 | **Listing reported — admin** | Admin | Group name, report reason, reporter note, link to admin review queue |
| 10 | **Listing reported — owner** | Owner | What was flagged, admin is reviewing, no action needed yet |
| 11 | **Admin edited owner's listing** | Owner | What changed, link to view the listing, contact if concerned |
| 12 | **Inactive warning** | Owner | Group marked inactive, deleted in 60 days per BGC policy, reactivation link included |
| 13 | **Password reset** | User | Reset link, expiration note |
| 14 | **Group suspended — owner** | Owner | Group has been suspended for review, what this means, contact admin if questions |

### Email Priority Tiers

| Tier | Emails | Reasoning |
|------|--------|-----------|
| **Must work at launch** | #0, #2–4, #13 (Registration verification, submission confirmation, admin new-submission alert, admin new-claim alert, password reset) | Without these, registration is unverified, admin is blind to activity, and users who forget their password are locked out. |
| **Must work before backfill** | #5–9 (Claim approved/rejected, submission approved/rejected, listing reported — admin) | These close the feedback loop before real users start interacting. |
| **Post-launch (within 30 days)** | #10–12, #14 (Listing reported — owner, admin edited listing, inactive warning, group suspended — owner) | Operational quality emails. More important once volume builds. Suspension notification added for admin moderation workflow. |

---

## 17. SEO TECHNICAL REQUIREMENTS

SEO is a hard technical requirement, not a post-launch enhancement. The entire discovery model depends on organic search.

### URL Structure

| Page | Pattern |
|------|---------|
| Directory home | `/groups/` |
| State page | `/groups/texas/` |
| City page | `/groups/texas/austin/` |
| Group page | `/groups/texas/austin/austins-board-game-night/` |
| Game-type page (FUTURE — not at launch) | `/groups/texas/austin/dungeons-dragons/` |

All URLs must be clean, keyword-rich, and human-readable.

### Meta Tags
- Every public page must have a **unique `<title>`** and **unique `<meta description>`** generated from group/location data.
- Title format for group pages: `[Group Name] — Board Game Group in [City], [State]`
- City and state index pages need their own unique H1s and descriptions.
- No generic site-wide template allowed — every page must be unique.

### Structured Data (JSON-LD)
- Every group listing page must output a JSON-LD block in `<head>` using schema.org types.
- Base type: `schema.org/Organization`
- Required fields:
  - `@type`: Organization
  - `name`: group name
  - `address`: city and state at minimum
  - `url`: the group's external link
  - `description`: group description
  - `sameAs`: pointing to the group's source URL
  - `foundingDate` or `dateModified` where available

### Sitemap
- Auto-generated `sitemap.xml` from the database.
- Must cover all active groups + all city/state index pages.
- Served at `/sitemap.xml`.
- Must regenerate whenever a group is added, approved, or changes status.
- Submit to Google Search Console.

### Robots.txt
- Allow all public routes.
- Disallow: `/admin-dashboard`, `/api/`, auth routes.
- Include sitemap URL at bottom of file.

### Dynamic Rendering (CSR SPA Requirement)
- The site is a client-side rendered SPA. Without dynamic rendering, Google receives empty HTML shells.
- A server or edge worker must detect bot/crawler traffic and route to a prerendering service.
- All public pages must return real HTML with actual content to crawlers.
- This is Google-approved for SPAs and is not cloaking.

### Page Speed
- Target: Lighthouse mobile performance score 85+ before launch.
- Key risks: image optimization, font loading, JavaScript bundle size.
- No third-party ad scripts (confirmed — not part of model).

### City/State Index Pages
- `/groups/:state` and `/groups/:state/:city` routes required.
- Each page needs: unique H1, unique meta title, unique meta description, filtered list of groups for that location.
- These are **primary SEO ranking targets** — not just navigation convenience.

---

## 18. DATA MODEL REQUIREMENTS

These are the fields and schema rules that must exist regardless of backend implementation.

### Required Fields on Groups Table

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID/string | Yes | Primary key |
| `name` | string | Yes | Group name |
| `slug` | string | Yes | URL-safe slug generated from group name. Used in URL path (see §17). **UNIQUE constraint required.** |
| `catchline` | string | No | Short tagline — separate from description. Displays as preview hook on group cards. |
| `description` | text | Yes | Full description, can be any length |
| `city` | string | Yes | City location |
| `state` | string | Yes | State location |
| `zip` | string | Yes | Zip code |
| `neighborhood` | string | No | Neighborhood within the city — finer location granularity for dense urban areas |
| `primary_venue` | string | No | Primary meeting place (e.g., "The Board Room Cafe") |
| `external_url` | string | No | Source link (Meetup, Facebook, etc.). Set by connectors/import scripts only. NOT on the submission form. Manual submissions leave this null and auto-set `source: manual`. |
| `source` | enum | Yes | `manual`, `meetup`, `facebook`, `discord`, `reddit` — how the group entered the system |
| `status` | enum | Yes | `pending`, `active`, `inactive`, `suspended`, `archived`, `deleted` — replaces binary approved boolean. "Suspended" is manual admin hold (see §7). "Deleted" is a soft delete; the row is retained for audit purposes. |
| `claimed` | boolean | Yes | Explicit field — do not derive from `owner_id` null check |
| `owner_id` | reference/null | No | Set when claim is approved |
| `submitted_by` | reference/null | No | User ID if submitted by logged-in user, null if guest submission |
| `privacy` | enum | Yes | `Public`, `Private` |
| `is_verified` | boolean | Yes | Set by admin after claim approval verification |
| `last_updated` | timestamp | Yes | Auto-set on any edit |
| `last_verified` | timestamp | No | Set when admin or owner explicitly verifies listing is active. Drives future lifecycle automation. |
| `created_at` | timestamp | Yes | Auto-set on creation |
| `group_photo` | file/URL | No | Group Photo — primary image (16:9 aspect ratio — see Section 19). Used on detail page header and as 128px card thumbnail. If not provided, system assigns default placeholder. |
| `group_banner` | file/URL | No | Group Banner — optional secondary image (3:1 aspect ratio — see Section 19). If not provided, system assigns default placeholder. |
| `submission_note` | text | No | Free-text note from submitter to admin. Visible only in admin review queue. Not public-facing. Not shown on group cards or detail pages. |
| `category_ref` | reference | Yes | Single category from enum table. Required on submission form. |
| `tags` | array/relation | No | Many-to-many. Values: Strategy, Casual, Social, RPG, Card Games, Miniatures, Competitive, Cooperative, Party, Light, Medium, Heavy, Historical, Fantasy, D&D, Euro Games |
| `language_refs` | array/relation | No | Many-to-many relation to languages enum. What language(s) the group communicates in. |
| `experience_level` | enum | Yes | Beginner Friendly, Intermediate, Advanced, All Levels. Required on submission form. |
| `meeting_frequency` | enum | Yes | Weekly, Bi-weekly, Monthly, Ad Hoc, Custom. Required on submission form. |
| `member_count` | integer | No | Approximate |

### Social Links — Separate Table
Group contact methods / social links should be stored as a **separate relational table** (not a JSON blob on the groups table). This is cleaner for querying individual platforms and matches the proven architecture.

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID/string | Primary key |
| `group_id` | reference | FK to groups table |
| `platform` | enum | discord, facebook, whatsapp, website, email, twitter, instagram, bgg, reddit, telegram, warhorn, aftergame, meetup |
| `url` | string | The platform URL or contact value |

### Meetup Event Data — Separate Table
Scraped Meetup event data should be stored in its own table, not on the groups table.

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID/string | Primary key |
| `group_id` | reference | FK to groups table |
| `event_name` | string | Event title from RSS |
| `event_time` | datetime | Event date/time |
| `event_url` | string | Link to Meetup event |

### Required Fields on Group Claims Table

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID/string | Yes | Primary key |
| `group_id` | reference | Yes | **Partial unique index required:** UNIQUE(group_id) WHERE status IN ('pending', 'approved') — prevents duplicate active claims, allows resubmission after rejection. |
| `user_id` | reference | Yes | Who is claiming |
| `relationship` | string | Yes | Relationship to group (Founder, Organizer, Admin, Moderator, Member, Other) |
| `relationship_other` | string | No | Free text if "Other" was selected |
| `contact_email` | string | Yes | Contact email for follow-up |
| `phone` | string | No | Optional |
| `additional_details` | text | No | Supporting information |
| `documentation` | file/URL | Yes | **Required.** Uploaded proof of group ownership (any file type, 10MB max). Primary trust signal for admin review. |
| `status` | enum | Yes | `pending`, `approved`, `rejected` |
| `created_at` | timestamp | Yes | Auto-set |
| `reviewed_at` | timestamp | No | When admin took action |
| `rejection_reason` | text | No | If rejected |

### Edit Suggestions Table

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | UUID/string | Yes | Primary key |
| `group_id` | reference | Yes | FK to groups table |
| `status` | enum | Yes | `pending`, `approved`, `rejected` |
| `submitted_by` | reference/null | No | User ID if submitted by logged-in user, null if guest |
| `contact_email` | string | No | Optional — guest or user can provide for follow-up |
| `supporting_details` | text | No | Optional — context or proof for the suggested edit (e.g., link to source, explanation) |
| `created_at` | timestamp | Yes | Auto-set |
| `reviewed_at` | timestamp | No | When moderator/admin took action |

### Users Table Extensions
Beyond standard auth fields (email, password, verified):

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Display name |
| `phone` | string | Optional |
| `zip` | string | Location |
| `prefer_language` | enum | en, zh, es, ja — for i18n |
| `user_role` | enum | `user`, `moderator`, `admin` |
| `avatar` | string/URL | Dicebear-generated or uploaded |
| `newsletter_opt_in` | boolean | Default false |

### Enum Tables
Enums should be stored as **separate database tables** with their own IDs. A frontend store downloads them at app load and translates IDs into localized display strings. This supports i18n and makes enum values manageable without code deploys.

#### Locked Enum Values

**Categories:** Board Game Group, DND Group, Social Group, RPG Group, Card Game Group, Other

**Tags:** Strategy, Casual, Social, RPG, Card Games, Miniatures, Competitive, Cooperative, Party, Light, Medium, Heavy, Historical, Fantasy, D&D, Euro Games

**Experience Levels:** Beginner Friendly, Intermediate, Advanced, All Levels

**Meeting Frequencies:** Weekly, Bi-weekly, Monthly, Ad Hoc, Custom

**Privacy Levels:** Public, Private

**Report Reasons:** Inaccurate Information, Duplicate Listing, Group No Longer Active, Inappropriate Content, Spam or Advertising, Other

**Claim Relationships:** Founder, Organizer, Admin, Moderator, Member, Other

**Languages:** (dynamic — populated as needed, localized into en, zh, es, ja)

### Schema Rules
- `source` field must exist before any backfill import runs.
- `status` enum must exist before any backfill import runs.
- Both migrations must deploy before any import job is triggered.
- Backfill imports must run in **batched jobs** — not mass-concurrent writes. Database write concurrency is a bottleneck risk.
- A **partial unique index** UNIQUE(name, city, state) WHERE status != 'deleted' must exist on the groups table. This prevents duplicate group names in the same location while freeing the name when a group is soft-deleted.

---

## 19. IMAGE HANDLING

### Group Photo (Primary Image)
- **Aspect ratio:** 16:9
- **Max file size:** 10MB
- **Upload method:** Drag-and-drop zone with file browser fallback.
- **Crop behavior:** User can pinch, drag, resize, and position the image within a forced 16:9 aspect ratio bounding box. Cropper enforces the ratio — user cannot break it.
- **Output format:** Compressed to WebP for performance.
- **Display:** Appears as the group's header image on the detail page and as the 128×128 thumbnail on group cards (center-cropped with `object-cover`).

### Group Banner (Optional Secondary Image)
- **Aspect ratio:** 3:1
- Same upload and crop behavior as Group Photo but with 3:1 ratio constraint.

### Default Placeholder Images
- If a group does not have a **Group Photo** uploaded, the system must display a **default placeholder image** on the group card thumbnail and detail page header. The placeholder should be a branded BGC default — not a broken image or empty space.
- If a group does not have a **Group Banner** uploaded, the system must display a **default placeholder banner** wherever the banner would normally appear.
- Placeholders are assigned after group submission/approval. They are not user-selectable.

### Validation
- Reject files that are not images (validate extension and MIME type).
- Reject files over 10MB.
- Show clear error messaging on rejection.

### Profile Avatars
- Users who don't upload a photo get a **Dicebear SVG avatar** auto-generated on account creation.

---

## 20. CONNECTOR BEHAVIOR & VALIDATION

Connectors pull group data from external platforms into the BGC database.

### General Connector Rules
- Every scrape run must log: groups pulled, groups skipped (and why), duplicates detected, errors encountered.
- **De-duplication must run before insert.** Same external URL = same group. Never create two BGC records for one external group.
- All scraped groups default to: `claimed: false`, `source: [platform]`, `status: pending` (or `active` if data quality threshold met).
- Schedule a re-scrape cadence of 60–90 days after initial import.
- Claimed listings are **never auto-updated by the scraper** — the owner controls the data entirely.

### Meetup Connector
- Highest priority source. Cleanest and highest-value data.
- RSS-based, queue-triggered.
- Must pull groups by location (city/state or lat/long radius).
- Must correctly map Meetup fields to BGC database fields — no null crashes on missing fields.
- Must parse: event name, event time, event URL, location, description, attendee count (where available).
- Must handle API errors gracefully: rate limits, 404s, auth expiry.
- Must de-duplicate on repeated runs.
- Must have retry logic with exponential backoff.
- Must have auto-update schedule (re-scrape active groups every 60–90 days).
- **Limitation (accepted):** Meetup RSS is limited to recent events and public groups only. No pagination beyond what RSS provides. This is a platform constraint, not a bug.

### Facebook Connector
- Assess what data is actually accessible via current API before investing build time.
- Facebook Graph API is heavily restricted for groups.
- Decision required: keep display logic (URL only), upgrade to full connector, or show URL only.
- Must capture city/location data (Facebook location data is inconsistent).
- Must de-duplicate on repeated runs.
- Must have a fallback for groups where data is partially blocked.
- **Display distinction:** Facebook Pages can be embedded (Page Plugin timeline). Facebook Groups cannot be embedded — show as link card only. This is a platform constraint.

### Discord Connector
- Must confirm geographic anchor — Discord servers without a location in the name/description are not useful for a location-based directory.
- Must pull server metadata: name, description, invite link, member count.
- Discord widget embed supported for servers with widgets enabled.
- Must NOT pull chat messages.
- Must de-duplicate on repeated runs.
- Validate field mapping against BGC data model before any import.

### Backfill Source Priority
1. Meetup (highest value, structured, public, location-tagged)
2. Facebook Groups (large volume, access restrictions)
3. Reddit (manual curation needed — scrape posts/wikis for group mentions)
4. Discord (geographically anchored servers only)
5. BoardGameGeek (guilds/groups section — check API ToS)
6. Google Maps (stretch goal — ToS concerns)

### What to Capture Per Group (Minimum for Import)

| Field | Required for Launch? |
|-------|---------------------|
| Group name | **Yes** |
| City + State | **Yes** |
| Description | **Yes** |
| External URL (source link) | **Yes** |
| Source platform | **Yes** (set by import script) |
| Member count | No |
| Meeting frequency | No |
| Games played / focus | No |
| Last active date | No |
| Group photo | No |
| Contact method URLs | No |

Missing fields are acceptable — a partial listing is better than no listing. The owner completes it when they claim.

---

## 21. ANALYTICS & ERROR TRACKING BEHAVIOR

### Google Analytics (GA4)
- Must be integrated before the site receives any traffic.
- Custom events required:
  - Group page view
  - Claim button click
  - Submission form start
  - Submission form complete
  - Claim form complete

### Sentry Error Tracking
- Frontend + Backend.
- Must alert on: any unhandled exception, 5xx errors, failed email sends, connector failures.
- Errors in claim flow and submission flow are highest priority.
- Alerts must fire to Roderick and Young by email.

### Google Search Console
- Create property when domain is live.
- Submit sitemap when backfill is complete.
- Verify via DNS TXT record.
- Monitor: indexation rate (target >80% of active pages indexed within 30 days of launch).

---

## 22. SECURITY REQUIREMENTS

- **CAPTCHA:** Cloudflare Turnstile or reCAPTCHA (third-party, not custom) required on: submission form, user registration, claim form.
- **Email verification:** Registration requires email confirmation before accessing claim and follow features. Submission is exempt.
- Server-side rate limiting on all public POST endpoints.
- Admin role check must be **server-side** — not just UI-based.
- All secrets in environment variables. Never hardcoded in source code. `.env` excluded from git.
- Never expose the database port publicly in Docker or production.
- All public pages must return real HTML to crawlers via dynamic rendering — not empty SPA shells.
- Email must send from the real domain with SPF, DKIM, DMARC configured.
- Sanitize all user input before database storage — prevent XSS from rich text, RSS content, or map data injection.

---

## 23. TERMINOLOGY STANDARDS

These exact strings must appear in all UI labels, buttons, tooltips, badges, and copy. No variations allowed. All terms must be localized through the i18n system for non-English locales.

| ✅ Always Use | ❌ Never Use | Where It Applies |
|--------------|-------------|-----------------|
| **Board Game Group** | boardgame group / board-game group | All group type references |
| **Organizer** | Owner / Host / Manager | Person who runs the group — all UI |
| **Processing** | Pending Review / Under Review | Badge for inactive/under-review groups |
| **Claim This Group** | Claim Group / Unclaimed | Badge CTA for unclaimed groups |
| **Pending Verification** | Awaiting Verification / Unverified | Badge for claimed but unverified |
| **Verified** | Approved / Confirmed / Authenticated | Green verified badge label |
| **Login to View** | Sign In / Register to See | CTA for locked private content |
| **View Group** | See More / Details / Open | Primary CTA on group cards |
| **Followed Groups** | Favorites / Bookmarks / Saved | User's followed groups list in profile |
| **Follow** | Favorite / Save / Bookmark | Action to follow a group |
| **Submit Your Group** | Add Group / Create Listing | CTA on detail page for non-owners of claimed groups |
| **Edit This Group** | Manage / Update | CTA for group owners on their own listing |
| **Pending Submissions** | Pending Approvals | Admin tab for submissions awaiting review |
| **Group Photo** | Cover Image / Group Image / Profile Icon | Primary group image (16:9) |
| **Group Banner** | Banner Image / Header Image / Cover | Secondary group image (3:1) |

**Visual note:** The heart icon (♥) is the approved visual indicator for the Follow/Unfollow toggle. The icon is a heart, but the text label and tooltip must always say "Follow" / "Unfollow" / "Followed Groups" — never "Favorite."

---

## 24. DO NOT BUILD

These features are explicitly out of scope for BGC. They do not belong in a directory product.

- **Event management or RSVPs** — platform feature, not directory.
- **Group chat or messaging** — platform feature.
- **Member management** beyond the owner/claim relationship.
- **Mobile app** — mobile-optimized web is sufficient.
- **Game-type sub-pages** (e.g., `/groups/texas/austin/dungeons-dragons/`) — post-launch backlog. Need data volume first.
- **Group size filter** — dropped from scope.
- **Display ads or AdSense** — not the business model.
- **Member count or activity status display on listings** — too lightweight for current stage.
- **Appearance section in Settings** — removed from prototype.
- **Privacy section in Settings** — removed from prototype.
- **Stale/last-updated date display** — not at launch. Unclaimed badge is sufficient. Backend tracks the field for future use.
- **Custom captcha system** — use third-party (Cloudflare Turnstile or reCAPTCHA).

---

## CHANGELOG

| Date | Version | Change | Author |
|------|---------|--------|--------|
| March 2026 | 2.0 | Initial V2 Logic File created from Master Roadmap v4.0, Gap Analysis, and Audit Results | Roderick Wells |
| March 2026 | 2.1 | Cross-comparison update: 16 decisions integrated from old-site codebase audit. Added: i18n (Section 2), Registration & Auth with OAuth + email verification (Section 4), Image Handling (Section 19). Updated: Directory with map view, infinite scroll, language filter, IP fallback (Section 11). Group Card with catchline, language icons (Section 12). Group Detail with Facebook Page/Group distinction (Section 13). Profile consolidated with Followed Groups terminology, newsletter toggle (Section 14). Data Model with catchline, neighborhood, zip, language_refs, social links table, meetup events table, users extensions, enum tables (Section 18). Security with input sanitization (Section 22). Terminology with Followed Groups (Section 23). Added registration verification as email #0, password reset as email #13 (Section 16). | Roderick Wells |
| March 2026 | 2.2 | Figma + Cursor gap analysis reconciliation. 10 decisions integrated: (1) Guest submission allowed — §3, §5, §7, §10, §15, §16, §22 updated. (2) Followed Groups terminology confirmed with heart icon approved — §14, §23 updated. (3) Claim form fields rewritten with Relationship dropdown, auto-populate from listing, contact email, optional phone/details/docs — §6, §18 updated. (4) Four tags added (Historical, Fantasy, D&D, Euro Games) — §11, §18 updated. (5) Moderator role confirmed in scope. (6) Report reasons locked (6 values) — §18 updated. (7) Collapsible multi-select filters confirmed — §11 confirmed. (8) All 5 frequencies confirmed — §11 confirmed. (9) Categories locked (6 values) — §11, §18 updated. (10) Detail page CTA rules added for non-owners — §13, §23 updated. Also added: primary_venue and submitted_by fields to groups table, online presence section to submission form, claim form entry point rules, all enum values explicitly listed in §18. | Roderick Wells |
| March 21, 2026 | 2.3 | Codebase audit decisions. (1) Claim email verification (Email #1) removed — documentation upload is the trust signal, not email token. §6: Automated Email Verification Step removed. §16: Email #1 removed, priority tiers updated. §22: Claim token reference removed. (2) Claim form documentation changed from optional to required — §6, §18 updated. (3) Contact email description updated to "follow-up" not "verification" — §6, §18. (4) Email #4 (admin claim alert) updated to include documentation summary. Resend confirmed as email provider (Roadmap only, not Logic File scope). | Roderick Wells |
| March 21, 2026 | 2.3 | Bug fixes from cross-verification audit. §6: Claim guard changed from bare UNIQUE(group_id) to partial unique index WHERE status IN ('pending', 'approved') — allows resubmission after rejection. §7: Added clarification that "Deleted" is a soft delete (row retained for audit). Added note that "Verified" in §7.2 refers to is_verified boolean, not a status enum value. §18: Added 'deleted' to status enum. Added partial unique index UNIQUE(name, city, state) WHERE status != 'deleted' on groups table — frees group names on soft delete. | Roderick Wells |
| March 21, 2026 | 2.4 | Logic audit — 9 fixes. §7: "Deleted" rows updated to soft-delete language. Added Suspended state (manual admin hold, timers pause, owner notified via Email #14). §9: Processing badge condition changed from isActive:false to status != 'active'. §13: Fourth CTA state added — pending claim shows "Submit Your Group". §15: Suspend/reinstate added to admin actions. §16: Email #13 (password reset) moved to Tier 1. Email #14 (group suspended — owner) added. §18: slug field added to groups table (UNIQUE). 'suspended' added to status enum. edit_suggestions table gets submitted_by, contact_email, supporting_details fields. | Roderick Wells |
| March 21, 2026 | 2.5 | Testing bugs and feature scoping. §5: Submission form rewritten — single-page (no wizard), full field list with required/optional, inline validation, Submission Note field added, guest warning copy updated with sign-in prompt, header copy updated, external_url excluded from form. §9: Verified badge locked as near-white bg + green text (Option C with border/shadow on detail hero), Rejected badge added (submitter + admin only), sentence case enforced, tooltip parity required, design options log added. §11: Map clustering added (bubble counts, zoom-to-break, group photo + name on markers), calendar icon for Meeting Frequency. §12: Tag pill styling changed to light shade + black text, tag truncation rule (5 + "+N"), heart icon moved below CTA (hidden for guests), Organized by line required, Meeting Frequency calendar icon. §13: Follow button hidden for guests, tag styling updated, calendar icon for frequency, checkmark color locked at text-blue-500. §14: Heart icon completely hidden for guests (not disabled). §18: image renamed to group_photo, group_banner added, submission_note added, category_ref/experience_level/meeting_frequency changed to Required, external_url changed to Not Required (backend-only). §19: Renamed to Group Photo + Group Banner, default placeholder images added. §23: Group Photo and Group Banner terminology added. | Roderick Wells |

---

*BGC 2.0 System Logic File · Version 2.5 · Controlled by Roderick Wells · Confidential*
