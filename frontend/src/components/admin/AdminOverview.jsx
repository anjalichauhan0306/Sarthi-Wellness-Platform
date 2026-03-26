// frontend/src/components/admin/AdminOverview.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const GOAL_COLORS = ["#f97316", "#fb923c", "#fdba74", "#d1d5db"];
const TYPE_COLORS = { soul: "#10b981", body: "#3b82f6", mind: "#f43f5e", meditation: "#f59e0b" };

export default function AdminOverview({ users, activities }) {
  const totalUsers    = users.length;
  const profileComplete = users.filter((u) => u.isProfileComplete).length;
  const totalPoints   = users.reduce((s, u) => s + (u.totalPoints || 0), 0);
  const todayStr      = new Date().toISOString().split("T")[0];
  const activeToday   = new Set(activities.filter((a) => a.date === todayStr).map((a) => a.userId)).size;

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split("T")[0];
    return { day: d.toLocaleDateString("en", { weekday: "short" }), count: activities.filter((a) => a.date === ds).length };
  });

  const goalData = [
    { name: "Weight Loss", value: users.filter((u) => u.goal === "weight_loss").length },
    { name: "Weight Gain", value: users.filter((u) => u.goal === "weight_gain").length },
    { name: "Maintain",    value: users.filter((u) => u.goal === "maintain").length    },
    { name: "Not Set",     value: users.filter((u) => !u.goal).length                 },
  ].filter((d) => d.value > 0);

  const byType = { soul: 0, body: 0, mind: 0, meditation: 0 };
  activities.forEach((a) => { if (a.activityType in byType) byType[a.activityType]++; });

  const stats = [
    { label: "Total Users",      value: totalUsers,                   icon: "👥", accent: "bg-orange-500" },
    { label: "Active Today",     value: activeToday,                  icon: "⚡", accent: "bg-amber-500"  },
    { label: "Profile Complete", value: profileComplete,              icon: "✅", accent: "bg-green-500"  },
    { label: "Total Points",     value: totalPoints.toLocaleString(), icon: "🌟", accent: "bg-rose-500"   },
  ];

  const typeCards = [
    { key: "soul",       label: "Soul 🧘",       color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200" },
    { key: "body",       label: "Body 💪",       color: "text-blue-600",    bg: "bg-blue-50",     border: "border-blue-200"    },
    { key: "mind",       label: "Mind 🧠",       color: "text-rose-600",    bg: "bg-rose-50",     border: "border-rose-200"    },
    { key: "meditation", label: "Meditation 🌿", color: "text-amber-600",   bg: "bg-amber-50",    border: "border-amber-200"   },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-orange-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">{s.label}</span>
              <span className={`w-8 h-8 ${s.accent} rounded-xl flex items-center justify-center text-sm`}>{s.icon}</span>
            </div>
            <div className="text-3xl font-black text-gray-800">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white border border-orange-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Activity — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={last7} barSize={28}>
              <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #fed7aa", borderRadius: 10, fontSize: 12, color: "#374151" }} cursor={{ fill: "rgba(249,115,22,0.05)" }} />
              <Bar dataKey="count" name="Activities" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white border border-orange-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">User Goals Distribution</h3>
          {goalData.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={goalData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {goalData.map((_, i) => <Cell key={i} fill={GOAL_COLORS[i % GOAL_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #fed7aa", borderRadius: 10, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#6b7280" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">No goal data yet</div>
          )}
        </div>
      </div>

      {/* Activity Type Breakdown */}
      <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-orange-100">
          <h3 className="text-sm font-bold text-gray-700">Activity Type Breakdown</h3>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 divide-x divide-y xl:divide-y-0 divide-orange-100">
          {typeCards.map((t) => (
            <div key={t.key} className={`p-6 ${t.bg}`}>
              <p className="text-xs text-gray-500 mb-2">{t.label}</p>
              <p className={`text-4xl font-black ${t.color}`}>{byType[t.key]}</p>
              <p className="text-xs text-gray-400 mt-1">total logs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}