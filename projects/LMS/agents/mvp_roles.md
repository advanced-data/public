# MVP Role Model

For an MVP, the goal is not to staff every possible discipline separately. The goal is to cover the minimum set of responsibilities needed to ship, learn, and avoid obvious failure modes.

## Must-Have Roles

### Product / Planner

- Defines the MVP scope.
- Decides what is in and out.
- Writes acceptance criteria.
- Prioritizes the smallest useful workflow.

### UX / UI

- Designs the core user journey.
- Makes the primary flow understandable.
- Covers empty states, loading states, and error states.
- Keeps the interface simple and usable.

### Frontend Engineer

- Implements the user interface.
- Connects screens to data and state.
- Handles client-side validation and basic interactions.
- Ensures the MVP works on the target form factor.

### Backend Engineer

- Implements APIs and business rules.
- Handles authentication and core server logic.
- Connects the app to external services if needed.
- Keeps the system simple and reliable.

### Database / Data Model

- Defines the minimum schema.
- Adds constraints that prevent bad data.
- Supports the core app workflow.
- Avoids premature optimization.

### QA / Testing

- Verifies the core flow works end to end.
- Checks obvious regressions.
- Confirms error handling and edge cases.
- Makes sure the MVP is stable enough to use.

### Security

- Reviews auth and permission boundaries.
- Checks for obvious data exposure risks.
- Ensures secrets are handled safely.
- Flags any high-risk shortcuts.

### DevOps / Deployment

- Sets up the simplest deployment path.
- Ensures the app can be built and released repeatedly.
- Handles basic environment configuration.
- Keeps operations as light as possible.

## Usually Combined in an MVP

- `Project Manager` and `Scrum Master` are usually folded into planning or engineering leadership.
- `Business Analyst` is usually folded into product or planning.
- `Software Architect` is usually folded into backend, database, or technical lead decisions.
- `UI` and `UX` are often one person or one agent.
- `Mobile` specialization is only separate if the MVP is mobile-first.

## MVP Rule of Thumb

If a role does not help you:

1. define the MVP,
2. build the core flow,
3. verify it works,
4. or ship it safely,

then it should probably be merged into another role for the MVP phase.
