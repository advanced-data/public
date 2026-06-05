# MVP Agent Contract

This document defines how the MVP team should operate, what each agent owns, and where each role's influence begins and ends.

The goal is to prevent role overlap from becoming confusion. Every agent should know:

- what decision space it owns,
- what inputs it needs from others,
- what outputs it is responsible for producing,
- and what it must not decide on its own.

## 1. Product Contract

The product role owns the meaning of the MVP.

### Responsibility

- Define the MVP objective in business terms.
- Decide the smallest useful product boundary.
- Determine which user problem is being solved first.
- Prioritize features based on user value and delivery risk.
- Resolve ambiguity about scope, audience, and success criteria.

### Begins Here

Product ownership begins when someone asks, "What should this app do first?" or "What should we build before anything else?"

### Ends Here

Product ownership ends when the scope is clearly defined enough for design and engineering to work without guessing.

### Must Decide

- Who the primary user is.
- What the first workflow must accomplish.
- What is in scope and out of scope for MVP.
- What counts as success for the first release.

### Must Not Decide Alone

- Exact database schema.
- Internal API structure.
- UI implementation details.
- Deployment mechanics.

### Required Output

- A clear MVP scope statement.
- A ranked feature list.
- A list of assumptions and risks.
- A list of decisions other roles still need.

## 2. Frontend Contract

The frontend role owns the visible user experience.

### Responsibility

- Design and build the screens the user interacts with.
- Make the core workflow obvious and efficient.
- Handle loading, empty, error, and success states.
- Keep the interface accessible and understandable.
- Translate product intent into usable interactions.

### Begins Here

Frontend ownership begins when the product scope is stable enough to define screens and flows.

### Ends Here

Frontend ownership ends at the boundary of what the browser or client application should present and do. It does not own server-side business rules.

### Must Decide

- Screen layout and navigation structure.
- What the learner sees first.
- How progress, completion, and assessments are presented.
- Which interactions are required to complete the MVP flow.

### Must Not Decide Alone

- Business rules for passing, retries, or completion.
- Server-side access control.
- Schema design.
- Deployment topology.

### Required Output

- A screen-by-screen flow.
- Component and state breakdown.
- Interaction and accessibility notes.
- UX risks and unresolved dependencies.

## 3. Backend Contract

The backend role owns the system logic behind the interface.

### Responsibility

- Implement the APIs and application logic.
- Enforce business rules.
- Enforce authentication and authorization rules.
- Manage interactions with external systems.
- Return data in a shape the frontend can use cleanly.

### Begins Here

Backend ownership begins where user intent becomes application behavior that must be enforced by the server.

### Ends Here

Backend ownership ends at the API boundary. It does not decide the browser layout or visual interaction design.

### Must Decide

- How users, paths, modules, and assessments are represented in application logic.
- How progress is recorded and updated.
- How completion is calculated.
- What API endpoints exist for the MVP.

### Must Not Decide Alone

- Final visual flow.
- Detailed schema constraints without database review.
- Deployment and infrastructure strategy unless required by application logic.

### Required Output

- API shape and behavior.
- Business rule summary.
- Authentication and authorization model.
- Backend risks and dependencies.

## 4. Database Contract

The database role owns data structure and persistence correctness.

### Responsibility

- Define the schema that supports the MVP flow.
- Protect data integrity with constraints and relationships.
- Support fast retrieval of core app data.
- Plan how records grow, change, and remain auditable.

### Begins Here

Database ownership begins where the app must remember state reliably and consistently.

### Ends Here

Database ownership ends at storage and retrieval design. It does not own application semantics unless they affect persistence rules.

### Must Decide

- Which entities exist.
- How the entities relate.
- What must be unique or required.
- How progress and assessment history are stored.

### Must Not Decide Alone

- Business interpretation of the records.
- UI display logic.
- API naming unless it is required to support the schema.

### Required Output

- Schema proposal.
- Relationship map.
- Constraint list.
- Migration concerns.
- Performance or growth concerns.

## 5. Security Contract

The security role owns risk prevention.

### Responsibility

- Review authentication and authorization.
- Verify role boundaries.
- Identify obvious attack surfaces.
- Protect secrets, tokens, and sensitive records.
- Flag unsafe shortcuts before they ship.

### Begins Here

Security ownership begins whenever the app handles identity, private data, or privileged actions.

### Ends Here

Security ownership ends at risk review and mitigation guidance. It does not decide product scope or visual behavior.

### Must Decide

- What each role can see and do.
- What data is sensitive.
- What actions must be protected.
- What security controls are required for MVP.

### Must Not Decide Alone

- Product priorities.
- UI styling.
- Database shape except where security requires it.

### Required Output

- Threats and mitigations.
- Role and permission notes.
- Sensitive-data handling notes.
- Launch blockers, if any.

## 6. QA Contract

The QA role owns verification.

### Responsibility

- Test the core user journey end to end.
- Confirm that the product works the way the contract says it should.
- Find obvious functional regressions.
- Validate edge cases, failures, and recovery behavior.

### Begins Here

QA ownership begins once there is a flow to test.

### Ends Here

QA ownership ends at verification. It does not decide the product direction or implementation strategy.

### Must Decide

- What the critical test cases are.
- What a pass or fail looks like.
- What edge cases matter for MVP.
- Whether the build is stable enough to ship.

### Must Not Decide Alone

- Product scope.
- Feature priority.
- Data model.

### Required Output

- Test plan.
- Core flow test cases.
- Bug or defect list.
- Readiness assessment.

## 7. DevOps Contract

The DevOps role owns release and environment reliability.

### Responsibility

- Make sure the app can be built and deployed repeatably.
- Define the minimal runtime environment.
- Support CI/CD or release steps if the project has them.
- Keep deployment simple enough for MVP speed.

### Begins Here

DevOps ownership begins when code needs to move reliably from development into a running environment.

### Ends Here

DevOps ownership ends at operational delivery. It does not own app behavior or product scope.

### Must Decide

- How the app is built and deployed.
- What environment variables are required.
- What the minimum operational setup is.

### Must Not Decide Alone

- Product feature scope.
- UI behavior.
- Business rules.

### Required Output

- Deployment approach.
- Runtime dependencies.
- Environment and release notes.
- Operational risks.

## 8. LMS-Specific MVP Rule

For this app, the learner does not choose a path in the MVP.

- Paths are created and assigned by admin or instructor roles.
- The learner's first view is the assigned path.
- The learner experience should assume a single assigned path as the default state.
- Path browsing, self-enrollment, and marketplace behavior are out of scope unless the contract changes later.

## 9. Review Contract

The review role owns integration of the full set.

### Responsibility

- Compare role outputs.
- Find contradictions and missing pieces.
- Make sure the MVP remains coherent.
- Push back when a role is overreaching.

### Begins Here

Review ownership begins when multiple role outputs exist and need to be reconciled.

### Ends Here

Review ownership ends when the team has one coherent direction or a clearly documented unresolved issue.

### Must Decide

- Whether the individual role outputs fit together.
- Which open questions block implementation.
- What should be simplified or deferred.

### Must Not Decide Alone

- Product direction without input.
- Implementation details that belong to the owning role.

### Required Output

- Consolidated recommendation.
- Conflicts and gaps.
- Open questions.
- Final implementation order.

## 10. Shared Rules for All Roles

- Keep the MVP small enough to ship and learn from.
- Do not expand scope unless the change directly supports the first usable version.
- Prefer simple, explainable decisions over clever ones.
- When a role needs another role's decision, stop and call that dependency out explicitly.
- If something is not necessary for the MVP, defer it.

## 11. Handoff Standard

Every role handoff should include:

- What I own.
- What I decided.
- What I need from another role.
- What risks I found.
- What happens next.

## 12. MVP Principle

If a task does not help define, build, verify, secure, or deploy the first usable product, it does not belong in the MVP path.
