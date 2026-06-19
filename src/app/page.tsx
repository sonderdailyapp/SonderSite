"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [position, setPosition] = useState(0);
  const [shared, setShared] = useState(false);

  const isValid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setErrorMsg("");
    setStatus("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: name.trim() }),
    });

    const data = await res.json();
    if (res.ok) {
      setPosition(data.position ?? 1);
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(data.error || "Something went wrong.");
    }
  }

  async function handleShare() {
    const text = `I'm #${position} on the Sonder waitlist — sonderdaily.app`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Sonder", text, url: "https://sonderdaily.app" });
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  }

  function handleDownload() {
    const svgName = name.trim()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;") || "Guest";
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="480" viewBox="0 0 400 480">
  <defs>
    <pattern id="lines" x="0" y="68" width="400" height="28" patternUnits="userSpaceOnUse">
      <line x1="0" y1="27" x2="400" y2="27" stroke="rgba(139,120,90,0.13)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="400" height="480" rx="4" fill="#f3ead8"/>
  <rect x="0" y="68" width="400" height="412" fill="url(#lines)"/>
  <rect x="0" y="0" width="7" height="480" fill="rgba(0,0,0,0.07)"/>
  <line x1="52" y1="68" x2="52" y2="480" stroke="rgba(180,60,40,0.18)" stroke-width="1"/>
  <text x="20" y="44" font-family="Arial,sans-serif" font-size="9" fill="#8b7855" letter-spacing="3">SONDER</text>
  <text x="380" y="44" font-family="Arial,sans-serif" font-size="9" fill="#b8a490" text-anchor="end">${dateStr}</text>
  <line x1="0" y1="56" x2="400" y2="56" stroke="rgba(139,120,90,0.2)" stroke-width="1"/>
  <text x="68" y="110" font-family="Arial,sans-serif" font-size="8" fill="#b8a490" letter-spacing="3">EARLY ACCESS</text>
  <text x="64" y="180" font-family="Georgia,serif" font-size="52" font-style="italic" fill="#2a1f12">${svgName}</text>
  <text x="68" y="230" font-family="Arial,sans-serif" font-size="10" fill="#8b7855" letter-spacing="1">Entry no. ${position}</text>
  <text x="68" y="278" font-family="Georgia,serif" font-size="12" font-style="italic" fill="#b8a490">"Your days are worth remembering."</text>
  <rect width="400" height="480" rx="4" fill="none" stroke="rgba(139,120,90,0.18)" stroke-width="1"/>
</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sonder-journal.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "0",
    padding: "0.875rem 0",
    fontSize: "1rem",
    color: "#ede8e0",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  };

  const nameInputStyle = {
    ...inputStyle,
    fontFamily: "var(--font-display)",
    fontStyle: "italic",
    fontSize: "1.1rem",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderBottomColor = "rgba(196,149,106,0.55)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderBottomColor = "rgba(255,255,255,0.1)";
  };

  return (
    <main className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0d0c0b]">

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
        {status !== "success" && (
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
        )}

        {/* Headline */}
        {status !== "success" && (
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
              <span style={{ display: "block" }}>
                <span className="animate-line delay-100" style={{ display: "block" }}>
                  Your days are worth
                </span>
              </span>
              <span style={{ display: "block" }}>
                <em className="animate-line delay-200" style={{ display: "block", fontStyle: "italic", fontWeight: 400, color: "#c4b49a" }}>
                  remembering.
                </em>
              </span>
            </h1>
          </div>
        )}


        {/* Form / Success */}
        {status === "success" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

            {/* Header text */}
            <div className="animate-success" style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.1rem", color: "#c4b49a", margin: "0 0 4px" }}>
                you&apos;re in.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a4540", margin: 0 }}>
                here&apos;s your entry
              </p>
            </div>

            {/* Journal page card */}
            <div style={{ animation: "success-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both" }}>
              <div style={{
                width: "290px",
                background: "linear-gradient(175deg, #f5edd8 0%, #ede2c8 60%, #e8d8bc 100%)",
                borderRadius: "3px",
                boxShadow: "0 28px 70px rgba(0,0,0,0.72), 0 8px 24px rgba(0,0,0,0.4), 8px 0 28px rgba(74,50,24,0.5), -3px 0 10px rgba(0,0,0,0.3)",
                transform: "rotate(-1deg)",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Binding shadow */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10px", background: "linear-gradient(to right, rgba(0,0,0,0.16), transparent)", zIndex: 1 }} />

                {/* Ruled lines */}
                <div style={{
                  position: "absolute",
                  left: 0, right: 0, top: "57px", bottom: 0,
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(120,100,60,0.16) 27px, rgba(120,100,60,0.16) 28px)",
                  backgroundSize: "100% 28px",
                }} />

                {/* Red margin line */}
                <div style={{ position: "absolute", left: "44px", top: "57px", bottom: 0, width: "1px", background: "rgba(170,50,30,0.2)" }} />

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px 14px", borderBottom: "1px solid rgba(120,100,60,0.22)", position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#7a6845", fontWeight: 500 }}>Sonder</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", color: "#a89070", letterSpacing: "0.02em" }}>
                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "24px 22px 32px 56px", position: "relative", zIndex: 1 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#a89070", margin: "0 0 28px", fontWeight: 500 }}>
                    Early Access
                  </p>

                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "2.5rem", color: "#1a1208", margin: 0, lineHeight: 1.1 }}>
                    {name.trim() || "Guest"}
                  </p>

                  <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "#7a6845", margin: "28px 0 0", letterSpacing: "0.05em" }}>
                    Entry no. {position}
                  </p>

                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ animation: "success-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both", display: "flex", gap: "12px" }}>
              <button
                onClick={handleDownload}
                title="Download ticket"
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#6b6558",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ede8e0"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b6558"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13M7 12l5 5 5-5M3 19h18"/>
                </svg>
              </button>

              <button
                onClick={handleShare}
                title={shared ? "Copied!" : "Share"}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: `1px solid ${shared ? "rgba(196,149,106,0.4)" : "rgba(255,255,255,0.1)"}`,
                  background: shared ? "rgba(196,149,106,0.08)" : "rgba(255,255,255,0.03)",
                  color: shared ? "#c4956a" : "#6b6558",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { if (!shared) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ede8e0"; }}}
                onMouseLeave={e => { if (!shared) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b6558"; }}}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="animate-form delay-300"
            style={{ display: "flex", flexDirection: "column", gap: "0rem", width: "100%", maxWidth: "380px" }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={name}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              style={nameInputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button
              type="submit"
              disabled={!isValid || status === "loading"}
              style={{
                background: "#ede8e0",
                color: "#0d0c0b",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 1.75rem",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                cursor: isValid && status !== "loading" ? "pointer" : "default",
                width: "100%",
                marginTop: "1.5rem",
                transition: "background 0.15s, transform 0.1s, opacity 0.2s",
                opacity: isValid ? (status === "loading" ? 0.6 : 1) : 0.3,
              }}
              onMouseEnter={(e) => { if (isValid) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1.02)"; }}}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#ede8e0"; e.currentTarget.style.transform = "scale(1)"; }}
              onMouseDown={(e) => { if (isValid) e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={(e) => { if (isValid) e.currentTarget.style.transform = "scale(1.02)"; }}
            >
              {status === "loading" ? (
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
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

      {/* Horizon line */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #4a4540; }
        input[type="text"]::placeholder { font-family: var(--font-display); font-style: italic; }
      `}</style>
    </main>
  );
}
