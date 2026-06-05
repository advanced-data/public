"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LMSPath } from "@/lib/lms-types";

export function LearnerPanel({ path }: { path: LMSPath }) {
  const router = useRouter();
  const [quizModuleId, setQuizModuleId] = useState(
    path.modules.find((module) => module.kind === "quiz")?.id ?? "",
  );
  const [score, setScore] = useState("80");
  const [message, setMessage] = useState<string | null>(null);

  async function completeLesson(moduleId: string) {
    setMessage(`Completing ${moduleId}...`);

    const response = await fetch("/api/modules/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathId: path.id,
        moduleId,
      }),
    });

    if (!response.ok) {
      setMessage("Lesson completion failed.");
      return;
    }

    setMessage("Lesson completed.");
    router.refresh();
  }

  async function submitAssessment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Submitting assessment...");

    const response = await fetch("/api/assessments/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pathId: path.id,
        moduleId: quizModuleId,
        score: Number(score),
      }),
    });

    if (!response.ok) {
      setMessage("Assessment submission failed.");
      return;
    }

    setMessage("Assessment submitted.");
    router.refresh();
  }

  const lessonModules = path.modules.filter((module) => module.kind === "lesson");
  const quizModules = path.modules.filter((module) => module.kind === "quiz");

  return (
    <section className="panel">
      <h2>Path modules</h2>
      <p className="meta">Complete lessons in order, then submit the quiz assessment.</p>

      <ol className="module-list">
        {path.modules.map((module) => (
          <li key={module.id}>
            <div className="module-row">
              <span>
                {module.order}. {module.title} {module.completed ? "(done)" : ""}
              </span>
              {module.kind === "lesson" && !module.completed ? (
                <button type="button" onClick={() => completeLesson(module.id)}>
                  Mark complete
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {quizModules.length > 0 ? (
        <>
          <h3>Assessment</h3>
          <p className="meta">Submit the path quiz score to mark progress and completion.</p>

          <form className="form" onSubmit={submitAssessment}>
            <label>
              Quiz module
              <select value={quizModuleId} onChange={(event) => setQuizModuleId(event.target.value)}>
                {quizModules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Score
              <input
                type="number"
                min="0"
                max="100"
                value={score}
                onChange={(event) => setScore(event.target.value)}
              />
            </label>
            <button type="submit">Submit assessment</button>
          </form>
        </>
      ) : null}

      {message ? <p className="meta">{message}</p> : null}
      {!lessonModules.length && !quizModules.length ? (
        <p className="meta">This path does not have modules yet.</p>
      ) : null}
    </section>
  );
}
