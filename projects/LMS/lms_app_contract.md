# LMS App Contract

This document is the project-specific contract for the LMS MVP.

It combines the reusable contract structure, the MVP role boundaries, the LMS market feature inventory, and the contract-readiness rules we established so the team can build from one stable source of truth.

## 1. Product Definition

**App name:** LMS  
**App type:** Web app  
**Primary purpose:** Help users follow assigned training paths, consume learning material in sequence, and prove mastery through assessments.  
**Primary user:** Learner / trainee  
**Secondary users:** Instructor, manager, admin, content author

## 2. Problem Statement

Users need a structured system for role-based training paths, sequential study, completion tracking, and assessment-based proof of understanding.

The app should make it easy to:

- assign training to the right people,
- guide learners through required material in order,
- measure progress and completion,
- and give admins a simple way to manage content and results.

## 3. Target Users

- Primary user: Learner / trainee
- Secondary user: Instructor, manager, or team lead
- Admin or operator: LMS admin or content manager

## 4. Core Use Case

The MVP must support one primary workflow end to end:

1. User signs in and sees the training path assigned to them.
2. User opens the assigned path.
3. User studies the path materials in order.
4. User completes quizzes or tests tied to the path.
5. User sees progress and completion status.

## 5. MVP Scope

### In Scope

- Admin-assigned training paths.
- Ordered modules or lessons inside each path.
- Learning content such as text, files, links, or embedded media.
- Basic quizzes or assessments tied to a path.
- Progress tracking at the module and path level.
- Completion status and pass/fail tracking.
- Learner login or identity handling.
- Simple admin or instructor ability to create, assign, and manage paths and content.
- Basic error handling, loading states, and retry behavior.
- Basic security, access control, and deployment requirements.

### Out of Scope

- Learner self-enrollment into paths.
- Advanced reporting and analytics.
- Social or community features such as forums or chat.
- Complex grading workflows.
- Deep customization or theming.
- Multi-tenant enterprise administration unless required for launch.
- Mobile apps unless the MVP is explicitly mobile-first.
- SCORM, xAPI, cmi5, LTI, monetization, communities, or AI features unless explicitly required for launch.

## 6. Functional Requirements

The app must:

- Allow learners to view the training path assigned to them.
- Allow learners to complete modules and assessments in sequence.
- Track module completion, assessment results, and overall progress.
- Show whether the learner has passed or completed the path.
- Persist the minimum data needed for users, paths, content, progress, attempts, and results.
- Provide feedback for success, failure, and loading states.
- Protect data and actions according to role and access level.
- Allow admins or instructors to create, assign, and manage paths and content.

## 7. Non-Functional Requirements

- Usable on the intended target devices.
- Accessible enough for the MVP to be usable.
- Secure enough for the MVP to avoid obvious exposure.
- Reliable enough to support early users.
- Simple enough to build and maintain quickly.
- Clear enough that a learner can complete a path without training on the app itself.
- Easy enough for admins to create and update training paths without custom engineering work.

## 8. Key Constraints

- The MVP should favor a simple web-based experience over platform-specific clients.
- Content management should stay lightweight so training paths can be created quickly.
- Completion should be measurable with minimal manual intervention.
- The first version should avoid overbuilding enterprise LMS features that are not needed for the core flow.
- Admin-assigned paths are the default. Learners do not self-enroll in the MVP.

## 9. Assumptions

- Learners are the primary day-to-day users.
- At least one admin or instructor role exists to create and manage paths.
- Training paths are the core organizational unit of the product.
- Assessment is required to mark a path as complete.
- The MVP can start with a small number of content types and a simple scoring model.
- The app will use a standard web stack unless changed by a later contract decision.

## 10. Risks

- Scope creep into full enterprise LMS behavior.
- Overbuilding content authoring or reporting before validating learner flow.
- Unclear rules for path completion, retries, or passing scores.
- Weak role separation between learners and admins.
- Underestimating security or data handling needs.
- Treating later-phase market features as MVP requirements.

## 11. MVP Decisions

These are the recommended defaults for the MVP.

- Content types: text, links, files, and basic quizzes.
- Path assignment: admin-assigned only.
- Path browsing: not a learner feature in MVP.
- Passing threshold: 80 percent or better, unless a path owner specifies otherwise.
- Retry policy: allow retakes with no complex lockout in the first version.
- Reporting: basic completion and pass/fail status for admins and managers.
- Certificates or badges: out of scope for MVP unless explicitly required.
- Progress tracking: yes, at the module and path level.
- Admin management: simple path and content creation only.
- Integrations: none required for MVP unless a specific deployment needs one.
- Build stack: simple web app defaults, kept container-friendly and easy to deploy.

## 12. Open Questions

These can remain open until implementation details require a final choice.

- Do any paths require prerequisites before enrollment?
- Should assessments be graded only by score, or also by required completion of all modules?
- Do admins need manual override for completion or reassignment?
- Are there any compliance or retention rules for training records?
- Which integrations, if any, are required for the first launch environment?

## 13. Definition of Done for MVP

The MVP is complete when all of the following are true:

- The core workflow works end to end.
- The app is usable by a real user.
- The main data path is reliable.
- Basic security, testing, and deployment are in place.
- The team can measure whether the product is worth continuing.

## 14. Coverage Checklist

The contract explicitly includes:

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

The project should be divided into the following roles:

- Product / planner
- Frontend
- Backend
- Database
- Security
- QA
- DevOps
- Review / integration

Each role must know:

- what it owns,
- what it must not decide alone,
- what output it must produce,
- and what it needs from other roles.

## 16. Reference Appendix

- [app_contract_template.md](../app_contract_template.md)
- [mvp_agent_contract.md](./mvp_agent_contract.md)
- [mvp_build_briefs.md](./mvp_build_briefs.md)
- [lms_market_feature_inventory.md](./lms_market_feature_inventory.md)
- [post-fight-contract-interview-plan.md](../ai-council/post-fight-contract-interview-plan.md)

