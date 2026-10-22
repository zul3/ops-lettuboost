export default function NewRequest({ v }) {
  return (
    <section data-screen-label="New request" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ background: "#ffffff", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "22px", minWidth: "0", boxShadow: "var(--sh)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            STEP 01
          </span>
          <label style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".01em" }}>
            Who is being paid
          </label>
          <select value={v.f.payeeId ?? ''} onChange={v.setPayee} style={{ border: "0", borderRadius: "14px", background: "var(--wash)", color: "var(--ink)", fontSize: "14px", fontWeight: "600", padding: "13px 14px", width: "100%", appearance: "none" }}>
            {(v.employeeOptions || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
          <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
            {v.payeeHint}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            STEP 02
          </span>
          <label style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".01em" }}>
            Payment category
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(142px, 100%), 1fr))", gap: "9px" }}>
            {(v.catOptions || []).map((c, i_c) => (
              <button key={i_c} type="button" onClick={c.pick} style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-start", textAlign: "left", border: "0", borderRadius: "15px", background: c.bg, color: c.fg, padding: "13px 14px", cursor: "pointer", transition: "background .16s ease, transform .14s ease" }} className="hv7">
                <span style={{ fontSize: "12.5px", fontWeight: "800", letterSpacing: ".01em" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: "11px", opacity: ".72" }}>
                  {c.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
        {v.f.isPiece ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "11px", background: "var(--tint)", borderRadius: "18px", padding: "18px", animation: "om-rise .28s ease both" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--g)" }}>
              PIECE RATED
            </span>
            <select value={v.f.taskId ?? ''} onChange={v.setTask} style={{ border: "0", borderRadius: "13px", background: "#ffffff", color: "var(--ink)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", appearance: "none" }}>
              {(v.taskOptions || []).map((t, i_t) => (
                <option key={i_t} value={t.id ?? ''}>
                  {t.label}
                </option>
              ))}
            </select>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "14px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "120px" }}>
                <label style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  QUANTITY
                </label>
                <input type="number" min="0" step="1" value={v.f.qty ?? ''} onChange={v.setQty} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "15px", fontWeight: "700", padding: "11px 13px", width: "120px" }} />
              </div>
              <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.5", paddingBottom: "12px" }}>
                {v.pieceMath}
              </span>
            </div>
            <button type="button" onClick={v.goTasks} style={{ alignSelf: "flex-start", border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".04em", padding: "0", cursor: "pointer" }}>
              {"EDIT TASKS & RATES →"}
            </button>
          </div>
        ) : null}
        {v.f.isCustom ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#fdf3e0", borderRadius: "18px", padding: "18px", animation: "om-rise .28s ease both" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--warn)" }}>
              CUSTOM AMOUNT
            </span>
            <p style={{ margin: "0", fontSize: "12.5px", fontWeight: "800", color: "#7a4f00", lineHeight: "1.5" }}>
              Make sure to discuss internally before approving amount.
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 120px", minWidth: "110px" }}>
                <label style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".1em", color: "#7a4f00" }}>
                  RATE (RM)
                </label>
                <input type="number" min="0" step="0.5" value={v.f.custom ?? ''} onChange={v.setCustom} placeholder="0.00" style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "16px", fontWeight: "700", padding: "12px 14px", width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 130px", minWidth: "120px" }}>
                <label style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".1em", color: "#7a4f00" }}>
                  PER (UoM)
                </label>
                <select value={v.f.uomId ?? ''} onChange={v.setUom} style={{ border: "0", borderRadius: "13px", background: "#ffffff", color: "var(--ink)", fontSize: "14px", fontWeight: "700", padding: "13px 13px", width: "100%", appearance: "none" }}>
                  {(v.uomOptions || []).map((u, i_u) => (
                    <option key={i_u} value={u.id ?? ''}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "0 0 100px" }}>
                <label style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".1em", color: "#7a4f00" }}>
                  REPEATS
                </label>
                <input type="number" min="1" step="1" value={v.f.cqty ?? ''} onChange={v.setCqty} style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "16px", fontWeight: "700", padding: "12px 14px", width: "100%" }} />
              </div>
            </div>
            <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#7a4f00" }}>
              {v.customMath}
            </span>
            <button type="button" onClick={v.openUom} style={{ alignSelf: "flex-start", border: "0", background: "none", color: "var(--warn)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".04em", padding: "0", cursor: "pointer" }}>
              MANAGE UNITS OF MEASURE →
            </button>
            <span style={{ fontSize: "11.5px", color: "#7a4f00", lineHeight: "1.5" }}>
              Not encouraged — use a fixed category or a piece rate where you can, so pay stays comparable across people.
            </span>
          </div>
        ) : null}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            STEP 03
          </span>
          <label style={{ fontSize: "13px", fontWeight: "800", letterSpacing: ".01em" }}>
            What was this for
          </label>
          <textarea value={v.f.note ?? ''} onChange={v.setNote} rows="3" placeholder="e.g. 20 pieces of water lettuce for Pond B restock" style={{ border: "0", borderRadius: "14px", background: "var(--wash)", fontSize: "13.5px", padding: "13px 14px", width: "100%", resize: "vertical", lineHeight: "1.55" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0", position: "sticky", top: "26px" }}>
        <div style={{ background: "var(--g)", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "7px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.62)" }}>
            AMOUNT
          </span>
          <span style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
            {v.previewAmount}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,.78)", lineHeight: "1.5" }}>
            {v.previewBasis}
          </span>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "8px 22px 18px", boxShadow: "var(--sh)" }}>
          {(v.previewRows || []).map((p, i_p) => (
            <div key={i_p} style={{ display: "flex", gap: "14px", padding: "12px 0" }}>
              <span style={{ flex: "0 0 92px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)", paddingTop: "3px" }}>
                {p.k}
              </span>
              <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", fontWeight: "600", lineHeight: "1.5" }}>
                {p.v}
              </span>
            </div>
          ))}
          <div style={{ background: v.ruleBg, borderRadius: "16px", padding: "15px 17px", marginTop: "8px" }}>
            <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.55", color: v.ruleFg, fontWeight: "600" }}>
              {v.ruleText}
            </p>
          </div>
        </div>
        <button type="button" onClick={v.submit} disabled={v.submitDisabled} style={{ border: "0", borderRadius: "18px", background: "var(--lime)", color: "var(--ink)", fontSize: "13px", fontWeight: "800", letterSpacing: ".07em", padding: "18px 20px", textAlign: "left", cursor: "pointer", opacity: v.submitOpacity, boxShadow: "0 16px 30px -20px rgba(128,204,40,.95)", transition: "transform .14s ease" }} className="hv7 aca">
          {v.submitLabel}
        </button>
        <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55" }}>
          {"You are approving as "}{v.meName}. Every approval is stamped with your name and time — that record is what the payslip is built from.
        </p>
      </div>
    </section>
  );
}
