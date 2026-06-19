export default function EmailPreview() {
  return (
    <div style={{ background: "#0d0c0b", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div style={{ background: "#0d0c0b", fontFamily: "Georgia,serif", padding: "56px 40px", maxWidth: "480px", width: "100%", margin: "0 auto" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#4a4540", margin: "0 0 48px", fontFamily: "Arial,sans-serif" }}>Sonder</p>
        <h1 style={{ fontSize: "36px", fontWeight: 400, margin: "0 0 16px", lineHeight: 1.1, color: "#ede8e0" }}>You&apos;re in.</h1>
        <p style={{ fontStyle: "italic", fontSize: "20px", color: "#c4b49a", margin: "0 0 40px", fontWeight: 400 }}>We&apos;ll see you on the other side.</p>
        <div style={{ height: "1px", background: "linear-gradient(to right,transparent,#2a2620,transparent)", margin: "0 0 40px" }} />
        <p style={{ color: "#4a4540", fontSize: "12px", margin: 0, fontFamily: "Arial,sans-serif", letterSpacing: "0.05em" }}>— The Sonder Team</p>
      </div>
    </div>
  );
}
