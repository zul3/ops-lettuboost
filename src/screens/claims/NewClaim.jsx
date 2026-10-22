import Icon from '../../components/Icon.jsx';

export default function NewClaim({ v }) {
  return (
    <section data-screen-label="New claim" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            CLAIM DETAILS
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label style={{ fontSize: "13px", fontWeight: "800" }}>
              Claim title
            </label>
            <input type="text" value={v.cfv.title ?? ''} onChange={v.cfSetTitle} placeholder="e.g. Pond B pump parts" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", fontWeight: "600", padding: "13px 14px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label style={{ fontSize: "13px", fontWeight: "800" }}>
              Business purpose
            </label>
            <input type="text" value={v.cfv.purpose ?? ''} onChange={v.cfSetPurpose} placeholder="Why the company needed this spend" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", padding: "13px 14px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", fontWeight: "800" }}>
              Who paid
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button type="button" onClick={v.cfPaidOwn} style={{ border: "0", borderRadius: "14px", background: v.cfv.ownBg, color: v.cfv.ownFg, fontSize: "12.5px", fontWeight: "700", padding: "12px 16px", cursor: "pointer" }}>
                Own pocket — reimburse me
              </button>
              <button type="button" onClick={v.cfPaidCard} style={{ border: "0", borderRadius: "14px", background: v.cfv.cardBg, color: v.cfv.cardFg, fontSize: "12.5px", fontWeight: "700", padding: "12px 16px", cursor: "pointer" }}>
                Company card — record only
              </button>
            </div>
          </div>
        </div>
        {(v.cfLines || []).map((ln, i_ln) => (
          <div key={i_ln} style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "var(--sh)", animation: "om-rise .28s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ flex: "1", fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
                {"ITEM "}{ln.n}
              </span>
              {ln.canRemove ? (
                <button type="button" onClick={ln.remove} title="Remove item" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", color: "var(--mut)", fontSize: "15px", fontWeight: "700", width: "32px", height: "32px", cursor: "pointer" }} className="hvc">
                  ×
                </button>
              ) : null}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  DATE ON RECEIPT
                </label>
                <input type="date" max="2026-09-07" value={ln.date ?? ''} onChange={ln.setDate} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px", width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  CATEGORY
                </label>
                <select value={ln.cat ?? ''} onChange={ln.setCat} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px", width: "100%", appearance: "none" }}>
                  {(v.clCatOptions || []).map((o, i_o) => (
                    <option key={i_o} value={o.id ?? ''}>
                      {o.id}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  MERCHANT
                </label>
                <input type="text" value={ln.merchant ?? ''} onChange={ln.setMerchant} placeholder="Shop or vendor" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px", width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  AMOUNT (RM)
                </label>
                <input type="number" min="0" step="0.01" value={ln.amount ?? ''} onChange={ln.setAmount} placeholder="0.00" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "15px", fontWeight: "800", padding: "11px 12px", width: "100%" }} />
              </div>
            </div>
            <textarea value={ln.desc ?? ''} onChange={ln.setDesc} rows="2" placeholder="What was bought and why" style={{ border: "0", borderRadius: "14px", background: "var(--wash)", fontSize: "13px", padding: "12px 14px", width: "100%", resize: "vertical", lineHeight: "1.5" }} />
            <div onDragOver={ln.onOver} onDrop={ln.onDrop} style={{ border: "1.5px dashed #b9d1ae", borderRadius: "16px", background: "var(--wash)", padding: "14px", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
              {(ln.receipts || []).map((rc, i_rc) => (
                <div key={i_rc} style={{ position: "relative", width: "78px", height: "96px", flex: "0 0 78px", borderRadius: "12px", overflow: "hidden", background: "#ffffff", boxShadow: "0 0 0 1px #e1eadc" }}>
                  {rc.isImg ? (
                    <img src={rc.url} alt={rc.name} onClick={rc.open} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in", display: "block" }} />
                  ) : null}
                  {rc.notImg ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", padding: "6px", textAlign: "center" }}>
                      <span style={{ fontSize: "13px", fontWeight: "800", color: "var(--g)" }}>
                        PDF
                      </span>
                      <span style={{ fontSize: "9px", color: "var(--mut)", wordBreak: "break-all" }}>
                        {rc.name}
                      </span>
                    </div>
                  ) : null}
                  <button type="button" onClick={rc.remove} title="Remove" style={{ position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px", border: "0", borderRadius: "50%", background: "rgba(12,36,24,.78)", color: "#ffffff", fontSize: "12px", lineHeight: "1", cursor: "pointer", padding: "0" }}>
                    ×
                  </button>
                </div>
              ))}
              <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", width: "78px", height: "96px", flex: "0 0 78px", borderRadius: "12px", border: "1.5px dashed #9cc08c", color: "var(--g)", fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", cursor: "pointer", textAlign: "center" }}>
                <input type="file" multiple={true} accept="image/*,application/pdf" onChange={ln.onFiles} style={{ display: "none" }} />
                <span style={{ fontSize: "20px", lineHeight: "1" }}>
                  +
                </span>
                RECEIPT
              </label>
              <span style={{ flex: "1 1 150px", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
                Drop photos or PDFs here, or tap + to attach. Every item needs at least one receipt.
              </span>
            </div>
            {ln.hasFlags ? (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(ln.flags || []).map((f, i_f) => (
                  <span key={i_f} style={{ fontSize: "10.5px", fontWeight: "700", color: f.fg, background: f.bg, borderRadius: "999px", padding: "5px 10px" }}>
                    {f.t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <button type="button" onClick={v.cfAddLine} style={{ alignSelf: "flex-start", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 18px", cursor: "pointer" }}>
          <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          ADD ANOTHER ITEM
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", position: "sticky", top: "26px" }}>
        <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "7px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.62)" }}>
            CLAIM TOTAL
          </span>
          <span style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
            {v.cfv.total}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.78)", lineHeight: "1.5" }}>
            {v.cfv.summary}
          </span>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "20px 22px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            CHECKS
          </span>
          {(v.cfChecks || []).map((c, i_c) => (
            <span key={i_c} style={{ fontSize: "12px", fontWeight: "600", lineHeight: "1.45", color: c.fg, background: c.bg, borderRadius: "12px", padding: "10px 12px" }}>
              {c.t}
            </span>
          ))}
          {v.cfv.allClear ? (
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#0a5c2f", background: "#edf5e8", borderRadius: "12px", padding: "10px 12px" }}>
              All checks passed — ready to submit.
            </span>
          ) : null}
        </div>
        <button type="button" onClick={v.cfSubmit} style={{ border: "0", borderRadius: "18px", background: "var(--lime)", color: "var(--ink)", fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", padding: "18px 20px", textAlign: "left", cursor: "pointer", opacity: v.cfv.op, boxShadow: "0 16px 30px -20px rgba(128,204,40,.95)" }}>
          {v.cfv.submitLabel}
        </button>
        <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55" }}>
          {"Submitting as "}{v.meName}. A founder reviews it; you can't review your own claim.
        </p>
      </div>
    </section>
  );
}
