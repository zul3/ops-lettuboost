import Icon from '../../components/Icon.jsx';

export default function StockDashboard({ v }) {
  return (
    <section data-screen-label="Stock dashboard" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))", gap: "14px" }}>
        {(v.stStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "9px", boxShadow: "var(--sh)" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", color: s.labelFg }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em" }}>
                {s.label}
              </span>
              <Icon label={s.label} width="18" height="18" strokeWidth="1.8" style={{ flex: "0 0 auto", display: "block", opacity: ".85" }} />
            </span>
            <span style={{ fontSize: "29px", fontWeight: "800", letterSpacing: "-.035em", lineHeight: "1", color: s.color }}>
              {s.value}
            </span>
            <span style={{ fontSize: "11.5px", color: s.noteFg }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", minWidth: "0" }}>
          <h2 style={{ margin: "0 0 5px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            NEEDS RESTOCKING
          </h2>
          <p style={{ margin: "0 0 12px", fontSize: "11.5px", color: "var(--mut)" }}>
            At or below the reorder level
          </p>
          {(v.stLow || []).map((i, i_i) => (
            <div key={i_i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", borderBottom: "1px solid #eef3ea" }}>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {i.name}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {i.qtyLabel}{" · "}{i.reorderLabel}
                </span>
              </span>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: i.statusFg, background: i.statusBg, borderRadius: "999px", padding: "5px 9px" }}>
                {i.statusLabel}
              </span>
              <button type="button" onClick={i.restock} style={{ border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", padding: "9px 12px", cursor: "pointer" }}>
                RESTOCK
              </button>
            </div>
          ))}
          {v.stLowEmpty ? (
            <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
              Everything is above its reorder level.
            </span>
          ) : null}
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", minWidth: "0" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            VALUE BY CATEGORY
          </h2>
          {(v.stCatBars || []).map((c, i_c) => (
            <div key={i_c} style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "8px 0" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
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
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            LATEST MOVEMENTS
          </h2>
          <button type="button" onClick={v.goStMove} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", padding: "0" }}>
            ALL MOVEMENTS →
          </button>
        </div>
        {(v.stRecent || []).map((m, i_m) => (
          <div key={i_m} style={{ display: "grid", gridTemplateColumns: "minmax(80px,.8fr) minmax(0,2fr) minmax(0,1fr) minmax(0,1.4fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "13px 20px", boxShadow: "var(--sh)" }} className="lb-tbl">
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {m.dateLabel}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "800" }}>
              {m.name}
            </span>
            <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", color: m.kindFg }}>
              {m.kindLabel}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "800", textAlign: "right" }}>
              {m.qty}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
