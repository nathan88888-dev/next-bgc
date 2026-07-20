# Completed but "NOT STARTED" Roadmap Items

The following items from the `BGC_V2_Roadmap.md` are marked as `NOT STARTED` but during the QA test have been confirmed as completely implemented and working in the latest codebase (specifically around the `SubmitGroupPage.tsx` implementation):

| # | Item | Description | Dependencies | Status | Logic File |
|---|------|-------------|-------------|--------|------------|
| 2.8.1 | ZIP code lookup fix | ZIP code input on submission form pulls incorrect state (e.g., DC ZIP returns AL). Replace with a reliable, current ZIP code data source that correctly resolves city + state. | 2.2.1 | `NOT STARTED` | §5 |
| 2.8.2 | Submission form — single page rebuild | Convert multi-step wizard to single-page form. All fields visible on one scrollable page. Remove wizard step transitions. Full field list per Logic File v2.5 §5. | 2.2.1 | `NOT STARTED` | §5 |
| 2.8.3 | Submission form — field list update | Ensure all fields match Logic File v2.5 §5 field table. Add: Submission Note (optional, admin-only visibility). Make Category, Experience Level, Frequency required. Remove external_url from form. | 2.8.2 | `NOT STARTED` | §5, §18 |
| 2.8.4 | Submission form — inline validation | Implement real-time inline validation on all fields. Errors shown as user completes each field, not only on submit. ZIP validation confirms lookup. Image validation per §19. | 2.8.2 | `NOT STARTED` | §5 |
| 2.8.5 | Guest warning copy update | Update guest submission warning to: "You are submitting as a guest. This group will be listed as unclaimed and anyone can claim it. Sign in now to automatically claim this group upon submission." | 2.8.2 | `NOT STARTED` | §5 |
| 2.8.6 | Submission page header copy | Replace header with: "Share your board game community with thousands of enthusiasts. Fill out the form below to create a searchable directory entry." | 2.8.2 | `NOT STARTED` | §5 |
| 2.8.23 | Submission note field | Add `submission_note` field to groups table. Text field, optional. Visible only in admin review queue. Not shown on cards or detail pages. Wire to submission form and admin panel. | 0.2.2, 2.8.2 | `NOT STARTED` | §5, §18 |
