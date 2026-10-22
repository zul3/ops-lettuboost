export default function ActivityLog({ v }) {
  return (
    <section data-screen-label="Activity log" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", background: "#ffffff", borderRadius: "22px", padding: "12px 24px", maxWidth: "720px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column" }}>
      {(v.adLog || []).map((l, i_l) => (
        <div key={i_l} style={{ display: "flex", gap: "12px", padding: "13px 0", borderBottom: "1px solid #eef3ea" }}>
          <span style={{ width: "8px", height: "8px", flex: "0 0 8px", borderRadius: "50%", background: "var(--lime)", display: "block", marginTop: "5px" }} />
          <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: "700" }}>
              {l.t}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {l.by}{" · "}{l.d}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}
