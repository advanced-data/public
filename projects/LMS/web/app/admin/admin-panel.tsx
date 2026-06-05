"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LMSPath } from "@/lib/lms-types";

export function AdminPanel({ paths }: { paths: LMSPath[] }) {
  const router = useRouter();
  const [createTitle, setCreateTitle] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [learnerId, setLearnerId] = useState("22222222-2222-4222-8222-222222222222");
  const [assignPathId, setAssignPathId] = useState(paths[0]?.id ?? "");
  const [modulePathId, setModulePathId] = useState(paths[0]?.id ?? "");
  const [moduleTitle, setModuleTitle] = useState("");
  const [modulePosition, setModulePosition] = useState("1");
  const [moduleKind, setModuleKind] = useState<"lesson" | "quiz">("lesson");
  const [status, setStatus] = useState<string | null>(null);

  async function createPath(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Creating path...");

    const response = await fetch("/api/paths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: createTitle,
        description: createDescription,
      }),
    });

    if (!response.ok) {
      setStatus("Failed to create path.");
      return;
    }

    setCreateTitle("");
    setCreateDescription("");
    setStatus("Path created.");
    router.refresh();
  }

  async function assignExistingPath(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Assigning path...");

    const response = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathId: assignPathId,
        learnerId,
      }),
    });

    if (!response.ok) {
      setStatus("Failed to assign path.");
      return;
    }

    setStatus("Path assigned.");
  }

  async function createModule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Creating module...");

    const response = await fetch("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathId: modulePathId,
        title: moduleTitle,
        position: Number(modulePosition),
        kind: moduleKind,
      }),
    });

    if (!response.ok) {
      setStatus("Failed to create module.");
      return;
    }

    setModuleTitle("");
    setModulePosition("1");
    setModuleKind("lesson");
    setStatus("Module created.");
    router.refresh();
  }

  return (
    <section className="panel">
      <h2>Manage paths</h2>

      <div className="stack">
        <form className="form" onSubmit={createPath}>
          <h3>Create path</h3>
          <label>
            Title
            <input value={createTitle} onChange={(event) => setCreateTitle(event.target.value)} />
          </label>
          <label>
            Description
            <textarea
              value={createDescription}
              onChange={(event) => setCreateDescription(event.target.value)}
              rows={3}
            />
          </label>
          <button type="submit">Create path</button>
        </form>

        <form className="form" onSubmit={createModule}>
          <h3>Add module</h3>
          <label>
            Path
            <select value={modulePathId} onChange={(event) => setModulePathId(event.target.value)}>
              {paths.map((path) => (
                <option key={path.id} value={path.id}>
                  {path.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Title
            <input value={moduleTitle} onChange={(event) => setModuleTitle(event.target.value)} />
          </label>
          <label>
            Position
            <input
              type="number"
              min="1"
              value={modulePosition}
              onChange={(event) => setModulePosition(event.target.value)}
            />
          </label>
          <label>
            Kind
            <select value={moduleKind} onChange={(event) => setModuleKind(event.target.value as "lesson" | "quiz")}>
              <option value="lesson">Lesson</option>
              <option value="quiz">Quiz</option>
            </select>
          </label>
          <button type="submit">Add module</button>
        </form>

        <form className="form" onSubmit={assignExistingPath}>
          <h3>Assign path</h3>
          <label>
            Learner ID
            <input value={learnerId} onChange={(event) => setLearnerId(event.target.value)} />
          </label>
          <label>
            Path
            <select value={assignPathId} onChange={(event) => setAssignPathId(event.target.value)}>
              {paths.map((path) => (
                <option key={path.id} value={path.id}>
                  {path.title}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Assign path</button>
        </form>
      </div>

      {status ? <p className="meta">{status}</p> : null}
    </section>
  );
}
