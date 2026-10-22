import Icon from '../../components/Icon.jsx';

export default function TaskBoard({ v }) {
  return (
    <section data-screen-label="Task board" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))", gap: "14px" }}>
        {(v.tkStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "9px", boxShadow: "var(--sh)", minWidth: "0" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", color: s.labelFg }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em" }}>
                {s.label}
              </span>
              <Icon label={s.label} width="18" height="18" strokeWidth="1.8" style={{ flex: "0 0 auto", display: "block", opacity: ".85" }} />
            </span>
            <span style={{ fontSize: "29px", fontWeight: "800", letterSpacing: "-.035em", lineHeight: "1", color: s.color }}>
              {s.value}
            </span>
            <span style={{ fontSize: "11.5px", color: s.noteFg, lineHeight: "1.45" }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(270px, 100%), 1fr))", gap: "14px", alignItems: "start" }}>
        {(v.tkCols || []).map((col, i_col) => (
          <div key={i_col} style={{ background: "var(--tint)", borderRadius: "22px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "4px 6px" }}>
              <Icon name={col.icon} width="17" height="17" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block", color: col.fg }} />
              <span style={{ flex: "1", fontSize: "11px", fontWeight: "800", letterSpacing: ".12em" }}>
                {col.title}
              </span>
              <span style={{ fontSize: "11px", fontWeight: "800", background: "#ffffff", borderRadius: "999px", padding: "2px 9px" }}>
                {col.count}
              </span>
            </div>
            {(col.cards || []).map((c, i_c) => (
              <div key={i_c} onClick={c.open} style={{ background: "#ffffff", borderRadius: "16px", padding: "14px 15px", display: "flex", flexDirection: "column", gap: "9px", boxShadow: "var(--sh)", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  {c.hasProj ? (
                    <>
                      <span style={{ width: "8px", height: "8px", flex: "0 0 8px", borderRadius: "50%", background: c.projColor, display: "block" }} />
                      <span style={{ flex: "1", minWidth: "0", fontSize: "10.5px", fontWeight: "700", color: "var(--mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c.projName}
                      </span>
                    </>
                  ) : null}
                  {c.noProj ? (
                    <span style={{ flex: "1", fontSize: "10.5px", fontWeight: "700", color: "var(--mut)" }}>
                      No project
                    </span>
                  ) : null}
                  <span title={`${c.prio} priority`} style={{ fontSize: "9.5px", fontWeight: "800", letterSpacing: ".08em", color: c.prioFg, background: c.prioBg, borderRadius: "999px", padding: "3px 8px" }}>
                    {c.prio}
                  </span>
                </div>
                <span style={{ fontSize: "13.5px", fontWeight: "800", lineHeight: "1.3" }}>
                  {c.title}
                </span>
                {c.hasParent ? (
                  <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                    {"↳ "}{c.parentLabel}
                  </span>
                ) : null}
                {c.showProg ? (
                  <div style={{ height: "5px", borderRadius: "999px", background: "var(--wash)" }}>
                    <div style={{ height: "5px", borderRadius: "999px", background: "var(--g)", width: `${c.progress}%` }} />
                  </div>
                ) : null}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span title={c.who} style={{ width: "26px", height: "26px", flex: "0 0 26px", borderRadius: "9px", background: "var(--tint)", color: "#0a5c2f", fontSize: "9px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {c.initials}
                  </span>
                  <span style={{ flex: "1", fontSize: "11px", fontWeight: "700", color: c.dueFg }}>
                    {c.dueLabel}
                  </span>
                  {c.canPrev ? (
                    <button type="button" onClick={c.prev} title="Move back" style={{ display: "flex", border: "0", borderRadius: "10px", background: "var(--wash)", color: "var(--ink)", padding: "7px", cursor: "pointer" }}>
                      <Icon name="arrowL" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                    </button>
                  ) : null}
                  {c.canNext ? (
                    <button type="button" onClick={c.next} title="Move forward" style={{ display: "flex", border: "0", borderRadius: "10px", background: "var(--g)", color: "#ffffff", padding: "7px", cursor: "pointer" }}>
                      <Icon name="arrowR" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {col.empty ? (
              <span style={{ fontSize: "12px", color: "var(--mut)", padding: "8px 6px" }}>
                Nothing here.
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
