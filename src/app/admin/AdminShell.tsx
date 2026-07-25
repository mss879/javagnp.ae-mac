"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>
    ),
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Skip auth check on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthed(true); // Don't block the login page
      return;
    }

    const token = localStorage.getItem("sb_access_token");
    const user = localStorage.getItem("sb_user");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setIsAuthed(true);
    if (user) {
      try {
        setUserEmail(JSON.parse(user).email || "");
      } catch {
        // ignore
      }
    }
  }, [isLoginPage, router]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("sb_access_token");
    localStorage.removeItem("sb_refresh_token");
    localStorage.removeItem("sb_user");
    // Clear the auth cookie used by proxy
    const isSecure = window.location.protocol === "https:";
    document.cookie = `sb_access_token=; path=/; max-age=0; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    router.push("/admin/login");
  }, [router]);

  // Show nothing while checking auth
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login page — no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans selection:bg-brand-primary selection:text-white">
      {/* ═══ Mobile Overlay ═══ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══ Sidebar ═══ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
          <a href="/" target="_blank" rel="noopener noreferrer" className="relative flex items-center pr-2">
            <Image
              src="/logo.png"
              alt="JavaGNP™ Logo"
              width={160}
              height={44}
              className="h-9 w-auto object-contain"
            />
            <span className="absolute top-0.5 -right-1 text-xs font-black text-brand-primary font-sans leading-none select-none">
              ™
            </span>
          </a>
          <div className="lg:hidden">
            <button onClick={() => setSidebarOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">Menu</p>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 group ${
                  isActive
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-brand-primary"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-[#991B1B] flex items-center justify-center text-white text-sm font-bold uppercase shadow-inner">
                {userEmail ? userEmail[0] : "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {userEmail || "Admin"}
                </p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-100 text-gray-600 hover:text-red-600 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <div className="flex-1 flex flex-col min-h-screen max-w-[100vw]">
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <Image
            src="/logo.png"
            alt="JavaGNP™ Logo"
            width={120}
            height={32}
            className="h-7 w-auto object-contain"
          />
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
