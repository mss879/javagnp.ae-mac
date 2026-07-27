"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store session in localStorage
      localStorage.setItem("sb_access_token", data.session.access_token);
      localStorage.setItem("sb_refresh_token", data.session.refresh_token);
      localStorage.setItem("sb_user", JSON.stringify(data.user));

      // Also set a cookie so the server-side proxy can verify auth
      const isSecure = window.location.protocol === "https:";
      document.cookie = `sb_access_token=${data.session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${isSecure ? "; Secure" : ""}`;

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden font-sans">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-brand-tertiary/10 blur-[150px] rounded-full" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="relative inline-flex items-center pr-2">
            <Image
              src="/new-logo.png"
              alt="JavaGNP Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain drop-shadow-sm"
            />
          </a>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-brand-primary/5 rounded-full border border-brand-primary/10">
              <span className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(220,38,38,0.4)] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-primary">
                Secure Access
              </span>
            </div>
            <h1 className="text-2xl text-gray-900 tracking-tight font-tech font-semibold">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Sign in to manage your platform
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3 relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="admin-email" className="block text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@javagnp.ae"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="admin-password" className="block text-xs font-bold tracking-[0.15em] uppercase text-gray-500">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full group/btn text-sm font-bold tracking-[0.15em] uppercase text-white overflow-hidden rounded-xl px-6 py-4 transition-all duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(220,38,38,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(220,38,38,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-8 relative z-10">
            Protected by Supabase · JavaGNP © {new Date().getFullYear()}
          </p>
        </div>

        {/* Back to site */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-brand-primary transition-colors inline-flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
            Back to website
          </a>
        </div>
      </div>
    </main>
  );
}
