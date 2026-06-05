# App Development Multi-Agent Playbook

This repo now uses a general app-development workflow instead of an LMS-specific one.

## Goal

Split product work into specialized roles so each agent can focus on one area at a time, then reconcile the results into a single implementation plan.

## Roles

- `planner`: defines scope, milestones, acceptance criteria, and unresolved questions.
- `frontend`: designs screens, layout, state, interaction flow, and accessibility.
- `backend`: designs APIs, services, auth flows, business logic, and integrations.
- `database`: designs schema, migrations, relationships, indexes, and data integrity.
- `security`: reviews auth, permissions, secrets, attack surface, and misuse cases.
- `review`: checks for conflicts, missing pieces, and implementation risk.

## Working Rules

- Each role reads the same product brief.
- Each role writes its findings to a separate file.
- Shared decisions go into a single `decisions.md`.
- If two roles disagree, the review role resolves the conflict or flags it for the user.
- Keep outputs concrete: assumptions, recommendations, open questions, and next steps.

## Suggested Output Format

Each role should answer:

1. What is this role responsible for?
2. What are the key design choices?
3. What are the risks or tradeoffs?
4. What decisions does another role need from me?
5. What should happen next?
