import Icon from '../../components/Icon.jsx';
import logoFull from '../../assets/logo-full.png';

export default function Document({ v }) {
  return (
    <section data-screen-label="Document" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div id="doc-bar" data-np="" style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", background: "#ffffff", borderRadius: "20px", padding: "10px 14px", boxShadow: "var(--sh)" }}>
        <button type="button" onClick={v.goSaDocs} title="Back to documents" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "var(--tint)", color: "var(--g)", cursor: "pointer", padding: "0" }}>
          <Icon name="arrowL" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
        </button>
        <span style={{ fontSize: "13px", fontWeight: "800", padding: "0 6px" }}>
          {v.dv.id}
        </span>
        <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: v.dv.statusFg, background: v.dv.statusBg, borderRadius: "999px", padding: "5px 10px" }}>
          {v.dv.statusLabel}
        </span>
        <span style={{ flex: "1" }} />
        {v.dv.canSend ? (
          <button type="button" onClick={v.dv.send} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
            <Icon name="send" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            MARK SENT
          </button>
        ) : null}
        {v.dv.canAccept ? (
          <button type="button" onClick={v.dv.accept} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
            <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            ACCEPTED
          </button>
        ) : null}
        {v.dv.canDecline ? (
          <button type="button" onClick={v.dv.decline} title="Mark declined" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#fdeceb", color: "#b3261e", cursor: "pointer", padding: "0" }}>
            <Icon name="x" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          </button>
        ) : null}
        {v.dv.canConvert ? (
          <button type="button" onClick={v.dv.convert} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
            <Icon name="swap" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            CONVERT TO INVOICE
          </button>
        ) : null}
        {v.dv.canDelete ? (
          <button type="button" onClick={v.dv.remove} title="Delete" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#fdeceb", color: "#b3261e", cursor: "pointer", padding: "0" }}>
            <Icon name="trash" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          </button>
        ) : null}
        <button type="button" onClick={v.printDoc} title="Print or save as PDF" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "var(--g)", color: "#ffffff", cursor: "pointer", padding: "0" }}>
          <Icon name="printer" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
        </button>
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div id="print-sheet" style={{ flex: "1 1 460px", minWidth: "0", maxWidth: "780px", background: "#ffffff", borderRadius: "22px", padding: "38px", boxShadow: "var(--sh)", animation: "om-in .3s ease both", position: "relative" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap", paddingBottom: "20px" }}>
            <img src={logoFull} alt="LettuBoost" style={{ width: "190px", maxWidth: "60%", height: "auto", display: "block" }} />
            <div style={{ flex: "1", minWidth: "150px", display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
              <span style={{ fontSize: "19px", fontWeight: "800", letterSpacing: "-.01em" }}>
                {v.dv.title}
              </span>
              <span style={{ fontSize: "12px", color: "var(--mut)" }}>
                {v.dv.id}
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(170px, 100%), 1fr))", gap: "14px", background: "var(--wash)", borderRadius: "16px", padding: "18px 20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
                BILLED TO
              </span>
              <span style={{ fontSize: "13.5px", fontWeight: "800" }}>
                {v.dv.cust}
              </span>
              <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
                {v.dv.custInfo}
              </span>
            </div>
            {(v.dv.meta || []).map((m, i_m) => (
              <div key={i_m} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                  {m.k}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "700" }}>
                  {m.v}
                </span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: "22px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) 64px minmax(80px,1fr) minmax(90px,1fr)", gap: "14px", padding: "0 4px 6px" }} className="lb-th lb-tbl">
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                DESCRIPTION
              </span>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                QTY
              </span>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                PRICE
              </span>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
                AMOUNT
              </span>
            </div>
            {(v.dv.lines || []).map((l, i_l) => (
              <div key={i_l} style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) 64px minmax(80px,1fr) minmax(90px,1fr)", gap: "14px", background: "var(--wash)", borderRadius: "13px", padding: "13px 14px", marginBottom: "6px" }} className="lb-tbl">
                <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: "1.4" }}>
                  {l.desc}
                </span>
                <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
                  {l.qty}
                </span>
                <span style={{ fontSize: "12.5px", color: "var(--mut)" }}>
                  {l.price}
                </span>
                <span style={{ fontSize: "13.5px", fontWeight: "700", textAlign: "right", whiteSpace: "nowrap" }}>
                  {l.amount}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end", padding: "12px 6px 0" }}>
            <span style={{ display: "flex", gap: "24px", fontSize: "12.5px", color: "var(--mut)" }}>
              {"Subtotal "}
              <b style={{ color: "var(--ink)", minWidth: "100px", textAlign: "right" }}>
                {v.dv.sub}
              </b>
            </span>
            {v.dv.hasTax ? (
              <span style={{ display: "flex", gap: "24px", fontSize: "12.5px", color: "var(--mut)" }}>
                {v.dv.taxLabel}{" "}
                <b style={{ color: "var(--ink)", minWidth: "100px", textAlign: "right" }}>
                  {v.dv.tax}
                </b>
              </span>
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "var(--g)", borderRadius: "16px", padding: "18px 22px", marginTop: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: ".12em", color: "rgba(255,255,255,.8)" }}>
              {v.dv.totalLabel}
            </span>
            <span style={{ fontSize: "30px", fontWeight: "800", letterSpacing: "-.035em", color: "#ffffff" }}>
              {v.dv.total}
            </span>
          </div>
          {v.dv.showBal ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end", padding: "12px 6px 0", fontSize: "12.5px", color: "var(--mut)" }}>
              {v.dv.showPaid ? (
                <span style={{ display: "flex", gap: "24px" }}>
                  {"Paid to date "}
                  <b style={{ color: "var(--ink)", minWidth: "100px", textAlign: "right" }}>
                    {v.dv.paid}
                  </b>
                </span>
              ) : null}
              <span style={{ display: "flex", gap: "24px", fontWeight: "800", color: "var(--ink)" }}>
                {"Balance due "}
                <b style={{ minWidth: "100px", textAlign: "right" }}>
                  {v.dv.balance}
                </b>
              </span>
            </div>
          ) : null}
          {v.dv.hasNotes ? (
            <p style={{ margin: "18px 0 0", fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {v.dv.notes}
            </p>
          ) : null}
          <p style={{ margin: "22px 0 0", fontSize: "10.5px", color: "var(--mut)", lineHeight: "1.6" }}>
            {v.dv.terms}
          </p>
        </div>
        <div id="doc-side" data-np="" style={{ flex: "0 0 300px", maxWidth: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
          {v.dv.canPay ? (
            <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
                RECORD PAYMENT
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  AMOUNT (RM)
                </label>
                <input type="number" value={v.payf.amount ?? ''} onChange={v.payAmount} placeholder={v.dv.balanceRaw} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                  METHOD
                </label>
                <select value={v.payf.method ?? ''} onChange={v.payMethod} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                  {(v.methodOpts || []).map((o, i_o) => (
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
                <input type="date" value={v.payf.date ?? ''} onChange={v.payDate} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
              </div>
              <button type="button" onClick={v.dv.pay} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer", justifyContent: "center" }}>
                <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                RECORD AND ISSUE RECEIPT
              </button>
              <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
                Leave the amount blank to pay the full balance. A receipt is created automatically.
              </span>
            </div>
          ) : null}
          {v.dv.hasLinks ? (
            <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
                LINKED
              </span>
              {(v.dv.links || []).map((k, i_k) => (
                <button key={i_k} type="button" onClick={k.open} style={{ display: "flex", alignItems: "center", gap: "10px", border: "0", borderRadius: "13px", background: "var(--wash)", padding: "11px 13px", cursor: "pointer", textAlign: "left" }}>
                  <Icon name={k.icon} width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block", color: "var(--g)" }} />
                  <span style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "12.5px", fontWeight: "800" }}>
                      {k.id}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                      {k.note}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
