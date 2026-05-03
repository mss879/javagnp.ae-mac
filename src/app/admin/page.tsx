"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

/* ──────────────────────────────────────────
   Admin Dashboard — Analytics + Notes
   ────────────────────────────────────────── */

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  topCountries: { country: string; count: number }[];
  topPages: { page: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
}

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

const NOTE_COLORS = ["#ffffff", "#f8fafc", "#fef2f2", "#f0fdf4", "#fffbeb", "#f5f3ff"];

function getSupabase() {
  const token = typeof window !== "undefined" ? localStorage.getItem("sb_access_token") : null;
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: token ? { Authorization: `Bearer ${token}` } : {} } }
  );
  return client;
}

// ── Stat Card ──
function StatCard({ label, value, icon, accent }: { label: string; value: string | number; icon: React.ReactNode; accent?: string }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
      <div className="flex items-start justify-between mb-4">
        <span className={`p-3 rounded-2xl ${accent || "bg-gray-50 text-gray-600"}`}>{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      <p className="text-xs text-gray-500 mt-2 font-bold tracking-widest uppercase">{label}</p>
    </div>
  );
}

// ── Bar Item ──
function BarItem({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-4 group">
      <span className="text-sm font-medium text-gray-600 w-28 truncate">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-500 w-10 text-right">{count}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"analytics" | "notes">("analytics");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const fetchAnalytics = useCallback(async () => {
    const supabase = getSupabase();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: allViews } = await supabase.from("page_views").select("*").gte("created_at", thirtyDaysAgo).order("created_at", { ascending: false });
    const views = allViews || [];

    const todayViews = views.filter((v) => v.created_at >= today).length;
    const uniqueVisitors = new Set(views.map((v) => v.visitor_id).filter(Boolean)).size;

    // Top countries
    const countryMap: Record<string, number> = {};
    views.forEach((v) => { if (v.country) countryMap[v.country] = (countryMap[v.country] || 0) + 1; });
    const topCountries = Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 8);

    // Top pages
    const pageMap: Record<string, number> = {};
    views.forEach((v) => { pageMap[v.page_path] = (pageMap[v.page_path] || 0) + 1; });
    const topPages = Object.entries(pageMap).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count).slice(0, 8);

    // Device breakdown
    const deviceMap: Record<string, number> = {};
    views.forEach((v) => { if (v.device_type) deviceMap[v.device_type] = (deviceMap[v.device_type] || 0) + 1; });
    const deviceBreakdown = Object.entries(deviceMap).map(([device, count]) => ({ device, count })).sort((a, b) => b.count - a.count);

    // Browser breakdown
    const browserMap: Record<string, number> = {};
    views.forEach((v) => { if (v.browser) browserMap[v.browser] = (browserMap[v.browser] || 0) + 1; });
    const browserBreakdown = Object.entries(browserMap).map(([browser, count]) => ({ browser, count })).sort((a, b) => b.count - a.count);

    // Daily trend (last 30 days)
    const dayMap: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      dayMap[d.toISOString().split("T")[0]] = 0;
    }
    views.forEach((v) => { const d = v.created_at.split("T")[0]; if (dayMap[d] !== undefined) dayMap[d]++; });
    const dailyTrend = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

    setAnalytics({ totalViews: views.length, uniqueVisitors, todayViews, topCountries, topPages, deviceBreakdown, browserBreakdown, dailyTrend });
  }, []);

  const fetchNotes = useCallback(async () => {
    const supabase = getSupabase();
    const { data } = await supabase.from("admin_notes").select("*").order("is_pinned", { ascending: false }).order("updated_at", { ascending: false });
    setNotes(data || []);
  }, []);

  useEffect(() => {
    Promise.all([fetchAnalytics(), fetchNotes()]).finally(() => setLoading(false));
  }, [fetchAnalytics, fetchNotes]);

  const createNote = async () => {
    const supabase = getSupabase();
    const user = localStorage.getItem("sb_user");
    const userId = user ? JSON.parse(user).id : null;
    if (!userId) return;
    const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
    await supabase.from("admin_notes").insert({ user_id: userId, title: "Untitled Note", content: "", color });
    fetchNotes();
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    const supabase = getSupabase();
    await supabase.from("admin_notes").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from("admin_notes").delete().eq("id", id);
    fetchNotes();
  };

  const saveNote = async (id: string) => {
    await updateNote(id, { title: noteTitle, content: noteContent });
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const a = analytics!;
  const trendMax = Math.max(...(a?.dailyTrend?.map((d) => d.count) || [1]));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-gray-900 tracking-tight font-tech font-semibold">Dashboard</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Analytics overview & quick notes</p>
        </div>
        {/* Tab Switcher */}
        <div className="flex bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm self-start">
          {(["analytics", "notes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                activeTab === tab ? "bg-gray-100 text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ ANALYTICS TAB ═══ */}
      {activeTab === "analytics" && analytics && (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Views (30d)" value={a.totalViews} accent="bg-red-50 text-brand-primary" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>} />
            <StatCard label="Unique Visitors" value={a.uniqueVisitors} accent="bg-blue-50 text-blue-600" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>} />
            <StatCard label="Today's Views" value={a.todayViews} accent="bg-emerald-50 text-emerald-600" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>} />
            <StatCard label="Countries" value={a.topCountries.length} accent="bg-amber-50 text-amber-600" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>} />
          </div>

          {/* Trend Chart (CSS-only sparkline) */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-6 rounded-full bg-brand-primary" />
              <h3 className="text-sm tracking-widest uppercase text-gray-900 font-tech font-semibold">Visitor Trend (30 Days)</h3>
            </div>
            <div className="flex items-end gap-1 h-48">
              {a.dailyTrend.map((d, i) => (
                <div key={i} className="flex-1 group relative h-full flex items-end">
                  <div
                    className="w-full bg-brand-primary/20 hover:bg-brand-primary rounded-t-sm transition-all duration-200 min-h-[4px] cursor-pointer"
                    style={{ height: `${trendMax > 0 ? (d.count / trendMax) * 100 : 2}%` }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 rounded-xl text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-10 flex flex-col items-center">
                    <span className="text-gray-400 text-[10px] uppercase mb-1">{d.date.slice(5)}</span>
                    {d.count} views
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-column breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Countries */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-6 rounded-full bg-brand-primary" />
                <h3 className="text-sm tracking-widest uppercase text-gray-900 font-tech font-semibold">Top Countries</h3>
              </div>
              <div className="space-y-4">
                {a.topCountries.length === 0 && <p className="text-sm text-gray-500">No data yet</p>}
                {a.topCountries.map((c) => (
                  <BarItem key={c.country} label={c.country} count={c.count} max={a.topCountries[0]?.count || 1} />
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-6 rounded-full bg-brand-primary" />
                <h3 className="text-sm tracking-widest uppercase text-gray-900 font-tech font-semibold">Top Pages</h3>
              </div>
              <div className="space-y-4">
                {a.topPages.length === 0 && <p className="text-sm text-gray-500">No data yet</p>}
                {a.topPages.map((p) => (
                  <BarItem key={p.page} label={p.page} count={p.count} max={a.topPages[0]?.count || 1} />
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-6 rounded-full bg-brand-primary" />
                <h3 className="text-sm tracking-widest uppercase text-gray-900 font-tech font-semibold">Devices</h3>
              </div>
              <div className="space-y-4">
                {a.deviceBreakdown.length === 0 && <p className="text-sm text-gray-500">No data yet</p>}
                {a.deviceBreakdown.map((d) => (
                  <BarItem key={d.device} label={d.device} count={d.count} max={a.deviceBreakdown[0]?.count || 1} />
                ))}
              </div>
            </div>

            {/* Browser Breakdown */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-6 rounded-full bg-brand-primary" />
                <h3 className="text-sm tracking-widest uppercase text-gray-900 font-tech font-semibold">Browsers</h3>
              </div>
              <div className="space-y-4">
                {a.browserBreakdown.length === 0 && <p className="text-sm text-gray-500">No data yet</p>}
                {a.browserBreakdown.map((b) => (
                  <BarItem key={b.browser} label={b.browser} count={b.count} max={a.browserBreakdown[0]?.count || 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ NOTES TAB ═══ */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          <button
            onClick={createNote}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Note
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-[24px] border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg relative group shadow-sm hover:-translate-y-1"
                style={{ backgroundColor: note.color }}
              >
                {/* Pin + Delete */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => updateNote(note.id, { is_pinned: !note.is_pinned })} className={`p-2 rounded-xl hover:bg-white/80 transition-colors shadow-sm cursor-pointer ${note.is_pinned ? "text-amber-500 bg-white" : "text-gray-400 bg-white/50"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={note.is_pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="p-2 rounded-xl bg-white/50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>

                {editingNote === note.id ? (
                  <div className="space-y-4">
                    <input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} className="w-full bg-white/50 text-gray-900 font-bold text-lg border-b-2 border-gray-200 pb-2 focus:outline-none focus:border-brand-primary px-2 rounded-t-lg" placeholder="Title" />
                    <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={5} className="w-full bg-white/50 text-gray-700 text-sm resize-none focus:outline-none p-2 rounded-b-lg border-b-2 border-transparent focus:border-brand-primary" placeholder="Write your note..." />
                    <div className="flex gap-2">
                      <button onClick={() => saveNote(note.id)} className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold tracking-wide hover:bg-brand-primary-hover transition-colors shadow-sm cursor-pointer">Save</button>
                      <button onClick={() => setEditingNote(null)} className="px-4 py-2 rounded-xl bg-white text-gray-600 text-xs font-bold tracking-wide border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => { setEditingNote(note.id); setNoteTitle(note.title); setNoteContent(note.content); }} className="cursor-pointer h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      {note.is_pinned && <span className="text-amber-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg></span>}
                      <h4 className="text-lg text-gray-900 truncate tracking-tight font-tech font-semibold">{note.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-5 whitespace-pre-wrap flex-1 leading-relaxed">{note.content || "Click to add description..."}</p>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mt-6 pt-4 border-t border-gray-200/50">{new Date(note.updated_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            ))}

            {notes.length === 0 && (
              <div className="col-span-full text-center py-24 bg-white rounded-[32px] border border-gray-100 border-dashed">
                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                </div>
                <h3 className="text-lg text-gray-900 mb-2 font-tech font-semibold">No notes yet</h3>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">Create your first note to keep track of tasks, reminders, and important information.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
