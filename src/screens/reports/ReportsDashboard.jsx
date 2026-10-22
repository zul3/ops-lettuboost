import Icon from '../../components/Icon.jsx';

export default function ReportsDashboard({ v }) {
  return (
    <section data-screen-label="Reports dashboard" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)", paddingRight: "6px" }}>
          PERIOD
        </span>
        {(v.rpPeriods || []).map((t, i_t) => (
          <button key={i_t} type="button" onClick={t.pick} style={{ border: "0", borderRadius: "999px", background: t.bg, color: t.fg, fontSize: "11.5px", fontWeight: "700", padding: "10px 15px", cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(196px, 100%), 1fr))", gap: "14px" }}>
        {(v.rpStats || []).map((s, i_s) => (
          <div key={i_s} style={{ background: s.cardBg, borderRadius: "20px", padding: "20px 22px", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0", boxShadow: "var(--sh)" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", color: s.labelFg }}>
              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em" }}>
                {s.label}
              </span>
              <Icon label={s.label} width="18" height="18" strokeWidth="1.8" style={{ flex: "0 0 auto", display: "block", opacity: ".85" }} />
            </span>
            <span style={{ fontSize: "31px", fontWeight: "800", letterSpacing: "-.035em", lineHeight: "1", color: s.color }}>
              {s.value}
            </span>
            <span style={{ fontSize: "11.5px", color: s.noteFg, lineHeight: "1.45" }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", minWidth: "0", boxShadow: "var(--sh)" }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            REPORTS PER WEEK
          </h2>
          <p style={{ margin: "0 0 16px", fontSize: "11.5px", color: "var(--mut)" }}>
            Last 8 weeks, week starting
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "190px" }}>
            {(v.rpWeeks || []).map((w, i_w) => (
              <div key={i_w} style={{ flex: "1", minWidth: "0", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800" }}>
                  {w.n}
                </span>
                <div style={{ width: "100%", maxWidth: "34px", height: w.h, minHeight: "4px", borderRadius: "8px 8px 4px 4px", background: w.bg }} />
                <span style={{ fontSize: "9.5px", color: "var(--mut)", whiteSpace: "nowrap" }}>
                  {w.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", minWidth: "0", boxShadow: "var(--sh)" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            BY TYPE
          </h2>
          {(v.rpTypeBars || []).map((c, i_c) => (
            <div key={i_c} style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "7px 0" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                <span style={{ flex: "1", fontSize: "12.5px", fontWeight: "600" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "800" }}>
                  {c.n}
                </span>
              </div>
              <div style={{ height: "8px", borderRadius: "999px", background: "var(--wash)" }}>
                <div style={{ height: "8px", borderRadius: "999px", background: "var(--g)", width: c.pct, transformOrigin: "left", animation: "om-bar .6s cubic-bezier(.2,.8,.2,1) both" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", minWidth: "0", boxShadow: "var(--sh)" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            STATUS
          </h2>
          <div style={{ display: "flex", height: "14px", borderRadius: "999px", overflow: "hidden", background: "var(--wash)" }}>
            {(v.rpStatusSegs || []).map((g, i_g) => (
              <div key={i_g} style={{ width: g.pct, background: g.bg }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", paddingTop: "14px" }}>
            {(v.rpStatusSegs || []).map((g, i_g) => (
              <span key={i_g} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: "600" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: g.bg, display: "block" }} />
                {g.label}{" · "}{g.n}
              </span>
            ))}
          </div>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", minWidth: "0", boxShadow: "var(--sh)" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            TOP REPORTERS
          </h2>
          {(v.rpReporters || []).map((p, i_p) => (
            <div key={i_p} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "8px 0" }}>
              <span style={{ width: "30px", height: "30px", flex: "0 0 30px", borderRadius: "10px", background: "var(--tint)", fontSize: "10.5px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.initials}
              </span>
              <span style={{ flex: "1", fontSize: "13px", fontWeight: "700" }}>
                {p.name}
              </span>
              <span style={{ fontSize: "12px", color: "var(--mut)" }}>
                {p.n}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h2 style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: ".12em" }}>
            LATEST REPORTS
          </h2>
          <button type="button" onClick={v.goRpAll} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", padding: "0" }}>
            ALL REPORTS →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "14px" }}>
          {(v.rpRecent || []).map((r, i_r) => (
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
      </div>
    </section>
  );
}
