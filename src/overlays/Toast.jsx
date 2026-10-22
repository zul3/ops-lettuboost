export default function Toast({ v }) {
  return (
    <div style={{ position: "fixed", left: "26px", bottom: "26px", zIndex: "80", display: "flex", alignItems: "center", gap: "12px", background: "var(--ink)", color: "#fff", borderRadius: "16px", padding: "15px 20px", maxWidth: "min(420px, calc(100vw - 52px))", boxShadow: "0 22px 44px -20px rgba(12,36,24,.7)", animation: "om-toast .28s cubic-bezier(.2,.8,.2,1) both" }}>
      <span style={{ width: "9px", height: "9px", flex: "0 0 9px", borderRadius: "50%", background: "var(--lime)", display: "block" }} />
      <span style={{ fontSize: "12.5px", fontWeight: "600", lineHeight: "1.5" }}>
        {v.toast}
      </span>
    </div>
  );
}
