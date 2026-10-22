export default function ClaimReview({ v }) {
  return (
    <section data-screen-label="Claim review" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          WAITING FOR YOUR REVIEW
        </h2>
        {(v.clQueue || []).map((r, i_r) => (
          <div key={i_r} onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,2.2fr) minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.2fr) minmax(96px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "14px 20px", cursor: "pointer", boxShadow: "var(--sh)" }} className="lb-tbl hvd">
            <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
              <span style={{ width: "32px", height: "32px", flex: "0 0 32px", borderRadius: "11px", background: "var(--tint)", fontSize: "10.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {r.initials}
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {r.title}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {r.byName}{" · "}{r.dateLabel}
                </span>
              </span>
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.4" }}>
              {r.cats}
              <br />
              {r.lines}
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {r.receipts}
            </span>
            <span style={{ fontSize: "11px", fontWeight: "800", letterSpacing: ".06em", color: "var(--g)" }}>
              REVIEW RECEIPTS →
            </span>
            <span style={{ fontSize: "14px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap" }}>
              {r.total}
            </span>
          </div>
        ))}
        {v.clQueueEmpty ? (
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "22px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
            Nothing to review. All caught up.
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
          APPROVED — READY TO PAY
        </h2>
        {(v.clReady || []).map((r, i_r) => (
          <div key={i_r} onClick={r.open} style={{ display: "grid", gridTemplateColumns: "minmax(0,2.2fr) minmax(0,1.5fr) minmax(0,1fr) minmax(0,1.2fr) minmax(96px,1fr)", gap: "14px", alignItems: "center", background: "#ffffff", borderRadius: "16px", padding: "14px 20px", cursor: "pointer", boxShadow: "var(--sh)" }} className="lb-tbl hvd">
            <span style={{ display: "flex", alignItems: "center", gap: "11px", minWidth: "0" }}>
              <span style={{ width: "32px", height: "32px", flex: "0 0 32px", borderRadius: "11px", background: "var(--tint)", fontSize: "10.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {r.initials}
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {r.title}
                </span>
                <span style={{ fontSize: "11px", color: "var(--mut)" }}>
                  {r.byName}{" · "}{r.dateLabel}
                </span>
              </span>
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.4" }}>
              {r.cats}
              <br />
              {r.lines}
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)" }}>
              {r.receipts}
            </span>
            <span>
              <button type="button" onClick={r.payClick} style={{ border: "0", borderRadius: "999px", background: "#edf5e8", color: "#0a5c2f", fontSize: "10.5px", fontWeight: "800", letterSpacing: ".06em", padding: "9px 13px", cursor: "pointer" }}>
                MARK PAID
              </button>
            </span>
            <span style={{ fontSize: "14px", fontWeight: "800", textAlign: "right", whiteSpace: "nowrap" }}>
              {r.total}
            </span>
          </div>
        ))}
        {v.clReadyEmpty ? (
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "22px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
            No approved claims waiting for payout.
          </div>
        ) : null}
      </div>
    </section>
  );
}
