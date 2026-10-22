export default function History({ v }) {
  return (
    <section data-screen-label="History" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "16px 20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "flex-end", boxShadow: "var(--sh)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            SEARCH
          </label>
          <input type="text" value={v.hq ?? ''} onChange={v.setHq} placeholder="Name or note" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 14px", minWidth: "210px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            MONTH
          </label>
          <select value={v.hMonth ?? ''} onChange={v.setHMonth} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
            {(v.monthFilterOptions || []).map((m, i_m) => (
              <option key={i_m} value={m.id ?? ''}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            CATEGORY
          </label>
          <select value={v.hCat ?? ''} onChange={v.setHCat} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
            {(v.catFilterOptions || []).map((c, i_c) => (
              <option key={i_c} value={c.id ?? ''}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            STATUS
          </label>
          <select value={v.hStatus ?? ''} onChange={v.setHStatus} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
            {(v.statusFilterOptions || []).map((s, i_s) => (
              <option key={i_s} value={s.id ?? ''}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "1", minWidth: "130px", display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            FILTERED TOTAL
          </span>
          <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-.025em", color: "var(--g)" }}>
            {v.historyTotal}
          </span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(78px,1fr) minmax(0,1.8fr) minmax(0,2fr) minmax(0,1.3fr) minmax(0,1.2fr) minmax(104px,1fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          DATE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          EMPLOYEE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          BASIS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          APPROVED BY
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          STATUS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          AMOUNT
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(v.historyRows || []).map((r, i_r) => (
          <button key={i_r} type="button" onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(78px,1fr) minmax(0,1.8fr) minmax(0,2fr) minmax(0,1.3fr) minmax(0,1.2fr) minmax(104px,1fr)", gap: "14px", alignItems: "center", width: "100%", textAlign: "left", border: "0", borderRadius: "16px", background: "#ffffff", padding: "14px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {r.dateLabel}
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
              <span style={{ fontSize: "13px", fontWeight: "800" }}>
                {r.payee}
              </span>
              <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                {r.typeLabel}
              </span>
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.4" }}>
              {r.catLine}
            </span>
            <span style={{ fontSize: "12px", fontWeight: "600" }}>
              {r.approverLine}
            </span>
            <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg }}>
              {r.statusLabel}
            </span>
            <span style={{ fontSize: "13.5px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap" }}>
              {r.amountLabel}
            </span>
          </button>
        ))}
        {v.historyEmpty ? (
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
            Nothing matches those filters.
          </div>
        ) : null}
      </div>
    </section>
  );
}
