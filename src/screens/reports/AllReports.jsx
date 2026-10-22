export default function AllReports({ v }) {
  return (
    <section data-screen-label="All reports" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "#ffffff", borderRadius: "20px", padding: "16px 20px", display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "flex-end", boxShadow: "var(--sh)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            SEARCH
          </label>
          <input type="text" value={v.rq ?? ''} onChange={v.setRq} placeholder="Title or details" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 14px", minWidth: "210px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            TYPE
          </label>
          <select value={v.rType ?? ''} onChange={v.setRType} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
            {(v.rpTypeFilter || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            STATUS
          </label>
          <select value={v.rStatus ?? ''} onChange={v.setRStatus} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 14px", appearance: "none" }}>
            {(v.rpStatusFilter || []).map((o, i_o) => (
              <option key={i_o} value={o.id ?? ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "1", minWidth: "110px", display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
            SHOWING
          </span>
          <span style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-.025em", color: "var(--g)" }}>
            {v.rpAllCount}
          </span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "14px" }}>
        {(v.rpAll || []).map((r, i_r) => (
          <div key={i_r} onClick={r.open} style={{ background: "#ffffff", borderRadius: "20px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "11px", cursor: "pointer", boxShadow: "var(--sh)", minWidth: "0", transition: "transform .14s ease" }} className="hv7">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".06em", background: "var(--tint)", color: "#0a5c2f", borderRadius: "999px", padding: "4px 9px" }}>
                {r.type}
              </span>
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".06em", background: r.sevBg, color: r.sevFg, borderRadius: "999px", padding: "4px 9px" }}>
                {r.sevLabel}
              </span>
              <span style={{ flex: "1" }} />
              <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: ".08em", color: r.statusFg }}>
                {r.statusLabel}
              </span>
            </div>
            <span style={{ fontSize: "14.5px", fontWeight: "800", lineHeight: "1.3" }}>
              {r.title}
            </span>
            <span style={{ fontSize: "12px", color: "var(--mut)", lineHeight: "1.5" }}>
              {r.excerpt}
            </span>
            {r.hasThumbs ? (
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {(r.thumbs || []).map((t, i_t) => (
                  <img key={i_t} src={t.url} alt="" style={{ width: "76px", height: "54px", objectFit: "cover", borderRadius: "10px", display: "block" }} />
                ))}
                <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--mut)" }}>
                  {r.more}
                </span>
              </div>
            ) : null}
            <span style={{ fontSize: "11px", color: "var(--mut)" }}>
              {r.byName}{" · "}{r.unit}{" · "}{r.dateLabel}{" · "}{r.photoCount}
            </span>
          </div>
        ))}
      </div>
      {v.rpAllEmpty ? (
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", fontSize: "12.5px", color: "var(--mut)", boxShadow: "var(--sh)" }}>
          No reports match those filters.
        </div>
      ) : null}
    </section>
  );
}
