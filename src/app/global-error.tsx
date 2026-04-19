"use client";

// Minimal global error boundary. Provided explicitly so Next 16 doesn't try
// to prerender its default _global-error fallback against our React 19 +
// client-context tree, which currently throws `useContext` of null during
// build. Replace with a branded error UI later.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en-AU">
      <body style={{ background: "#0a0a0a", color: "#f5f5f0", fontFamily: "system-ui", padding: "4rem 1.5rem", margin: 0 }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ color: "#a0a0a0", marginBottom: "1.5rem" }}>
            We couldn&apos;t load this page. Try refreshing — if it keeps happening, let us know.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "#b8956e",
              color: "#0a0a0a",
              border: 0,
              padding: "0.75rem 1.25rem",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
