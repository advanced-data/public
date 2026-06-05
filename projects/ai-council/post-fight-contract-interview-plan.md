# Post-Fight Contract Interview Plan

This is a local mirror of the remote planning doc from `advanced-data/public`.
It captures the key operating ideas that are relevant for contract generation.

## Goal

Turn debate output into an agent-ready contract by confirming assumptions the system cannot safely infer.

## Product Shape

After synthesis, move into a Post-Fight Interview stage.

Working line:

`The council has a likely build contract. Confirm the assumptions it cannot prove.`

Questions should be pre-answered with:

- question
- suggested answer
- rationale
- confidence
- whether it blocks contract generation
- accept / edit / unknown / reject controls

## Keep It Bounded

- Ask only what is needed to create the build contract.
- Prefer defaults for stack and infrastructure.
- Focus the UI on items needing attention.
- Let the user accept all high-confidence assumptions at once.
- Allow unknown answers, but mark the resulting open decisions clearly.

## Default Build Stack

The planning model uses project defaults when the user has not specified otherwise.

- Frontend: Next.js, React, TypeScript
- Backend: Next.js route handlers or server services
- Database: PostgreSQL
- ORM: Prisma
- Runtime: Node.js
- Packaging: Docker Compose
- Testing: Playwright, TypeScript typecheck, ESLint
- Auth: app login required by default
- Deployment target: single VPS or container-friendly app

## Contract Readiness Sections

The build contract should cover:

1. Product intent
2. Primary users
3. MVP scope
4. Non-goals
5. UX routes and screens
6. Core workflows
7. Data model
8. Integrations
9. Build stack and infrastructure
10. Security, privacy, and compliance
11. Operational/admin requirements
12. Acceptance criteria and test plan
13. Agent task breakdown
14. Open decisions

## Contract Quality Bar

The contract is only ready if a frontend and backend agent can build from it without returning for obvious missing context.

Required checks:

- concrete user roles
- at least one route or screen map
- MVP and non-goals
- data entities
- integrations, even if none for MVP
- stack defaults
- security and compliance requirements
- acceptance criteria
- backend/frontend task split
- explicit open decisions

## Implementation Order

1. Add contract interview persistence.
2. Add contract writer using a high-end model.
3. Add post-fight interview cards after synthesis.
4. Add contract preview and export flow.
5. Add replay fixtures and smoke tests.

## Open Decisions

- Auto-start interview or wait for a button?
- Allow contract generation if some items are unknown?
- Write from the full transcript or summarized state?
- Keep the legacy contract pipeline temporarily or replace it?
- Expose provider names or keep them abstract by default?
- Include a deal sheet alongside the full contract?
