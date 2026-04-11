// frontend/src/components/admin/AdminWellness.jsx
import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

function WellnessRow({ w, onDelete }) {
  const [open, setOpen] = useState(false);
  const username = w.userId?.username || "Unknown";
  const email    = w.userId?.email    || "";

  return (
    <>
      <tr className="hover:bg-orange-50/40 transition-colors cursor-pointer" onClick={() => setOpen(!open)}>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {username[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-700 text-sm">{username}</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{w.date}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{w.body?.breakfast || "—"}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{w.body?.waterIntake || "—"}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
              className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-500 transition-colors">
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(w._id); }}
              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>

      {open && (
        <tr className="bg-orange-50/30">
          <td colSpan={5} className="px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Body */}
              <div className="bg-white rounded-2xl border border-orange-100 p-4">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">💪 Body Plan</p>
                <div className="space-y-2">
                  {[
                    ["Water Intake", w.body?.waterIntake],
                    ["Breakfast",    w.body?.breakfast],
                    ["Lunch",        w.body?.lunch],
                    ["Dinner",       w.body?.dinner],
                    ["Healthy Choice", w.body?.healthyChoice],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-gray-700 font-medium text-right max-w-[60%]">{val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mind */}
              <div className="bg-white rounded-2xl border border-orange-100 p-4">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">🧠 Mind Plan</p>
                <div className="space-y-2">
                  {[
                    ["Today's Thought", w.mind?.todayThought],
                    ["Affirmation",     w.mind?.affirmation],
                    ["Daily Habit",     w.mind?.dailyHabit],
                  ].map(([label, val]) => (
                    <div key={label} className="text-sm">
                      <span className="text-gray-400 block">{label}</span>
                      <span className="text-gray-700 font-medium">{val || "—"}</span>
                    </div>
                  ))}
                  {w.mind?.gentleReminders?.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-400 block mb-1">Reminders</span>
                      <div className="flex flex-wrap gap-1">
                        {w.mind.gentleReminders.map((r, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs">{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminWellness({ wellness, onDelete }) {
  const [search, setSearch] = useState("");

  const filtered = wellness.filter((w) => {
    const name = w.userId?.username || "";
    return name.toLowerCase().includes(search.toLowerCase()) || w.date?.includes(search);
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Records", value: wellness.length, icon: "📋", color: "text-orange-500" },
          { label: "Unique Users",  value: new Set(wellness.map((w) => w.userId?._id)).size, icon: "👥", color: "text-blue-500" },
          { label: "Today's Plans", value: wellness.filter((w) => w.date === new Date().toISOString().split("T")[0]).length, icon: "📅", color: "text-green-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-orange-100">
          <h3 className="text-sm font-bold text-gray-700">
            All Wellness Records
            <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">{filtered.length}</span>
          </h3>
          <input
            className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-gray-600 text-xs placeholder-gray-400 outline-none focus:border-orange-400 w-48 transition-colors"
            placeholder="Search by user or date…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No wellness records found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-50/60">
                  {["User", "Date", "Breakfast", "Water", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {filtered.map((w) => (
                  <WellnessRow key={w._id} w={w} onDelete={onDelete} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}