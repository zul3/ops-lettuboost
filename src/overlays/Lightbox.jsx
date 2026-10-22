export default function Lightbox({ v }) {
  return (
    <div onClick={v.closeLb} style={{ position: "fixed", inset: "0", zIndex: "85", background: "rgba(8,20,14,.88)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "28px", animation: "om-in .2s ease both" }}>
      <img src={v.lb.url} alt={v.lb.name} onClick={v.stop} style={{ maxWidth: "100%", maxHeight: "calc(100% - 44px)", borderRadius: "14px", background: "#ffffff", display: "block" }} />
      <span style={{ color: "#ffffff", fontSize: "12.5px", fontWeight: "600" }}>
        {v.lb.name}{" · click anywhere to close"}
      </span>
    </div>
  );
}
