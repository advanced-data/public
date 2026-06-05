# LMS MVP Build Plan

This plan is the first concrete output of the role collaboration. It converts the contract into an implementation sequence.

## Product

Goal: ship a learner-first LMS with admin-assigned training paths, sequential material consumption, and assessment-based completion.

Immediate decisions:

- Keep path selection admin-only in MVP.
- Keep the learner journey narrow and explicit.
- Defer advanced LMS features to later phases.

## Frontend

Primary surfaces:

- Login / identity entry
- Assigned path overview
- Module / lesson reader
- Quiz / assessment view
- Progress / completion view
- Lightweight admin path/content editor

UX requirements:

- Clear loading, empty, error, and success states.
- Strong readability and obvious progression.
- Accessibility from the start.

## Backend

Core responsibilities:

- Auth and role-aware access control
- Path assignment and retrieval
- Module sequencing
- Assessment submission and grading
- Progress persistence and completion calculation

Suggested API surface:

- `GET /me`
- `GET /assigned-path`
- `GET /paths/:id`
- `POST /paths/:id/assign`
- `POST /modules/:id/complete`
- `POST /assessments/:id/submit`
- `GET /progress/:pathId`

## Database

Core entities:

- users
- roles
- paths
- modules
- assessments
- assessment_attempts
- module_completions
- path_completions

Key constraints:

- Paths must remain ordered.
- Completion must be derivable from stored progress.
- Assessment attempts must retain score and timestamp history.

## Security

Required checks:

- Learners can only access assigned content.
- Admin actions are protected separately.
- Sensitive fields are not exposed in public responses.
- Secrets stay out of source control.

## QA

Core test coverage:

- learner can sign in and see assigned path
- learner can open content in order
- learner can submit quiz and receive pass/fail
- learner progress updates correctly
- admin can assign and manage paths

## DevOps

Minimum deployment shape:

- container-friendly app
- simple environment variable setup
- repeatable build and release steps
- no unnecessary infrastructure

## Review

Review criteria:

- every role output matches the contract
- no role overreaches its boundary
- MVP stays admin-assigned and learner-focused
- no missing dependency blocks implementation
