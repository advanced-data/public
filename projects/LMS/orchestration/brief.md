# LMS Shared Brief

This brief is the shared input for all LMS role workers.

## Contract Summary

- Build a web-based LMS MVP.
- Learners receive admin-assigned paths only.
- Learners follow ordered modules and complete assessments.
- Progress and completion must be tracked.
- Admins can create, assign, and manage paths and content.

## Non-Negotiables

- No learner self-enrollment in MVP.
- Keep the first version simple and container-friendly.
- Avoid enterprise LMS features unless they are required for launch.
- Keep the contract and the implementation aligned.

## Current Build State

- Web scaffold exists under `web/`.
- Contract docs are in place.
- In-memory routes and Prisma schema scaffolding exist.
- The next step is to connect the route handlers to persistence and auth.
