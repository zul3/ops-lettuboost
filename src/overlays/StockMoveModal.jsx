import Icon from '../components/Icon.jsx';

export default function StockMoveModal({ v }) {
  return (
    <div className="lb-sheet" onClick={v.mvCancel} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(460px, 100%)", maxHeight: "100%", overflowY: "auto", background: "var(--ground)", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 30px 70px -30px rgba(12,36,24,.6)", animation: "om-rise .28s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ flex: "1", fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
            Record stock movement
          </span>
          <button type="button" onClick={v.mvCancel} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
            ITEM
          </label>
          <select value={v.mvf.itemId ?? ''} onChange={v.mvSetItem} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", appearance: "none" }}>
            {(v.mvItemOpts || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(v.mvKinds || []).map((k, i_k) => (
            <button key={i_k} type="button" onClick={k.pick} style={{ border: "0", borderRadius: "14px", background: k.bg, color: k.fg, fontSize: "12px", fontWeight: "700", padding: "11px 14px", cursor: "pointer" }}>
              {k.label}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              {v.mvf.qtyLabel}
            </label>
            <input type="number" min="0" step="any" value={v.mvf.qty ?? ''} onChange={v.mvSetQty} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "16px", fontWeight: "800", padding: "11px 13px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              DATE
            </label>
            <input type="date" max="2026-09-07" value={v.mvf.date ?? ''} onChange={v.mvSetDate} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13px", fontWeight: "600", padding: "12px", width: "100%" }} />
          </div>
        </div>
        <span style={{ fontSize: "12px", color: "var(--mut)" }}>
          {v.mvf.hint}
        </span>
        <input type="text" value={v.mvf.note ?? ''} onChange={v.mvSetNote} placeholder="Reason or reference, e.g. PO-1042 or Batch 3 trial" style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13px", padding: "12px 13px", width: "100%" }} />
        <button type="button" onClick={v.mvSave} style={{ alignSelf: "flex-start", border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 22px", cursor: "pointer" }}>
          <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          SAVE MOVEMENT
        </button>
      </div>
    </div>
  );
}
