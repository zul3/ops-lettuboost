import logoMark from '../../assets/logo-mark.png';

export default function Notifications({ v }) {
  return (
    <section data-screen-label="Notifications" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(310px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", padding: "0 4px" }}>
          <h2 style={{ margin: "0", flex: "1", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            SENT NOTIFICATIONS
          </h2>
          <button type="button" onClick={v.markAllRead} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11px", fontWeight: "700", letterSpacing: ".04em", cursor: "pointer", padding: "0" }}>
            MARK ALL READ
          </button>
        </div>
        {(v.notifyRows || []).map((n, i_n) => (
          <button key={i_n} type="button" onClick={n.open} style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", width: "100%", textAlign: "left", border: "0", borderRadius: "16px", background: n.bg, padding: "15px 18px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease" }} className="hv7">
            <span style={{ display: "flex", gap: "9px", alignItems: "center", width: "100%" }}>
              <span style={{ width: "7px", height: "7px", flex: "0 0 7px", borderRadius: "50%", background: n.dot, display: "block" }} />
              <span style={{ flex: "1", minWidth: "0", fontSize: "13px", fontWeight: n.fw, lineHeight: "1.35" }}>
                {n.subject}
              </span>
              <span style={{ fontSize: "10.5px", color: "var(--mut)", whiteSpace: "nowrap" }}>
                {n.time}
              </span>
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {"To "}{n.to}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
              {n.preview}
            </span>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
        <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          EMAIL PREVIEW
        </span>
        <div style={{ background: "#ffffff", borderRadius: "22px", overflow: "hidden", boxShadow: "var(--sh)", animation: "om-in .28s ease both" }}>
          <div style={{ padding: "18px 20px", background: "var(--wash)", display: "flex", flexDirection: "column", gap: "7px" }}>
            {(v.mailHead || []).map((h, i_h) => (
              <div key={i_h} style={{ display: "flex", gap: "10px" }}>
                <span style={{ flex: "0 0 54px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)", paddingTop: "2px" }}>
                  {h.k}
                </span>
                <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", fontWeight: "600", lineHeight: "1.45" }}>
                  {h.v}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: "26px 22px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "18px" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "10px", background: "var(--tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoMark} alt="" style={{ width: "16px", height: "19px", objectFit: "contain", display: "block" }} />
              </span>
              <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: ".08em" }}>
                LETTUBOOST
              </span>
            </div>
            <h3 style={{ margin: "0 0 14px", fontSize: "19px", fontWeight: "800", letterSpacing: "-.015em", lineHeight: "1.25" }}>
              {v.mailTitle}
            </h3>
            {(v.mailBody || []).map((p, i_p) => (
              <p key={i_p} style={{ margin: "0 0 12px", fontSize: "13px", lineHeight: "1.65", color: "#33453b" }}>
                {p.t}
              </p>
            ))}
            <div style={{ background: "var(--tint)", borderRadius: "16px", padding: "16px 18px", margin: "18px 0", display: "flex", flexDirection: "column", gap: "9px" }}>
              {(v.mailFacts || []).map((m, i_m) => (
                <div key={i_m} style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
                  <span style={{ flex: "0 0 96px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                    {m.k}
                  </span>
                  <span style={{ flex: "1", minWidth: "0", fontSize: "13px", fontWeight: "700" }}>
                    {m.v}
                  </span>
                </div>
              ))}
            </div>
            <span style={{ display: "inline-block", background: "var(--lime)", color: "var(--ink)", borderRadius: "999px", fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 20px" }}>
              {v.mailCta}
            </span>
            <p style={{ margin: "20px 0 0", fontSize: "11px", color: "var(--mut)", lineHeight: "1.6" }}>
              You are getting this because you are one of the three approvers. Reply-all is on — if a number looks off, say so before it is paid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
