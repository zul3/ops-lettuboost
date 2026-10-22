import Icon from '../../components/Icon.jsx';

export default function Approvals({ v }) {
  return (
    <section data-screen-label="Approvals" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "26px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "14px" }}>
        {(v.approvalStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "8px", minWidth: "0", boxShadow: "var(--sh)" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", color: s.labelFg }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em" }}>
                {s.label}
              </span>
              <Icon label={s.label} width="18" height="18" strokeWidth="1.8" style={{ flex: "0 0 auto", display: "block", opacity: ".85" }} />
            </span>
            <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1", color: s.color }}>
              {s.value}
            </span>
            <span style={{ fontSize: "11.5px", color: s.noteFg }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          OPEN — WAITING ON KEYS
        </h2>
        {(v.awaitingList || []).map((r, i_r) => (
          <div key={i_r} style={{ background: "#ffffff", borderRadius: "22px", padding: "8px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(258px, 100%), 1fr))", gap: "8px", alignItems: "stretch", boxShadow: "var(--sh)" }}>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "9px", minWidth: "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "12px", background: "var(--g)", color: "#fff", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {r.initials}
                </span>
                <div style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                  <span style={{ fontSize: "14px", fontWeight: "800" }}>
                    {r.payee}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                    {r.typeLabel}{" · "}{r.dateLabel}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.5" }}>
                {r.catLine}
              </span>
              <span style={{ fontSize: "12px", lineHeight: "1.5" }}>
                {r.note}
              </span>
            </div>
            <div style={{ padding: "16px 18px", background: "var(--wash)", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "9px", minWidth: "0" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
                APPROVAL LEDGER
              </span>
              {(r.ledger || []).map((k, i_k) => (
                <div key={i_k} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: k.dot, display: "block", flex: "0 0 7px" }} />
                  <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", fontWeight: "600" }}>
                    {k.who}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "800", color: k.fg }}>
                    {k.amount}
                  </span>
                </div>
              ))}
              <span style={{ fontSize: "11.5px", color: "var(--warn)", fontWeight: "700", lineHeight: "1.5" }}>
                {r.keyLine}
              </span>
            </div>
            <div style={{ padding: "16px 18px", background: "var(--tint)", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "space-between", minWidth: "0" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
                  RUNNING AVERAGE
                </span>
                <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>
                  {r.avgLabel}
                </span>
              </div>
              <button type="button" onClick={r.open} style={{ alignSelf: "flex-start", border: "0", borderRadius: "999px", background: r.ctaBg, color: r.ctaFg, fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "11px 16px", cursor: "pointer", transition: "transform .14s ease" }} className="hv7">
                {r.ctaLabel}
              </button>
            </div>
          </div>
        ))}
        {v.awaitingEmpty ? (
          <div style={{ background: "#ffffff", borderRadius: "18px", padding: "22px", fontSize: "12.5px", color: "var(--mut)", lineHeight: "1.5", boxShadow: "var(--sh)" }}>
            No open requests. Everything is approved.
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          APPROVED — READY TO PAY
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,2fr) minmax(0,1.4fr) minmax(104px,1fr) minmax(0,.9fr)", gap: "14px", padding: "2px 20px 4px" }} className="lb-th lb-tbl">
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            EMPLOYEE
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            BASIS
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            APPROVED BY
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
            AMOUNT
          </span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
            ACTION
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(v.approvedList || []).map((r, i_r) => (
            <div key={i_r} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,2fr) minmax(0,1.4fr) minmax(104px,1fr) minmax(0,.9fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "14px 20px", boxShadow: "var(--sh)" }} className="lb-tbl">
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
              <span style={{ fontSize: "12px", fontWeight: "600" }}>
                {r.approverLine}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap" }}>
                {r.amountLabel}
              </span>
              <span style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" onClick={r.pay} style={{ border: "0", borderRadius: "999px", background: r.payBg, color: r.payFg, fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", padding: "9px 13px", cursor: "pointer" }}>
                  {r.payLabel}
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
