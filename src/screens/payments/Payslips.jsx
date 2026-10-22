import Icon from '../../components/Icon.jsx';
import logoFull from '../../assets/logo-full.png';

export default function Payslips({ v }) {
  return (
    <section data-screen-label="Payslips" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "18px" }}>
      <div id="slip-bar" style={{ background: "#ffffff", borderRadius: "20px", padding: "16px 20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "flex-end", boxShadow: "var(--sh)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            EMPLOYEE
          </label>
          <select value={v.slipEmp ?? ''} onChange={v.setSlipEmp} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 14px", minWidth: "230px", appearance: "none" }}>
            {(v.employeeOptions || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            MONTH
          </label>
          <select value={v.slipMonth ?? ''} onChange={v.setSlipMonth} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 14px", minWidth: "180px", appearance: "none" }}>
            {(v.monthOptions || []).map((m, i_m) => (
              <option key={i_m} value={m.id ?? ''}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        {v.slipZakatShow ? (
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "700", padding: "0 4px 13px", cursor: "pointer" }}>
            <input type="checkbox" checked={!!v.zakatChecked} onChange={v.onZakat} style={{ width: "16px", height: "16px", accentColor: "var(--g)" }} />
            {" Pay zakat "}
          </label>
        ) : null}
        <button type="button" onClick={v.openStat} style={{ border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 18px", cursor: "pointer" }}>
          STATUTORY DEDUCTIONS
        </button>
        <button type="button" onClick={v.printSlip} style={{ border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "14px 18px", cursor: "pointer" }}>
          <Icon name="printer" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
          PRINT / PDF
        </button>
      </div>
      <div id="print-sheet" style={{ maxWidth: "780px", background: "#ffffff", borderRadius: "22px", padding: "38px", margin: "0 auto", width: "100%", boxShadow: "var(--sh)", animation: "om-in .3s ease both" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap", paddingBottom: "22px" }}>
          <img src={logoFull} alt="LettuBoost" style={{ width: "210px", maxWidth: "60%", height: "auto", display: "block" }} />
          <div style={{ flex: "1", minWidth: "150px", display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
            <span style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-.01em" }}>
              PAYSLIP
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.slipRef}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {"Issued "}{v.slipIssued}
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "14px", background: "var(--wash)", borderRadius: "16px", padding: "18px 20px" }}>
          {(v.slipMeta || []).map((m, i_m) => (
            <div key={i_m} style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                {m.k}
              </span>
              <span style={{ fontSize: "13px", fontWeight: "700", lineHeight: "1.4" }}>
                {m.v}
              </span>
            </div>
          ))}
        </div>
        <div style={{ padding: "24px 0 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,1.3fr) minmax(104px,1fr)", gap: "14px", padding: "0 4px 6px" }} className="lb-th lb-tbl">
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
              DESCRIPTION
            </span>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
              BASIS
            </span>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
              AMOUNT
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {(v.slipItems || []).map((i, i_i) => (
              <div key={i_i} style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,1.3fr) minmax(104px,1fr)", gap: "14px", background: "var(--wash)", borderRadius: "13px", padding: "13px 14px" }} className="lb-tbl">
                <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.4" }}>
                    {i.desc}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                    {i.sub}
                  </span>
                </span>
                <span style={{ fontSize: "12px", color: "var(--mut)" }}>
                  {i.basis}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "700", textAlign: "right", whiteSpace: "nowrap" }}>
                  {i.amount}
                </span>
              </div>
            ))}
          </div>
          {v.slipEmpty ? (
            <div style={{ padding: "22px 4px", fontSize: "12.5px", color: "var(--mut)" }}>
              No approved payments recorded for this month.
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "var(--tint)", borderRadius: "14px", padding: "16px 18px", marginTop: "14px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: "800", letterSpacing: ".12em", color: "var(--g)" }}>
              {v.slipTotalLabel}
            </span>
            <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-.02em" }}>
              {v.slipTotal}
            </span>
          </div>
          {v.slipHasDed ? (
            <div style={{ padding: "20px 4px 0", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", paddingBottom: "8px" }}>
                DEDUCTIONS
              </span>
              {(v.slipDed || []).map((d, i_d) => (
                <div key={i_d} style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,1.6fr) minmax(104px,1fr)", gap: "14px", padding: "9px 10px", borderBottom: "1px solid #eef3ea" }} className="lb-tbl">
                  <span style={{ fontSize: "13px", fontWeight: "600" }}>
                    {d.name}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--mut)" }}>
                    {d.basis}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: "700", textAlign: "right", whiteSpace: "nowrap" }}>
                    {d.amount}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "10px 10px 0" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".1em", color: "var(--mut)" }}>
                  TOTAL DEDUCTIONS
                </span>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {v.slipDedTotal}
                </span>
              </div>
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "var(--g)", borderRadius: "16px", padding: "20px 22px", marginTop: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", color: "rgba(255,255,255,.8)" }}>
              NET PAY
            </span>
            <span style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-.035em", color: "#ffffff" }}>
              {v.slipNet}
            </span>
          </div>
          {v.slipHasEr ? (
            <div style={{ marginTop: "16px", background: "var(--wash)", borderRadius: "14px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                EMPLOYER CONTRIBUTIONS · PAID BY LETTUBOOST, NOT DEDUCTED FROM PAY
              </span>
              {(v.slipEr || []).map((x, i_x) => (
                <div key={i_x} style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,1.6fr) minmax(104px,1fr)", gap: "14px", padding: "4px 0" }} className="lb-tbl">
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>
                    {x.name}
                  </span>
                  <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
                    {x.basis}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: "700", textAlign: "right", whiteSpace: "nowrap" }}>
                    {x.amount}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", paddingTop: "6px" }}>
                <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".1em", color: "var(--mut)" }}>
                  TOTAL EMPLOYER COST ON TOP
                </span>
                <span style={{ fontSize: "12.5px", fontWeight: "800" }}>
                  {v.slipErTotal}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "20px", paddingTop: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "var(--wash)", borderRadius: "14px", padding: "16px 18px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: "700" }}>
              {v.slipApprovers}
            </span>
            <span style={{ fontSize: "10px", letterSpacing: ".12em", color: "var(--mut)" }}>
              APPROVED BY
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "var(--wash)", borderRadius: "14px", padding: "16px 18px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "var(--mut)" }} />
            <span style={{ fontSize: "10px", letterSpacing: ".12em", color: "var(--mut)" }}>
              RECEIVED BY
            </span>
          </div>
        </div>
        <p style={{ margin: "24px 0 0", fontSize: "10px", color: "var(--mut)", lineHeight: "1.6" }}>
          Computer-generated payslip. Gross is the sum of approved payments recorded in the LettuBoost ops console. Statutory lines are estimates from the rates set under Statutory deductions; income tax is an annualised MTD estimate. Confirm against current KWSP, PERKESO, EIS and LHDN schedules before filing. Founder payments are the average of two independent approvals, per the internal fairness rule.
        </p>
      </div>
    </section>
  );
}
