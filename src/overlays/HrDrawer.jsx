export default function HrDrawer({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closeHr} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "60", display: "flex", justifyContent: "flex-end", padding: "14px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(500px, 100%)", background: "var(--ground)", borderRadius: "24px", height: "100%", overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", animation: "om-in .3s cubic-bezier(.2,.8,.2,1) both" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={v.closeHr} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", boxShadow: "var(--sh)" }}>
          {v.hdet.hasPhoto ? (
            <img src={v.hdet.photo} alt="" style={{ width: "92px", height: "92px", borderRadius: "28px", objectFit: "cover", display: "block" }} />
          ) : null}
          {v.hdet.noPhoto ? (
            <span style={{ width: "92px", height: "92px", borderRadius: "28px", background: v.hdet.avBg, color: v.hdet.avFg, fontSize: "28px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {v.hdet.initials}
            </span>
          ) : null}
          <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-.02em" }}>
            {v.hdet.name}
          </span>
          <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
            {v.hdet.position}{" · "}{v.hdet.unit}
          </span>
          <select value={v.hdet.status ?? ''} onChange={v.hdet.setStatus} style={{ border: "0", borderRadius: "999px", background: "var(--tint)", fontSize: "11.5px", fontWeight: "800", padding: "9px 14px", appearance: "none", cursor: "pointer" }}>
            {(v.hrStatusPick || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.id}
              </option>
            ))}
          </select>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "8px 20px", boxShadow: "var(--sh)" }}>
          {(v.hdet.rows || []).map((d, i_d) => (
            <div key={i_d} style={{ display: "flex", gap: "14px", padding: "11px 0" }}>
              <span style={{ flex: "0 0 112px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)", paddingTop: "3px" }}>
                {d.k}
              </span>
              <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", fontWeight: "600", lineHeight: "1.55" }}>
                {d.v}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" onClick={v.hdet.edit} style={{ flex: "1", border: "0", borderRadius: "14px", background: "var(--lime)", color: "var(--ink)", fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "15px", cursor: "pointer" }}>
            EDIT PROFILE
          </button>
          <button type="button" onClick={v.hdet.remove} style={{ border: "0", borderRadius: "14px", background: "#ffffff", color: "#b3261e", fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "15px 18px", cursor: "pointer" }}>
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}
