// frontend/src/components/admin/adminPanel.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Zap, Trophy, ChevronRight, RefreshCw, LogOut, ShieldAlert } from "lucide-react";
import AdminOverview    from "./AdminOverview";
import AdminUsers       from "./AdminUsers";
import AdminActivities  from "./AdminActivities";
import AdminLeaderboard from "./adminLeaderBorad";

const SERVER = "http://localhost:5000";
const api = (path, opts = {}) =>
  fetch(`${SERVER}${path}`, { credentials: "include", ...opts }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

function Toast({ msg, icon }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-orange-200 rounded-2xl px-4 py-3 shadow-xl text-sm text-gray-700">
      <span>{icon}</span><span>{msg}</span>
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, icon = "✅") => { setToast({ msg, icon }); setTimeout(() => setToast(null), 2800); };
  return { toast, show };
}

const NAV = [
  { key: "overview",    label: "Overview",    icon: LayoutDashboard },
  { key: "users",       label: "Users",       icon: Users           },
  { key: "activities",  label: "Activities",  icon: Zap             },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy          },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const { userData, authLoading } = useSelector((s) => s.user);
  const [page, setPage]             = useState("overview");
  const [users, setUsers]           = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast, show }             = useToast();

  useEffect(() => {
    if (authLoading) return;
    if (!userData) { navigate("/login"); return; }
    if (!userData.isAdmin) return;
    fetchData();
  }, [userData, authLoading]);

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [u, a] = await Promise.all([api("/api/admin/users"), api("/api/admin/activities")]);
      setUsers(Array.isArray(u) ? u : []);
      setActivities(Array.isArray(a) ? a : []);
    } catch { show("Failed to load data", "❌"); }
    setLoading(false); setRefreshing(false);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await api(`/api/admin/users/${userId}`, { method: "DELETE" });
      setUsers((p) => p.filter((u) => u._id !== userId));
      setActivities((p) => p.filter((a) => a.userId !== userId));
      show("User deleted", "🗑");
    } catch { show("Delete failed", "❌"); }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      const res = await api(`/api/admin/users/${userId}/toggle-admin`, { method: "PATCH" });
      setUsers((p) => p.map((u) => u._id === userId ? { ...u, isAdmin: res.user.isAdmin } : u));
      show(res.message, "🛡");
    } catch { show("Failed to update admin status", "❌"); }
  };

  if (authLoading) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!userData) return null;

  if (!userData.isAdmin) return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center gap-6">
      <ShieldAlert size={48} className="text-orange-400" />
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500">You don't have admin privileges.</p>
      </div>
      <button onClick={() => navigate("/")} className="px-6 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
        Go Home
      </button>
    </div>
  );

  const current = NAV.find((n) => n.key === page);

  return (
    <div className="flex min-h-screen bg-orange-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-orange-100 flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="px-5 py-5 border-b border-orange-100">
          <div className="flex items-center gap-2.5">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS341-5fNiiv-r46c5GNom5lIGYScPbtPU7Tw&s" alt="logo" className="w-8 h-8 rounded-full object-contain" />
            <div>
              <div className="text-base font-black tracking-tight text-orange-500">SARTHI</div>
              <p className="text-xs text-gray-400 -mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                page === key
                  ? "bg-orange-50 text-orange-600 ring-1 ring-orange-200"
                  : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
              }`}
            >
              <Icon size={15} />
              {label}
              {page === key && <ChevronRight size={12} className="ml-auto text-orange-400" />}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-orange-100 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
              {userData?.username?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">{userData?.username}</p>
              <p className="text-xs text-gray-400 truncate">{userData?.email}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors"
          >
            <LogOut size={12} /> Back to App
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-orange-100 px-6 py-3 flex items-center justify-between shadow-sm">
          <h1 className="text-base font-bold text-gray-800">{current?.label}</h1>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-xs text-orange-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {users.length} users
            </span>
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-xs text-orange-600 font-medium">
              {activities.length} logs
            </span>
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading data…</p>
            </div>
          ) : (
            <>
              {page === "overview"    && <AdminOverview    users={users} activities={activities} />}
              {page === "users"       && <AdminUsers       users={users} onDelete={handleDelete} onToggleAdmin={handleToggleAdmin} />}
              {page === "activities"  && <AdminActivities  activities={activities} users={users} />}
              {page === "leaderboard" && <AdminLeaderboard users={users} />}
            </>
          )}
        </div>
      </main>

      {toast && <Toast msg={toast.msg} icon={toast.icon} />}
    </div>
  );
}