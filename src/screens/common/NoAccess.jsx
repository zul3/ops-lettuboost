export default function NoAccess({ v }) {
  return (
    <section data-screen-label="No access" style={{ background: "#ffffff", borderRadius: "22px", padding: "34px", maxWidth: "520px", boxShadow: "var(--sh)", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ margin: "0", fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
        No modules for this account
      </h2>
      <p style={{ margin: "0", fontSize: "12.5px", color: "var(--mut)", lineHeight: "1.6" }}>
        A system admin hasn't given this account access to any module yet. Ask them to switch one on under System admin → Module access.
      </p>
    </section>
  );
}
