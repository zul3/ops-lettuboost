export default function ModuleAccess({ v }) {
  return (
    <section data-screen-label="Module access" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "14px" }}>
      <p style={{ margin: "0", maxWidth: "64ch", fontSize: "12.5px", color: "var(--mut)", lineHeight: "1.65" }}>
        Switch a module on and it appears in that user's menu straight away; switch it off and it disappears. Changing someone's role resets their modules to that role's defaults.
      </p>
      <div className="lb-scroll" style={{ display: "flex", flexDirection: "column", gap: "14px", margin: "0 -4px", padding: "0 4px 6px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) repeat(10, minmax(54px,1fr))", gap: "14px", padding: "0 20px 2px", alignItems: "end" }} className="lb-wide">
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            USER
          </span>
          {(v.adMods || []).map((m, i_m) => (
            <span key={i_m} style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "800" }}>
                {m.label}
              </span>
              <span style={{ fontSize: "9.5px", color: "var(--mut)", lineHeight: "1.3" }}>
                {m.desc}
              </span>
            </span>
          ))}
        </div>
        {(v.adMatrix || []).map((u, i_u) => (
          <div key={i_u} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) repeat(10, minmax(54px,1fr))", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "12px 20px", boxShadow: "var(--sh)", opacity: u.op }} className="lb-wide">
            <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
              <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: u.avBg, color: u.avFg, fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {u.initials}
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {u.name}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {u.role}{u.inactive}
                </span>
              </span>
            </span>
            {(u.cells || []).map((c, i_c) => (
              <button key={i_c} type="button" onClick={c.toggle} style={{ justifySelf: "center", position: "relative", width: "42px", height: "24px", border: "0", borderRadius: "999px", background: c.bg, cursor: c.cursor, padding: "0", transition: "background .18s ease" }}>
                <span style={{ position: "absolute", top: "3px", left: c.knob, width: "18px", height: "18px", borderRadius: "50%", background: "#ffffff", transition: "left .18s ease", boxShadow: "0 1px 3px rgba(0,0,0,.25)" }} />
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
