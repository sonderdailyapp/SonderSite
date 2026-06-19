"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
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
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0c0c0e]">
      <div className="w-full max-w-md space-y-10">

        <div className="space-y-2">
          <p className="text-xs tracking-[0.3em] uppercase text-[#6b6860]">
            Sonder
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#f0ede8] leading-tight">
            Two questions.<br />Every day.<br />Forever.
          </h1>
        </div>

        <p className="text-[#6b6860] text-sm leading-relaxed">
          Morning: what do you want out of today?<br />
          Night: how&apos;d it actually go?<br />
          <br />
          A year from now, you&apos;ll be glad you started.
        </p>

        {status === "success" ? (
          <div className="space-y-2">
            <p className="text-[#f0ede8] text-lg font-medium">You&apos;re in.</p>
            <p className="text-[#6b6860] text-sm">Check your inbox. We&apos;ll see you on the other side.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#17171a] border border-[#2a2a2f] text-[#f0ede8] placeholder-[#3d3d42] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4a4a52] transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#17171a] border border-[#2a2a2f] text-[#f0ede8] placeholder-[#3d3d42] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#4a4a52] transition-colors"
            />
            {errorMsg && (
              <p className="text-red-400 text-xs">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#f0ede8] text-[#0c0c0e] rounded-lg px-4 py-3 text-sm font-semibold hover:bg-[#d9d6d1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Joining..." : "Join the waitlist"}
            </button>
          </form>
        )}

        <p className="text-[#3d3d42] text-xs">
          No spam. Just your spot in line.
        </p>
      </div>
    </main>
  );
}
