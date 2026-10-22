import Icon from '../../components/Icon.jsx';

export default function NewDocument({ v }) {
  return (
    <section data-screen-label="New document" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
          <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              DOCUMENT TYPE
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(v.sfTypes || []).map((t, i_t) => (
                <button key={i_t} type="button" onClick={t.pick} style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "0", borderRadius: "14px", background: t.bg, color: t.fg, fontSize: "12.5px", fontWeight: "700", padding: "12px 16px", cursor: "pointer" }}>
                  <Icon name={t.icon} width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  CUSTOMER
                </label>
                <select value={v.sfv.custId ?? ''} onChange={v.sfCust} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                  {(v.custOpts || []).map((o, i_o) => (
                    <option key={i_o} value={o.id ?? ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  DATE
                </label>
                <input type="date" value={v.sfv.date ?? ''} onChange={v.sfDate} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
              </div>
              {v.sfv.showDue ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                  <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                    {v.sfv.dueLabel}
                  </label>
                  <input type="date" value={v.sfv.due ?? ''} onChange={v.sfDue} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
                </div>
              ) : null}
              {v.sfv.showMethod ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                  <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                    PAYMENT METHOD
                  </label>
                  <select value={v.sfv.method ?? ''} onChange={v.sfMethod} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                    {(v.methodOpts || []).map((o, i_o) => (
                      <option key={i_o} value={o.id ?? ''}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              LINE ITEMS
            </span>
            {(v.sfLines || []).map((ln, i_ln) => (
              <div key={i_ln} style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) 74px 104px 92px 36px", gap: "8px", alignItems: "center" }} className="lb-tbl">
                <input type="text" value={ln.desc ?? ''} onChange={ln.setDesc} placeholder="Description" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
                <input type="number" value={ln.qty ?? ''} onChange={ln.setQty} placeholder="Qty" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", width: "100%", minWidth: "0", padding: "12px 8px" }} />
                <input type="number" value={ln.price ?? ''} onChange={ln.setPrice} placeholder="Price" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", width: "100%", minWidth: "0", padding: "12px 8px" }} />
                <span style={{ fontSize: "12.5px", fontWeight: "800", textAlign: "right" }}>
                  {ln.amount}
                </span>
                <button type="button" onClick={ln.remove} title="Remove line" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", color: "var(--ink)", cursor: "pointer", padding: "0", boxShadow: "none", background: "var(--wash)" }}>
                  <Icon name="x" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                </button>
              </div>
            ))}
            <button type="button" onClick={v.sfAddLine} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer", alignSelf: "flex-start" }}>
              <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              ADD LINE
            </button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", position: "sticky", top: "26px" }}>
          <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "7px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.62)" }}>
              TOTAL
            </span>
            <span style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
              {v.sfv.total}
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,.78)", lineHeight: "1.5" }}>
              {v.sfv.summary}
            </span>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  TAX / SST (%)
                </label>
                <input type="number" value={v.sfv.taxPct ?? ''} onChange={v.sfTax} placeholder="0" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  SUBTOTAL
                </label>
                <span style={{ fontSize: "15px", fontWeight: "800", padding: "11px 0" }}>
                  {v.sfv.sub}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                NOTES
              </label>
              <textarea value={v.sfv.notes ?? ''} onChange={v.sfNotes} rows="3" placeholder="Terms, delivery, bank details" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 13px", width: "100%", resize: "vertical", lineHeight: "1.5" }} />
            </div>
          </div>
          <button type="button" onClick={v.sfSave} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", background: "var(--lime)", color: "var(--ink)", fontWeight: "800", letterSpacing: ".06em", cursor: "pointer", padding: "18px 20px", borderRadius: "18px", fontSize: "13px", justifyContent: "flex-start" }}>
            <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            {v.sfv.submitLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
