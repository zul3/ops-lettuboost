import Icon from '../components/Icon.jsx';

export default function StockItemModal({ v }) {
  return (
    <div className="lb-sheet" onClick={v.itemCancel} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(520px, 100%)", maxHeight: "100%", overflowY: "auto", background: "var(--ground)", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 30px 70px -30px rgba(12,36,24,.6)", animation: "om-rise .28s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ flex: "1", fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
            {v.itf.title}
          </span>
          <button type="button" onClick={v.itemCancel} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              ITEM NAME
            </label>
            <input type="text" value={v.itf.name ?? ''} onChange={v.itSetName} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "14px", fontWeight: "600", padding: "12px 13px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              SKU
            </label>
            <input type="text" value={v.itf.sku ?? ''} onChange={v.itSetSku} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", padding: "12px 13px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              CATEGORY
            </label>
            <select value={v.itf.cat ?? ''} onChange={v.itSetCat} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", padding: "12px 13px", width: "100%", appearance: "none" }}>
              {(v.stCats || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.id}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              UNIT
            </label>
            <select value={v.itf.unit ?? ''} onChange={v.itSetUnit} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", padding: "12px 13px", width: "100%", appearance: "none" }}>
              {(v.stUnits || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.id}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              STORED AT
            </label>
            <input type="text" value={v.itf.loc ?? ''} onChange={v.itSetLoc} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", padding: "12px 13px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              REORDER LEVEL
            </label>
            <input type="number" min="0" value={v.itf.reorder ?? ''} onChange={v.itSetReorder} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", fontWeight: "700", padding: "12px 13px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              UNIT COST (RM)
            </label>
            <input type="number" min="0" step="0.01" value={v.itf.cost ?? ''} onChange={v.itSetCost} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", fontWeight: "700", padding: "12px 13px", width: "100%" }} />
          </div>
          {v.itf.isNew ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                OPENING QUANTITY
              </label>
              <input type="number" min="0" value={v.itf.qty ?? ''} onChange={v.itSetQty} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", fontWeight: "700", padding: "12px 13px", width: "100%" }} />
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button type="button" onClick={v.itemSave} style={{ border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 22px", cursor: "pointer" }}>
            <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
            SAVE ITEM
          </button>
          {v.itf.canDelete ? (
            <button type="button" onClick={v.itemDelete} style={{ border: "0", borderRadius: "999px", background: "#fdeceb", color: "#b3261e", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 18px", cursor: "pointer" }}>
              DELETE
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
