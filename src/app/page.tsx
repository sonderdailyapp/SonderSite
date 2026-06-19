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

      {/* Warm ambient glow */}
      <div
        className="animate-glow pointer-events-none absolute bottom-[-80px] left-1/2 w-[800px] h-[450px] rounded-full"
        style={{ background: "radial-gradient(ellipse, #4a3218 0%, #221808 50%, transparent 70%)" }}
      />
      <div
        className="animate-glow pointer-events-none absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[350px] h-[200px] rounded-full blur-[70px]"
        style={{ background: "#6b4520", opacity: 0.35, animationDelay: "2s" }}
      />

      {/* Floating particles */}
      {[
        { left: "15%",  size: 1.5, duration: "12s", delay: "0s",   drift: "20px"  },
        { left: "28%",  size: 1,   duration: "18s", delay: "3s",   drift: "-15px" },
        { left: "42%",  size: 2,   duration: "14s", delay: "6s",   drift: "10px"  },
        { left: "58%",  size: 1.5, duration: "20s", delay: "1.5s", drift: "-25px" },
        { left: "70%",  size: 1,   duration: "16s", delay: "4s",   drift: "18px"  },
        { left: "82%",  size: 2,   duration: "11s", delay: "8s",   drift: "-12px" },
        { left: "33%",  size: 1,   duration: "22s", delay: "2s",   drift: "30px"  },
        { left: "65%",  size: 1.5, duration: "15s", delay: "7s",   drift: "-20px" },
      ].map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#c4956a",
            opacity: 0,
            animation: `particle ${p.duration} ease-in infinite`,
            animationDelay: p.delay,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}

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

        {/* Headline — masked line reveal */}
        <div className="animate-float" style={{ animationDelay: "1.2s" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#ede8e0",
              textAlign: "center",
            }}
          >
            {/* Line 1 */}
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em" }}>
              <span className="animate-line delay-100" style={{ display: "block" }}>
                Your days are worth
              </span>
            </span>
            {/* Line 2 */}
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.2em" }}>
              <em className="animate-line delay-200" style={{ display: "block", fontStyle: "italic", fontWeight: 400, color: "#c4b49a" }}>
                remembering.
              </em>
            </span>
          </h1>
        </div>

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
                padding: "1rem 1.25rem",
                fontSize: "1rem",
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
                padding: "1rem 1.75rem",
                fontSize: "1rem",
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

      {/* Social links */}
      <div className="absolute bottom-8 flex items-center gap-5" style={{ zIndex: 10 }}>
        <a
          href="https://www.tiktok.com/@sonderdaily.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4a4540", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ede8e0")}
          onMouseLeave={e => (e.currentTarget.style.color = "#4a4540")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/sonderdailyapp/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4a4540", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ede8e0")}
          onMouseLeave={e => (e.currentTarget.style.color = "#4a4540")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4.5"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
        </a>
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
