export default function Employees({ v }) {
  return (
    <section data-screen-label="Employees" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        {(v.typeFilters || []).map((t, i_t) => (
          <button key={i_t} type="button" onClick={t.pick} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "11.5px", fontWeight: "700", letterSpacing: ".03em", padding: "10px 15px", cursor: "pointer", transition: "background .16s ease" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.2fr) minmax(0,1.2fr) minmax(0,1.4fr) minmax(104px,1fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          NAME
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          TYPE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          PAY TERM
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          UNIT
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          {v.empMonthCol}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(v.empRows || []).map((e, i_e) => (
          <button key={i_e} type="button" onClick={e.openSlip} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.2fr) minmax(0,1.2fr) minmax(0,1.4fr) minmax(104px,1fr)", gap: "14px", alignItems: "center", width: "100%", textAlign: "left", border: "0", borderRadius: "16px", background: "#ffffff", padding: "13px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
            <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
              <span style={{ width: "32px", height: "32px", flex: "0 0 32px", borderRadius: "11px", background: e.avBg, color: e.avFg, fontSize: "10.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {e.initials}
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {e.name}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {e.email}
                </span>
              </span>
            </span>
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".03em", color: e.typeFg }}>
              {e.type}
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {e.term}
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {e.unit}
            </span>
            <span style={{ fontSize: "13.5px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap" }}>
              {e.monthTotal}
            </span>
          </button>
        ))}
      </div>
      <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)" }}>
        Click any row to jump to that person's payslip.
      </p>
    </section>
  );
}
