import Icon from '../../components/Icon.jsx';

export default function Suppliers({ v }) {
  return (
    <section data-screen-label="Suppliers" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.2fr) minmax(0,2fr) minmax(0,1fr) 44px", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          SUPPLIER
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          CATEGORY
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          CONTACT
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ORDERS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }} />
      </div>
      {(v.supRows || []).map((c, i_c) => (
        <div key={i_c} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.2fr) minmax(0,2fr) minmax(0,1fr) 44px", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "12px 20px", boxShadow: "var(--sh)" }} className="lb-tbl">
          <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
            <span title="" style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: "var(--tint)", color: "#0a5c2f", fontSize: "12px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {c.initials}
            </span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "13px", fontWeight: "800" }}>
                {c.name}
              </span>
              <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                {c.terms}
              </span>
            </span>
          </span>
          <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
            {c.category}
          </span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "12.5px", fontWeight: "600" }}>
              {c.contact}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {c.email}{" · "}{c.phone}
            </span>
          </span>
          <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
            {c.orders}
          </span>
          <button type="button" onClick={c.remove} title="Remove supplier" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", color: "var(--ink)", cursor: "pointer", padding: "0", boxShadow: "none", background: "var(--wash)" }}>
            <Icon name="trash" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          </button>
        </div>
      ))}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", background: "var(--tint)", borderRadius: "18px", padding: "16px" }}>
        <span style={{ width: "100%" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            ADD A SUPPLIER
          </span>
        </span>
        <div style={{ flex: "1 1 180px" }}>
          <input type="text" value={v.supNew.name ?? ''} onChange={v.snName} placeholder="Company name" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ flex: "1 1 130px" }}>
          <input type="text" value={v.supNew.category ?? ''} onChange={v.snCat} placeholder="Category" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <input type="text" value={v.supNew.contact ?? ''} onChange={v.snContact} placeholder="Contact person" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ flex: "1 1 170px" }}>
          <input type="email" value={v.supNew.email ?? ''} onChange={v.snEmail} placeholder="Email" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ flex: "1 1 120px" }}>
          <input type="text" value={v.supNew.phone ?? ''} onChange={v.snPhone} placeholder="Phone" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ flex: "0 1 110px" }}>
          <input type="text" value={v.supNew.terms ?? ''} onChange={v.snTerms} placeholder="Terms" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <button type="button" onClick={v.supAdd} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          ADD
        </button>
      </div>
    </section>
  );
}
