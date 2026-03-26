// frontend/src/components/admin/AdminUsers.jsx
import { useState } from "react";
import { X, Trash2, Eye, Shield, ShieldOff } from "lucide-react";

function Badge({ children, color = "gray" }) {
  const map = {
    green:  "bg-green-100 text-green-700 ring-1 ring-green-200",
    blue:   "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    rose:   "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
    amber:  "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    gray:   "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
    violet: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
    orange: "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
  };
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[color] || map.gray}`}>{children}</span>;
}

function Avatar({ name, size = "sm" }) {
  const s = size === "lg" ? "w-12 h-12 text-lg" : "w-8 h-8 text-xs";
  return (
    <div className={`${s} rounded-full bg-orange-500 flex items-center justify-center font-bold text-white shrink-0`}>
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-700">{value ?? <span className="text-gray-300">—</span>}</p>
    </div>
  );
}

function UserModal({ user, onClose, onDelete, onToggleAdmin }) {
  const goalColor = user.goal === "weight_loss" ? "rose" : user.goal === "weight_gain" ? "blue" : "green";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto scrollbar-none p-6 shadow-2xl border border-orange-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar name={user.username} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800">{user.username}</h2>
                {user.isAdmin && <Badge color="orange">Admin</Badge>}
              </div>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-orange-50 text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {user.goal && <Badge color={goalColor}>{user.goal.replace("_", " ")}</Badge>}
          {user.isProfileComplete ? <Badge color="green">Profile Complete</Badge> : <Badge>Incomplete</Badge>}
          {user.activityLevel && <Badge color="violet">{user.activityLevel}</Badge>}
          {user.foodType && <Badge color="amber">{user.foodType}</Badge>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Field label="Age" value={user.age} />
          <Field label="Gender" value={user.gender} />
          <Field label="Height" value={user.height ? `${user.height} cm` : null} />
          <Field label="Weight" value={user.weight ? `${user.weight} kg` : null} />
          <Field label="Target Weight" value={user.targetWeight ? `${user.targetWeight} kg` : null} />
          <Field label="Mood Level" value={user.moodLevel} />
          <Field label="Streak 🔥" value={user.streak ? `${user.streak} days` : "0"} />
          <Field label="Total Points ⭐" value={user.totalPoints || 0} />
          <Field label="Sleep Hours" value={user.lifestyle?.sleepHours} />
          <Field label="Screen Time" value={user.lifestyle?.screenTimeHours ? `${user.lifestyle.screenTimeHours}h` : null} />
          <Field label="Exercise" value={user.lifestyle?.exercise} />
          <Field label="Work Type" value={user.lifestyle?.workType} />
        </div>

        {user.mentalState && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Mental State</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(user.mentalState).filter(([, v]) => v).map(([k]) => <Badge key={k} color="rose">{k}</Badge>)}
              {!Object.values(user.mentalState).some(Boolean) && <span className="text-sm text-gray-300">None flagged</span>}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 mb-6">Joined: {new Date(user.createdAt).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="flex flex-wrap gap-3 justify-end border-t border-gray-100 pt-4">
          <button onClick={() => { onToggleAdmin(user._id); onClose(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${user.isAdmin ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "bg-violet-100 text-violet-700 hover:bg-violet-200"}`}>
            {user.isAdmin ? <><ShieldOff size={14} /> Revoke Admin</> : <><Shield size={14} /> Make Admin</>}
          </button>
          <button onClick={() => { onDelete(user._id); onClose(); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm font-semibold transition-colors">
            <Trash2 size={14} /> Delete
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-semibold transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers({ users, onDelete, onToggleAdmin }) {
  const [search, setSearch]     = useState("");
  const [sortBy, setSortBy]     = useState("createdAt");
  const [selected, setSelected] = useState(null);

  const filtered = users
    .filter((u) => u.username?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "points") return (b.totalPoints || 0) - (a.totalPoints || 0);
      if (sortBy === "streak") return (b.streak || 0) - (a.streak || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const goalBadge = (goal) => {
    if (!goal) return <Badge>not set</Badge>;
    const color = goal === "weight_loss" ? "rose" : goal === "weight_gain" ? "blue" : "green";
    return <Badge color={color}>{goal.replace("_", " ")}</Badge>;
  };

  return (
    <>
      <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-orange-100">
          <h3 className="text-sm font-bold text-gray-700">
            All Users <span className="ml-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">{filtered.length}</span>
          </h3>
          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-gray-600 text-xs outline-none cursor-pointer focus:border-orange-400">
              <option value="createdAt">Newest First</option>
              <option value="points">By Points</option>
              <option value="streak">By Streak</option>
            </select>
            <input className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-gray-600 text-xs placeholder-gray-400 outline-none focus:border-orange-400 w-44 transition-colors"
              placeholder="Search users…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-50/60">
                  {["User", "Role", "Goal", "Streak 🔥", "Points ⭐", "Profile", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-orange-50/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.username} />
                        <div>
                          <p className="font-semibold text-gray-700">{u.username}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{u.isAdmin ? <Badge color="orange">Admin</Badge> : <Badge>User</Badge>}</td>
                    <td className="px-4 py-3">{goalBadge(u.goal)}</td>
                    <td className="px-4 py-3 font-bold text-gray-700">{u.streak || 0}</td>
                    <td className="px-4 py-3 font-bold text-orange-500">{u.totalPoints || 0}</td>
                    <td className="px-4 py-3"><Badge color={u.isProfileComplete ? "green" : "gray"}>{u.isProfileComplete ? "Complete" : "Incomplete"}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString("en", { day: "numeric", month: "short", year: "2-digit" })}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(u)} className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-500 transition-colors" title="View"><Eye size={14} /></button>
                        <button onClick={() => onToggleAdmin(u._id)} className={`p-1.5 rounded-lg transition-colors ${u.isAdmin ? "bg-orange-50 hover:bg-orange-100 text-orange-500" : "bg-violet-50 hover:bg-violet-100 text-violet-500"}`} title={u.isAdmin ? "Revoke Admin" : "Make Admin"}>
                          {u.isAdmin ? <ShieldOff size={14} /> : <Shield size={14} />}
                        </button>
                        <button onClick={() => onDelete(u._id)} className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selected && <UserModal user={selected} onClose={() => setSelected(null)} onDelete={onDelete} onToggleAdmin={onToggleAdmin} />}
    </>
  );
}