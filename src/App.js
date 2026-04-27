import { useState } from "react";

// Brand colors from An An logo
const C = {
  red: "#D42B2B",
  redLight: "#FEE2E2",
  redMid: "#FECACA",
  navy: "#2D3748",
  navyLight: "#4A5568",
  gray: "#718096",
  grayLight: "#A0AEC0",
  grayBg: "#F7FAFC",
  white: "#FFFFFF",
  green: "#16A34A",
  greenLight: "#DCFCE7",
  greenBg: "#F0FFF4",
  orange: "#E8A838",
  orangeLight: "#FFF8E7",
  purple: "#6B5B95",
  purpleLight: "#EDE9F6",
  border: "#E2E8F0",
  cardBg: "#FFFFFF",
};

// Panda SVG component matching the logo style
const PandaLogo = ({ size = 32 }) => (
  <img src="/logo.png" alt="An An" width={size} height={size} style={{ objectFit: "contain" }} />
);

// Mock data
const residents = [
  { id: 1, name: "李奶奶 (Ms. Li)", building: "Confucius Plaza, Apt 3B", phone: "212-555-0142", lastVisit: "Apr 22", status: "good", notes: "Takes BP medication. Prefers jasmine tea.", alone: true, mobility: "walks with cane" },
  { id: 2, name: "王爷爷 (Mr. Wang)", building: "65 Bayard St, Apt 5A", phone: "212-555-0198", lastVisit: "Apr 20", status: "follow-up", notes: "Mentioned knee pain last visit. Check in on this.", alone: true, mobility: "good" },
  { id: 3, name: "张阿姨 (Ms. Zhang)", building: "Confucius Plaza, Apt 7D", phone: "212-555-0267", lastVisit: "Apr 18", status: "good", notes: "Daughter visits weekends. Likes to chat.", alone: false, mobility: "good" },
  { id: 4, name: "陈爷爷 (Mr. Chen)", building: "Chatham Towers, Apt 2F", phone: "212-555-0334", lastVisit: "Apr 15", status: "urgent", notes: "Fridge was nearly empty last visit. Needs SNAP renewal help.", alone: true, mobility: "wheelchair" },
  { id: 5, name: "刘奶奶 (Ms. Liu)", building: "65 Bayard St, Apt 3C", phone: "212-555-0401", lastVisit: "Apr 23", status: "good", notes: "Very social. Knows all neighbors.", alone: false, mobility: "good" },
  { id: 6, name: "黄爷爷 (Mr. Huang)", building: "Chatham Towers, Apt 8B", phone: "212-555-0488", lastVisit: "Apr 21", status: "good", notes: "Hard of hearing — knock loudly. Likes newspapers.", alone: true, mobility: "walks slowly" },
];

const StatusDot = ({ status }) => {
  const colors = { good: C.green, "follow-up": C.orange, urgent: C.red };
  return (
    <span style={{
      width: 8, height: 8, borderRadius: "50%",
      background: colors[status] || C.gray,
      display: "inline-block", flexShrink: 0,
    }} />
  );
};

const NavBar = ({ active, setScreen, emergency }) => (
  <div style={{
    position: "fixed", bottom: 0, left: 0, right: 0,
    background: C.white, borderTop: `1px solid ${C.border}`,
    display: "flex", justifyContent: "space-around", padding: "6px 0 10px",
    zIndex: 100, maxWidth: 420, margin: "0 auto",
  }}>
    {[
      { id: "home", icon: "⌂", label: "Home" },
      { id: "residents", icon: "♡", label: "Residents" },
      { id: "checkin", icon: "✎", label: "Check-in" },
      { id: "resources", icon: "☰", label: "Resources" },
    ].map(tab => (
      <button key={tab.id} onClick={() => setScreen(tab.id)} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        color: active === tab.id ? C.red : C.grayLight,
        fontSize: 11, fontWeight: active === tab.id ? 600 : 400,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <span style={{ fontSize: 20 }}>{tab.icon}</span>
        {tab.label}
      </button>
    ))}
  </div>
);

// HOME SCREEN
const HomeScreen = ({ setScreen, emergency, setEmergency }) => (
  <div style={{ padding: "20px 16px 80px" }}>
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PandaLogo size={40} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>
            Good morning, Jenny
          </div>
          <div style={{ fontSize: 12, color: C.gray }}>An An Volunteer Hub</div>
        </div>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", background: C.redLight,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, color: C.red, cursor: "pointer",
      }}>J</div>
    </div>

    {/* Emergency Banner */}
    {emergency ? (
      <div onClick={() => setScreen("emergency")} style={{
        background: C.red, borderRadius: 14, padding: "16px 18px", marginBottom: 16,
        cursor: "pointer", animation: "pulse 2s infinite",
      }}>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.85} }`}</style>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>
              ⚠ EMERGENCY ACTIVE
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>
              Blackout — Lower Manhattan
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>
              4 of 6 residents reached · 2 pending
            </div>
          </div>
          <span style={{ fontSize: 22, color: C.white }}>→</span>
        </div>
      </div>
    ) : (
      <div style={{
        background: C.greenBg, borderRadius: 14, padding: "14px 18px", marginBottom: 16,
        border: `1px solid ${C.greenLight}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} />
          <span style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>Normal Mode — No active alerts</span>
        </div>
      </div>
    )}

    {/* Stats Row */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
      {[
        { num: "6", label: "Residents", color: C.navy },
        { num: "4", label: "Visited this cycle", color: C.green },
        { num: "2", label: "Due this week", color: C.orange },
      ].map((s, i) => (
        <div key={i} style={{
          background: C.white, borderRadius: 12, padding: "14px 12px", textAlign: "center",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.num}</div>
          <div style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Next Visit */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 10 }}>Next scheduled visit</div>
      <div onClick={() => setScreen("residents")} style={{
        background: C.white, borderRadius: 12, padding: "14px 16px",
        border: `1px solid ${C.border}`, cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%", background: C.redLight,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: C.red, fontWeight: 600,
          }}>李</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>李奶奶 (Ms. Li)</div>
            <div style={{ fontSize: 11, color: C.gray }}>Confucius Plaza, Apt 3B</div>
          </div>
        </div>
        <div style={{
          background: C.orangeLight, padding: "4px 10px", borderRadius: 8,
          fontSize: 11, fontWeight: 600, color: C.orange,
        }}>Tomorrow</div>
      </div>
    </div>

    {/* Recent Activity */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 10 }}>Recent activity</div>
      {[
        { name: "刘奶奶", action: "Visit completed", time: "Yesterday", color: C.green },
        { name: "李奶奶", action: "Visit completed", time: "Apr 22", color: C.green },
        { name: "黄爷爷", action: "Visit completed", time: "Apr 21", color: C.green },
        { name: "陈爷爷", action: "Flagged — needs SNAP help", time: "Apr 15", color: C.orange },
      ].map((a, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.color }} />
            <span style={{ fontSize: 13, color: C.navy }}>{a.name}</span>
            <span style={{ fontSize: 12, color: C.gray }}>— {a.action}</span>
          </div>
          <span style={{ fontSize: 11, color: C.grayLight }}>{a.time}</span>
        </div>
      ))}
    </div>

    {/* Quick Actions */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      <button onClick={() => setScreen("checkin")} style={{
        background: C.red, border: "none", borderRadius: 12, padding: "14px",
        color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        ✎ Log a visit
      </button>
      <button onClick={() => setEmergency(!emergency)} style={{
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px",
        color: C.navy, fontSize: 13, fontWeight: 600, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {emergency ? "✓ End drill" : "⚡ Simulate emergency"}
      </button>
    </div>
  </div>
);

// RESIDENTS SCREEN
const ResidentsScreen = ({ setScreen, setSelectedResident }) => (
  <div style={{ padding: "20px 16px 80px" }}>
    <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 4 }}>My Residents</div>
    <div style={{ fontSize: 12, color: C.gray, marginBottom: 16 }}>6 residents · Confucius Plaza, Bayard St, Chatham Towers</div>

    {/* Filter tabs */}
    <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
      {["All (6)", "Due (2)", "Follow-up (1)", "Urgent (1)"].map((f, i) => (
        <button key={i} style={{
          background: i === 0 ? C.red : C.white, color: i === 0 ? C.white : C.navy,
          border: `1px solid ${i === 0 ? C.red : C.border}`, borderRadius: 20,
          padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer",
          whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif",
        }}>{f}</button>
      ))}
    </div>

    {/* Resident cards */}
    {residents.map(r => (
      <div key={r.id} onClick={() => { setSelectedResident(r); setScreen("resident-detail"); }} style={{
        background: C.white, borderRadius: 12, padding: "14px 16px", marginBottom: 8,
        border: `1px solid ${r.status === "urgent" ? C.redMid : C.border}`,
        cursor: "pointer",
        borderLeft: `3px solid ${r.status === "urgent" ? C.red : r.status === "follow-up" ? C.orange : C.green}`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: r.status === "urgent" ? C.redLight : r.status === "follow-up" ? C.orangeLight : C.greenLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 600,
              color: r.status === "urgent" ? C.red : r.status === "follow-up" ? C.orange : C.green,
            }}>{r.name[0]}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{r.name}</div>
              <div style={{ fontSize: 11, color: C.gray }}>{r.building}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: C.grayLight }}>Last visit</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>{r.lastVisit}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          {r.alone && <span style={{ fontSize: 10, background: C.redLight, color: C.red, padding: "2px 8px", borderRadius: 6 }}>Lives alone</span>}
          {r.mobility !== "good" && <span style={{ fontSize: 10, background: C.purpleLight, color: C.purple, padding: "2px 8px", borderRadius: 6 }}>{r.mobility}</span>}
          {r.status === "follow-up" && <span style={{ fontSize: 10, background: C.orangeLight, color: C.orange, padding: "2px 8px", borderRadius: 6 }}>Needs follow-up</span>}
          {r.status === "urgent" && <span style={{ fontSize: 10, background: C.redLight, color: C.red, padding: "2px 8px", borderRadius: 6 }}>Urgent</span>}
        </div>
      </div>
    ))}
  </div>
);

// RESIDENT DETAIL SCREEN
const ResidentDetailScreen = ({ resident, setScreen }) => {
  if (!resident) return null;
  return (
    <div style={{ padding: "20px 16px 80px" }}>
      <button onClick={() => setScreen("residents")} style={{
        background: "none", border: "none", color: C.red, fontSize: 13,
        cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "'DM Sans', sans-serif",
      }}>← Back to residents</button>

      {/* Profile header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: C.redLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, fontWeight: 700, color: C.red, margin: "0 auto 10px",
        }}>{resident.name[0]}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.navy }}>{resident.name}</div>
        <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{resident.building}</div>
      </div>

      {/* Info cards */}
      {[
        { label: "Phone (landline)", value: resident.phone, icon: "📞" },
        { label: "Living situation", value: resident.alone ? "Lives alone" : "Lives with family", icon: "🏠" },
        { label: "Mobility", value: resident.mobility, icon: "🚶" },
        { label: "Last visit", value: resident.lastVisit, icon: "📅" },
      ].map((info, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
          background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 6,
        }}>
          <span style={{ fontSize: 18 }}>{info.icon}</span>
          <div>
            <div style={{ fontSize: 10, color: C.grayLight }}>{info.label}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>{info.value}</div>
          </div>
        </div>
      ))}

      {/* Notes */}
      <div style={{
        background: C.orangeLight, borderRadius: 10, padding: "12px 14px", marginTop: 12,
        border: `1px solid ${C.orange}33`,
      }}>
        <div style={{ fontSize: 10, color: C.orange, fontWeight: 600, marginBottom: 4 }}>VOLUNTEER NOTES</div>
        <div style={{ fontSize: 13, color: C.navy, lineHeight: 1.5 }}>{resident.notes}</div>
      </div>

      {/* Visit history */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Visit history</div>
        {[
          { date: resident.lastVisit, note: "Regular check-in. All good.", status: "good" },
          { date: "Apr 8", note: "Helped translate medical letter.", status: "good" },
          { date: "Mar 25", note: "First home visit. Tea together.", status: "good" },
        ].map((v, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, padding: "8px 0",
            borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
          }}>
            <StatusDot status={v.status} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.navy }}>{v.date}</div>
              <div style={{ fontSize: 11, color: C.gray }}>{v.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
        <button style={{
          background: C.red, border: "none", borderRadius: 10, padding: "12px",
          color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>📞 Call</button>
        <button onClick={() => setScreen("checkin")} style={{
          background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px",
          color: C.navy, fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>✎ Log visit</button>
      </div>
    </div>
  );
};

// CHECK-IN SCREEN
const CheckInScreen = ({ setScreen }) => {
  const [selected, setSelected] = useState(null);
  const [condition, setCondition] = useState(null);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ padding: "20px 16px 80px", textAlign: "center", paddingTop: 80 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Visit logged</div>
      <div style={{ fontSize: 13, color: C.gray, marginBottom: 24 }}>Thank you for checking in on your resident.</div>
      <button onClick={() => { setSubmitted(false); setSelected(null); setCondition(null); setNotes(""); }} style={{
        background: C.red, border: "none", borderRadius: 10, padding: "12px 24px",
        color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
      }}>Log another visit</button>
    </div>
  );

  return (
    <div style={{ padding: "20px 16px 80px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 4 }}>Log a Visit</div>
      <div style={{ fontSize: 12, color: C.gray, marginBottom: 20 }}>Record your check-in with a resident</div>

      {/* Select resident */}
      <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Who did you visit?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        {residents.map(r => (
          <button key={r.id} onClick={() => setSelected(r.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
            background: selected === r.id ? C.redLight : C.white,
            border: `1px solid ${selected === r.id ? C.red : C.border}`,
            borderRadius: 10, cursor: "pointer", textAlign: "left",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${selected === r.id ? C.red : C.grayLight}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {selected === r.id && <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />}
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>{r.name}</div>
              <div style={{ fontSize: 10, color: C.gray }}>{r.building}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Condition */}
      <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 8 }}>How are they doing?</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 20 }}>
        {[
          { id: "good", label: "Good", color: C.green, bg: C.greenLight },
          { id: "follow-up", label: "Needs follow-up", color: C.orange, bg: C.orangeLight },
          { id: "urgent", label: "Urgent", color: C.red, bg: C.redLight },
        ].map(c => (
          <button key={c.id} onClick={() => setCondition(c.id)} style={{
            background: condition === c.id ? c.bg : C.white,
            border: `1px solid ${condition === c.id ? c.color : C.border}`,
            borderRadius: 10, padding: "12px 8px", cursor: "pointer", textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <StatusDot status={c.id} />
            <div style={{ fontSize: 11, fontWeight: 500, color: c.color, marginTop: 4 }}>{c.label}</div>
          </button>
        ))}
      </div>

      {/* Notes */}
      <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Notes (optional)</div>
      <textarea value={notes} onChange={e => setNotes(e.target.value)}
        placeholder="Anything to remember for next time..."
        style={{
          width: "100%", minHeight: 80, borderRadius: 10, border: `1px solid ${C.border}`,
          padding: "10px 14px", fontSize: 13, color: C.navy, resize: "vertical",
          fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box", outline: "none",
        }}
      />

      <button onClick={() => selected && condition && setSubmitted(true)} style={{
        width: "100%", background: selected && condition ? C.red : C.grayLight,
        border: "none", borderRadius: 10, padding: "14px", marginTop: 16,
        color: C.white, fontSize: 14, fontWeight: 600, cursor: selected && condition ? "pointer" : "not-allowed",
        fontFamily: "'DM Sans', sans-serif",
      }}>Submit visit log</button>
    </div>
  );
};

// EMERGENCY SCREEN
const EmergencyScreen = ({ setScreen }) => {
  const [statuses, setStatuses] = useState({
    1: "pending", 2: "pending", 3: "reached", 4: "pending", 5: "reached", 6: "reached"
  });

  const updateStatus = (id, status) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
  };

  const reached = Object.values(statuses).filter(s => s === "reached").length;
  const pending = Object.values(statuses).filter(s => s === "pending").length;
  const noAnswer = Object.values(statuses).filter(s => s === "no-answer").length;

  // Sort: pending first, then no-answer, then reached
  const priority = { "pending": 0, "no-answer": 1, "reached": 2 };
  const sorted = [...residents].sort((a, b) => {
    const diff = priority[statuses[a.id]] - priority[statuses[b.id]];
    if (diff !== 0) return diff;
    if (a.alone && !b.alone) return -1;
    if (!a.alone && b.alone) return 1;
    return 0;
  });

  return (
    <div style={{ padding: "0 0 80px" }}>
      {/* Red header */}
      <div style={{ background: C.red, padding: "20px 16px 16px" }}>
        <button onClick={() => setScreen("home")} style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.8)",
          fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}>← Back to home</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{
            width: 10, height: 10, borderRadius: "50%", background: C.white,
            boxShadow: "0 0 8px rgba(255,255,255,0.6)",
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: 0.5 }}>
            EMERGENCY ACTIVE
          </span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4 }}>
          Blackout — Lower Manhattan
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
          Activated 45 min ago by An An Coordinator
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.white }}>{reached}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Reached</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.white }}>{pending}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Pending</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.white }}>{noAnswer}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>No answer</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        margin: "12px 16px", padding: "10px 14px", background: C.orangeLight,
        borderRadius: 10, border: `1px solid ${C.orange}33`,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.orange }}>Your instructions:</div>
        <div style={{ fontSize: 12, color: C.navy, marginTop: 2 }}>
          Call each resident. If no answer, go in person. Report status after each contact.
        </div>
      </div>

      {/* Resident list */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, margin: "12px 0 8px" }}>
          Your residents — sorted by priority
        </div>
        {sorted.map(r => (
          <div key={r.id} style={{
            background: C.white, borderRadius: 12, padding: "12px 14px", marginBottom: 8,
            border: `1px solid ${statuses[r.id] === "pending" ? C.redMid : statuses[r.id] === "no-answer" ? C.orange : C.border}`,
            opacity: statuses[r.id] === "reached" ? 0.6 : 1,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{r.name}</div>
                <div style={{ fontSize: 11, color: C.gray }}>{r.building} · {r.phone}</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {r.alone && <span style={{ fontSize: 9, background: C.redLight, color: C.red, padding: "2px 6px", borderRadius: 4 }}>Alone</span>}
              </div>
            </div>
            {statuses[r.id] !== "reached" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                <button onClick={() => updateStatus(r.id, "reached")} style={{
                  background: C.greenLight, border: `1px solid ${C.green}44`, borderRadius: 8,
                  padding: "8px 4px", fontSize: 10, fontWeight: 600, color: C.green, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>✓ Reached</button>
                <button onClick={() => updateStatus(r.id, "no-answer")} style={{
                  background: C.orangeLight, border: `1px solid ${C.orange}44`, borderRadius: 8,
                  padding: "8px 4px", fontSize: 10, fontWeight: 600, color: C.orange, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>✗ No answer</button>
                <button style={{
                  background: C.white, border: `1px solid ${C.border}`, borderRadius: 8,
                  padding: "8px 4px", fontSize: 10, fontWeight: 600, color: C.navy, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}>📞 Call</button>
              </div>
            ) : (
              <div style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>✓ Reached and safe</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// RESOURCES SCREEN
const ResourcesScreen = () => (
  <div style={{ padding: "20px 16px 80px" }}>
    <div style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 4 }}>Resources</div>
    <div style={{ fontSize: 12, color: C.gray, marginBottom: 20 }}>Training materials and reference guides</div>

    {[
      { icon: "🐼", title: "Life Card Reference", sub: "Digital copy of the An An Life Card", color: C.red },
      { icon: "📋", title: "FEMA Application Guide", sub: "Step-by-step in Mandarin + English", color: C.navy },
      { icon: "🏥", title: "Emergency Protocols", sub: "What to do for each disaster type", color: C.orange },
      { icon: "🗣️", title: "Key Mandarin Phrases", sub: "Common phrases for check-in visits", color: C.purple },
      { icon: "📍", title: "Shelter Locations", sub: "Nearest shelters with Mandarin-speaking staff", color: C.green },
      { icon: "📞", title: "Important Numbers", sub: "Coordinator, CPC, 311, non-emergency contacts", color: C.navy },
    ].map((r, i) => (
      <div key={i} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
        background: C.white, borderRadius: 12, border: `1px solid ${C.border}`,
        marginBottom: 8, cursor: "pointer",
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, background: `${r.color}10`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
        }}>{r.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{r.title}</div>
          <div style={{ fontSize: 11, color: C.gray }}>{r.sub}</div>
        </div>
        <span style={{ color: C.grayLight, fontSize: 16 }}>→</span>
      </div>
    ))}
  </div>
);

// MAIN APP
export default function AnAnApp() {
  const [screen, setScreen] = useState("home");
  const [emergency, setEmergency] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  return (
    <div style={{
      maxWidth: 420, margin: "0 auto", minHeight: "100vh",
      background: C.grayBg, fontFamily: "'DM Sans', sans-serif",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {screen === "home" && <HomeScreen setScreen={setScreen} emergency={emergency} setEmergency={setEmergency} />}
      {screen === "residents" && <ResidentsScreen setScreen={setScreen} setSelectedResident={setSelectedResident} />}
      {screen === "resident-detail" && <ResidentDetailScreen resident={selectedResident} setScreen={setScreen} />}
      {screen === "checkin" && <CheckInScreen setScreen={setScreen} />}
      {screen === "emergency" && <EmergencyScreen setScreen={setScreen} />}
      {screen === "resources" && <ResourcesScreen />}

      <NavBar active={screen === "emergency" ? "home" : screen === "resident-detail" ? "residents" : screen} setScreen={setScreen} emergency={emergency} />
    </div>
  );
}
