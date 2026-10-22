import Icon from '../../components/Icon.jsx';

export default function StockItems({ v }) {
  return (
    <section data-screen-label="Stock items" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "14px 18px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", boxShadow: "var(--sh)" }}>
        <input type="text" value={v.sq ?? ''} onChange={v.setSq} placeholder="Search item or SKU" style={{ flex: "1 1 200px", border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 14px" }} />
        <select value={v.sCat ?? ''} onChange={v.setSCat} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
          {(v.stCatOpts || []).map((o, i_o) => (
            <option key={i_o} value={o.id ?? ''}>
              {o.label}
            </option>
          ))}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", fontWeight: "700", cursor: "pointer" }}>
          <input type="checkbox" checked={!!v.sLow} onChange={v.setSLow} style={{ width: "16px", height: "16px", accentColor: "var(--g)" }} />
          Low or out only
        </label>
        <button type="button" onClick={v.itemNew} style={{ border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          ADD ITEM
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.3fr) minmax(0,1.5fr) minmax(0,.9fr) minmax(0,1fr) minmax(70px,.7fr) 80px", gap: "14px", padding: "0 20px 2px" }} className="lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ITEM
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          CATEGORY
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ON HAND
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          UNIT COST
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          VALUE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          STATUS
        </span>
        <span />
      </div>
      {(v.stItems || []).map((i, i_i) => (
        <div key={i_i} onClick={i.edit} style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1.3fr) minmax(0,1.5fr) minmax(0,.9fr) minmax(0,1fr) minmax(70px,.7fr) 80px", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "13px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "13px", fontWeight: "800" }}>
              {i.name}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {i.sku}
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "12px" }}>
              {i.cat}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {i.loc}
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "800" }}>
              {i.qtyLabel}
            </span>
            <span style={{ height: "5px", borderRadius: "999px", background: "var(--wash)", display: "block" }}>
              <span style={{ display: "block", height: "5px", borderRadius: "999px", background: i.statusFg, width: i.pct }} />
            </span>
          </span>
          <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
            {i.costLabel}
          </span>
          <span style={{ fontSize: "13px", fontWeight: "800" }}>
            {i.valueLabel}
          </span>
          <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: i.statusFg, background: i.statusBg, borderRadius: "999px", padding: "5px 9px", justifySelf: "start" }}>
            {i.statusLabel}
          </span>
          <button type="button" onClick={i.move} title="Record movement" style={{ border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", padding: "9px 0", cursor: "pointer" }}>
            <Icon name="swap" width="16" height="16" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "middle" }} />
          </button>
        </div>
      ))}
      {v.stItemsEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No items match.
        </div>
      ) : null}
    </section>
  );
}
