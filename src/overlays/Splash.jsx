import logoMark from '../assets/logo-mark.png';

export default function Splash({ v }) {
  return (
    <div style={{ position: "fixed", inset: "0", zIndex: "100", background: "#f4f7f1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "22px", animation: "om-splash 2.2s cubic-bezier(.4,0,.2,1) forwards" }}>
      <span style={{ width: "130px", height: "130px", borderRadius: "38px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px -30px rgba(12,36,24,.5)", animation: "om-pop .82s cubic-bezier(.2,.9,.2,1) both" }}>
        <img src={logoMark} alt="LettuBoost" style={{ width: "74px", height: "82px", objectFit: "contain", display: "block" }} />
      </span>
      <div style={{ overflow: "hidden", animation: "om-wipe .7s cubic-bezier(.4,0,.2,1) .5s both" }}>
        <span style={{ fontSize: "26px", fontWeight: "800", letterSpacing: ".14em", color: "#12241a", whiteSpace: "nowrap" }}>
          LETTUBOOST
        </span>
      </div>
      <div style={{ overflow: "hidden", animation: "om-wipe .6s cubic-bezier(.4,0,.2,1) .95s both" }}>
        <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".22em", color: "#097c3e", whiteSpace: "nowrap" }}>
          GROW GREEN. FEED CLEAN. LETTUBOOST IT.
        </span>
      </div>
      <div style={{ width: "130px", height: "4px", borderRadius: "999px", background: "#e4ebdf", marginTop: "6px", overflow: "hidden" }}>
        <div style={{ height: "4px", borderRadius: "999px", background: "#80cc28", transformOrigin: "left", animation: "om-bar 1.5s cubic-bezier(.3,.7,.3,1) .3s both" }} />
      </div>
    </div>
  );
}
