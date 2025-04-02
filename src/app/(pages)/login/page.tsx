import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Login</h1>
      <label htmlFor="email" style={{ alignSelf: "flex-start" }}>
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <label htmlFor="password" style={{ alignSelf: "flex-start" }}>
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          formAction={login}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log in
        </button>
        <button
          formAction={signup}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#6C757D",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
