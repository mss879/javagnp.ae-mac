"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  inquiry_type: string;
  message: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-600 border-blue-200",
  read: "bg-amber-50 text-amber-600 border-amber-200",
  replied: "bg-emerald-50 text-emerald-600 border-emerald-200",
  archived: "bg-gray-100 text-gray-600 border-gray-200",
};

const INQUIRY_LABELS: Record<string, string> = {
  enterprise: "Enterprise Software",
  cloud: "Cloud Migration",
  consulting: "IT Consulting",
  other: "Other Inquiry",
};

function getSupabase() {
  const token = typeof window !== "undefined" ? localStorage.getItem("sb_access_token") : null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: token ? { Authorization: `Bearer ${token}` } : {} } }
  );
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");

  const fetchInquiries = useCallback(async () => {
    const supabase = getSupabase();
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const updateStatus = async (id: string, status: string) => {
    const supabase = getSupabase();
    await supabase.from("inquiries").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    fetchInquiries();
  };

  const saveAdminNotes = async (id: string) => {
    const supabase = getSupabase();
    await supabase.from("inquiries").update({ admin_notes: notesText, updated_at: new Date().toISOString() }).eq("id", id);
    setEditingNotes(null);
    fetchInquiries();
  };

  const filtered = inquiries.filter((inq) => {
    if (filterStatus !== "all" && inq.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        inq.first_name.toLowerCase().includes(q) ||
        inq.last_name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const newCount = inquiries.filter((i) => i.status === "new").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inquiries</h1>
          {newCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-red-50 text-brand-primary text-xs font-bold tracking-widest uppercase border border-red-100 shadow-sm">
              {newCount} new
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-gray-500 mt-2">Manage contact form submissions from your website</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-gray-50 rounded-xl border border-gray-200 p-1.5 overflow-x-auto shrink-0">
          {["all", "new", "read", "replied", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                filterStatus === s ? "bg-white text-brand-primary shadow-sm border border-gray-100" : "text-gray-500 hover:text-gray-900 border border-transparent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[32px] border border-gray-100 border-dashed shadow-sm">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
          </div>
        )}

        {filtered.map((inq) => {
          const isExpanded = expandedId === inq.id;
          return (
            <div key={inq.id} className={`bg-white rounded-[24px] border transition-all duration-300 overflow-hidden ${isExpanded ? "border-gray-300 shadow-md" : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"}`}>
              {/* Row Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 cursor-pointer"
                onClick={() => {
                  setExpandedId(isExpanded ? null : inq.id);
                  if (inq.status === "new") updateStatus(inq.id, "read");
                }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary text-sm font-bold uppercase shrink-0 shadow-sm">
                    {inq.first_name[0]}{inq.last_name[0]}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-base font-bold text-gray-900 truncate tracking-tight">{inq.first_name} {inq.last_name}</p>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${STATUS_STYLES[inq.status] || STATUS_STYLES.new}`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 truncate">
                      <span className="truncate">{inq.email}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      <span className="font-medium text-gray-700 truncate">{INQUIRY_LABELS[inq.inquiry_type] || inq.inquiry_type}</span>
                    </div>
                  </div>
                </div>

                {/* Date + Chevron */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-48 pl-16 sm:pl-0">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400 shrink-0">
                    {new Date(inq.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${isExpanded ? "bg-gray-100" : "bg-gray-50 group-hover:bg-gray-100"}`}>
                    <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-6 sm:p-8 space-y-8 animate-in slide-in-from-top-2 duration-200">
                  {/* Message */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-1.5 h-5 rounded-full bg-brand-primary" />
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-900">Message</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {inq.message}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Status Actions */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-1.5 h-5 rounded-full bg-brand-primary" />
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-900">Update Status</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["new", "read", "replied", "archived"].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(inq.id, s)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all cursor-pointer shadow-sm hover:-translate-y-0.5 ${
                              inq.status === s ? STATUS_STYLES[s] : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-1.5 h-5 rounded-full bg-brand-primary" />
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-900">Internal Notes</p>
                      </div>
                      {editingNotes === inq.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-sm transition-all"
                            placeholder="Add private internal notes here..."
                          />
                          <div className="flex gap-2">
                            <button onClick={() => saveAdminNotes(inq.id)} className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold tracking-widest uppercase hover:bg-brand-primary-hover transition-colors shadow-sm cursor-pointer">Save</button>
                            <button onClick={() => setEditingNotes(null)} className="px-4 py-2 rounded-xl bg-white text-gray-600 border border-gray-200 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => { setEditingNotes(inq.id); setNotesText(inq.admin_notes || ""); }}
                          className="px-5 py-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-600 cursor-pointer hover:border-brand-primary/50 hover:shadow-md transition-all min-h-[60px] shadow-sm flex items-center group"
                        >
                          <span className={inq.admin_notes ? "" : "text-gray-400 italic group-hover:text-gray-600"}>
                            {inq.admin_notes || "Click to add private notes..."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-gray-400 pt-6 border-t border-gray-200/60">
                    <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Created: {new Date(inq.created_at).toLocaleString()}</span>
                    <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg> Updated: {new Date(inq.updated_at).toLocaleString()}</span>
                    <span className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> ID: {inq.id.slice(0, 8)}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
