import logoFull from '../../assets/logo-full.png';

export default function PrintAndExport({ v }) {
  return (
    <section data-screen-label="Print and export" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
      <div id="rep-bar" data-np="" style={{ flex: "0 0 330px", maxWidth: "100%", display: "flex", flexDirection: "column", gap: "14px", position: "sticky", top: "26px" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            TIMELINE
          </span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {(v.exPresets || []).map((p, i_p) => (
              <button key={i_p} type="button" onClick={p.pick} style={{ border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11px", fontWeight: "700", padding: "8px 12px", cursor: "pointer" }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                FROM
              </label>
              <input type="date" value={v.ex.from ?? ''} onChange={v.exSetFrom} style={{ border: "0", borderRadius: "12px", background: "var(--wash)", fontSize: "12.5px", fontWeight: "600", padding: "11px 10px", width: "100%" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                TO
              </label>
              <input type="date" value={v.ex.to ?? ''} onChange={v.exSetTo} style={{ border: "0", borderRadius: "12px", background: "var(--wash)", fontSize: "12.5px", fontWeight: "600", padding: "11px 10px", width: "100%" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }} className="lb-g3">
            <select value={v.ex.type ?? ''} onChange={v.exSetType} style={{ border: "0", borderRadius: "12px", background: "var(--wash)", fontSize: "12px", fontWeight: "600", padding: "11px 8px", minWidth: "0", appearance: "none" }}>
              {(v.rpTypeFilter || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
            <select value={v.ex.status ?? ''} onChange={v.exSetStatus} style={{ border: "0", borderRadius: "12px", background: "var(--wash)", fontSize: "12px", fontWeight: "600", padding: "11px 8px", minWidth: "0", appearance: "none" }}>
              {(v.rpStatusFilter || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
            <select value={v.ex.sev ?? ''} onChange={v.exSetSev} style={{ border: "0", borderRadius: "12px", background: "var(--wash)", fontSize: "12px", fontWeight: "600", padding: "11px 8px", minWidth: "0", appearance: "none" }}>
              {(v.rpSevFilter || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "12.5px", fontWeight: "700", cursor: "pointer" }}>
            <input type="checkbox" checked={!!v.ex.images} onChange={v.exSetImages} style={{ width: "16px", height: "16px", accentColor: "var(--g)" }} />
            Include attached images
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "12.5px", fontWeight: "700", cursor: "pointer" }}>
            <input type="checkbox" checked={!!v.ex.summary} onChange={v.exSetSummary} style={{ width: "16px", height: "16px", accentColor: "var(--g)" }} />
            Include summary block
          </label>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            FORMAT
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }} className="lb-g3">
            {(v.exFormats || []).map((f, i_f) => (
              <button key={i_f} type="button" onClick={f.pick} style={{ border: "0", borderRadius: "14px", background: f.bg, color: f.fg, fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 6px", cursor: "pointer" }}>
                {f.label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
            {v.exFormatNote}
          </span>
          <button type="button" onClick={v.doExport} style={{ border: "0", borderRadius: "16px", background: "var(--lime)", color: "var(--ink)", fontSize: "12.5px", fontWeight: "800", letterSpacing: ".07em", padding: "16px 18px", textAlign: "left", cursor: "pointer", boxShadow: "0 16px 30px -20px rgba(128,204,40,.95)" }}>
            {v.exButton}
          </button>
        </div>
      </div>
      <div id="print-sheet" style={{ flex: "1 1 440px", minWidth: "0", maxWidth: "820px", background: "#ffffff", borderRadius: "22px", padding: "36px", boxShadow: "var(--sh)", animation: "om-in .3s ease both" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap", paddingBottom: "20px" }}>
          <img src={logoFull} alt="LettuBoost" style={{ width: "190px", maxWidth: "60%", height: "auto", display: "block" }} />
          <div style={{ flex: "1", minWidth: "150px", display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
            <span style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-.01em" }}>
              FIELD REPORT
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.exRange}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {"Generated "}{v.exGenerated}
            </span>
          </div>
        </div>
        {v.ex.summary ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))", gap: "10px", background: "var(--wash)", borderRadius: "16px", padding: "16px 18px", marginBottom: "8px" }}>
            {(v.exTiles || []).map((t, i_t) => (
              <div key={i_t} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1" }}>
                  {t.v}
                </span>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                  {t.k}
                </span>
              </div>
            ))}
          </div>
        ) : null}
        {(v.exGroups || []).map((g, i_g) => (
          <div key={i_g} style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "18px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".12em", color: "var(--g)" }}>
              {g.label}
            </span>
            {(g.entries || []).map((r, i_r) => (
              <div key={i_r} style={{ breakInside: "avoid", borderRadius: "16px", background: "var(--wash)", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "9px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".06em", background: "#ffffff", color: "#0a5c2f", borderRadius: "999px", padding: "4px 9px" }}>
                    {r.type}
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".06em", color: r.sevFg }}>
                    {r.sevLabel}
                  </span>
                  <span style={{ flex: "1" }} />
                  <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg }}>
                    {r.statusLabel}
                  </span>
                </div>
                <span style={{ fontSize: "15px", fontWeight: "800", lineHeight: "1.3" }}>
                  {r.title}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {r.id}{" · "}{r.byName}{" · "}{r.unit}
                </span>
                <span style={{ fontSize: "12.5px", lineHeight: "1.6" }}>
                  {r.body}
                </span>
                {r.hasImages ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "10px" }}>
                    {(r.images || []).map((im, i_im) => (
                      <div key={i_im} style={{ breakInside: "avoid", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <img src={im.url} alt={im.cap} style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }} />
                        <span style={{ fontSize: "10.5px", color: "var(--mut)" }}>
                          {im.cap}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
        {v.exEmpty ? (
          <div style={{ padding: "30px 4px", fontSize: "12.5px", color: "var(--mut)" }}>
            No reports fall inside this timeline and filter.
          </div>
        ) : null}
      </div>
    </section>
  );
}
