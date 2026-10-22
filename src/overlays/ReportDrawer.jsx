export default function ReportDrawer({ v }) {
  return (
    <div className="lb-sheet" onClick={v.closeRep} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "60", display: "flex", justifyContent: "flex-end", padding: "14px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(560px, 100%)", background: "var(--ground)", borderRadius: "24px", height: "100%", overflowY: "auto", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", animation: "om-in .3s cubic-bezier(.2,.8,.2,1) both" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
              {v.rdet.id}{" · "}{v.rdet.type}
            </span>
            <span style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em", lineHeight: "1.2" }}>
              {v.rdet.title}
            </span>
            <span style={{ fontSize: "11.5px", color: "var(--mut)" }}>
              {v.rdet.byName}{" · "}{v.rdet.unit}{" · "}{v.rdet.dateLabel}
            </span>
          </div>
          <button type="button" onClick={v.closeRep} style={{ border: "0", borderRadius: "12px", background: "#ffffff", fontSize: "16px", fontWeight: "700", width: "38px", height: "38px", cursor: "pointer", lineHeight: "1", boxShadow: "var(--sh)" }}>
            ×
          </button>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "var(--sh)" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".06em", background: v.rdet.sevBg, color: v.rdet.sevFg, borderRadius: "999px", padding: "5px 10px" }}>
              {v.rdet.sevLabel}{" SEVERITY"}
            </span>
            <span style={{ flex: "1" }} />
            <select value={v.rdet.status ?? ''} onChange={v.rdet.setStatus} style={{ border: "0", borderRadius: "999px", background: "var(--tint)", fontSize: "11.5px", fontWeight: "800", padding: "9px 14px", appearance: "none", cursor: "pointer" }}>
              {(v.rpStatusOptions || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.id}
                </option>
              ))}
            </select>
          </div>
          <span style={{ fontSize: "13.5px", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
            {v.rdet.body}
          </span>
        </div>
        {v.rdet.hasImages ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "10px" }}>
            {(v.rdet.images || []).map((im, i_im) => (
              <div key={i_im} style={{ background: "#ffffff", borderRadius: "16px", padding: "8px", display: "flex", flexDirection: "column", gap: "7px", boxShadow: "var(--sh)" }}>
                {im.isImg ? (
                  <img src={im.url} alt={im.cap} onClick={im.open} style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", borderRadius: "10px", cursor: "zoom-in", display: "block" }} />
                ) : null}
                <span style={{ fontSize: "11px", color: "var(--mut)", padding: "0 4px 4px" }}>
                  {im.cap}
                </span>
              </div>
            ))}
          </div>
        ) : null}
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            ACTIVITY
          </span>
          {(v.rdet.trail || []).map((t, i_t) => (
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
