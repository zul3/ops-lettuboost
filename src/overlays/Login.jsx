import logoMark from '../assets/logo-mark.png';

export default function Login({ v }) {
  return (
    <div className="lb-login" style={{ flex: "1", minWidth: "0", display: "flex", minHeight: "100vh", background: "#ffffff" }}>
      <div className="lb-login-hero" style={{ flex: "1 1 46%", minWidth: "280px", background: "var(--g)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "44px 46px", position: "relative", overflow: "hidden" }}>
        <span style={{ position: "absolute", width: "340px", height: "340px", borderRadius: "50%", background: "rgba(255,255,255,.06)", top: "-120px", right: "-100px" }} />
        <span style={{ position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: "var(--lime)", opacity: ".14", bottom: "-80px", left: "-60px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "11px", position: "relative" }}>
          <span style={{ width: "42px", height: "42px", flex: "0 0 42px", background: "#ffffff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={logoMark} alt="LettuBoost" style={{ width: "24px", height: "28px", objectFit: "contain", display: "block" }} />
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
            <span style={{ fontSize: "14px", fontWeight: "800", letterSpacing: ".05em", lineHeight: "1", color: "#ffffff" }}>
              LETTUBOOST
            </span>
            <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: ".16em", color: "rgba(255,255,255,.62)", lineHeight: "1" }}>
              OPS CONSOLE
            </span>
          </span>
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "380px" }}>
          <h1 style={{ margin: "0", fontSize: "32px", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1.15", color: "#ffffff" }}>
            Payments, approvals and payroll — one console.
          </h1>
          <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.6", color: "rgba(255,255,255,.72)" }}>
            Sign in to approve founder payments, clear the approval inbox, and run the monthly payslip for the whole team.
          </p>
        </div>
        <div style={{ position: "relative", display: "flex", gap: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>
              {v.employeeCount}
            </span>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "rgba(255,255,255,.6)" }}>
              PEOPLE
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>
              {v.founderCount}
            </span>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "rgba(255,255,255,.6)" }}>
              FOUNDER KEYS
            </span>
          </div>
        </div>
      </div>
      <div style={{ flex: "1 1 54%", minWidth: "300px", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "var(--ground)" }}>
        <form onSubmit={v.doLogin} style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "22px", background: "#ffffff", borderRadius: "24px", padding: "36px 32px", boxShadow: "var(--sh)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".18em", color: "var(--mut)" }}>
              {v.loginKicker}
            </span>
            <h2 style={{ margin: "0", fontSize: "23px", fontWeight: "800", letterSpacing: "-.02em" }}>
              {v.loginTitle}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".06em", color: "var(--mut)" }}>
                EMAIL
              </span>
              <input type="email" required={true} value={v.loginEmail ?? ''} onChange={v.onLoginEmail} placeholder="you@lettuboost.com" style={{ border: "0", borderRadius: "13px", background: "var(--tint)", fontSize: "13.5px", fontWeight: "600", padding: "13px 15px", color: "var(--ink)" }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: ".06em", color: "var(--mut)" }}>
                PASSWORD
              </span>
              <input type="password" required={true} value={v.loginPassword ?? ''} onChange={v.onLoginPassword} placeholder="••••••••" style={{ border: "0", borderRadius: "13px", background: "var(--tint)", fontSize: "13.5px", fontWeight: "600", padding: "13px 15px", color: "var(--ink)" }} />
            </label>
          </div>
          {v.loginError ? (
            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "var(--warn)", background: "#fdf3e0", borderRadius: "12px", padding: "9px 12px" }}>
              {v.loginError}
            </span>
          ) : null}
          {v.loginInfo ? (
            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#0a5c2f", background: "var(--tint)", borderRadius: "12px", padding: "9px 12px" }}>
              {v.loginInfo}
            </span>
          ) : null}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "11.5px", color: "var(--mut)", cursor: "pointer" }}>
              <input type="checkbox" checked={!!v.rememberMe} onChange={v.onRemember} style={{ width: "15px", height: "15px", accentColor: "var(--g)" }} />
              {" Remember me "}
            </label>
            <button type="button" onClick={v.onForgot} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", padding: "0" }}>
              Forgot password?
            </button>
          </div>
          <button type="submit" disabled={!!v.loginBusy} style={{ opacity: v.loginBusyOp, border: "0", borderRadius: "14px", background: "var(--lime)", color: "var(--ink)", fontSize: "13px", fontWeight: "800", letterSpacing: ".04em", padding: "15px", cursor: "pointer", transition: "transform .14s ease" }} className="hv7">
            {v.loginCta}
          </button>
          {v.showSignup ? (
            <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", textAlign: "center", lineHeight: "1.5" }}>
              {v.loginSwitchText}{" "}
              <button type="button" onClick={v.toggleLoginMode} style={{ border: "0", background: "none", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", cursor: "pointer", padding: "0" }}>
                {v.loginSwitchLabel}
              </button>
            </p>
          ) : null}
          <p style={{ margin: "0", fontSize: "11.5px", color: "var(--mut)", textAlign: "center", lineHeight: "1.5" }}>
            {v.loginHint}
          </p>
        </form>
      </div>
    </div>
  );
}
