import Icon from '../../components/Icon.jsx';

export default function NewPurchaseOrder({ v }) {
  return (
    <section data-screen-label="New purchase order" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
          <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              ORDER
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  SUPPLIER
                </label>
                <select value={v.pfv.supId ?? ''} onChange={v.pfSup} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                  {(v.supOpts || []).map((o, i_o) => (
                    <option key={i_o} value={o.id ?? ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  ORDER DATE
                </label>
                <input type="date" value={v.pfv.date ?? ''} onChange={v.pfDate} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  EXPECTED
                </label>
                <input type="date" value={v.pfv.expected ?? ''} onChange={v.pfExp} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
              </div>
            </div>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              ITEMS
            </span>
            {(v.pfLines || []).map((ln, i_ln) => (
              <div key={i_ln} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,2fr) 70px 90px 36px", gap: "8px", alignItems: "center" }} className="lb-tbl">
                <select value={ln.itemId ?? ''} onChange={ln.setItem} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                  {(v.poItemOpts || []).map((o, i_o) => (
                    <option key={i_o} value={o.id ?? ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <input type="text" value={ln.desc ?? ''} onChange={ln.setDesc} placeholder="Description" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
                <input type="number" value={ln.qty ?? ''} onChange={ln.setQty} placeholder="Qty" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", width: "100%", minWidth: "0", padding: "12px 8px" }} />
                <input type="number" value={ln.cost ?? ''} onChange={ln.setCost} placeholder="Cost" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", width: "100%", minWidth: "0", padding: "12px 8px" }} />
                <button type="button" onClick={ln.remove} title="Remove line" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", color: "var(--ink)", cursor: "pointer", padding: "0", boxShadow: "none", background: "var(--wash)" }}>
                  <Icon name="x" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                </button>
              </div>
            ))}
            <button type="button" onClick={v.pfAddLine} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer", alignSelf: "flex-start" }}>
              <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              ADD LINE
            </button>
            <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
              Pick a stock item to add it to Stock automatically when the order is received.
            </span>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                NOTES
              </label>
              <textarea value={v.pfv.notes ?? ''} onChange={v.pfNotes} rows="3" placeholder="Delivery instructions, reference" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 13px", width: "100%", resize: "vertical", lineHeight: "1.5" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", position: "sticky", top: "26px" }}>
          <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "7px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.62)" }}>
              ORDER TOTAL
            </span>
            <span style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
              {v.pfv.total}
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,.78)", lineHeight: "1.5" }}>
              {v.pfv.summary}
            </span>
          </div>
          <button type="button" onClick={v.pfPlace} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", background: "var(--lime)", color: "var(--ink)", fontWeight: "800", letterSpacing: ".06em", cursor: "pointer", padding: "18px 20px", borderRadius: "18px", fontSize: "13px" }}>
            <Icon name="truck" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            PLACE ORDER
          </button>
          <button type="button" onClick={v.pfDraft} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", background: "#ffffff", color: "var(--ink)", boxShadow: "var(--sh)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", cursor: "pointer", padding: "15px 20px", borderRadius: "18px" }}>
            <Icon name="file" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            SAVE AS DRAFT
          </button>
        </div>
      </div>
    </section>
  );
}
