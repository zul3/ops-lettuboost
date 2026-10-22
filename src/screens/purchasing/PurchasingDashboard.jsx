import Icon from '../../components/Icon.jsx';

export default function PurchasingDashboard({ v }) {
  return (
    <section data-screen-label="Purchasing dashboard" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))", gap: "14px" }}>
        {(v.puStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "9px", boxShadow: "var(--sh)", minWidth: "0" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", color: s.labelFg }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em" }}>
                {s.label}
              </span>
              <Icon label={s.label} width="18" height="18" strokeWidth="1.8" style={{ flex: "0 0 auto", display: "block", opacity: ".85" }} />
            </span>
            <span style={{ fontSize: "29px", fontWeight: "800", letterSpacing: "-.035em", lineHeight: "1", color: s.color }}>
              {s.value}
            </span>
            <span style={{ fontSize: "11.5px", color: s.noteFg, lineHeight: "1.45" }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
          <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            ARRIVING SOON
          </h2>
          {(v.puSoon || []).map((r, i_r) => (
            <div key={i_r} onClick={r.open} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", borderBottom: "1px solid #eef3ea", cursor: "pointer", minWidth: "0" }}>
              <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: "var(--tint)", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={r.icon} width="17" height="17" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              </span>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {r.id}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.cust}{" · "}{r.dueLabel}
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {r.total}
                </span>
                <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg }}>
                  {r.statusLabel}
                </span>
              </span>
            </div>
          ))}
          {v.puSoonEmpty ? (
            <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
              No orders on the way.
            </div>
          ) : null}
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
          <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            BELOW REORDER LEVEL
          </h2>
          {(v.puLow || []).map((i, i_i) => (
            <div key={i_i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", borderBottom: "1px solid #eef3ea" }}>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {i.name}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {i.qtyLabel}{" · "}{i.reorderLabel}
                </span>
              </span>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: i.fg, background: i.bg, borderRadius: "999px", padding: "5px 9px" }}>
                {i.status}
              </span>
              <button type="button" onClick={i.order} title="Order this item" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "var(--lime)", color: "var(--ink)", cursor: "pointer", padding: "0" }}>
                <Icon name="cart" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              </button>
            </div>
          ))}
          {v.puLowEmpty ? (
            <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
              Everything is above its reorder level.
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          LATEST ORDERS
        </h2>
        <button type="button" onClick={v.goPuOrders} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", cursor: "pointer", padding: "9px 14px" }}>
          <Icon name="list" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          ALL
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(96px,1fr)", gap: "14px", padding: "0 20px 2px" }} className="lb-th lb-tbl">
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          ORDER
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          SUPPLIER
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          DATE
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
          STATUS
        </span>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", textAlign: "right" }}>
          TOTAL
        </span>
      </div>
      {(v.puRecent || []).map((r, i_r) => (
        <div key={i_r} onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(96px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "13px 20px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease, background .16s ease" }} className="lb-tbl hv9">
          <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
            <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: "var(--tint)", color: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={r.icon} width="17" height="17" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
              <span style={{ fontSize: "13px", fontWeight: "800" }}>
                {r.id}
              </span>
              <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                {r.typeLabel}
              </span>
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>
              {r.cust}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.sub}
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "12px" }}>
              {r.dateLabel}
            </span>
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {r.dueLabel}
            </span>
          </span>
          <span>
            <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg, background: r.statusBg, borderRadius: "999px", padding: "5px 10px" }}>
              {r.statusLabel}
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: "14px", fontWeight: "800", whiteSpace: "nowrap" }}>
              {r.total}
            </span>
            <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#8a5a00" }}>
              {r.balLabel}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}
