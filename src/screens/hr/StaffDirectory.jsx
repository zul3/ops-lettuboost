import Icon from '../../components/Icon.jsx';

export default function StaffDirectory({ v }) {
  return (
    <section data-screen-label="Staff directory" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "14px" }}>
        {(v.hrStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "var(--sh)" }}>
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
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "14px 18px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", boxShadow: "var(--sh)" }}>
        <input type="text" value={v.hrq ?? ''} onChange={v.setHrq} placeholder="Search name, job title or email" style={{ flex: "1 1 220px", border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 14px" }} />
        <select value={v.hrType ?? ''} onChange={v.setHrType} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
          {(v.hrTypeOpts || []).map((o, i_o) => (
            <option key={i_o} value={o.id ?? ''}>
              {o.id}
            </option>
          ))}
        </select>
        <select value={v.hrStatus ?? ''} onChange={v.setHrStatus} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
          {(v.hrStatusOpts || []).map((o, i_o) => (
            <option key={i_o} value={o.id ?? ''}>
              {o.label}
            </option>
          ))}
        </select>
        <button type="button" onClick={v.hrNewH} style={{ border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          ADD STAFF
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: "14px" }}>
        {(v.hrCards || []).map((c, i_c) => (
          <div key={i_c} onClick={c.open} style={{ background: "#ffffff", borderRadius: "20px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px", cursor: "pointer", boxShadow: "var(--sh)", minWidth: "0", transition: "transform .14s ease" }} className="hv7">
            <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
              {c.hasPhoto ? (
                <img src={c.photo} alt="" style={{ width: "54px", height: "54px", flex: "0 0 54px", borderRadius: "17px", objectFit: "cover", display: "block" }} />
              ) : null}
              {c.noPhoto ? (
                <span style={{ width: "54px", height: "54px", flex: "0 0 54px", borderRadius: "17px", background: c.avBg, color: c.avFg, fontSize: "16px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {c.initials}
                </span>
              ) : null}
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.2" }}>
                  {c.name}
                </span>
                <span style={{ fontSize: "12px", color: "var(--mut)" }}>
                  {c.position}
                </span>
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "10.5px", fontWeight: "700", background: "var(--tint)", color: "#0a5c2f", borderRadius: "999px", padding: "4px 9px" }}>
                {c.type}
              </span>
              <span style={{ fontSize: "10.5px", fontWeight: "700", background: "var(--wash)", color: "var(--mut)", borderRadius: "999px", padding: "4px 9px" }}>
                {c.unit}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ flex: "1", minWidth: "0", fontSize: "11.5px", color: "var(--mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {c.email}
              </span>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: c.statusFg }}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      {v.hrEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No staff match those filters.
        </div>
      ) : null}
    </section>
  );
}
