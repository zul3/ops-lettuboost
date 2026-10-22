export default function TasksAndRates({ v }) {
  return (
    <section data-screen-label="Tasks and rates" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ margin: "0", maxWidth: "62ch", fontSize: "12.5px", color: "var(--mut)", lineHeight: "1.65" }}>
        Piece rates are the fairest basis we have — the amount comes from the work, not from who is approvg it in. Edit a rate here and every new request picks it up straight away.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2.4fr) minmax(0,1.1fr) minmax(0,1fr) minmax(0,1.2fr) 44px", gap: "14px", padding: "0 20px 2px" }} className="lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          TASK
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          UNIT
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          RATE (RM)
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          USED IN
        </span>
        <span />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(v.taskRows || []).map((t, i_t) => (
          <div key={i_t} style={{ display: "grid", gridTemplateColumns: "minmax(0,2.4fr) minmax(0,1.1fr) minmax(0,1fr) minmax(0,1.2fr) 44px", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "10px 20px", boxShadow: "var(--sh)" }} className="lb-tbl">
            <input type="text" value={t.name ?? ''} onChange={t.setName} style={{ border: "0", borderRadius: "10px", background: "transparent", fontSize: "13.5px", fontWeight: "700", padding: "9px 10px", width: "100%" }} className="fcb" />
            <input type="text" value={t.unit ?? ''} onChange={t.setUnit} style={{ border: "0", borderRadius: "10px", background: "transparent", fontSize: "12.5px", color: "var(--mut)", padding: "9px 10px", width: "100%" }} className="fcb" />
            <input type="number" min="0" step="0.1" value={t.rate ?? ''} onChange={t.setRate} style={{ border: "0", borderRadius: "10px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 10px", width: "100%" }} className="fcb" />
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {t.usage}
            </span>
            <button type="button" onClick={t.remove} title="Remove task" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", color: "var(--mut)", fontSize: "15px", fontWeight: "700", width: "34px", height: "34px", cursor: "pointer", transition: "background .16s ease, color .16s ease" }} className="hvc">
              ×
            </button>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2.4fr) minmax(0,1.1fr) minmax(0,1fr) minmax(0,2.2fr)", gap: "14px", alignItems: "center", background: "var(--tint)", borderRadius: "16px", padding: "14px 20px" }} className="lb-tbl">
          <input type="text" value={v.nt.name ?? ''} onChange={v.setNtName} placeholder="New task name" style={{ border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "13px", padding: "11px 12px", width: "100%" }} />
          <input type="text" value={v.nt.unit ?? ''} onChange={v.setNtUnit} placeholder="per piece" style={{ border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "13px", padding: "11px 12px", width: "100%" }} />
          <input type="number" min="0" step="0.1" value={v.nt.rate ?? ''} onChange={v.setNtRate} placeholder="0.00" style={{ border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "13px", fontWeight: "700", padding: "11px 12px", width: "100%" }} />
          <button type="button" onClick={v.addTask} style={{ justifySelf: "start", border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 18px", cursor: "pointer" }}>
            ADD TASK
          </button>
        </div>
      </div>
    </section>
  );
}
