#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from pathlib import Path


@dataclass
class RoleConfig:
    name: str
    prompt_file: Path


def load_roles(path: Path) -> tuple[list[str], list[RoleConfig]]:
    data = json.loads(path.read_text())
    worker_command = data["worker_command"]
    roles = [
        RoleConfig(name=item["name"], prompt_file=(path.parent / item["prompt_file"]).resolve())
        for item in data["roles"]
    ]
    return worker_command, roles


def build_prompt(shared_brief: str, role_prompt: str) -> str:
    return "\n\n".join(
        [
            "# Shared Brief",
            shared_brief.strip(),
            "# Role Prompt",
            role_prompt.strip(),
        ]
    )


def run_worker(worker_command: list[str], prompt: str, output_path: Path) -> int:
    result = subprocess.run(
        worker_command,
        input=prompt,
        text=True,
        capture_output=True,
        check=False,
    )

    output_path.write_text(result.stdout + ("\n" + result.stderr if result.stderr else ""))
    return result.returncode


def main() -> int:
    parser = argparse.ArgumentParser(description="Run role-based agent workers in parallel.")
    parser.add_argument("--roles", required=True, type=Path, help="Path to roles JSON config")
    parser.add_argument("--brief", required=True, type=Path, help="Shared project brief")
    parser.add_argument("--output-dir", required=True, type=Path, help="Directory for role outputs")
    args = parser.parse_args()

    worker_command, roles = load_roles(args.roles)
    shared_brief = args.brief.read_text()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    return_codes: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=len(roles) or 1) as executor:
        futures = {}
        for role in roles:
            prompt = build_prompt(shared_brief, role.prompt_file.read_text())
            output_path = args.output_dir / f"{role.name}.md"
            futures[executor.submit(run_worker, worker_command, prompt, output_path)] = role.name

        for future in as_completed(futures):
            role_name = futures[future]
            return_codes[role_name] = future.result()

    failed = {name: code for name, code in return_codes.items() if code != 0}
    if failed:
        print(json.dumps({"status": "failed", "roles": failed}, indent=2))
        return 1

    print(json.dumps({"status": "ok", "roles": list(return_codes.keys())}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
