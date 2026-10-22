export default function UomModal({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closeUom} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(440px, 100%)", maxHeight: "100%", overflowY: "auto", background: "var(--ground)", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 30px 70px -30px rgba(12,36,24,.6)", animation: "om-rise .28s ease both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              CUSTOM AMOUNTS
            </span>
            <span style={{ fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
              Units of measure
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.55" }}>
              Rename or remove a unit and past requests keep the one they were approved with.
            </span>
          </div>
          <button type="button" onClick={v.closeUom} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(v.uomRows || []).map((u, i_u) => (
            <div key={i_u} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#ffffff", borderRadius: "16px", padding: "8px 12px 8px 14px", boxShadow: "var(--sh)" }}>
              <input type="text" value={u.name ?? ''} onChange={u.setName} style={{ flex: "1", minWidth: "0", border: "0", borderRadius: "10px", background: "transparent", fontSize: "13.5px", fontWeight: "700", padding: "9px 10px" }} className="fcb" />
              <span style={{ fontSize: "11.5px", color: "var(--mut)", whiteSpace: "nowrap" }}>
                {u.usage}
              </span>
              <button type="button" onClick={u.remove} title="Remove unit" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", color: "var(--mut)", fontSize: "15px", fontWeight: "700", width: "34px", height: "34px", cursor: "pointer" }} className="hvc">
                ×
              </button>
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "var(--tint)", borderRadius: "16px", padding: "12px 14px" }}>
            <input type="text" value={v.nu ?? ''} onChange={v.setNu} placeholder="New unit, e.g. Visit" style={{ flex: "1", minWidth: "0", border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "13px", padding: "11px 12px" }} />
            <button type="button" onClick={v.addUom} style={{ border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 18px", cursor: "pointer", whiteSpace: "nowrap" }}>
              ADD UNIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
