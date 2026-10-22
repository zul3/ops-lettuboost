import Icon from '../../components/Icon.jsx';

export default function TaskList({ v }) {
  return (
    <section data-screen-label="Task list" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "14px 18px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", boxShadow: "var(--sh)" }}>
        <div style={{ flex: "0 1 170px" }}>
          <select value={v.tkA ?? ''} onChange={v.setTkA} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
            {(v.tkAOpts || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "0 1 170px" }}>
          <select value={v.tkP ?? ''} onChange={v.setTkP} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
            {(v.tkPOpts || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "0 1 140px" }}>
          <select value={v.tkS ?? ''} onChange={v.setTkS} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
            {(v.tkSOpts || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <input type="text" value={v.tkQ ?? ''} onChange={v.setTkQ} placeholder="Search tasks" style={{ flex: "1 1 150px", border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "11px 14px" }} />
        <button type="button" onClick={v.tkNewH} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          NEW TASK
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2.4fr) minmax(0,1.2fr) minmax(0,1.3fr) minmax(0,.9fr) minmax(0,1fr) minmax(90px,1fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          TASK
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          PROJECT
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ASSIGNEE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          DUE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          PRIORITY
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          STATUS
        </span>
      </div>
      {(v.tkRows || []).map((c, i_c) => (
        <div key={i_c} onClick={c.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,2.4fr) minmax(0,1.2fr) minmax(0,1.3fr) minmax(0,.9fr) minmax(0,1fr) minmax(90px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "12px 20px", cursor: "pointer", boxShadow: "var(--sh)" }} className="lb-tbl hvd">
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "800" }}>
              {c.title}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ flex: "1", height: "5px", borderRadius: "999px", background: "var(--wash)" }}>
                <span style={{ display: "block", height: "5px", borderRadius: "999px", background: "var(--g)", width: `${c.progress}%` }} />
              </span>
              <span style={{ fontSize: "10.5px", color: "var(--mut)" }}>
                {c.progress}%
              </span>
            </span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "7px", minWidth: "0", fontSize: "12px", color: "var(--mut)" }}>
            <span style={{ width: "8px", height: "8px", flex: "0 0 8px", borderRadius: "50%", background: c.projColor }} />
            {c.projName}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "0" }}>
            <span title="" style={{ width: "26px", height: "26px", flex: "0 0 26px", borderRadius: "9px", background: "var(--tint)", color: "#0a5c2f", fontSize: "9px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {c.initials}
            </span>
            <span style={{ fontSize: "12px", fontWeight: "600" }}>
              {c.who}
            </span>
          </span>
          <span style={{ fontSize: "12px", fontWeight: "700", color: c.dueFg }}>
            {c.dueLabel}
          </span>
          <span>
            <span style={{ fontSize: "9.5px", fontWeight: "800", letterSpacing: ".08em", color: c.prioFg, background: c.prioBg, borderRadius: "999px", padding: "4px 9px" }}>
              {c.prio}
            </span>
          </span>
          <span>
            <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: c.stFg, background: c.stBg, borderRadius: "999px", padding: "5px 10px" }}>
              {c.stLabel}
            </span>
          </span>
        </div>
      ))}
      {v.tkRowsEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No tasks match these filters.
        </div>
      ) : null}
    </section>
  );
}
