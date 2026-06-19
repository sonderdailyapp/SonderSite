"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setValidationMsg("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationMsg("Enter a valid email address.");
      return;
    }

    setStatus("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(data.error || "Something went wrong.");
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d0c0b]">

      {/* Warm ambient glow — lamplight, not AI-purple */}
      <div
        className="animate-glow pointer-events-none absolute bottom-[-80px] left-1/2 w-[700px] h-[380px] rounded-full"
        style={{ background: "radial-gradient(ellipse, #3d2a14 0%, #1e1508 50%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[300px] h-[160px] rounded-full blur-[60px]"
        style={{ background: "#5c3d1e", opacity: 0.25 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl w-full" style={{ gap: "2rem" }}>

        {/* Wordmark */}
        <p
          className="animate-wordmark"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#4a4540",
            fontWeight: 500,
          }}
        >
          Sonder
        </p>

        {/* Headline — editorial serif */}
        <h1
          className="animate-headline delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "#ede8e0",
          }}
        >
          Your days are worth<br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#c4b49a" }}>
            remembering.
          </em>
        </h1>

        {/* Coming soon — matches badge style */}
        <span
          className="animate-drift delay-200 inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-[0.25em] uppercase"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "#8c8070",
            fontFamily: "var(--font-body)",
          }}
        >
          Coming soon
        </span>

        {/* Form / Success */}
        {status === "success" ? (
          <div className="animate-success" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#ede8e0" }}>
              You&apos;re in.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#6b6558" }}>
              We&apos;ll see you on the other side.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="animate-form delay-300"
            style={{ display: "flex", gap: "0.625rem", width: "100%", maxWidth: "420px", flexWrap: "wrap" }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: "0",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                color: "#ede8e0",
                fontFamily: "var(--font-body)",
                outline: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.18)";
                e.target.style.background = "rgba(255,255,255,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.background = "rgba(255,255,255,0.04)";
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: "#ede8e0",
                color: "#0d0c0b",
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.15s, transform 0.1s",
                opacity: status === "loading" ? 0.6 : 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#ede8e0"; e.currentTarget.style.transform = "scale(1)"; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
            >
              {status === "loading" ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    width: "12px", height: "12px", borderRadius: "50%",
                    border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#0d0c0b",
                    display: "inline-block", animation: "spin 0.7s linear infinite",
                  }} />
                  Joining...
                </span>
              ) : "Get notified"}
            </button>
          </form>
        )}

        {validationMsg && (
          <p className="animate-fade-in" style={{ color: "#c9965a", fontSize: "0.8rem", marginTop: "-1rem", fontFamily: "var(--font-body)", letterSpacing: "0.02em", fontWeight: 500 }}>
            {validationMsg}
          </p>
        )}
        {errorMsg && (
          <p className="animate-fade-in" style={{ color: "#8c8070", fontSize: "0.75rem", marginTop: "-1rem", fontFamily: "var(--font-body)", letterSpacing: "0.01em" }}>
            {errorMsg}
          </p>
        )}
      </div>

      {/* Horizon */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #3d3a35; }
      `}</style>
    </main>
  );
}
