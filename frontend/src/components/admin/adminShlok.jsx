// frontend/src/components/admin/AdminShloks.jsx
import { useState } from "react";
import { Trash2, Pencil, X, Check, BookOpen, Quote, Sparkles } from "lucide-react";

function EditModal({ shlok, onClose, onSave }) {
  const [form, setForm] = useState({
    chapter:     shlok.chapter,
    verse:       shlok.verse,
    shlok:       shlok.shlok,
    meaning:     shlok.meaning,
    story:       shlok.story,
    lifeLesson:  shlok.lifeLesson,
  });

  const handleChange = (key, val) => setForm({ ...form, [key]: val });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-orange-100 flex flex-col animate-in zoom-in-95 duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Gradient Touch */}
        <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-white border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
              <Pencil size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">Edit Shlok</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Chapter {shlok.chapter} • Verse {shlok.verse}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-2xl hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content - Two Column Layout */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Side: Core Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Chapter</label>
                  <input type="number" value={form.chapter} onChange={(e) => handleChange("chapter", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Verse</label>
                  <input type="number" value={form.verse} onChange={(e) => handleChange("verse", e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
                  <Quote size={10} /> Sanskrit Shlok
                </label>
                <textarea rows={4} value={form.shlok} onChange={(e) => handleChange("shlok", e.target.value)}
                  className="w-full bg-orange-50/30 border border-orange-100 rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none italic" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Hindi/English Meaning</label>
                <textarea rows={4} value={form.meaning} onChange={(e) => handleChange("meaning", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none" />
              </div>
            </div>

            {/* Right Side: Insights */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
                  <BookOpen size={10} /> The Story (Context)
                </label>
                <textarea rows={6} value={form.story} onChange={(e) => handleChange("story", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none leading-relaxed" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
                  <Sparkles size={10} /> Modern Life Lesson
                </label>
                <textarea rows={5} value={form.lifeLesson} onChange={(e) => handleChange("lifeLesson", e.target.value)}
                  className="w-full bg-violet-50/30 border border-violet-100 rounded-2xl px-4 py-3 text-sm text-violet-900 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-all">
            Discard
          </button>
          <button 
            onClick={() => onSave(shlok._id, form)}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold shadow-lg shadow-orange-200 transition-all active:scale-95"
          >
            <Check size={18} /> Update Shlok
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminShloks({ shloks, onDelete, onUpdate }) {
  const [search,  setSearch]  = useState("");
  const [editing, setEditing] = useState(null);

  const filtered = shloks.filter((s) =>
    s.shlok?.toLowerCase().includes(search.toLowerCase()) ||
    s.meaning?.toLowerCase().includes(search.toLowerCase()) ||
    String(s.chapter).includes(search) ||
    s.date?.includes(search)
  );

  return (
    <>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Shloks", value: shloks.length,                                                     icon: "📖", color: "text-orange-500" },
            { label: "Chapters",     value: new Set(shloks.map((s) => s.chapter)).size,                        icon: "📚", color: "text-blue-500"   },
            { label: "This Month",   value: shloks.filter((s) => s.date?.startsWith(new Date().toISOString().slice(0,7))).length, icon: "📅", color: "text-green-500" },
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
              All Shloks
              <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">{filtered.length}</span>
            </h3>
            <input
              className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-gray-600 text-xs placeholder-gray-400 outline-none focus:border-orange-400 w-48 transition-colors"
              placeholder="Search shlok, meaning, date…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No shloks found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50/60">
                    {["Ch:Verse", "Sanskrit", "Meaning", "Life Lesson", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                  {filtered.map((s) => (
                    <tr key={s._id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                          {s.chapter}:{s.verse}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-[160px]">
                        <p className="text-gray-700 line-clamp-2 text-xs">{s.shlok}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="text-gray-600 line-clamp-2 text-xs">{s.meaning}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="text-gray-600 line-clamp-2 text-xs">{s.lifeLesson}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{s.date || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditing(s)}
                            className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-500 transition-colors" title="Edit">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => onDelete(s._id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <EditModal
          shlok={editing}
          onClose={() => setEditing(null)}
          onSave={(id, data) => { onUpdate(id, data); setEditing(null); }}
        />
      )}
    </>
  );
}