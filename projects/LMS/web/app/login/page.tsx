export default function LoginPage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Sign in</p>
        <h1>LMS access</h1>
        <p className="lede">
          This scaffold uses a lightweight development login so you can test the
          learner and admin flows without a full auth provider yet.
        </p>
      </section>

      <section className="panel">
        <h2>Choose a role</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a className="status" href="/api/auth/dev-login?role=learner">
            Continue as learner
          </a>
          <a className="status" href="/api/auth/dev-login?role=admin">
            Continue as admin
          </a>
        </div>
      </section>
    </main>
  );
}
