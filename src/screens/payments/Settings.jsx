import logoMark from '../../assets/logo-mark.png';

export default function Settings({ v }) {
  return (
    <section data-screen-label="Settings" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(310px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          CATEGORY AMOUNTS
        </h2>
        <p style={{ margin: "0", fontSize: "12px", color: "var(--mut)", lineHeight: "1.6", padding: "0 4px" }}>
          The four fixed bands. Change one here and every new request uses the new figure — past records keep the amount they were approved at.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(v.rateRows || []).map((c, i_c) => (
            <div key={i_c} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#ffffff", borderRadius: "16px", padding: "12px 18px", boxShadow: "var(--sh)" }}>
              <span style={{ flex: "1", minWidth: "0", fontSize: "13.5px", fontWeight: "700" }}>
                {c.label}
              </span>
              <span style={{ fontSize: "12px", color: "var(--mut)" }}>
                RM
              </span>
              <input type="number" min="0" step="5" value={c.value ?? ''} onChange={c.set} style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "14px", fontWeight: "800", padding: "10px 12px", width: "96px" }} />
            </div>
          ))}
        </div>
        <h2 style={{ margin: "14px 0 0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          UNITS OF MEASURE
        </h2>
        <button type="button" onClick={v.openUom} style={{ display: "flex", alignItems: "center", gap: "12px", border: "0", textAlign: "left", background: "#ffffff", borderRadius: "16px", padding: "16px 18px", boxShadow: "var(--sh)", cursor: "pointer" }} className="hve">
          <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ fontSize: "13.5px", fontWeight: "800" }}>
              Manage units of measure
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.uomSummary}
            </span>
          </span>
          <span style={{ fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", color: "var(--g)" }}>
            OPEN →
          </span>
        </button>
        <h2 style={{ margin: "14px 0 0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          STATUTORY DEDUCTIONS
        </h2>
        <button type="button" onClick={v.openStat} style={{ display: "flex", alignItems: "center", gap: "12px", border: "0", textAlign: "left", background: "#ffffff", borderRadius: "16px", padding: "16px 18px", boxShadow: "var(--sh)", cursor: "pointer" }} className="hve">
          <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ fontSize: "13.5px", fontWeight: "800" }}>
              Manage payslip deductions
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {"EPF · SOCSO · EIS · Income tax · Zakat · "}{v.statSummary}
            </span>
          </span>
          <span style={{ fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", color: "var(--g)" }}>
            OPEN →
          </span>
        </button>
        <h2 style={{ margin: "14px 0 0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          COMPANY LOGO
        </h2>
        <div style={{ background: "var(--tint)", borderRadius: "20px", padding: "20px", display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ width: "64px", height: "64px", flex: "0 0 64px", borderRadius: "18px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={logoMark} alt="Current logo" style={{ width: "34px", height: "38px", objectFit: "contain", display: "block" }} />
          </span>
          <div style={{ flex: "1", minWidth: "190px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: "800" }}>
              Logo slot — wired and live
            </span>
            <span style={{ fontSize: "11.5px", color: "#4a6154", lineHeight: "1.6" }}>
              {"Drop replacements at "}
              <strong style={{ color: "var(--ink)" }}>
                src/assets/logo-mark.png
              </strong>
              {" (square mark, used in the sidebar and email) and "}
              <strong style={{ color: "var(--ink)" }}>
                src/assets/logo-full.png
              </strong>
              {" (wide lockup, used on the payslip). Same filenames, transparent PNG, and everything updates."}
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          APPROVERS
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(v.founderRows || []).map((f, i_f) => (
            <div key={i_f} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#ffffff", borderRadius: "16px", padding: "14px 18px", boxShadow: "var(--sh)" }}>
              <span style={{ width: "36px", height: "36px", flex: "0 0 36px", borderRadius: "12px", background: "var(--g)", color: "#fff", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {f.initials}
              </span>
              <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "13.5px", fontWeight: "800" }}>
                  {f.name}
                </span>
                <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
                  {f.email}
                </span>
              </div>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".1em", color: "var(--ink)", background: "var(--lime)", borderRadius: "999px", padding: "6px 11px" }}>
                FOUNDER
              </span>
            </div>
          ))}
        </div>
        <h2 style={{ margin: "14px 0 0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          APPROVAL RULES
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(v.ruleCards || []).map((r, i_r) => (
            <div key={i_r} style={{ background: "#ffffff", borderRadius: "16px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "6px", boxShadow: "var(--sh)" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "800" }}>
                {r.t}
              </span>
              <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.6" }}>
                {r.d}
              </span>
            </div>
          ))}
        </div>
        <h2 style={{ margin: "14px 0 0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", padding: "0 4px" }}>
          BUILD NOTES
        </h2>
        <div style={{ background: "var(--wash)", borderRadius: "18px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {(v.techNotes || []).map((t, i_t) => (
            <div key={i_t} style={{ display: "flex", gap: "11px", alignItems: "baseline" }}>
              <span style={{ width: "6px", height: "6px", flex: "0 0 6px", borderRadius: "50%", background: "var(--lime)", display: "block", marginTop: "7px" }} />
              <span style={{ flex: "1", minWidth: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.6" }}>
                {t.t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
