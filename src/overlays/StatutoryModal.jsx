export default function StatutoryModal({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closeStat} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(620px, 100%)", maxHeight: "100%", overflowY: "auto", background: "var(--ground)", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 30px 70px -30px rgba(12,36,24,.6)", animation: "om-rise .28s ease both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              PAYSLIP · MALAYSIA
            </span>
            <span style={{ fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
              Statutory deductions
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.55" }}>
              Starting rates follow current Malaysian schedules. Adjust any rate, switch items off, choose who each applies to, or add your own. Estimates only — confirm with KWSP, PERKESO and LHDN.
            </span>
          </div>
          <button type="button" onClick={v.closeStat} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".12em", padding: "6px 4px 0" }}>
          DEDUCTED FROM PAY
        </span>
        {(v.statEmpRows || []).map((r, i_r) => (
          <div key={i_r} style={{ background: "#ffffff", borderRadius: "16px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px", boxShadow: "var(--sh)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" checked={!!r.on} onChange={r.toggle} style={{ width: "17px", height: "17px", flex: "0 0 17px", accentColor: "var(--g)" }} />
              <input type="text" value={r.name ?? ''} onChange={r.setName} style={{ flex: "1", minWidth: "0", border: "0", borderRadius: "10px", background: "transparent", fontSize: "13.5px", fontWeight: "800", padding: "8px 8px" }} className="fcb" />
              {r.isOpt ? (
                <span style={{ fontSize: "9px", fontWeight: "800", letterSpacing: ".1em", color: "var(--warn)", background: "#fdf3e0", borderRadius: "999px", padding: "5px 9px" }}>
                  OPTIONAL
                </span>
              ) : null}
              <button type="button" onClick={r.remove} title="Remove" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", color: "var(--mut)", fontSize: "15px", fontWeight: "700", width: "32px", height: "32px", cursor: "pointer" }} className="hvc">
                ×
              </button>
            </div>
            <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55", paddingLeft: "27px" }}>
              {r.note}
            </span>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingLeft: "27px" }}>
              {r.isPcb ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)" }}>
                    PERSONAL RELIEF (RM / YEAR)
                  </label>
                  <input type="number" min="0" step="500" value={r.relief ?? ''} onChange={r.setRelief} style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 11px", width: "150px" }} />
                </div>
              ) : null}
              {r.showRate ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)" }}>
                    {r.rateLabel}
                  </label>
                  <input type="number" min="0" step="0.05" value={r.rate ?? ''} onChange={r.setRate} style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 11px", width: "110px" }} />
                </div>
              ) : null}
              {r.isPct ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)" }}>
                    WAGE CEILING (RM)
                  </label>
                  <input type="number" min="0" step="100" value={r.cap ?? ''} onChange={r.setCap} placeholder="None" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 11px", width: "120px" }} />
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", paddingLeft: "27px", alignItems: "center" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)", marginRight: "4px" }}>
                APPLIES TO
              </span>
              {(r.types || []).map((t, i_t) => (
                <button key={i_t} type="button" onClick={t.toggle} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "10.5px", fontWeight: "700", padding: "6px 11px", cursor: "pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".12em", padding: "10px 4px 0" }}>
          EMPLOYER CONTRIBUTIONS
        </span>
        {(v.statErRows || []).map((r, i_r) => (
          <div key={i_r} style={{ background: "#ffffff", borderRadius: "16px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px", boxShadow: "var(--sh)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" checked={!!r.on} onChange={r.toggle} style={{ width: "17px", height: "17px", flex: "0 0 17px", accentColor: "var(--g)" }} />
              <input type="text" value={r.name ?? ''} onChange={r.setName} style={{ flex: "1", minWidth: "0", border: "0", borderRadius: "10px", background: "transparent", fontSize: "13.5px", fontWeight: "800", padding: "8px 8px" }} className="fcb" />
              {r.isOpt ? (
                <span style={{ fontSize: "9px", fontWeight: "800", letterSpacing: ".1em", color: "var(--warn)", background: "#fdf3e0", borderRadius: "999px", padding: "5px 9px" }}>
                  OPTIONAL
                </span>
              ) : null}
              <button type="button" onClick={r.remove} title="Remove" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", color: "var(--mut)", fontSize: "15px", fontWeight: "700", width: "32px", height: "32px", cursor: "pointer" }} className="hvc">
                ×
              </button>
            </div>
            <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.55", paddingLeft: "27px" }}>
              {r.note}
            </span>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingLeft: "27px" }}>
              {r.isPcb ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)" }}>
                    PERSONAL RELIEF (RM / YEAR)
                  </label>
                  <input type="number" min="0" step="500" value={r.relief ?? ''} onChange={r.setRelief} style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 11px", width: "150px" }} />
                </div>
              ) : null}
              {r.showRate ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)" }}>
                    {r.rateLabel}
                  </label>
                  <input type="number" min="0" step="0.05" value={r.rate ?? ''} onChange={r.setRate} style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 11px", width: "110px" }} />
                </div>
              ) : null}
              {r.isPct ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)" }}>
                    WAGE CEILING (RM)
                  </label>
                  <input type="number" min="0" step="100" value={r.cap ?? ''} onChange={r.setCap} placeholder="None" style={{ border: "0", borderRadius: "11px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "800", padding: "9px 11px", width: "120px" }} />
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", paddingLeft: "27px", alignItems: "center" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".12em", color: "var(--mut)", marginRight: "4px" }}>
                APPLIES TO
              </span>
              {(r.types || []).map((t, i_t) => (
                <button key={i_t} type="button" onClick={t.toggle} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "10.5px", fontWeight: "700", padding: "6px 11px", cursor: "pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".12em", padding: "10px 4px 0" }}>
          ADD AN ITEM
        </span>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", background: "var(--tint)", borderRadius: "16px", padding: "14px" }}>
          <input type="text" value={v.ns.name ?? ''} onChange={v.setNsName} placeholder="Name, e.g. Staff loan" style={{ flex: "1 1 170px", minWidth: "0", border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "13px", padding: "11px 12px" }} />
          <select value={v.ns.side ?? ''} onChange={v.setNsSide} style={{ border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "12.5px", fontWeight: "600", padding: "11px 12px", appearance: "none" }}>
            <option value="employee">
              Deduction
            </option>
            <option value="employer">
              Employer contribution
            </option>
          </select>
          <select value={v.ns.mode ?? ''} onChange={v.setNsMode} style={{ border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "12.5px", fontWeight: "600", padding: "11px 12px", appearance: "none" }}>
            <option value="pct">
              % of pay
            </option>
            <option value="fixed">
              Fixed RM
            </option>
          </select>
          <input type="number" min="0" step="0.1" value={v.ns.rate ?? ''} onChange={v.setNsRate} placeholder="Value" style={{ width: "90px", border: "0", borderRadius: "11px", background: "#ffffff", fontSize: "13px", fontWeight: "700", padding: "11px 12px" }} />
          <button type="button" onClick={v.addStat} style={{ border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 18px", cursor: "pointer" }}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
