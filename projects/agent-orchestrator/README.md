# Agent Orchestrator

Reusable scaffold for running multiple role-specific agent processes in parallel.

This is general-purpose. It is not tied to the LMS project.

## What it does

- Reads a shared project brief.
- Reads one prompt file per role.
- Launches one worker process per role.
- Captures each role's output in its own file.
- Lets a supervisor merge the results afterward.

## Why this exists

A tmux window is only a terminal. A separate agent requires a separate OS process with its own prompt, output, and lifecycle.

## Folder Layout

```text
projects/agent-orchestrator/
  README.md
  orchestrate.py
  roles.example.json
  templates/
    role_prompt.md
```

## Usage

1. Copy `roles.example.json` to a local config file.
2. Fill in the shared brief path and worker command.
3. Add one prompt file per role.
4. Run the orchestrator.

Example:

```bash
python3 orchestrate.py --roles roles.json --brief brief.md --output-dir outputs
```

## Worker Contract

Each worker process should:

- read its role prompt and the shared brief,
- produce a role-specific response,
- write only to its own output file,
- and exit with a non-zero code on failure.

## Design Rules

- One role, one process.
- One prompt, one output.
- Shared brief is read-only input.
- Role outputs are merged later by a supervisor or review step.
