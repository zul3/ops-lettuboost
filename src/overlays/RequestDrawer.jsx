import Icon from '../components/Icon.jsx';

export default function RequestDrawer({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closeDetail} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "60", display: "flex", justifyContent: "flex-end", padding: "14px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(470px, 100%)", background: "var(--ground)", borderRadius: "24px", height: "100%", overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", animation: "om-in .3s cubic-bezier(.2,.8,.2,1) both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              {v.detail.ref}
            </span>
            <span style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
              {v.detail.payee}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.detail.typeLabel}{" · "}{v.detail.dateLabel}
            </span>
          </div>
          <button type="button" onClick={v.closeDetail} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ background: "var(--g)", borderRadius: "20px", padding: "22px", display: "flex", flexDirection: "column", gap: "7px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "rgba(255,255,255,.66)" }}>
            {v.detail.amountCaption}
          </span>
          <span style={{ fontSize: "40px", fontWeight: "800", letterSpacing: "-.045em", lineHeight: "1", color: "#ffffff" }}>
            {v.detail.amountLabel}
          </span>
          <span style={{ fontSize: "11.5px", fontWeight: "800", letterSpacing: ".08em", color: v.detail.statusOnDark }}>
            {v.detail.statusLabel}
          </span>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "8px 20px", boxShadow: "var(--sh)" }}>
          {(v.detail.rows || []).map((d, i_d) => (
            <div key={i_d} style={{ display: "flex", gap: "14px", padding: "12px 0" }}>
              <span style={{ flex: "0 0 96px", fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)", paddingTop: "3px" }}>
                {d.k}
              </span>
              <span style={{ flex: "1", minWidth: "0", fontSize: "12.5px", fontWeight: "600", lineHeight: "1.55" }}>
                {d.v}
              </span>
            </div>
          ))}
        </div>
        {v.detail.canKey ? (
          <div style={{ background: "var(--tint)", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "11px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: "800" }}>
              Your approval
            </span>
            <span style={{ fontSize: "11.5px", color: "#4a6154", lineHeight: "1.55" }}>
              {v.detail.keyHelp}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="number" min="0" step="1" value={v.detail.draft ?? ''} onChange={v.detail.onDraft} placeholder="0" style={{ flex: "1", minWidth: "0", border: "0", borderRadius: "13px", background: "#ffffff", fontSize: "16px", fontWeight: "700", padding: "13px 14px" }} />
              <button type="button" onClick={v.detail.commit} style={{ border: "0", borderRadius: "13px", background: "var(--lime)", color: "var(--ink)", fontSize: "12px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
                <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
                APPROVE
              </button>
            </div>
          </div>
        ) : null}
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            AUDIT TRAIL
          </span>
          {(v.detail.trail || []).map((t, i_t) => (
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
