# App Contract Template

This template defines the minimum contract structure for a new app before implementation begins.

Use it as the canonical starting point for a project-specific contract. Keep the project-specific reference docs in place for context and reuse:

- LMS example: [LMS/app_contract.md](./LMS/app_contract.md)
- MVP agent boundaries: [LMS/mvp_agent_contract.md](./LMS/mvp_agent_contract.md)
- MVP build briefs: [LMS/mvp_build_briefs.md](./LMS/mvp_build_briefs.md)
- Market feature inventory example: [LMS/lms_market_feature_inventory.md](./LMS/lms_market_feature_inventory.md)
- Contract interview plan example: [ai-council/post-fight-contract-interview-plan.md](./ai-council/post-fight-contract-interview-plan.md)

## 1. Product Definition

State the identity and purpose of the app.

- App name:
- App type:
- Primary purpose:
- Primary user:
- Secondary users:

## 2. Problem Statement

Define the user problem the app is intended to solve.

- What problem does the app solve?

## 3. Target Users

Identify who uses the app and who administers it.

- Primary user:
- Secondary user:
- Admin or operator:

## 4. Core Use Case

Define the one workflow the MVP must support end to end.

- What is the single most important user journey in the MVP?
- What is the beginning state?
- What is the end state?

## 5. MVP Scope

### In Scope

- Core workflow required to solve the main problem.
- Minimal account or identity handling, if needed.
- Minimal data storage, if needed.
- Basic error handling and loading states.
- Basic security and deployment requirements.

### Out of Scope

- Nice-to-have workflows.
- Advanced analytics.
- Complex admin tooling.
- Multi-role edge cases unless required for the core flow.
- Deep customization or configuration.

## 6. Functional Requirements

Specify the behaviors the app must support.

- Allow the primary user to complete the core use case.
- Persist or retrieve the minimum data needed.
- Provide feedback for success, failure, and loading states.
- Protect data and actions according to the access model.

## 7. Non-Functional Requirements

Specify the quality bar for the MVP.

- Usable on the intended target devices.
- Accessible enough for the MVP to be usable.
- Secure enough for the MVP to avoid obvious exposure.
- Reliable enough to support early users.
- Simple enough to build and maintain quickly.

## 8. Key Constraints

Record the limits that shape the design and implementation.

- Technical constraints:
- Business constraints:
- Timing constraints:

## 9. Assumptions

Record the assumptions that the contract depends on.

- Assumptions about users:
- Assumptions about content/data:
- Assumptions about operations:
- Assumptions about stack/infrastructure:

## 10. Risks

List the main risks that could compromise the MVP.

- Scope creep.
- Overbuilding before validating demand.
- Underestimating security or data handling needs.
- Unclear ownership of the core user workflow.

## 11. MVP Decisions

Lock the defaults that the team should implement unless a later decision changes them.

- Content types:
- Assignment model:
- Completion model:
- Reporting model:
- Retry or remediation model:
- Optional features explicitly excluded:

## 12. Open Questions

List the remaining decisions that cannot be safely resolved yet.

- What needs confirmation before implementation?
- What can remain unknown for MVP?
- What decisions must be revisited later?

## 13. Definition of Done for MVP

The MVP is complete when all of the following are true:

- The core workflow works end to end.
- The app is usable by a real user.
- The main data path is reliable.
- Basic security, testing, and deployment are in place.
- The team can measure whether the product is worth continuing.

## 14. Coverage Checklist

The contract should explicitly include the following areas:

- Product intent and primary users.
- MVP scope and non-goals.
- UX routes and screens.
- Core workflows.
- Data model.
- Integrations, including explicit "none for MVP" where applicable.
- Build stack and infrastructure defaults.
- Security, privacy, and compliance.
- Operational and admin requirements.
- Acceptance criteria and test plan.
- Agent task breakdown.
- Open decisions.

## 15. Agent Boundaries

Document the roles that will work on the app and where each role begins and ends.

Recommended roles:

- Product / planner
- Frontend
- Backend
- Database
- Security
- QA
- DevOps
- Review / integration

For each role, note:

- what it owns,
- what it must not decide alone,
- what output it must produce,
- and what it needs from other roles.

## 16. Reference Appendix

Add any project-specific research, feature inventory, or interview-plan documents here.
