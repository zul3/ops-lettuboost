export default function NewReport({ v }) {
  return (
    <section data-screen-label="New report" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ background: "#ffffff", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", minWidth: "0", boxShadow: "var(--sh)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <label style={{ fontSize: "13px", fontWeight: "800" }}>
            Report title
          </label>
          <input type="text" value={v.rfv.title ?? ''} onChange={v.rfSetTitle} placeholder="e.g. Algae bloom in Pond A" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", fontWeight: "600", padding: "13px 14px", width: "100%" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          <label style={{ fontSize: "13px", fontWeight: "800" }}>
            Type
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {(v.rfTypes || []).map((t, i_t) => (
              <button key={i_t} type="button" onClick={t.pick} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "12px", fontWeight: "700", padding: "10px 14px", cursor: "pointer" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "14px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <label style={{ fontSize: "13px", fontWeight: "800" }}>
              Severity
            </label>
            <div style={{ display: "flex", gap: "6px" }}>
              {(v.rfSevs || []).map((t, i_t) => (
                <button key={i_t} type="button" onClick={t.pick} style={{ border: "0", borderRadius: "12px", background: t.bg, color: t.fg, fontSize: "12px", fontWeight: "700", padding: "11px 13px", cursor: "pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <label style={{ fontSize: "13px", fontWeight: "800" }}>
              Location
            </label>
            <select value={v.rfv.unit ?? ''} onChange={v.rfSetUnit} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px", width: "100%", appearance: "none" }}>
              {(v.rpUnits || []).map((u, i_u) => (
                <option key={i_u} value={u.id ?? ''}>
                  {u.id}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <label style={{ fontSize: "13px", fontWeight: "800" }}>
              Date
            </label>
            <input type="date" max="2026-09-07" value={v.rfv.date ?? ''} onChange={v.rfSetDate} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px", width: "100%" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <label style={{ fontSize: "13px", fontWeight: "800" }}>
            What happened
          </label>
          <textarea value={v.rfv.body ?? ''} onChange={v.rfSetBody} rows="5" placeholder="Describe what you saw, what was done, and what is still needed." style={{ border: "0", borderRadius: "14px", background: "var(--wash)", fontSize: "13.5px", padding: "13px 14px", width: "100%", resize: "vertical", lineHeight: "1.55" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          <label style={{ fontSize: "13px", fontWeight: "800" }}>
            Photos
          </label>
          <div onDragOver={v.rfOver} onDrop={v.rfDrop} style={{ border: "1.5px dashed #b9d1ae", borderRadius: "16px", background: "var(--wash)", padding: "14px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-start" }}>
            {(v.rfImages || []).map((im, i_im) => (
              <div key={i_im} style={{ width: "128px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ position: "relative", width: "128px", height: "94px", borderRadius: "12px", overflow: "hidden", background: "#ffffff", boxShadow: "0 0 0 1px #e1eadc" }}>
                  {im.isImg ? (
                    <img src={im.url} alt={im.name} onClick={im.open} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in", display: "block" }} />
                  ) : null}
                  {im.notImg ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", color: "var(--g)" }}>
                      FILE
                    </div>
                  ) : null}
                  <button type="button" onClick={im.remove} title="Remove" style={{ position: "absolute", top: "5px", right: "5px", width: "22px", height: "22px", border: "0", borderRadius: "50%", background: "rgba(12,36,24,.78)", color: "#ffffff", fontSize: "13px", lineHeight: "1", cursor: "pointer", padding: "0" }}>
                    ×
                  </button>
                </div>
                <input type="text" value={im.cap ?? ''} onChange={im.setCap} placeholder="Caption" style={{ border: "0", borderRadius: "10px", background: "#ffffff", fontSize: "11.5px", padding: "8px 9px", width: "100%" }} />
              </div>
            ))}
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", width: "128px", height: "94px", borderRadius: "12px", border: "1.5px dashed #9cc08c", color: "var(--g)", fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", cursor: "pointer" }}>
              <input type="file" multiple={true} accept="image/*" onChange={v.rfOnFiles} style={{ display: "none" }} />
              <span style={{ fontSize: "22px", lineHeight: "1" }}>
                +
              </span>
              ADD PHOTOS
            </label>
          </div>
          <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
            Drop images here or tap +. Add a caption so the printed report explains each photo.
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", position: "sticky", top: "26px" }}>
        <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "7px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.62)" }}>
            REPORT
          </span>
          <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-.02em", lineHeight: "1.2", color: "#ffffff" }}>
            {v.rfv.previewTitle}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.78)", lineHeight: "1.5" }}>
            {v.rfv.previewMeta}
          </span>
        </div>
        <button type="button" onClick={v.rfSubmit} style={{ border: "0", borderRadius: "18px", background: "var(--lime)", color: "var(--ink)", fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", padding: "18px 20px", textAlign: "left", cursor: "pointer", boxShadow: "0 16px 30px -20px rgba(128,204,40,.95)" }}>
          SUBMIT REPORT →
        </button>
        <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55" }}>
          {"Filed as "}{v.meName}{". It appears on the Reports dashboard straight away and can be printed from Print & export."}
        </p>
      </div>
    </section>
  );
}
