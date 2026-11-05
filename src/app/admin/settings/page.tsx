"use client";

import { useState } from "react";
import {
  FiGlobe,
  FiToggleLeft,
  FiUsers,
  FiSave,
  FiShield,
} from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function AdminSettingsPage() {
  const { ready } = useAuthGuard("admin");
  const [saved, setSaved] = useState(false);

  // Site settings (local only)
  const [site, setSite] = useState({
    name: "FlyTransaction",
    supportEmail: "hello@flytransaction.com",
    supportPhone: "+91 90000 00000",
    maintenance: false,
  });

  // Feature toggles (local only)
  const [features, setFeatures] = useState({
    signups: true,
    trial: true,
    apiAccess: false,
    emailNotifications: true,
  });

  if (!ready) {
    return (
      <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>
        Loading...
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("flytx_admin_settings", JSON.stringify({ site, features }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Configure platform-wide settings (demo — stored in localStorage only)
        </p>
      </div>

      {saved && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "#16a34a",
          }}
        >
          ✓ Settings saved
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Site settings */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FiGlobe size={18} /> Site Settings
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Platform Name</label>
              <input
                type="text"
                value={site.name}
                onChange={(e) => setSite({ ...site, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Support Email</label>
              <input
                type="email"
                value={site.supportEmail}
                onChange={(e) => setSite({ ...site, supportEmail: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Support Phone</label>
              <input
                type="tel"
                value={site.supportPhone}
                onChange={(e) => setSite({ ...site, supportPhone: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Maintenance Mode</label>
              <label className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer"
                style={{ border: "1px solid var(--border)" }}>
                <input
                  type="checkbox"
                  checked={site.maintenance}
                  onChange={(e) => setSite({ ...site, maintenance: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {site.maintenance ? "Site is under maintenance" : "Site is live"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Feature flags */}
        <div className="card overflow-hidden">
          <h2 className="font-semibold p-6 pb-3 flex items-center gap-2">
            <FiToggleLeft size={18} /> Feature Toggles
          </h2>
          {[
            { key: "signups",           label: "Allow new signups",    desc: "Let new users create accounts" },
            { key: "trial",             label: "Free trial enabled",   desc: "Give new users a 7-day trial" },
            { key: "apiAccess",         label: "API access for users", desc: "Expose public API endpoints" },
            { key: "emailNotifications",label: "Email notifications",  desc: "Send transactional emails" },
          ].map((f) => (
            <label
              key={f.key}
              className="flex items-center justify-between p-4 cursor-pointer"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="pr-4">
                <div className="text-sm font-medium">{f.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {f.desc}
                </div>
              </div>
              <input
                type="checkbox"
                checked={(features as any)[f.key]}
                onChange={(e) => setFeatures({ ...features, [f.key]: e.target.checked })}
                className="w-4 h-4 flex-shrink-0"
              />
            </label>
          ))}
        </div>

        {/* Roles overview (read-only) */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FiUsers size={18} /> Role Permissions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left p-3 font-semibold">Permission</th>
                  <th className="text-center p-3 font-semibold">User</th>
                  <th className="text-center p-3 font-semibold">
                    <span className="flex items-center justify-center gap-1">
                      <FiShield size={12} /> Admin
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["View own dashboard", true, true],
                  ["View all users", false, true],
                  ["Manage users", false, true],
                  ["Configure site", false, true],
                  ["Delete own account", true, true],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="p-3" style={{ color: "var(--text-muted)" }}>{row[0] as string}</td>
                    <td className="p-3 text-center">{row[1] ? "✓" : "—"}</td>
                    <td className="p-3 text-center">{row[2] ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save button */}
        <button type="submit" className="btn-primary gap-2">
          <FiSave size={16} /> Save all settings
        </button>
      </form>
    </div>
  );
}