# App Contract

This document defines the app at the level needed for MVP planning and implementation.
For the broader LMS market feature set, see [lms_market_feature_inventory.md](./lms_market_feature_inventory.md).

## 1. Product Definition

**App name:** LMS  
**App type:** Web app  
**Primary purpose:** Help users follow a training path, consume learning material, and prove mastery through assessments.  
**Primary user:** Learner / trainee  
**Secondary users:** Instructor, manager, admin, content author

## 2. Problem Statement

What problem does the app solve?

- Users need a structured way to follow role-based training paths, study content in sequence, and complete assessments that prove they understand the material.

## 3. Target Users

Who is this for?

- Primary user: Learner / trainee
- Secondary user: Instructor, manager, or team lead
- Admin or operator: LMS admin or content manager

## 4. Core Use Case

What is the single most important user journey in the MVP?

1. User signs in and sees the training path assigned to them.
2. User opens the assigned training path.
3. User studies the path materials in order.
4. User completes quizzes or tests tied to the path.
5. User sees progress and completion status.

## 5. MVP Scope

### In Scope

- Training paths with ordered modules or lessons.
- Learning content such as text, files, links, or embedded media.
- Basic assessments or quizzes for completion.
- Progress tracking and completion status.
- Learner login or identity handling.
- Simple admin or instructor ability to create, assign, and manage paths and content.
- Basic error handling, loading states, and retry behavior.
- Basic security, access control, and deployment requirements.

### Out of Scope

- Advanced reporting and analytics.
- Social or community features such as forums or chat.
- Complex grading workflows.
- Deep customization or theming.
- Multi-tenant enterprise administration unless required for launch.
- Mobile apps unless the MVP is explicitly mobile-first.

## 6. Functional Requirements

The app must:

- Allow learners to view training paths and their required materials.
- Allow learners to complete modules and assessments in sequence.
- Track module completion, assessment results, and overall progress.
- Show whether the learner has passed or completed the path.
- Persist the minimum data needed for users, paths, content, progress, and results.
- Provide feedback for success, failure, and loading states.
- Protect data and actions according to role and access level.

## 7. Non-Functional Requirements

- Usable on the intended target devices.
- Accessible enough for the MVP to be usable.
- Secure enough for the MVP to avoid obvious exposure.
- Reliable enough to support early users.
- Simple enough to build and maintain quickly.
- Clear enough that a learner can complete a path without training on the app itself.

## 8. Key Constraints

- MVP should favor a simple web-based experience over platform-specific clients.
- Content management should stay lightweight so training paths can be created quickly.
- Completion should be measurable with minimal manual intervention.
- The first version should avoid overbuilding enterprise LMS features that are not needed for the core flow.

## 9. Assumptions

- Learners are the primary day-to-day users.
- At least one admin or instructor role exists to create and manage paths.
- Training paths are the core organizational unit of the product.
- Learners do not self-enroll into paths in the MVP.
- Assessment is required to mark a path as complete.
- The MVP can start with a small number of content types and a simple scoring model.

## 10. Risks

- Scope creep into full enterprise LMS behavior.
- Overbuilding content authoring or reporting before validating learner flow.
- Unclear rules for path completion, retries, or passing scores.
- Weak role separation between learners and admins.
- Underestimating security or data handling needs.

## 11. MVP Decisions

These are the recommended defaults for the MVP.

- Content types: text, links, files, and basic quizzes.
- Path assignment: admin-assigned only.
- Passing threshold: 80 percent or better, unless a path owner specifies otherwise.
- Retry policy: allow retakes with no complex lockout in the first version.
- Reporting: basic completion and pass/fail status for admins and managers.
- Certificates or badges: out of scope for MVP unless explicitly required.
- Progress tracking: yes, at the module and path level.
- Admin management: simple path and content creation only.

## 12. Open Questions

These can remain open until implementation details require a final choice.

- Do any paths require prerequisites before enrollment?
- Should learners be able to browse assigned vs available paths, or only assigned paths in the MVP?
- Should assessments be graded only by score, or also by required completion of all modules?
- Do admins need manual override for completion or reassignment?
- Are there any compliance or retention rules for training records?

## 13. Definition of Done for MVP

The MVP is done when:

- The core workflow works end to end.
- The app is usable by a real user.
- The main data path is reliable.
- Basic security, testing, and deployment are in place.
- The team can measure whether the product is worth continuing.

## 14. MVP Coverage Checklist

The following areas should be represented somewhere in the project docs, even if they are not all MVP scope:

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

Recommended LMS MVP defaults:

- Learner-facing login required.
- Admin-assigned paths only.
- Text, links, files, and basic quizzes as initial content types.
- Progress tracking at the module and path level.
- Basic completion and pass/fail reporting.
- Simple deployment target that is container-friendly.
- No advanced integrations unless they are required for launch.

## 15. Reference Appendix

- [lms_market_feature_inventory.md](./lms_market_feature_inventory.md)
