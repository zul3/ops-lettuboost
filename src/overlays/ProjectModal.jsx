import Icon from '../components/Icon.jsx';

export default function ProjectModal({ v }) {
  return (
    <div className="lb-sheet" onClick={v.pjCancel} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(520px, 100%)", maxHeight: "100%", overflowY: "auto", background: "var(--ground)", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 30px 70px -30px rgba(12,36,24,.6)", animation: "om-rise .28s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ flex: "1", fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
            {v.pjv.title}
          </span>
          {v.pjv.canDelete ? (
            <button type="button" onClick={v.pjDelete} title="Delete project" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#fdeceb", color: "#b3261e", cursor: "pointer", padding: "0" }}>
              <Icon name="trash" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            </button>
          ) : null}
          <button type="button" onClick={v.pjCancel} title="Close" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#ffffff", color: "var(--ink)", boxShadow: "var(--sh)", cursor: "pointer", padding: "0" }}>
            <Icon name="x" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
            PROJECT NAME
          </label>
          <input type="text" value={v.pj.name ?? ''} onChange={v.pjSetName} placeholder="e.g. Pond C build" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
            DESCRIPTION
          </label>
          <textarea value={v.pj.desc ?? ''} onChange={v.pjSetDesc} rows="2" placeholder="What this project delivers" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 13px", width: "100%", resize: "vertical", lineHeight: "1.5" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              OWNER
            </label>
            <select value={v.pj.owner ?? ''} onChange={v.pjSetOwner} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
              {(v.tfEmpOpts || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              STATUS
            </label>
            <select value={v.pj.status ?? ''} onChange={v.pjSetStatus} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
              {(v.pjStatusOpts || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              START
            </label>
            <input type="date" value={v.pj.start ?? ''} onChange={v.pjSetStart} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              END
            </label>
            <input type="date" value={v.pj.end ?? ''} onChange={v.pjSetEnd} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
            COLOUR
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {(v.pjColors || []).map((c, i_c) => (
              <button key={i_c} type="button" onClick={c.pick} title="Colour" style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0", background: c.color, boxShadow: c.ring, cursor: "pointer" }} />
            ))}
          </div>
        </div>
        <button type="button" onClick={v.pjSave} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer", alignSelf: "flex-start" }}>
          <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          SAVE PROJECT
        </button>
      </div>
    </div>
  );
}
