"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FiLock, FiBell, FiSun, FiMoon, FiMonitor, FiTrash2 } from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { clearUser } from "@/lib/auth";

export default function SettingsPage() {
  const { ready } = useAuthGuard();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [notify, setNotify] = useState({ email: true, push: false, weekly: true });

  useEffect(() => setMounted(true), []);

  if (!ready) {
    return <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;
  }

  const changePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next.length < 6) return setPwMsg("New password must be at least 6 characters");
    if (pw.next !== pw.confirm) return setPwMsg("Passwords do not match");
    setPwMsg("✓ Password updated (demo only — no backend)");
    setPw({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwMsg(""), 3000);
  };

  const deleteAccount = () => {
    if (confirm("Delete account? This will log you out permanently (demo).")) {
      clearUser();
      router.push("/");
    }
  };

  const Toggle = ({ label, checked, onChange, icon }: any) => (
    <label className="flex items-center justify-between p-4 cursor-pointer"
      style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-center gap-3">
        <span style={{ color: "var(--text-muted)" }}>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4"
      />
    </label>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Password */}
      <form onSubmit={changePw} className="card p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <FiLock size={18} /> Change Password
        </h2>
        {pwMsg && (
          <div className="mb-4 text-sm p-3 rounded-lg"
            style={{
              backgroundColor: pwMsg.startsWith("✓") ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${pwMsg.startsWith("✓") ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              color: pwMsg.startsWith("✓") ? "#16a34a" : "#dc2626",
            }}>
            {pwMsg}
          </div>
        )}
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={pw.current}
            onChange={(e) => setPw({ ...pw, current: e.target.value })}
            className="input-field"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="New password"
              value={pw.next}
              onChange={(e) => setPw({ ...pw, next: e.target.value })}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary">Update password</button>
        </div>
      </form>

      {/* Notifications */}
      <div className="card overflow-hidden">
        <h2 className="font-semibold p-6 pb-3 flex items-center gap-2">
          <FiBell size={18} /> Notifications
        </h2>
        <Toggle label="Email notifications" checked={notify.email}  onChange={(v: boolean) => setNotify({ ...notify, email: v })} icon={<FiBell />} />
        <Toggle label="Push notifications"  checked={notify.push}   onChange={(v: boolean) => setNotify({ ...notify, push: v })}  icon={<FiBell />} />
        <Toggle label="Weekly summary"      checked={notify.weekly} onChange={(v: boolean) => setNotify({ ...notify, weekly: v })} icon={<FiBell />} />
      </div>

      {/* Theme */}
      <div className="card p-6">
        <h2 className="font-semibold mb-4">Appearance</h2>
        {mounted && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "light",  label: "Light",  icon: <FiSun size={18} /> },
              { id: "dark",   label: "Dark",   icon: <FiMoon size={18} /> },
              { id: "system", label: "System", icon: <FiMonitor size={18} /> },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className="p-4 rounded-lg flex flex-col items-center gap-2 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: theme === opt.id ? "rgba(14,165,233,0.12)" : "var(--bg-soft)",
                  border: theme === opt.id ? "2px solid #0EA5E9" : "1px solid var(--border)",
                  color: theme === opt.id ? "#0EA5E9" : "var(--text)",
                }}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="card p-6" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
        <h2 className="font-semibold mb-2 flex items-center gap-2" style={{ color: "#dc2626" }}>
          <FiTrash2 size={18} /> Danger zone
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          Once you delete your account, there is no going back. This is a demo — data is only stored locally.
        </p>
        <button
          onClick={deleteAccount}
          className="px-4 py-2 rounded-lg font-medium text-white"
          style={{ backgroundColor: "#dc2626" }}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}