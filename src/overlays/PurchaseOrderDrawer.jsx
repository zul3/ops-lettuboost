import Icon from '../components/Icon.jsx';

export default function PurchaseOrderDrawer({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closePo} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "60", display: "flex", justifyContent: "flex-end", padding: "14px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(520px, 100%)", background: "var(--ground)", borderRadius: "24px", height: "100%", overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", animation: "om-in .3s cubic-bezier(.2,.8,.2,1) both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              {v.pdet.id}{" · PURCHASE ORDER"}
            </span>
            <span style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
              {v.pdet.cust}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.pdet.dateLabel}{" · "}{v.pdet.dueLabel}
            </span>
          </div>
          <button type="button" onClick={v.closePo} title="Close" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#ffffff", color: "var(--ink)", boxShadow: "var(--sh)", cursor: "pointer", padding: "0" }}>
            <Icon name="x" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          </button>
        </div>
        <div style={{ background: "var(--g)", borderRadius: "20px", padding: "22px", display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.66)" }}>
            ORDER TOTAL
          </span>
          <span style={{ fontSize: "40px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
            {v.pdet.total}
          </span>
          <span style={{ fontSize: "11.5px", fontWeight: "800", letterSpacing: ".08em", color: "#ffffff" }}>
            {v.pdet.statusLabel}
          </span>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "8px 20px", boxShadow: "var(--sh)" }}>
          {(v.pdet.lines || []).map((l, i_l) => (
            <div key={i_l} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: "1px solid #eef3ea" }}>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {l.desc}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {l.qty}{" × "}{l.cost}
                </span>
              </span>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".06em", color: l.fg }}>
                {l.stock}
              </span>
              <span style={{ fontSize: "13.5px", fontWeight: "800" }}>
                {l.amount}
              </span>
            </div>
          ))}
        </div>
        {v.pdet.hasNotes ? (
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "14px 16px", fontSize: "12.5px", lineHeight: "1.55", boxShadow: "var(--sh)" }}>
            {v.pdet.notes}
          </div>
        ) : null}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {v.pdet.canOrder ? (
            <button type="button" onClick={v.pdet.order} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
              <Icon name="truck" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              PLACE ORDER
            </button>
          ) : null}
          {v.pdet.canReceive ? (
            <button type="button" onClick={v.pdet.receive} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--lime)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
              <Icon name="box" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              RECEIVE INTO STOCK
            </button>
          ) : null}
          {v.pdet.canCancel ? (
            <button type="button" onClick={v.pdet.cancel} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "#fdeceb", color: "#b3261e", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
              <Icon name="x" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              CANCEL ORDER
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
