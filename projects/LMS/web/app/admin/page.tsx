import { listPaths } from "@/lib/lms-service";
import { getSessionUser, isAdmin } from "@/lib/session";
import { AdminPanel } from "./admin-panel";

export default async function AdminPage() {
  const user = await getSessionUser();

  if (!isAdmin(user)) {
    return (
      <main className="page">
        <section className="hero">
          <p className="eyebrow">Admin access required</p>
          <h1>Training path management</h1>
          <p className="lede">
            Sign in as an admin to manage LMS training paths in this scaffold.
          </p>
        </section>
        <section className="panel">
          <a className="status" href="/login">
            Go to login
          </a>
        </section>
      </main>
    );
  }

  const paths = await listPaths();

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Admin console</p>
        <h1>Training path management</h1>
        <p className="lede">
          Create training paths, assign them to learners, and keep the MVP
          focused on the learner flow.
        </p>
        <p className="meta">
          Signed in as {user.name} ({user.role})
        </p>
      </section>

      <section className="panel">
        <h2>Existing paths</h2>
        <ul className="module-list">
          {paths.map((path) => (
            <li key={path.id}>
              <div className="stack" style={{ gap: "8px" }}>
                <strong>{path.title}</strong>
                <span className="meta">
                  {path.modules.length} modules - {path.status} - {path.progress}% complete
                </span>
                <ol className="module-list" style={{ marginTop: 0 }}>
                  {path.modules.map((module) => (
                    <li key={module.id}>
                      {module.order}. {module.title} ({module.kind})
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
        <p className="meta">
          <a href="/api/auth/logout">Sign out</a>
        </p>
      </section>

      <AdminPanel paths={paths} />
    </main>
  );
}
