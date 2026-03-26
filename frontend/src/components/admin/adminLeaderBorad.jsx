// frontend/src/components/admin/AdminLeaderboard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const MEDAL = ["🥇", "🥈", "🥉"];
const BAR_COLORS = ["#f97316", "#fb923c", "#fdba74", "#60a5fa", "#34d399"];

export default function AdminLeaderboard({ users }) {
  const unique = Object.values(users.reduce((acc, u) => { acc[u._id] = u; return acc; }, {}));
  const sorted = [...unique].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0)).slice(0, 20);
  const top5   = sorted.slice(0, 5).map((u) => ({ name: u.username?.slice(0, 10), points: u.totalPoints || 0 }));

  const podiumOrder =
    sorted.length === 0 ? [] :
    sorted.length === 1 ? [null, sorted[0], null] :
    sorted.length === 2 ? [sorted[1], sorted[0], null] :
    [sorted[1], sorted[0], sorted[2]];

  const podiumStyles = [
    { height: "pt-6",  bg: "bg-gray-100 border-gray-200",   textColor: "text-gray-700", rank: 2 },
    { height: "pt-0",  bg: "bg-orange-500 border-orange-400", textColor: "text-white",   rank: 1 },
    { height: "pt-10", bg: "bg-amber-100 border-amber-200",  textColor: "text-amber-800", rank: 3 },
  ];

  const goalColor = (goal) => {
    if (goal === "weight_loss") return "bg-rose-100 text-rose-700 ring-1 ring-rose-200";
    if (goal === "weight_gain") return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
    if (goal === "maintain")    return "bg-green-100 text-green-700 ring-1 ring-green-200";
    return "bg-gray-100 text-gray-500 ring-1 ring-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Podium */}
      {sorted.length >= 1 && (
        <div className="grid grid-cols-3 gap-4">
          {podiumOrder.map((u, idx) => {
            const style = podiumStyles[idx];
            if (!u) return <div key={idx} />;
            return (
              <div key={u._id} className={`${style.height} flex flex-col items-center`}>
                <div className={`w-full rounded-2xl border ${style.bg} p-4 shadow-sm text-center`}>
                  <div className="text-2xl mb-2">{MEDAL[style.rank - 1]}</div>
                  <div className={`w-10 h-10 rounded-full ${style.rank === 1 ? "bg-white/20" : "bg-orange-100"} flex items-center justify-center font-bold text-lg mx-auto mb-2 ${style.rank === 1 ? "text-white" : "text-orange-600"}`}>
                    {u.username?.[0]?.toUpperCase()}
                  </div>
                  <p className={`font-bold text-sm truncate ${style.textColor}`}>{u.username}</p>
                  <p className={`text-xs mt-0.5 ${style.rank === 1 ? "text-white/80" : "text-gray-500"}`}>{(u.totalPoints || 0).toLocaleString()} pts</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bar Chart */}
      {top5.length > 0 && (
        <div className="rounded-2xl bg-white border border-orange-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Top 5 Points Comparison</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={top5} barSize={36}>
              <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #fed7aa", borderRadius: 10, fontSize: 12, color: "#374151" }} />
              <Bar dataKey="points" name="Points" radius={[6, 6, 0, 0]}>
                {top5.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-orange-100">
          <h3 className="text-sm font-bold text-gray-700">
            Full Leaderboard — Top 20
            <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">{sorted.length} users</span>
          </h3>
        </div>
        {sorted.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No data yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-50/60">
                  {["Rank", "User", "Goal", "Streak 🔥", "Points ⭐"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {sorted.map((u, i) => (
                  <tr key={u._id} className={`hover:bg-orange-50/40 transition-colors ${i < 3 ? "bg-orange-50/20" : ""}`}>
                    <td className="px-4 py-3">
                      <span className={`text-lg font-black ${i < 3 ? "text-orange-500" : "text-gray-300"}`}>{MEDAL[i] || `#${i + 1}`}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {u.username?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">{u.username}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${goalColor(u.goal)}`}>
                        {u.goal ? u.goal.replace("_", " ") : "not set"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-700">{u.streak || 0}</td>
                    <td className="px-4 py-3">
                      <span className="text-xl font-black text-orange-500">{(u.totalPoints || 0).toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}