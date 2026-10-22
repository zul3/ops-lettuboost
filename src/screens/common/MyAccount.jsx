import Icon from '../../components/Icon.jsx';

export default function MyAccount({ v }) {
  return (
    <section data-screen-label="My account" style={{ animation: "om-in .34s cubic-bezier(.2,.8,.2,1) both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))", gap: "16px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            PROFILE
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {v.meHasPhoto ? (
              <img src={v.mePhoto} alt="" style={{ width: "84px", height: "84px", borderRadius: "26px", objectFit: "cover", display: "block" }} />
            ) : null}
            {v.meNoPhoto ? (
              <span style={{ width: "84px", height: "84px", borderRadius: "26px", background: "var(--tint)", color: "var(--g)", fontSize: "26px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {v.meInitials}
              </span>
            ) : null}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ alignSelf: "flex-start", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "11px 16px", cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={v.acctPhoto} style={{ display: "none" }} />
                <Icon name="upload" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
                UPLOAD PHOTO
              </label>
              {v.meHasPhoto ? (
                <button type="button" onClick={v.acctPhotoClear} style={{ alignSelf: "flex-start", border: "0", background: "none", color: "var(--mut)", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", padding: "0" }}>
                  Remove photo
                </button>
              ) : null}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              FULL NAME
            </label>
            <input type="text" value={v.acct.name ?? ''} onChange={v.acSetName} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", fontWeight: "600", padding: "13px 14px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              EMAIL
            </label>
            <input type="email" value={v.acct.email ?? ''} onChange={v.acSetEmail} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", fontWeight: "600", padding: "13px 14px", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              PHONE
            </label>
            <input type="text" value={v.acct.phone ?? ''} onChange={v.acSetPhone} placeholder="+60" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", fontWeight: "600", padding: "13px 14px", width: "100%" }} />
          </div>
          <button type="button" onClick={v.acctSave} style={{ alignSelf: "flex-start", border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 20px", cursor: "pointer" }}>
            <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
            SAVE PROFILE
          </button>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            PASSWORD
          </span>
          <input type="password" value={v.pw.cur ?? ''} onChange={v.pwCur} placeholder="Current password" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", padding: "13px 14px", width: "100%" }} />
          <input type="password" value={v.pw.next ?? ''} onChange={v.pwNext} placeholder="New password (8+ characters)" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", padding: "13px 14px", width: "100%" }} />
          <input type="password" value={v.pw.conf ?? ''} onChange={v.pwConf} placeholder="Repeat new password" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "14px", padding: "13px 14px", width: "100%" }} />
          <button type="button" onClick={v.pwSave} style={{ alignSelf: "flex-start", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 20px", cursor: "pointer" }}>
            UPDATE PASSWORD
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "12px 24px", boxShadow: "var(--sh)" }}>
          <span style={{ display: "block", fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)", padding: "12px 0 4px" }}>
            NOTIFICATIONS AND SECURITY
          </span>
          {(v.prefRows || []).map((p, i_p) => (
            <div key={i_p} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0", borderBottom: "1px solid #eef3ea" }}>
              <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700" }}>
                  {p.t}
                </span>
                <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.45" }}>
                  {p.d}
                </span>
              </span>
              <button type="button" onClick={p.toggle} style={{ position: "relative", width: "42px", height: "24px", flex: "0 0 42px", border: "0", borderRadius: "999px", background: p.bg, cursor: "pointer", padding: "0", transition: "background .18s ease" }}>
                <span style={{ position: "absolute", top: "3px", left: p.knob, width: "18px", height: "18px", borderRadius: "50%", background: "#ffffff", transition: "left .18s ease", boxShadow: "0 1px 3px rgba(0,0,0,.25)" }} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            MENU BEHAVIOUR
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" onClick={v.lockOn} style={{ border: "0", borderRadius: "14px", background: v.lockOnBg, color: v.lockOnFg, fontSize: "12.5px", fontWeight: "700", padding: "12px 16px", cursor: "pointer" }}>
              Pinned open
            </button>
            <button type="button" onClick={v.lockOff} style={{ border: "0", borderRadius: "14px", background: v.lockOffBg, color: v.lockOffFg, fontSize: "12.5px", fontWeight: "700", padding: "12px 16px", cursor: "pointer" }}>
              Auto-hide
            </button>
          </div>
          <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
            Pinned keeps the menu open and pushes the page. Auto-hide collapses it to a thin edge that opens on hover.
          </span>
        </div>
        <div style={{ background: "#ffffff", borderRadius: "22px", padding: "22px 24px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "var(--sh)" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)" }}>
            {"YOUR ACCESS · "}{v.meRole}
          </span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {(v.accessChips || []).map((m, i_m) => (
              <span key={i_m} style={{ fontSize: "11px", fontWeight: "700", background: m.bg, color: m.fg, borderRadius: "999px", padding: "6px 11px" }}>
                {m.label}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5" }}>
            Only a system admin can change roles and module access.
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="button" onClick={v.signOutOthers} style={{ border: "0", borderRadius: "999px", background: "#ffffff", boxShadow: "var(--sh)", color: "var(--ink)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
            SIGN OUT OTHER DEVICES
          </button>
          <button type="button" onClick={v.logout} style={{ border: "0", borderRadius: "999px", background: "#fdeceb", color: "#b3261e", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "13px 18px", cursor: "pointer" }}>
            <Icon name="logout" width="15" height="15" strokeWidth="1.9" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "6px" }} />
            LOG OUT
          </button>
        </div>
      </div>
    </section>
  );
}
