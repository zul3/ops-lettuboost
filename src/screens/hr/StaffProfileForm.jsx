import Icon from '../../components/Icon.jsx';

export default function StaffProfileForm({ v }) {
  return (
    <section data-screen-label="Staff profile form" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
        {(v.hrSections || []).map((sec, i_sec) => (
          <div key={i_sec} style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "var(--sh)" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              {sec.title}
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "12px" }}>
              {(sec.fields || []).map((fld, i_fld) => (
                <div key={i_fld} style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: fld.span }}>
                  <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                    {fld.label}
                  </label>
                  {fld.isText ? (
                    <input type={fld.type} value={fld.value ?? ''} onChange={fld.set} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%" }} />
                  ) : null}
                  {fld.isSel ? (
                    <select value={fld.value ?? ''} onChange={fld.set} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", appearance: "none" }}>
                      {(fld.options || []).map((o, i_o) => (
                        <option key={i_o} value={o.id ?? ''}>
                          {o.id}
                        </option>
                      ))}
                    </select>
                  ) : null}
                  {fld.isArea ? (
                    <textarea value={fld.value ?? ''} onChange={fld.set} rows="3" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", padding: "12px 13px", width: "100%", resize: "vertical", lineHeight: "1.5" }} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", position: "sticky", top: "26px" }}>
        <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
          {v.hrfv.hasPhoto ? (
            <img src={v.hrfv.photo} alt="" style={{ width: "104px", height: "104px", borderRadius: "32px", objectFit: "cover", display: "block" }} />
          ) : null}
          {v.hrfv.noPhoto ? (
            <span style={{ width: "104px", height: "104px", borderRadius: "32px", background: "#ffffff", color: "var(--g)", fontSize: "32px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {v.hrfv.initials}
            </span>
          ) : null}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <label style={{ borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11px", fontWeight: "800", letterSpacing: ".06em", padding: "11px 15px", cursor: "pointer" }}>
              <input type="file" accept="image/*" onChange={v.hrPhoto} style={{ display: "none" }} />
              <Icon name="camera" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
              PROFILE PHOTO
            </label>
            {v.hrfv.hasPhoto ? (
              <button type="button" onClick={v.hrPhotoClear} style={{ border: "0", background: "none", color: "rgba(255,255,255,.8)", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", padding: "0" }}>
                Remove
              </button>
            ) : null}
          </div>
          <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-.02em", color: "#ffffff", lineHeight: "1.2" }}>
            {v.hrfv.title}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.78)", lineHeight: "1.5" }}>
            {v.hrfv.sub}
          </span>
        </div>
        <button type="button" onClick={v.hrSave} style={{ border: "0", borderRadius: "18px", background: "var(--lime)", color: "var(--ink)", fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", padding: "18px 20px", textAlign: "left", cursor: "pointer" }}>
          {v.hrfv.saveLabel}
        </button>
        <button type="button" onClick={v.hrCancel} style={{ border: "0", background: "none", color: "var(--mut)", fontSize: "12px", fontWeight: "700", textAlign: "left", cursor: "pointer", padding: "0 4px" }}>
          Cancel
        </button>
        <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55" }}>
          New staff appear in Payments, Claims and Reports pickers straight away. Bank and statutory numbers are only for payroll.
        </p>
      </div>
    </section>
  );
}
