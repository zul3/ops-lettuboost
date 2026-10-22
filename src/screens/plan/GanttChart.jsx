import Icon from '../../components/Icon.jsx';

export default function GanttChart({ v }) {
  return (
    <section data-screen-label="Gantt chart" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "12px 16px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", boxShadow: "var(--sh)" }}>
        <span style={{ display: "inline-flex", color: "var(--g)" }}>
          <Icon name="gantt" width="20" height="20" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
        </span>
        <div style={{ flex: "0 1 210px" }}>
          <select value={v.gProj ?? ''} onChange={v.setGProj} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
            {(v.gProjOpts || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "0 1 170px" }}>
          <select value={v.gA ?? ''} onChange={v.setGA} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
            {(v.tkAOpts2 || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "0 1 140px" }}>
          <select value={v.gS ?? ''} onChange={v.setGS} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
            {(v.tkSOpts || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <span style={{ flex: "1" }} />
        <div style={{ display: "flex", gap: "6px" }}>
          {(v.gZoom || []).map((t, i_t) => (
            <button key={i_t} type="button" onClick={t.pick} style={{ display: "inline-flex", alignItems: "center", gap: "6px", border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "11.5px", fontWeight: "700", padding: "10px 15px", cursor: "pointer" }}>
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={v.gExpand} title="Expand all subtasks" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "var(--tint)", color: "var(--g)", cursor: "pointer", padding: "0" }}>
          <Icon name="list" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
        </button>
        <button type="button" onClick={v.gCollapse} title="Collapse all subtasks" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "var(--tint)", color: "var(--g)", cursor: "pointer", padding: "0" }}>
          <Icon name="chevron" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
        </button>
        <button type="button" onClick={v.gNewTask} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          TASK
        </button>
      </div>
      <div style={{ background: "#ffffff", borderRadius: "22px", boxShadow: "var(--sh)", overflow: "auto", maxHeight: "calc(100vh - 300px)", minHeight: "240px" }}>
        <div style={{ position: "relative", width: `${v.gg.totalW}px`, minWidth: "100%" }}>
          <div style={{ position: "sticky", top: "0", zIndex: "4", display: "flex", background: "#ffffff" }}>
            <div style={{ position: "sticky", left: "0", zIndex: "5", flex: "0 0 280px", width: "280px", background: "#ffffff", borderBottom: "1px solid #e1eadc", display: "flex", alignItems: "flex-end", padding: "0 14px 10px", fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
              TASK
            </div>
            <div style={{ position: "relative", flex: `0 0 ${v.gg.chartW}px`, width: `${v.gg.chartW}px`, height: "54px", borderBottom: "1px solid #e1eadc" }}>
              {(v.gMonths || []).map((m, i_m) => (
                <div key={i_m} style={{ position: "absolute", top: "0", left: `${m.left}px`, width: `${m.w}px`, height: "26px", borderLeft: "1px solid #e1eadc", padding: "7px 8px", fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {m.label}
                </div>
              ))}
              {(v.gTicks || []).map((t, i_t) => (
                <div key={i_t} style={{ position: "absolute", top: "26px", left: `${t.left}px`, width: `${t.w}px`, height: "28px", borderLeft: "1px solid #eef3ea", padding: "8px 0 0 4px", fontSize: "9.5px", fontWeight: "600", color: t.fg, whiteSpace: "nowrap", overflow: "hidden" }}>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
          {(v.gRows || []).map((r, i_r) => (
            <div key={i_r} style={{ display: "flex", height: "40px" }}>
              <div style={{ position: "sticky", left: "0", zIndex: "2", flex: "0 0 280px", width: "280px", background: r.labelBg, borderBottom: "1px solid #eef3ea", display: "flex", alignItems: "center", gap: "7px", padding: `0 12px 0 ${r.pad}px` }}>
                {r.hasSubs ? (
                  <button type="button" onClick={r.toggle} title="Show or hide subtasks" style={{ display: "flex", flex: "0 0 18px", width: "18px", height: "18px", border: "0", background: "none", color: "var(--ink)", padding: "0", cursor: "pointer", alignItems: "center", justifyContent: "center", transform: r.caret, transition: "transform .2s ease" }}>
                    <Icon name="chevron" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                  </button>
                ) : null}
                {r.noSubs ? (
                  <span style={{ flex: "0 0 18px", width: "18px" }} />
                ) : null}
                <span style={{ width: "8px", height: "8px", flex: "0 0 8px", borderRadius: "50%", background: r.dot, display: "block" }} />
                <span onClick={r.open} title={r.tip} style={{ flex: "1", minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12.5px", fontWeight: r.fw, cursor: "pointer" }}>
                  {r.label}
                </span>
                {r.hasAv ? (
                  <span title={r.avName} style={{ width: "22px", height: "22px", flex: "0 0 22px", borderRadius: "8px", background: "var(--tint)", color: "#0a5c2f", fontSize: "8.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {r.initials}
                  </span>
                ) : null}
              </div>
              <div style={{ position: "relative", flex: `0 0 ${v.gg.chartW}px`, width: `${v.gg.chartW}px`, borderBottom: "1px solid #eef3ea", backgroundColor: r.rowBg, backgroundImage: v.gg.gridBg }}>
                <div onClick={r.open} title={r.tip} style={{ position: "absolute", left: `${r.left}px`, top: `${r.barTop}px`, width: `${r.width}px`, height: `${r.barH}px`, borderRadius: "8px", background: r.barBg, boxShadow: r.ring, cursor: "pointer", overflow: "hidden" }}>
                  <div style={{ width: `${r.fill}%`, height: "100%", background: r.fillBg }} />
                </div>
                <span style={{ position: "absolute", left: `${r.labelLeft}px`, top: "0", lineHeight: "40px", fontSize: "10.5px", fontWeight: "700", color: "var(--mut)", whiteSpace: "nowrap" }}>
                  {r.progLabel}
                </span>
              </div>
            </div>
          ))}
          {v.gg.showToday ? (
            <div style={{ position: "absolute", top: "54px", bottom: "0", left: `${v.gg.todayLeft}px`, width: "2px", background: "#b3261e", opacity: ".6", zIndex: "1", pointerEvents: "none" }} />
          ) : null}
        </div>
      </div>
      {v.gEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No tasks match these filters.
        </div>
      ) : null}
      <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.6", display: "flex", alignItems: "center", gap: "8px" }}>
        <Icon name="clock" width="14" height="14" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
        Click a bar or task name to edit it. Red outline means late; the red line is today. Tasks you assign here also show up on the Tasks board.
      </p>
    </section>
  );
}
