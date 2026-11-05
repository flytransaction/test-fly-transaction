"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Redirect based on role
    const target = result.user.role === "admin" ? "/admin" : "/dashboard";
    router.push(target);
  };

  const fillDemo = (role: "user" | "admin") => {
    if (role === "user") {
      setEmail("user@demo.com");
      setPassword("user123");
    } else {
      setEmail("admin@demo.com");
      setPassword("admin123");
    }
    setError("");
  };

  return (
    <section className="container-custom py-16 md:py-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Sign in to your FlyTransaction account
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div
              className="mb-5 p-3 rounded-lg text-sm"
              style={{
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <FiMail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <FiLock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span style={{ color: "var(--text-muted)" }}>Remember me</span>
              </label>
              <a href="#" className="text-brand hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-brand hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="card p-5 mt-5">
          <p className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Demo credentials (click to fill)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fillDemo("user")}
              className="btn-secondary text-xs justify-start"
            >
              👤 user@demo.com
            </button>
            <button
              onClick={() => fillDemo("admin")}
              className="btn-secondary text-xs justify-start"
            >
              🛡 admin@demo.com
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}