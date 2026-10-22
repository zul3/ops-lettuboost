import Icon from '../components/Icon.jsx';
import logoMark from '../assets/logo-mark.png';
import Dashboard from '../screens/payments/Dashboard.jsx';
import NewRequest from '../screens/payments/NewRequest.jsx';
import Approvals from '../screens/payments/Approvals.jsx';
import FounderApproval from '../screens/payments/FounderApproval.jsx';
import TasksAndRates from '../screens/payments/TasksAndRates.jsx';
import Payslips from '../screens/payments/Payslips.jsx';
import Employees from '../screens/payments/Employees.jsx';
import History from '../screens/payments/History.jsx';
import Notifications from '../screens/payments/Notifications.jsx';
import NoAccess from '../screens/common/NoAccess.jsx';
import ClaimsOverview from '../screens/claims/ClaimsOverview.jsx';
import NewClaim from '../screens/claims/NewClaim.jsx';
import MyClaims from '../screens/claims/MyClaims.jsx';
import ClaimReview from '../screens/claims/ClaimReview.jsx';
import ReportsDashboard from '../screens/reports/ReportsDashboard.jsx';
import NewReport from '../screens/reports/NewReport.jsx';
import AllReports from '../screens/reports/AllReports.jsx';
import PrintAndExport from '../screens/reports/PrintAndExport.jsx';
import AdminUsers from '../screens/admin/AdminUsers.jsx';
import ModuleAccess from '../screens/admin/ModuleAccess.jsx';
import ActivityLog from '../screens/admin/ActivityLog.jsx';
import MyAccount from '../screens/common/MyAccount.jsx';
import StaffDirectory from '../screens/hr/StaffDirectory.jsx';
import StaffProfileForm from '../screens/hr/StaffProfileForm.jsx';
import StockDashboard from '../screens/stock/StockDashboard.jsx';
import StockItems from '../screens/stock/StockItems.jsx';
import StockMovements from '../screens/stock/StockMovements.jsx';
import SalesDashboard from '../screens/sales/SalesDashboard.jsx';
import Documents from '../screens/sales/Documents.jsx';
import NewDocument from '../screens/sales/NewDocument.jsx';
import Document from '../screens/sales/Document.jsx';
import Customers from '../screens/sales/Customers.jsx';
import PurchasingDashboard from '../screens/purchasing/PurchasingDashboard.jsx';
import Orders from '../screens/purchasing/Orders.jsx';
import NewPurchaseOrder from '../screens/purchasing/NewPurchaseOrder.jsx';
import Suppliers from '../screens/purchasing/Suppliers.jsx';
import TaskBoard from '../screens/tasks/TaskBoard.jsx';
import TaskList from '../screens/tasks/TaskList.jsx';
import Projects from '../screens/plan/Projects.jsx';
import GanttChart from '../screens/plan/GanttChart.jsx';
import Settings from '../screens/payments/Settings.jsx';
import StatutoryModal from '../overlays/StatutoryModal.jsx';
import UomModal from '../overlays/UomModal.jsx';
import TaskModal from '../overlays/TaskModal.jsx';
import ProjectModal from '../overlays/ProjectModal.jsx';
import PurchaseOrderDrawer from '../overlays/PurchaseOrderDrawer.jsx';
import HrDrawer from '../overlays/HrDrawer.jsx';
import StockItemModal from '../overlays/StockItemModal.jsx';
import StockMoveModal from '../overlays/StockMoveModal.jsx';
import ClaimDrawer from '../overlays/ClaimDrawer.jsx';
import ReportDrawer from '../overlays/ReportDrawer.jsx';
import Lightbox from '../overlays/Lightbox.jsx';
import RequestDrawer from '../overlays/RequestDrawer.jsx';
import Login from '../overlays/Login.jsx';
import Toast from '../overlays/Toast.jsx';
import Splash from '../overlays/Splash.jsx';

export default function Shell({ v }) {
  return (
    <div ref={v.rootRef} style={{ "--ink": "#12241a", "--g": "#097c3e", "--g2": "#0b9c4e", "--lime": "#80cc28", "--mut": "#6b7f71", "--ground": "#f4f7f1", "--tint": "#edf5e8", "--wash": "#f7faf4", "--warn": "#8a5a00", "--sh": "0 1px 2px rgba(12,36,24,.05), 0 14px 34px -22px rgba(12,36,24,.45)", display: "flex", alignItems: "stretch", minHeight: "100vh", background: "var(--ground)", color: "var(--ink)", fontFamily: "'Archivo', system-ui, sans-serif" }}>
      {v.authed ? (
        <>
          <aside id="app-side" data-np="" onMouseEnter={v.navEnter} onMouseLeave={v.navLeave} style={{ flex: "0 0 auto", width: v.sideW, position: "sticky", top: "0", alignSelf: "flex-start", height: "100vh", overflow: "hidden", transition: "width .3s cubic-bezier(.2,.8,.2,1)" }}>
            {v.navHoverMode ? (
              <button type="button" onClick={v.navToggle} title="Menu" style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "20px", border: "0", background: "transparent", cursor: "pointer", padding: "0", zIndex: "2" }}>
                <span style={{ position: "absolute", left: "6px", top: "50%", marginTop: "-26px", width: "5px", height: "52px", borderRadius: "999px", background: "var(--lime)", display: "block" }} />
              </button>
            ) : null}
            <div style={{ width: "248px", height: "100vh", padding: "16px 14px", overflowY: "auto" }}>
              <div style={{ background: "var(--g)", borderRadius: "24px", minHeight: "calc(100vh - 32px)", padding: "22px 16px 26px", display: "flex", flexDirection: "column", gap: "26px", boxShadow: "0 20px 44px -28px rgba(9,124,62,.9)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
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
                <button type="button" onClick={v.notifItem.go} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left", border: "0", borderRadius: "12px", background: v.notifItem.bg, color: "#ffffff", fontSize: "12.5px", fontWeight: "700", padding: "11px 14px", cursor: "pointer", marginTop: "-8px" }} className="hv1">
                  <Icon name="bell" width="18" height="18" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                  <span style={{ flex: "1" }}>
                    Notifications
                  </span>
                  {v.notifItem.badge ? (
                    <span style={{ fontSize: "10px", fontWeight: "800", background: "var(--lime)", color: "var(--ink)", borderRadius: "999px", padding: "1px 7px" }}>
                      {v.notifItem.badge}
                    </span>
                  ) : null}
                </button>
                <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {(v.navGroups || []).map((grp, i_grp) => (
                    <div key={i_grp} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <button type="button" onClick={grp.toggle} style={{ display: "flex", alignItems: "center", gap: "9px", width: "100%", textAlign: "left", border: "0", borderRadius: "12px", background: grp.headBg, color: "#ffffff", fontSize: "9px", fontWeight: "700", letterSpacing: ".18em", padding: "9px 12px", cursor: "pointer", transition: "background .18s ease" }} className="hv2">
                        <span style={{ flex: "1", minWidth: "0" }}>
                          {grp.title}
                        </span>
                        {grp.count ? (
                          <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "0", background: "var(--lime)", color: "var(--ink)", borderRadius: "999px", padding: "1px 7px" }}>
                            {grp.count}
                          </span>
                        ) : null}
                        <span style={{ width: "9px", height: "9px", flex: "0 0 9px", display: "block", transform: grp.caret, transition: "transform .22s cubic-bezier(.2,.8,.2,1)" }}>
                          <svg viewBox="0 0 10 6" width="9" height="6" fill="none" style={{ display: "block" }}>
                            <path d="M1 1.2 5 4.8 9 1.2" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                      {grp.open ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", paddingTop: "2px", animation: "om-rise .22s cubic-bezier(.2,.8,.2,1) both" }}>
                          {(grp.items || []).map((it, i_it) => (
                            <button key={i_it} type="button" onClick={it.go} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left", border: "0", borderRadius: "12px", background: it.bg, color: it.fg, fontSize: "12.5px", fontWeight: it.fw, letterSpacing: ".01em", padding: "10px 12px 10px 16px", cursor: "pointer", transition: "background .18s ease, color .18s ease" }} className="hv3">
                              <Icon name={it.icon} width="18" height="18" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                              <span style={{ flex: "1", minWidth: "0" }}>
                                {it.label}
                              </span>
                              {it.badge ? (
                                <span style={{ fontSize: "10px", fontWeight: "800", background: "var(--lime)", color: "var(--ink)", borderRadius: "999px", padding: "1px 7px" }}>
                                  {it.badge}
                                </span>
                              ) : null}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {v.showSoon ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <button type="button" onClick={v.toggleSoon} style={{ display: "flex", alignItems: "center", gap: "9px", width: "100%", textAlign: "left", border: "0", borderRadius: "12px", background: v.soonHeadBg, color: "#ffffff", fontSize: "9px", fontWeight: "700", letterSpacing: ".18em", padding: "9px 12px", cursor: "pointer", transition: "background .18s ease" }} className="hv2">
                        <span style={{ flex: "1", minWidth: "0" }}>
                          NEXT MODULES
                        </span>
                        <span style={{ width: "9px", height: "9px", flex: "0 0 9px", display: "block", transform: v.soonCaret, transition: "transform .22s cubic-bezier(.2,.8,.2,1)" }}>
                          <svg viewBox="0 0 10 6" width="9" height="6" fill="none" style={{ display: "block" }}>
                            <path d="M1 1.2 5 4.8 9 1.2" stroke="rgba(255,255,255,.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                      {v.soonOpen ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", paddingTop: "2px", animation: "om-rise .22s cubic-bezier(.2,.8,.2,1) both" }}>
                          {(v.soonItems || []).map((s, i_s) => (
                            <div key={i_s} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px 9px 16px", fontSize: "12.5px", color: "rgba(255,255,255,.46)" }}>
                              <span style={{ width: "6px", height: "6px", flex: "0 0 6px", borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "block" }} />
                              <span style={{ flex: "1" }}>
                                {s.label}
                              </span>
                              <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".1em", background: "rgba(255,255,255,.1)", borderRadius: "999px", padding: "2px 7px" }}>
                                SOON
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </nav>
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,.16)" }}>
                  <button type="button" onClick={v.goAccount} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left", border: "0", borderRadius: "14px", background: "rgba(255,255,255,.1)", color: "#ffffff", padding: "9px 10px", cursor: "pointer" }} className="hv4">
                    {v.meHasPhoto ? (
                      <img src={v.mePhoto} alt="" style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", objectFit: "cover", display: "block" }} />
                    ) : null}
                    {v.meNoPhoto ? (
                      <span style={{ width: "34px", height: "34px", flex: "0 0 34px", borderRadius: "11px", background: "#ffffff", color: "var(--g)", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {v.meInitials}
                      </span>
                    ) : null}
                    <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "12.5px", fontWeight: "800", lineHeight: "1.1" }}>
                        {v.meName}
                      </span>
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,.66)" }}>
                        {v.meRole}
                      </span>
                    </span>
                  </button>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button type="button" onClick={v.goAccount} style={{ flex: "1", border: "0", borderRadius: "12px", background: "rgba(255,255,255,.1)", color: "#ffffff", fontSize: "11.5px", fontWeight: "700", padding: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Settings" className="hv1">
                      <Icon name="gear" width="18" height="18" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                    </button>
                    <button type="button" onClick={v.logout} style={{ flex: "1", border: "0", borderRadius: "12px", background: "rgba(255,255,255,.1)", color: "#ffffff", fontSize: "11.5px", fontWeight: "700", padding: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Log out" className="hv5">
                      <Icon name="logout" width="18" height="18" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                    </button>
                  </div>
                  <button type="button" onClick={v.toggleLock} style={{ border: "0", borderRadius: "12px", background: "transparent", color: "rgba(255,255,255,.72)", fontSize: "10px", fontWeight: "700", letterSpacing: ".12em", padding: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title={v.lockLabel} className="hv6">
                    <Icon name={v.lockIcon} width="17" height="17" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
          {v.mobileNavOpen ? <div className="lb-backdrop" onClick={v.navClose} /> : null}
          <main style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", padding: "26px 26px 40px" }}>
            <header id="app-top" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "22px" }}>
              <button type="button" className="lb-burger" onClick={v.navToggle} title="Menu" aria-label="Open menu">
                <Icon name="menu" width="20" height="20" strokeWidth="2" />
              </button>
              <div style={{ flex: "1", minWidth: "200px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".18em", color: "var(--mut)" }}>
                  {v.crumb}
                </span>
                <h1 style={{ margin: "0", fontSize: "27px", fontWeight: "800", letterSpacing: "-.025em", lineHeight: "1.05" }}>
                  {v.pageTitle}
                </h1>
              </div>
              {v.showPersona ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ffffff", borderRadius: "999px", padding: "5px 6px 5px 14px", boxShadow: "var(--sh)" }}>
                  <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: ".14em", color: "var(--mut)" }}>
                    AS
                  </span>
                  <select value={v.meId ?? ''} onChange={v.setMe} style={{ border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--ink)", fontSize: "12px", fontWeight: "700", padding: "9px 14px", cursor: "pointer", appearance: "none" }}>
                    {(v.personaOptions || []).map((p, i_p) => (
                      <option key={i_p} value={p.id ?? ''}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              {v.showInbox ? (
                <button type="button" onClick={v.goNotify} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", borderRadius: "999px", background: "#ffffff", color: "var(--ink)", fontSize: "12px", fontWeight: "700", letterSpacing: ".04em", padding: "12px 16px", cursor: "pointer", boxShadow: "var(--sh)", transition: "transform .14s ease" }} className="hv7">
                  {" INBOX "}
                  <span style={{ minWidth: "22px", textAlign: "center", background: v.inboxBg, color: v.inboxFg, borderRadius: "999px", fontSize: "11px", fontWeight: "800", padding: "2px 6px" }}>
                    {v.inboxCount}
                  </span>
                </button>
              ) : null}
            </header>
            {v.hasSub ? (
              <nav id="app-sub" data-np="" style={{ display: "flex", alignItems: "center", gap: "14px", background: "#ffffff", borderRadius: "20px", padding: "8px 12px 8px 8px", boxShadow: "var(--sh)", margin: "-6px 0 22px", overflowX: "auto" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px", flex: "0 0 auto", background: "var(--g)", color: "#ffffff", borderRadius: "14px", padding: "10px 14px" }}>
                  <Icon name={v.subIcon} width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block", color: "var(--lime)" }} />
                  <span style={{ fontSize: "10.5px", fontWeight: "800", letterSpacing: ".14em" }}>
                    {v.subTitle}
                  </span>
                </span>
                {(v.subGroups || []).map((g, i_g) => (
                  <div key={i_g} style={{ display: "flex", alignItems: "center", gap: "2px", flex: "0 0 auto", paddingLeft: "14px", borderLeft: "1px solid #e6eee2" }}>
                    <span style={{ fontSize: "8.5px", fontWeight: "700", letterSpacing: ".16em", color: "var(--mut)", paddingRight: "8px" }}>
                      {g.label}
                    </span>
                    {(g.items || []).map((it, i_it) => (
                      <button key={i_it} type="button" onClick={it.go} style={{ display: "flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "12px", background: it.bg, color: it.fg, fontSize: "12.5px", fontWeight: it.fw, padding: "9px 13px", cursor: "pointer", whiteSpace: "nowrap", transition: "box-shadow .16s ease" }} className="hv8">
                        <Icon name={it.icon} width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
                        {" "}{it.label}{" "}
                        {it.badge ? (
                          <span style={{ fontSize: "10px", fontWeight: "800", background: "var(--lime)", color: "var(--ink)", borderRadius: "999px", padding: "1px 7px" }}>
                            {it.badge}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            ) : null}
            <div style={{ flex: "1", minWidth: "0" }}>
              {/* DASHBOARD */}
              {v.isDash ? <Dashboard v={v} /> : null}
              {/* NEW REQUEST */}
              {v.isNew ? <NewRequest v={v} /> : null}
              {/* APPROVALS */}
              {v.isApprovals ? <Approvals v={v} /> : null}
              {/* FOUNDER DUAL APPROVAL */}
              {v.isDual ? <FounderApproval v={v} /> : null}
              {/* TASKS & RATES */}
              {v.isTasks ? <TasksAndRates v={v} /> : null}
              {/* PAYSLIPS */}
              {v.isPayslip ? <Payslips v={v} /> : null}
              {/* EMPLOYEES */}
              {v.isEmployees ? <Employees v={v} /> : null}
              {/* HISTORY */}
              {v.isHistory ? <History v={v} /> : null}
              {/* NOTIFICATIONS */}
              {v.isNotify ? <Notifications v={v} /> : null}
              {/* NO ACCESS */}
              {v.isNone ? <NoAccess v={v} /> : null}
              {/* CLAIMS OVERVIEW */}
              {v.isClOverview ? <ClaimsOverview v={v} /> : null}
              {/* NEW CLAIM */}
              {v.isClNew ? <NewClaim v={v} /> : null}
              {/* MY CLAIMS */}
              {v.isClMine ? <MyClaims v={v} /> : null}
              {/* CLAIM REVIEW */}
              {v.isClReview ? <ClaimReview v={v} /> : null}
              {/* REPORTS DASHBOARD */}
              {v.isRpDash ? <ReportsDashboard v={v} /> : null}
              {/* NEW REPORT */}
              {v.isRpNew ? <NewReport v={v} /> : null}
              {/* ALL REPORTS */}
              {v.isRpAll ? <AllReports v={v} /> : null}
              {/* PRINT & EXPORT */}
              {v.isRpExport ? <PrintAndExport v={v} /> : null}
              {/* ADMIN USERS */}
              {v.isAdUsers ? <AdminUsers v={v} /> : null}
              {/* ADMIN MODULE ACCESS */}
              {v.isAdAccess ? <ModuleAccess v={v} /> : null}
              {/* ADMIN LOG */}
              {v.isAdLog ? <ActivityLog v={v} /> : null}
              {/* ACCOUNT */}
              {v.isAccount ? <MyAccount v={v} /> : null}
              {/* HR DIRECTORY */}
              {v.isHrDir ? <StaffDirectory v={v} /> : null}
              {/* HR FORM */}
              {v.isHrForm ? <StaffProfileForm v={v} /> : null}
              {/* STOCK DASHBOARD */}
              {v.isStDash ? <StockDashboard v={v} /> : null}
              {/* STOCK ITEMS */}
              {v.isStItems ? <StockItems v={v} /> : null}
              {/* STOCK MOVEMENTS */}
              {v.isStMove ? <StockMovements v={v} /> : null}
              {v.isSaDash ? <SalesDashboard v={v} /> : null}
              {v.isSaDocs ? <Documents v={v} /> : null}
              {v.isSaNew ? <NewDocument v={v} /> : null}
              {v.isSaView ? <Document v={v} /> : null}
              {v.isSaCust ? <Customers v={v} /> : null}
              {v.isPuDash ? <PurchasingDashboard v={v} /> : null}
              {v.isPuOrders ? <Orders v={v} /> : null}
              {v.isPuNew ? <NewPurchaseOrder v={v} /> : null}
              {v.isPuSup ? <Suppliers v={v} /> : null}
              {v.isTkBoard ? <TaskBoard v={v} /> : null}
              {v.isTkList ? <TaskList v={v} /> : null}
              {v.isPpList ? <Projects v={v} /> : null}
              {v.isPpGantt ? <GanttChart v={v} /> : null}
              {/* SETTINGS */}
              {v.isSettings ? <Settings v={v} /> : null}
            </div>
          </main>
          {/* STATUTORY POPUP */}
          {v.statOpen ? <StatutoryModal v={v} /> : null}
          {/* UoM POPUP */}
          {v.uomOpen ? <UomModal v={v} /> : null}
          {v.hasTf ? <TaskModal v={v} /> : null}
          {v.hasPf ? <ProjectModal v={v} /> : null}
          {v.hasPo ? <PurchaseOrderDrawer v={v} /> : null}
          {/* HR PROFILE DRAWER */}
          {v.hasHr ? <HrDrawer v={v} /> : null}
          {/* STOCK ITEM MODAL */}
          {v.hasItemForm ? <StockItemModal v={v} /> : null}
          {/* STOCK MOVEMENT MODAL */}
          {v.hasMv ? <StockMoveModal v={v} /> : null}
          {/* CLAIM DRAWER */}
          {v.hasClaim ? <ClaimDrawer v={v} /> : null}
          {/* REPORT DRAWER */}
          {v.hasRep ? <ReportDrawer v={v} /> : null}
          {/* LIGHTBOX */}
          {v.hasLb ? <Lightbox v={v} /> : null}
          {/* REQUEST DETAIL DRAWER */}
          {v.hasDetail ? <RequestDrawer v={v} /> : null}
        </>
      ) : null}
      {/* LOGIN */}
      {v.showLogin ? <Login v={v} /> : null}
      {/* TOAST */}
      {v.toast ? <Toast v={v} /> : null}
      {/* SPLASH */}
      {v.splash ? <Splash v={v} /> : null}
    </div>
  );
}
