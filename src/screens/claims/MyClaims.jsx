export default function MyClaims({ v }) {
  return (
    <section data-screen-label="My claims" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {(v.clFilters || []).map((t, i_t) => (
          <button key={i_t} type="button" onClick={t.pick} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "11.5px", fontWeight: "700", padding: "10px 15px", cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2.2fr) minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.2fr) minmax(96px,1fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          CLAIM
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          CATEGORY
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          RECEIPTS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          STATUS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          TOTAL
        </span>
      </div>
      {(v.clMine || []).map((r, i_r) => (
        <div key={i_r} onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,2.2fr) minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.2fr) minmax(96px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "14px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "13px", fontWeight: "800" }}>
              {r.title}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {r.id}{" · "}{r.dateLabel}
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
      {v.clMineEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          Nothing here yet. Start a claim and attach your receipts.
        </div>
      ) : null}
    </section>
  );
}
