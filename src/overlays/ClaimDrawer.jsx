import Icon from '../components/Icon.jsx';

export default function ClaimDrawer({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closeClaim} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "60", display: "flex", justifyContent: "flex-end", padding: "14px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(560px, 100%)", background: "var(--ground)", borderRadius: "24px", height: "100%", overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", animation: "om-in .3s cubic-bezier(.2,.8,.2,1) both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              {v.cdet.id}
            </span>
            <span style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
              {v.cdet.title}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.cdet.byName}
            </span>
          </div>
          <button type="button" onClick={v.closeClaim} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ background: "var(--g)", borderRadius: "20px", padding: "22px", display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.66)" }}>
            CLAIM TOTAL
          </span>
          <span style={{ fontSize: "40px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
            {v.cdet.total}
          </span>
          <span style={{ fontSize: "11.5px", fontWeight: "800", letterSpacing: ".08em", color: "#ffffff" }}>
            {v.cdet.statusLabel}
          </span>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "8px 20px", boxShadow: "var(--sh)" }}>
          {(v.cdet.rows || []).map((d, i_d) => (
            <div key={i_d} style={{ display: "flex", gap: "14px", padding: "11px 0" }}>
              <span style={{ flex: "0 0 96px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)", paddingTop: "3px" }}>
                {d.k}
              </span>
              <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", fontWeight: "600", lineHeight: "1.55" }}>
                {d.v}
              </span>
            </div>
          ))}
        </div>
        <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".12em", padding: "6px 4px 0" }}>
          ITEMS AND RECEIPTS
        </span>
        {(v.cdet.lines || []).map((l, i_l) => (
          <div key={i_l} style={{ background: "#ffffff", borderRadius: "20px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "11px", boxShadow: "var(--sh)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "14px", fontWeight: "800" }}>
                  {l.merchant}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {l.cat}{" · "}{l.dateLabel}
                </span>
              </div>
              <span style={{ fontSize: "16px", fontWeight: "800" }}>
                {l.amount}
              </span>
            </div>
            <span style={{ fontSize: "12.5px", lineHeight: "1.55" }}>
              {l.desc}
            </span>
            {l.hasFlags ? (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(l.flags || []).map((f, i_f) => (
                  <span key={i_f} style={{ fontSize: "10.5px", fontWeight: "700", color: "#8a5a00", background: "#fdf3e0", borderRadius: "999px", padding: "5px 10px" }}>
                    {f.t}
                  </span>
                ))}
              </div>
            ) : null}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {(l.receipts || []).map((rc, i_rc) => (
                <div key={i_rc} style={{ width: "96px", height: "122px", borderRadius: "12px", overflow: "hidden", background: "var(--wash)", boxShadow: "0 0 0 1px #e1eadc" }}>
                  {rc.isImg ? (
                    <img src={rc.url} alt={rc.name} onClick={rc.open} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "zoom-in", display: "block" }} />
                  ) : null}
                  {rc.notImg ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", padding: "6px", textAlign: "center" }}>
                      <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--g)" }}>
                        PDF
                      </span>
                      <span style={{ fontSize: "9px", color: "var(--mut)", wordBreak: "break-all" }}>
                        {rc.name}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
        {v.cdet.canReview ? (
          <div style={{ background: "var(--tint)", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "11px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: "800" }}>
              Your review
            </span>
            <textarea value={v.cdet.comment ?? ''} onChange={v.cdet.setComment} rows="2" placeholder="Note to the claimant (required to reject)" style={{ border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "13px", padding: "12px 14px", width: "100%", resize: "vertical" }} />
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="button" onClick={v.cdet.approve} style={{ flex: "1", border: "0", borderRadius: "13px", background: "var(--lime)", color: "var(--ink)", fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "14px", cursor: "pointer" }}>
                <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
                APPROVE
              </button>
              <button type="button" onClick={v.cdet.reject} style={{ flex: "1", border: "0", borderRadius: "13px", background: "#ffffff", color: "#b3261e", fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "14px", cursor: "pointer" }}>
                <Icon name="x" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
                REJECT
              </button>
            </div>
          </div>
        ) : null}
        {v.cdet.selfNote ? (
          <div style={{ background: "#fdf3e0", borderRadius: "16px", padding: "14px 16px", fontSize: "12px", fontWeight: "600", color: "#7a4f00", lineHeight: "1.5" }}>
            This is your own claim — another founder has to review it.
          </div>
        ) : null}
        {v.cdet.canPay ? (
          <button type="button" onClick={v.cdet.pay} style={{ border: "0", borderRadius: "16px", background: "var(--g)", color: "#ffffff", fontSize: "12.5px", fontWeight: "800", letterSpacing: ".07em", padding: "16px", cursor: "pointer" }}>
            MARK AS PAID
          </button>
        ) : null}
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            AUDIT TRAIL
          </span>
          {(v.cdet.trail || []).map((t, i_t) => (
            <div key={i_t} style={{ display: "flex", gap: "12px" }}>
              <span style={{ width: "8px", height: "8px", flex: "0 0 8px", borderRadius: "50%", background: t.dot, display: "block", marginTop: "5px" }} />
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "12.5px", fontWeight: "700" }}>
                  {t.t}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {t.d}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
