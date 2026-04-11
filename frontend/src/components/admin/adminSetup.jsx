// frontend/src/components/admin/AdminSetup.jsx
// Ye page sirf pehli baar chalega — ek baar admin ban gaya to kaam nahi karega
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const SERVER = "http://localhost:5000";

export default function AdminSetup() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ username: "", email: "", password: "" });
  const [msg, setMsg]       = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");
    setLoading(true);
    try {
      const r = await fetch(`${SERVER}/api/admin/setup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) { setError(data.message); setLoading(false); return; }
      setMsg("✅ Admin created! Redirecting to login…");
      setTimeout(() => navigate("/admin/login"), 1500);
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-800">Setup Admin</h1>
          <p className="text-sm text-gray-400 mt-1">One-time admin account creation</p>
        </div>

        <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-100/50 p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "username", label: "Username", type: "text",     placeholder: "Admin" },
              { key: "email",    label: "Email",    type: "email",    placeholder: "admin@sarthi.com" },
              { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 block">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required
                  placeholder={f.placeholder}
                  className="w-full bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-gray-700 text-sm outline-none focus:border-orange-400 transition-all placeholder-gray-300"
                />
              </div>
            ))}

            {error && <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-600">⚠️ {error}</div>}
            {msg   && <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-600">{msg}</div>}

            <button type="submit" disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating…</> : "Create Admin Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}