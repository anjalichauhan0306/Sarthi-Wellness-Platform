// frontend/src/components/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

const SERVER = "http://localhost:5000";

export default function AdminLogin({ onLogin }) {
  const navigate  = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await fetch(`${SERVER}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) { setError(data.message || "Login failed"); setLoading(false); return; }
      onLogin(data.admin);
    } catch {
      setError("Server error — is backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-800">Sarthi Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your admin panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-100/50 p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="admin@sarthi.com"
                className="w-full bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-gray-700 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="w-full bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 pr-11 text-gray-700 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-600 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in…</>
              ) : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          First time?{" "}
          <button onClick={() => navigate("/admin/setup")} className="text-orange-500 font-semibold hover:underline">
            Setup admin account
          </button>
        </p>
      </div>
    </div>
  );
}