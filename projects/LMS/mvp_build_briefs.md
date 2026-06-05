# MVP Build Briefs

These briefs translate the app contract into role-specific responsibilities for the MVP.

## Product

- Own the MVP scope and reject nonessential features.
- Keep the product centered on training paths, study flow, and assessment completion.
- Assume paths are admin-assigned only in the MVP.
- Decide what is in scope, what is out of scope, and what success means.
- Resolve ambiguity around learner flow and admin expectations.

## Frontend

- Build the learner experience for the assigned path, viewing modules, and taking quizzes.
- Present the assigned path first; do not emphasize path browsing in MVP.
- Keep the interface simple, readable, and easy to complete without extra training.
- Show loading, empty, error, progress, and completion states.
- Support a lightweight admin experience for creating or editing paths and content.

## Backend

- Implement APIs for users, paths, modules, assessments, progress, and results.
- Enforce access rules for learners, admins, and managers.
- Support admin-assigned paths only for MVP.
- Keep the business logic simple and reliable for MVP completion tracking.

## Database

- Define schema for users, roles, paths, modules, assessment items, attempts, and completion records.
- Add constraints that preserve valid ordering and scoring data.
- Keep the model simple enough for fast iteration but strong enough for progress tracking and reporting.
- Support future expansion without overengineering the first version.

## Security

- Review authentication, authorization, and role boundaries.
- Make sure learner data and assessment results are not exposed improperly.
- Ensure secrets, tokens, and admin actions are handled safely.
- Flag any risky shortcuts before launch.

## QA

- Test the core learner workflow end to end.
- Verify path assignment, module progression, assessment submission, pass/fail logic, and completion display.
- Check obvious error cases, retries, and edge states.
- Confirm that the MVP is usable and stable enough to ship.

## DevOps

- Keep deployment simple and repeatable.
- Set up the minimal environment variables and release process.
- Ensure the app can be built, deployed, and run consistently.
- Avoid unnecessary infrastructure for the MVP.

## Review

- Compare role outputs and resolve conflicts.
- Check that the MVP stays inside scope.
- Confirm the app contract, build plan, and implementation sequence all match.
- Call out missing decisions before implementation starts.
