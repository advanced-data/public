# LMS Orchestration

Project-specific configuration for running the LMS MVP through the reusable agent orchestrator.

## Purpose

- Tie the generic multi-agent scaffold to this LMS contract.
- Keep a persistent record of the role prompts, outputs, and build steps.
- Make the process repeatable for future app work.

## Canonical Inputs

- [lms_app_contract.md](../lms_app_contract.md)
- [mvp_agent_contract.md](../mvp_agent_contract.md)
- [mvp_build_plan.md](../mvp_build_plan.md)
- [web/README.md](../web/README.md)

## Roles

- product
- frontend
- backend
- database
- security
- qa
- devops
- review

## How to Use

1. Read the LMS contract first.
2. Give each role its prompt file and the shared brief.
3. Run `python3 run.py` from this folder to fan out the role workers.
4. Store each role output in `outputs/`.
5. Merge outputs into the next build step.

## Notes

This folder is intentionally lightweight. The reusable orchestrator lives at `projects/agent-orchestrator/`.
