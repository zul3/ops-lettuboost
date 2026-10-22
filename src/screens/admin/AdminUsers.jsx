import Icon from '../../components/Icon.jsx';

export default function AdminUsers({ v }) {
  return (
    <section data-screen-label="Admin users" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))", gap: "14px" }}>
        {(v.adStats || []).map((s, i_s) => (
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
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <input type="text" value={v.uq ?? ''} onChange={v.setUq} placeholder="Search name or email" style={{ border: "0", borderRadius: "999px", background: "#ffffff", boxShadow: "var(--sh)", fontSize: "13px", padding: "12px 18px", minWidth: "240px" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(130px,1fr) minmax(0,1.6fr) minmax(110px,.9fr) 44px", gap: "14px", padding: "0 20px 2px" }} className="lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          USER
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ROLE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          MODULES
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ACCOUNT
        </span>
        <span />
      </div>
      {(v.adRows || []).map((u, i_u) => (
        <div key={i_u} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(130px,1fr) minmax(0,1.6fr) minmax(110px,.9fr) 44px", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "12px 20px", boxShadow: "var(--sh)" }} className="lb-tbl">
          <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
            <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: u.avBg, color: u.avFg, fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {u.initials}
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
              <span style={{ fontSize: "13px", fontWeight: "800" }}>
                {u.name}
              </span>
              <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                {u.email}
              </span>
            </span>
          </span>
          <select value={u.role ?? ''} onChange={u.setRole} style={{ border: "0", borderRadius: "12px", background: "var(--wash)", fontSize: "12.5px", fontWeight: "700", padding: "10px 11px", appearance: "none", minWidth: "0" }}>
            {(v.adRoles || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.id}
              </option>
            ))}
          </select>
          <span style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {(u.mods || []).map((m, i_m) => (
              <span key={i_m} style={{ fontSize: "10px", fontWeight: "700", background: "var(--tint)", color: "#0a5c2f", borderRadius: "999px", padding: "4px 9px" }}>
                {m.label}
              </span>
            ))}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <button type="button" onClick={u.toggleActive} style={{ position: "relative", width: "42px", height: "24px", flex: "0 0 42px", border: "0", borderRadius: "999px", background: u.activeBg, cursor: "pointer", padding: "0", transition: "background .18s ease" }}>
              <span style={{ position: "absolute", top: "3px", left: u.activeKnob, width: "18px", height: "18px", borderRadius: "50%", background: "#ffffff", transition: "left .18s ease", boxShadow: "0 1px 3px rgba(0,0,0,.25)" }} />
            </button>
            <span style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--mut)" }}>
              {u.statusLabel}
            </span>
          </span>
          <button type="button" onClick={u.remove} title="Remove user" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", color: "var(--mut)", fontSize: "15px", fontWeight: "700", width: "34px", height: "34px", cursor: "pointer" }} className="hvc">
            ×
          </button>
        </div>
      ))}
      {v.adEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "22px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No users match.
        </div>
      ) : null}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", background: "var(--tint)", borderRadius: "18px", padding: "16px" }}>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--g)", width: "100%" }}>
          ADD A USER
        </span>
        <input type="text" value={v.nuser.name ?? ''} onChange={v.setNuName} placeholder="Full name" style={{ flex: "1 1 180px", minWidth: "0", border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "13px", padding: "12px" }} />
        <input type="email" value={v.nuser.email ?? ''} onChange={v.setNuEmail} placeholder="email@lettuboost.com" style={{ flex: "1 1 200px", minWidth: "0", border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "13px", padding: "12px" }} />
        <select value={v.nuser.role ?? ''} onChange={v.setNuRole} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "12.5px", fontWeight: "600", padding: "12px", appearance: "none" }}>
          {(v.adRoles || []).map((o, i_o) => (
            <option key={i_o} value={o.id ?? ''}>
              {o.id}
            </option>
          ))}
        </select>
        <button type="button" onClick={v.addUser} style={{ border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 20px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          ADD USER
        </button>
        <span style={{ width: "100%", fontSize: "11.5px", color: "#4a6154", lineHeight: "1.5" }}>
          New users start with their role's default modules. Fine-tune them under Module access.
        </span>
      </div>
    </section>
  );
}
