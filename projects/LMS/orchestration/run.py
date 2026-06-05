#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def main() -> int:
    project_root = Path(__file__).resolve().parents[2]
    repo_root = project_root.parent

    orchestrator = repo_root / "projects" / "agent-orchestrator" / "orchestrate.py"
    roles = project_root / "orchestration" / "roles.json"
    brief = project_root / "orchestration" / "brief.md"
    output_dir = project_root / "orchestration" / "outputs"

    output_dir.mkdir(parents=True, exist_ok=True)

    command = [
        sys.executable,
        str(orchestrator),
        "--roles",
        str(roles),
        "--brief",
        str(brief),
        "--output-dir",
        str(output_dir),
    ]
    return subprocess.run(command, check=False).returncode


if __name__ == "__main__":
    raise SystemExit(main())
