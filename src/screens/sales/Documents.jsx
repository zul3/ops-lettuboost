import Icon from '../../components/Icon.jsx';

export default function Documents({ v }) {
  return (
    <section data-screen-label="Documents" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "14px 18px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", boxShadow: "var(--sh)" }}>
        {(v.saFilters || []).map((t, i_t) => (
          <button key={i_t} type="button" onClick={t.pick} style={{ display: "inline-flex", alignItems: "center", gap: "6px", border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "11.5px", fontWeight: "700", padding: "10px 15px", cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
        <input type="text" value={v.dq ?? ''} onChange={v.setDq} placeholder="Search number or customer" style={{ flex: "1 1 180px", border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "11px 14px" }} />
        <button type="button" onClick={v.saNewQuote} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="file" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          QUOTE
        </button>
        <button type="button" onClick={v.saNewInv} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="receipt" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          INVOICE
        </button>
        <button type="button" onClick={v.saNewRc} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          RECEIPT
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(96px,1fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          DOCUMENT
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          CUSTOMER
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          DATE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          STATUS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          TOTAL
        </span>
      </div>
      {(v.saRows || []).map((r, i_r) => (
        <div key={i_r} onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(96px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "13px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
          <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
            <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: "var(--tint)", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={r.icon} width="17" height="17" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
              <span style={{ fontSize: "13px", fontWeight: "800" }}>
                {r.id}
              </span>
              <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                {r.typeLabel}
              </span>
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>
              {r.cust}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.sub}
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "12px" }}>
              {r.dateLabel}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {r.dueLabel}
            </span>
          </span>
          <span>
            <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg, background: r.statusBg, borderRadius: "999px", padding: "5px 10px" }}>
              {r.statusLabel}
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap" }}>
              {r.total}
            </span>
            <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#8a5a00" }}>
              {r.balLabel}
            </span>
          </span>
        </div>
      ))}
      {v.saRowsEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No documents match.
        </div>
      ) : null}
    </section>
  );
}
