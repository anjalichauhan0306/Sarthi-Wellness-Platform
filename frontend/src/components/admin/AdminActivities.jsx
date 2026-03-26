// frontend/src/components/admin/AdminActivities.jsx
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TYPE_CONFIG = {
  soul:       { color: "emerald", hex: "#10b981", label: "Soul 🧘",        bg: "bg-emerald-100", text: "text-emerald-700", ring: "ring-emerald-200" },
  body:       { color: "blue",    hex: "#3b82f6", label: "Body 💪",        bg: "bg-blue-100",    text: "text-blue-700",    ring: "ring-blue-200"    },
  mind:       { color: "rose",    hex: "#f43f5e", label: "Mind 🧠",        bg: "bg-rose-100",    text: "text-rose-700",    ring: "ring-rose-200"    },
  meditation: { color: "amber",   hex: "#f59e0b", label: "Meditation 🌿",  bg: "bg-amber-100",   text: "text-amber-700",   ring: "ring-amber-200"   },
};

export default function AdminActivities({ activities, users }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const userMap = Object.fromEntries(users.map((u) => [u._id, u]));

  const filtered = activities
    .filter((a) => typeFilter === "all" || a.activityType === typeFilter)
    .filter((a) => {
      if (!search) return true;
      const u = userMap[a.userId];
      return u?.username?.toLowerCase().includes(search.toLowerCase()) || u?.email?.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));

  const typeCounts = Object.fromEntries(
    Object.keys(TYPE_CONFIG).map((k) => [k, activities.filter((a) => a.activityType === k).length])
  );

  const trend = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const ds = d.toISOString().split("T")[0];
    return { day: d.toLocaleDateString("en", { month: "short", day: "numeric" }), count: activities.filter((a) => a.date === ds).length };
  });

  return (
    <div className="space-y-6">
      {/* Type stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
          <button key={key} onClick={() => setTypeFilter(typeFilter === key ? "all" : key)}
            className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 shadow-sm ${
              typeFilter === key ? `border-orange-300 bg-orange-50` : "border-orange-100 bg-white hover:bg-orange-50"
            }`}>
            <p className="text-xs text-gray-500 mb-2">{cfg.label}</p>
            <p className="text-3xl font-black" style={{ color: cfg.hex }}>{typeCounts[key]}</p>
            <p className="text-xs text-gray-400 mt-1">activities</p>
          </button>
        ))}
      </div>

      {/* Trend chart */}
      <div className="rounded-2xl bg-white border border-orange-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Activity Trend — Last 14 Days</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={trend}>
            <CartesianGrid stroke="#fff7ed" />
            <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #fed7aa", borderRadius: 10, fontSize: 12, color: "#374151" }} />
            <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", r: 3 }} name="Activities" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-orange-100">
          <h3 className="text-sm font-bold text-gray-700">
            Activity Logs
            <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">{filtered.length}</span>
          </h3>
          <div className="flex items-center gap-3">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-gray-600 text-xs outline-none cursor-pointer focus:border-orange-400">
              <option value="all">All Types</option>
              {Object.entries(TYPE_CONFIG).map(([k, c]) => <option key={k} value={k}>{c.label}</option>)}
            </select>
            <input className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-gray-600 text-xs placeholder-gray-400 outline-none focus:border-orange-400 w-40 transition-colors"
              placeholder="Search user…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No activities found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-50/60">
                  {["User", "Type", "Points", "Date", "Content ID"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {filtered.slice(0, 100).map((a) => {
                  const u = userMap[a.userId];
                  const cfg = TYPE_CONFIG[a.activityType];
                  return (
                    <tr key={a._id} className="hover:bg-orange-50/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {u?.username?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="text-gray-700">{u?.username || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${cfg ? `${cfg.bg} ${cfg.text} ${cfg.ring}` : "bg-gray-100 text-gray-600 ring-gray-200"}`}>
                          {a.activityType}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-orange-500">+{a.points}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{a.date}</td>
                      <td className="px-4 py-3 text-xs text-gray-300 font-mono">{a.contentId || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length > 100 && (
              <div className="px-5 py-3 text-xs text-gray-400 border-t border-orange-50">Showing first 100 of {filtered.length} records</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}