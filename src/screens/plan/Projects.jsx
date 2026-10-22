import Icon from '../../components/Icon.jsx';

export default function Projects({ v }) {
  return (
    <section data-screen-label="Projects" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))", gap: "14px" }}>
        {(v.ppStats || []).map((s, i_s) => (
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          PROJECTS
        </h2>
        <button type="button" onClick={v.ppNewH} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          NEW PROJECT
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(310px, 100%), 1fr))", gap: "14px" }}>
        {(v.ppCards || []).map((p, i_p) => (
          <div key={i_p} onClick={p.open} style={{ background: "#ffffff", borderRadius: "22px", padding: "0", boxShadow: "var(--sh)", cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column", minWidth: "0", transition: "transform .14s ease" }} className="hv7">
            <div style={{ height: "8px", background: p.color }} />
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "-.01em", lineHeight: "1.25" }}>
                    {p.name}
                  </span>
                  <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
                    {p.desc}
                  </span>
                </span>
                <button type="button" onClick={p.edit} title="Edit project" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", color: "var(--ink)", cursor: "pointer", padding: "0", boxShadow: "none", background: "var(--wash)" }}>
                  <Icon name="edit" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                </button>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: p.stFg, background: p.stBg, borderRadius: "999px", padding: "5px 10px" }}>
                  {p.status}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "var(--mut)" }}>
                  <Icon name="calendar" width="14" height="14" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                  {p.range}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}>
                  <span style={{ color: "var(--mut)" }}>
                    {p.counts}
                  </span>
                  <b>
                    {p.progLabel}
                  </b>
                </div>
                <div style={{ height: "8px", borderRadius: "999px", background: "var(--wash)" }}>
                  <div style={{ height: "8px", borderRadius: "999px", background: p.color, width: `${p.prog}%` }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {(p.team || []).map((t, i_t) => (
                  <span key={i_t} title={t.name} style={{ width: "28px", height: "28px", flex: "0 0 28px", borderRadius: "9px", background: "var(--tint)", color: "#0a5c2f", fontSize: "10px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {t.initials}
                  </span>
                ))}
                <span style={{ flex: "1" }} />
                {p.hasLate ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: "800", color: "#b3261e" }}>
                    <Icon name="alert" width="14" height="14" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                    {p.lateText}
                  </span>
                ) : null}
                <span style={{ display: "inline-flex", color: "var(--g)" }}>
                  <Icon name="gantt" width="18" height="18" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {v.ppEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No projects yet. Create one to start planning.
        </div>
      ) : null}
    </section>
  );
}
