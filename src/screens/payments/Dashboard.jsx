import Icon from '../../components/Icon.jsx';

export default function Dashboard({ v }) {
  return (
    <section data-screen-label="Dashboard" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(196px, 100%), 1fr))", gap: "14px" }}>
        {(v.stats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0", boxShadow: "var(--sh)" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", color: s.labelFg }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em" }}>
                {s.label}
              </span>
              <Icon label={s.label} width="18" height="18" strokeWidth="1.8" style={{ flex: "0 0 auto", display: "block", opacity: ".85" }} />
            </span>
            <span style={{ fontSize: "31px", fontWeight: "800", letterSpacing: "-.035em", lineHeight: "1", color: s.color }}>
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
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "5px" }}>
            <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
              NEEDS YOUR APPROVAL
            </h2>
            <button type="button" onClick={v.goDual} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "700", letterSpacing: ".04em", cursor: "pointer", padding: "0" }}>
              OPEN FLOW →
            </button>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55" }}>
            Founder payments need two of three approvals. The average of the two becomes the final amount.
          </p>
          {(v.myQueue || []).map((r, i_r) => (
            <div key={i_r} style={{ background: "var(--tint)", borderRadius: "16px", padding: "16px", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "11px", animation: "om-rise .3s ease both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "32px", height: "32px", flex: "0 0 32px", borderRadius: "11px", background: "var(--g)", color: "#fff", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {r.initials}
                </span>
                <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "13.5px", fontWeight: "800" }}>
                    {r.payee}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                    {r.catLine}
                  </span>
                </div>
                <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".1em", color: "var(--warn)" }}>
                  {r.statusLabel}
                </span>
              </div>
              <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
                {r.keyLine}
              </p>
              <button type="button" onClick={r.open} style={{ alignSelf: "flex-start", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "11px 16px", cursor: "pointer", transition: "transform .14s ease" }} className="hv7">
                KEY IN AMOUNT
              </button>
            </div>
          ))}
          {v.queueEmpty ? (
            <div style={{ background: "var(--wash)", borderRadius: "16px", padding: "20px", fontSize: "12.5px", color: "var(--mut)", lineHeight: "1.5" }}>
              Nothing waiting on you. Nice — the loop is clear.
            </div>
          ) : null}
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", minWidth: "0", boxShadow: "var(--sh)" }}>
          <h2 style={{ margin: "0 0 5px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            THIS MONTH BY CATEGORY
          </h2>
          <p style={{ margin: "0 0 18px", fontSize: "11.5px", color: "var(--mut)" }}>
            {v.monthLabel}{" · approved and paid"}
          </p>
          {(v.catBars || []).map((c, i_c) => (
            <div key={i_c} style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "9px 0" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ flex: "1", fontSize: "12.5px", fontWeight: "600" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {c.count}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "-.01em" }}>
                  {c.total}
                </span>
              </div>
              <div style={{ height: "8px", borderRadius: "999px", background: "var(--wash)", width: "100%" }}>
                <div style={{ height: "8px", borderRadius: "999px", background: c.color, width: c.pct, transformOrigin: "left", animation: "om-bar .6s cubic-bezier(.2,.8,.2,1) both" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
          <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            LATEST ACTIVITY
          </h2>
          <button type="button" onClick={v.goHistory} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "700", letterSpacing: ".04em", cursor: "pointer", padding: "0" }}>
            ALL HISTORY →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,2fr) minmax(0,1.4fr) minmax(104px,1fr)", gap: "14px", padding: "2px 20px 4px" }} className="lb-th lb-tbl">
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            EMPLOYEE
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            BASIS
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            STATUS
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
            AMOUNT
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(v.recent || []).map((r, i_r) => (
            <button key={i_r} type="button" onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,2fr) minmax(0,1.4fr) minmax(104px,1fr)", gap: "14px", alignItems: "center", textAlign: "left", border: "0", borderRadius: "16px", background: "#ffffff", padding: "15px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
              <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {r.payee}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {r.typeLabel}{" · "}{r.dateLabel}
                </span>
              </span>
              <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.4" }}>
                {r.catLine}
              </span>
              <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg }}>
                {r.statusLabel}
              </span>
              <span style={{ fontSize: "14.5px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap", letterSpacing: "-.015em" }}>
                {r.amountLabel}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
