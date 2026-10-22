import Icon from '../../components/Icon.jsx';

export default function ClaimsOverview({ v }) {
  return (
    <section data-screen-label="Claims overview" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(196px, 100%), 1fr))", gap: "14px" }}>
        {(v.clStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0", boxShadow: "var(--sh)" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", minWidth: "0", boxShadow: "var(--sh)" }}>
          <h2 style={{ margin: "0 0 5px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            SPEND BY CATEGORY
          </h2>
          <p style={{ margin: "0 0 14px", fontSize: "11.5px", color: "var(--mut)" }}>
            Pending, approved and paid claims
          </p>
          {(v.clCatBars || []).map((c, i_c) => (
            <div key={i_c} style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "8px 0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ flex: "1", fontSize: "12.5px", fontWeight: "600" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {c.total}
                </span>
              </div>
              <div style={{ height: "8px", borderRadius: "999px", background: "var(--wash)" }}>
                <div style={{ height: "8px", borderRadius: "999px", background: "var(--g)", width: c.pct, transformOrigin: "left", animation: "om-bar .6s cubic-bezier(.2,.8,.2,1) both" }} />
              </div>
            </div>
          ))}
          {v.clCatEmpty ? (
            <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
              No claims yet.
            </span>
          ) : null}
        </div>
        <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
          <h2 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-.01em", color: "#ffffff" }}>
            Claim policy
          </h2>
          {(v.clPolicy || []).map((p, i_p) => (
            <div key={i_p} style={{ display: "flex", gap: "11px", alignItems: "baseline" }}>
              <span style={{ width: "6px", height: "6px", flex: "0 0 6px", borderRadius: "50%", background: "var(--lime)", display: "block", marginTop: "6px" }} />
              <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,.88)", lineHeight: "1.55" }}>
                {p.t}
              </span>
            </div>
          ))}
          <button type="button" onClick={v.goClNew} style={{ alignSelf: "flex-start", marginTop: "6px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
            START A CLAIM →
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            LATEST CLAIMS
          </h2>
          <button type="button" onClick={v.goClMine} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "700", letterSpacing: ".04em", cursor: "pointer", padding: "0" }}>
            MY CLAIMS →
          </button>
        </div>
        {(v.clRecent || []).map((r, i_r) => (
          <div key={i_r} onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,2.2fr) minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.2fr) minmax(96px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "14px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
            <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
              <span style={{ width: "32px", height: "32px", flex: "0 0 32px", borderRadius: "11px", background: "var(--tint)", fontSize: "10.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {r.initials}
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {r.title}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {r.byName}{" · "}{r.id}{" · "}{r.dateLabel}
                </span>
              </span>
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.4" }}>
              {r.cats}
              <br />
              {r.lines}
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {r.receipts}
            </span>
            <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg }}>
              {r.statusLabel}
            </span>
            <span style={{ fontSize: "14px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap" }}>
              {r.total}
            </span>
          </div>
        ))}
        {v.clRecentEmpty ? (
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "22px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
            No claims yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}
