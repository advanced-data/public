import { getAssignedPathForUser } from "@/lib/lms-service";
import { getSessionUser } from "@/lib/session";
import { LearnerPanel } from "./learner-panel";

export default async function HomePage() {
  const user = await getSessionUser();

  if (!user) {
    return (
      <main className="page">
        <section className="hero">
          <p className="eyebrow">Login required</p>
          <h1>LMS MVP</h1>
          <p className="lede">
            This LMS uses a login gate before exposing assigned training paths.
          </p>
        </section>

        <section className="panel">
          <h2>Continue</h2>
          <p className="meta">Choose a role to enter the MVP scaffold.</p>
          <a className="status" href="/login">
            Go to login
          </a>
        </section>
      </main>
    );
  }

  const assignedPath = await getAssignedPathForUser(user.id);

  if (!assignedPath) {
    return (
      <main className="page">
        <section className="hero">
          <p className="eyebrow">No assignment</p>
          <h1>LMS MVP</h1>
          <p className="lede">
            You are signed in, but no training path has been assigned to this
            learner yet.
          </p>
          <p className="meta">
            Signed in as {user.name} ({user.role})
          </p>
        </section>

        <section className="panel">
          <h2>Next step</h2>
          <p className="meta">
            An admin needs to assign a path before the learner flow can begin.
          </p>
          <p className="meta">
            <a href="/api/auth/logout">Sign out</a>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Admin-assigned path</p>
        <h1>LMS MVP</h1>
        <p className="lede">
          Learners follow an assigned training path, consume material in order,
          and complete assessments to prove mastery.
        </p>
        <p className="meta">
          Signed in as {user.name} ({user.role})
        </p>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="label">Current path</p>
            <h2>{assignedPath.title}</h2>
            <p className="meta">{assignedPath.description}</p>
          </div>
          <span className="status">{assignedPath.status}</span>
        </div>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${assignedPath.progress}%` }} />
        </div>
        <p className="meta">{assignedPath.progress}% complete</p>

        <ol className="module-list">
          {assignedPath.modules.map((module) => (
            <li key={module.id}>
              {module.title} {module.completed ? "(done)" : ""}
            </li>
          ))}
        </ol>
        <p className="meta">
          <a href="/api/auth/logout">Sign out</a>
        </p>
      </section>

      <LearnerPanel path={assignedPath} />
    </main>
  );
}
