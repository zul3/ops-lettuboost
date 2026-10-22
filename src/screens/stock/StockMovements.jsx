import Icon from '../../components/Icon.jsx';

export default function StockMovements({ v }) {
  return (
    <section data-screen-label="Stock movements" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        {(v.mvFilters || []).map((t, i_t) => (
          <button key={i_t} type="button" onClick={t.pick} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "11.5px", fontWeight: "700", padding: "10px 15px", cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
        <span style={{ flex: "1" }} />
        <button type="button" onClick={v.mvNew} style={{ border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
          <Icon name="swap" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          RECORD MOVEMENT
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(80px,.8fr) minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.6fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          DATE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ITEM
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          TYPE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          CHANGE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          BALANCE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          BY / NOTE
        </span>
      </div>
      {(v.mvRows || []).map((m, i_m) => (
        <div key={i_m} style={{ display: "grid", gridTemplateColumns: "minmax(80px,.8fr) minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.6fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "13px 20px", boxShadow: "var(--sh)" }} className="lb-tbl">
          <span style={{ fontSize: "12px", color: "var(--mut)" }}>
            {m.dateLabel}
          </span>
          <span style={{ fontSize: "13px", fontWeight: "800" }}>
            {m.name}
          </span>
          <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", color: m.kindFg }}>
            {m.kindLabel}
          </span>
          <span style={{ fontSize: "13px", fontWeight: "800", textAlign: "right", color: m.kindFg }}>
            {m.qty}
          </span>
          <span style={{ fontSize: "12.5px", textAlign: "right" }}>
            {m.after}
          </span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "12px", fontWeight: "600" }}>
              {m.by}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {m.note}
            </span>
          </span>
        </div>
      ))}
      {v.mvEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No movements yet.
        </div>
      ) : null}
    </section>
  );
}
