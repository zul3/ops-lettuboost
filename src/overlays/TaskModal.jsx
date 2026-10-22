import Icon from '../components/Icon.jsx';

export default function TaskModal({ v }) {
  return (
    <div className="lb-sheet" onClick={v.tfCancel} style={{ position: "fixed", inset: "0", background: "rgba(12,36,24,.4)", zIndex: "70", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "om-in .2s ease both" }}>
      <div onClick={v.stop} style={{ width: "min(560px, 100%)", maxHeight: "100%", overflowY: "auto", background: "var(--ground)", borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 30px 70px -30px rgba(12,36,24,.6)", animation: "om-rise .28s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ flex: "1", fontSize: "19px", fontWeight: "800", letterSpacing: "-.02em" }}>
            {v.tfv.title}
          </span>
          {v.tfv.canDelete ? (
            <button type="button" onClick={v.tfDelete} title="Delete task" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#fdeceb", color: "#b3261e", cursor: "pointer", padding: "0" }}>
              <Icon name="trash" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            </button>
          ) : null}
          <button type="button" onClick={v.tfCancel} title="Close" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", flex: "0 0 36px", border: "0", borderRadius: "12px", background: "#ffffff", color: "var(--ink)", boxShadow: "var(--sh)", cursor: "pointer", padding: "0" }}>
            <Icon name="x" width="16" height="16" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
            TASK
          </label>
          <input type="text" value={v.tf.title ?? ''} onChange={v.tfSetTitle} placeholder="What needs doing" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(170px, 100%), 1fr))", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              PROJECT
            </label>
            <select value={v.tf.projId ?? ''} onChange={v.tfSetProj} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
              {(v.tfProjOpts || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          {v.tfv.canParent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                PARENT TASK
              </label>
              <select value={v.tf.parentId ?? ''} onChange={v.tfSetParent} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                {(v.tfParentOpts || []).map((o, i_o) => (
                  <option key={i_o} value={o.id ?? ''}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              ASSIGNEE
            </label>
            <select value={v.tf.assignee ?? ''} onChange={v.tfSetAssignee} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
              {(v.tfEmpOpts || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              PRIORITY
            </label>
            <select value={v.tf.priority ?? ''} onChange={v.tfSetPrio} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
              {(v.prioOpts || []).map((o, i_o) => (
                <option key={i_o} value={o.id ?? ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              START
            </label>
            <input type="date" value={v.tf.start ?? ''} onChange={v.tfSetStart} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              END
            </label>
            <input type="date" value={v.tf.end ?? ''} onChange={v.tfSetEnd} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13.5px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0" }} />
          </div>
          {v.tfv.canStatus ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
                STATUS
              </label>
              <select value={v.tf.status ?? ''} onChange={v.tfSetStatus} style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", fontWeight: "600", padding: "12px 13px", width: "100%", minWidth: "0", appearance: "none" }}>
                {(v.wStatusOpts || []).map((o, i_o) => (
                  <option key={i_o} value={o.id ?? ''}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        {v.tfv.showProg ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
              {"PROGRESS · "}{v.tf.progress}%
            </label>
            <input type="range" min="0" max="100" step="5" value={v.tf.progress ?? ''} onChange={v.tfSetProg} style={{ width: "100%", accentColor: "var(--g)" }} />
          </div>
        ) : null}
        {v.tfv.hasSubs ? (
          <span style={{ fontSize: "11.5px", color: "var(--mut)", lineHeight: "1.5", display: "flex", gap: "8px", alignItems: "center" }}>
            <Icon name="list" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            Status and progress follow its subtasks.
          </span>
        ) : null}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
          <label style={{ fontSize: "10px", fontWeight: "700", letterSpacing: ".1em", color: "var(--mut)" }}>
            NOTES
          </label>
          <textarea value={v.tf.notes ?? ''} onChange={v.tfSetNotes} rows="3" placeholder="Details, links, blockers" style={{ border: "0", borderRadius: "13px", background: "var(--wash)", fontSize: "13px", padding: "12px 13px", width: "100%", resize: "vertical", lineHeight: "1.5" }} />
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <button type="button" onClick={v.tfSave} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--g)", color: "#ffffff", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
            <Icon name="check" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
            SAVE TASK
          </button>
          {v.tfv.canAddSub ? (
            <button type="button" onClick={v.tfAddSub} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
              <Icon name="plus" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              ADD SUBTASK
            </button>
          ) : null}
          {v.tfv.hasProj ? (
            <button type="button" onClick={v.tfPlan} style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: "0", borderRadius: "999px", background: "var(--tint)", color: "var(--g)", fontSize: "11.5px", fontWeight: "800", letterSpacing: ".06em", padding: "12px 17px", cursor: "pointer" }}>
              <Icon name="gantt" width="15" height="15" strokeWidth="1.9" style={{ flex: "0 0 auto", display: "block" }} />
              SHOW ON GANTT
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
