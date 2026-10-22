import Icon from '../../components/Icon.jsx';

export default function FounderApproval({ v }) {
  return (
    <section data-screen-label="Founder approval" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(290px, 100%), 1fr))", gap: "16px", alignItems: "stretch" }}>
        <div style={{ background: "var(--g)", borderRadius: "22px", padding: "26px", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
          <h2 style={{ margin: "0", fontSize: "17px", fontWeight: "800", letterSpacing: "-.01em", color: "#ffffff" }}>
            The fairness rule
          </h2>
          <p style={{ margin: "0", fontSize: "12.5px", color: "rgba(255,255,255,.82)", lineHeight: "1.65" }}>
            Anyone of the three founders can approve a payment for staff, and it is approved the moment it is entered. But when the person being paid is a founder, that founder cannot set their own number — the other two approve independently, and the average of those two amounts becomes the final payment.
          </p>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "12px 24px", display: "flex", flexDirection: "column", minWidth: "0", boxShadow: "var(--sh)" }}>
          {(v.ruleSteps || []).map((s, i_s) => (
            <div key={i_s} style={{ display: "flex", gap: "14px", padding: "13px 0" }}>
              <span style={{ flex: "0 0 26px", height: "26px", borderRadius: "9px", background: "var(--tint)", color: "var(--g)", fontSize: "10.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.n}
              </span>
              <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", lineHeight: "1.55", paddingTop: "3px" }}>
                {s.t}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          FOUNDER PAYMENT REQUESTS
        </h2>
        {(v.founderRequests || []).map((r, i_r) => (
          <div key={i_r} style={{ background: "#ffffff", borderRadius: "22px", padding: "8px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "var(--sh)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", padding: "14px 16px 8px" }}>
              <span style={{ width: "38px", height: "38px", flex: "0 0 38px", borderRadius: "13px", background: "var(--lime)", color: "var(--ink)", fontSize: "12px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {r.initials}
              </span>
              <div style={{ flex: "1", minWidth: "140px", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                  {r.payee}
                </span>
                <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
                  {r.catLine}{" · "}{r.dateLabel}
                </span>
              </div>
              <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".1em", color: r.statusFg, background: r.statusBg, borderRadius: "999px", padding: "7px 12px" }}>
                {r.statusLabel}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(170px, 100%), 1fr))", gap: "8px" }}>
              {(r.slots || []).map((s, i_s) => (
                <div key={i_s} style={{ padding: "16px 18px", borderRadius: "16px", background: s.bg, display: "flex", flexDirection: "column", gap: "9px", minWidth: "0" }}>
                  <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                    {s.role}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "700" }}>
                    {s.who}
                  </span>
                  {s.hasAmount ? (
                    <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-.025em", color: "var(--g)" }}>
                      {s.amount}
                    </span>
                  ) : null}
                  {s.hiddenFromPayee ? (
                    <span style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--g)" }}>
                      Approved
                    </span>
                  ) : null}
                  {s.canKey ? (
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <input type="number" min="0" step="1" value={s.draft ?? ''} onChange={s.onDraft} placeholder="0" style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "14px", fontWeight: "700", padding: "10px 12px", width: "98px" }} />
                      <button type="button" onClick={s.commit} style={{ border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11px", fontWeight: "800", letterSpacing: ".06em", padding: "11px 14px", cursor: "pointer" }}>
                        <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
                        APPROVE
                      </button>
                    </div>
                  ) : null}
                  {s.waiting ? (
                    <span style={{ fontSize: "11.5px", color: "var(--warn)", fontWeight: "700", lineHeight: "1.5" }}>
                      {s.waitText}
                    </span>
                  ) : null}
                </div>
              ))}
              <div style={{ padding: "16px 18px", borderRadius: "16px", background: "var(--tint)", display: "flex", flexDirection: "column", gap: "7px", minWidth: "0" }}>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                  FINAL = AVERAGE
                </span>
                <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>
                  {r.avgLabel}
                </span>
                <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
                  {r.avgMath}
                </span>
              </div>
            </div>
          </div>
        ))}
        {v.founderEmpty ? (
          <div style={{ background: "#ffffff", borderRadius: "18px", padding: "22px", fontSize: "12.5px", color: "var(--mut)", lineHeight: "1.5", boxShadow: "var(--sh)" }}>
            No founder payment requests yet. Create one from New request and pick Zul, PJ or Neil as the payee to see the two-key loop.
          </div>
        ) : null}
      </div>
    </section>
  );
}
