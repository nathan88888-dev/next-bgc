# Logic Inconsistencies & Bug Report (March 2026)

This document tracks logical contradictions, ambiguities, and technical bugs identified during the cross-verification of **BGC_V2_Logic (v2.2)**, **BGC_V2_Context**, and **BGC_V2_Roadmap (v1.1)**.

## 1. Database & State Machine Bugs

### 1.1 Duplicate Claim Guard Logic
- **Sources:** `Logic §6.5`, `Logic §18.4`, `Roadmap §0.2.5`
- **Inconsistency:** Both files mandate a `UNIQUE(group_id)` constraint on the `group_claims` table to prevent race conditions.
- **Bug:** If a claim is **rejected**, this table-wide unique constraint prevents any other user (or the original user) from ever submitting a new claim for that group, as a record for that `group_id` already exists. 
- **Required Fix:** The `UNIQUE` constraint should be a **partial index**: `UNIQUE(group_id) WHERE status IN ('pending', 'approved')`. This allows new claims to be filed if previous ones were rejected.

### 1.2 "Deleted" State Missing from Schema
- **Sources:** `Logic §7` (State Machine) vs `Logic §18` (Data Model), `Context §4`
- **Inconsistency:** The Group Lifecycle sections (§7.1, §7.2) specifically define a `Deleted` state/status. However, the database schema table for the `groups` status enum (§18, row 622) only lists `pending, active, inactive, archived`.
- **Bug:** Logic File prescribes a state that the Data Model does not support. 
- **Required Fix:** Add `deleted` to the `status` enum in `Logic §18` and `Context §4`.

---
