"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiShield, FiUserCheck, FiAlertTriangle } from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  MOCK_USERS,
  computeAdminStats,
  formatShortDate,
  AdminUser,
} from "@/lib/adminMockData";

const PLANS = ["All", "Basic", "Standard", "Premium", "Trial"] as const;
const STATUSES = ["All", "Active", "Suspended", "Pending"] as const;

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded-full"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {text}
    </span>
  );
}

function statusColor(s: AdminUser["status"]) {
  return s === "Active" ? "#22c55e" : s === "Suspended" ? "#ef4444" : "#f59e0b";
}
function planColor(p: AdminUser["plan"]) {
  return p === "Premium" ? "#8b5cf6" : p === "Standard" ? "#0EA5E9" : p === "Basic" ? "#64748b" : "#f59e0b";
}

export default function AdminUsersPage() {
  const { ready } = useAuthGuard("admin");
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<(typeof PLANS)[number]>("All");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUSES)[number]>("All");

  const stats = computeAdminStats(MOCK_USERS);

  const filtered = useMemo(() => {
    return MOCK_USERS
      .filter((u) => planFilter === "All" || u.plan === planFilter)
      .filter((u) => statusFilter === "All" || u.status === statusFilter)
      .filter((u) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.lastActive.localeCompare(a.lastActive));
  }, [search, planFilter, statusFilter]);

  if (!ready) {
    return (
      <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {filtered.length} of {MOCK_USERS.length} users
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active",    value: stats.activeUsers, color: "#22c55e", icon: <FiUserCheck size={16} /> },
          { label: "Suspended", value: stats.suspended,   color: "#ef4444", icon: <FiAlertTriangle size={16} /> },
          { label: "Admins",    value: stats.admins,      color: "#8b5cf6", icon: <FiShield size={16} /> },
        ].map((s) => (
          <div key={s.label} className="card p-3 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${s.color}20`, color: s.color }}
            >
              {s.icon}
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              <div className="font-bold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or ID..."
              className="input-field pl-10"
            />
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value as any)}
            className="input-field md:w-40"
          >
            {PLANS.map((p) => <option key={p} value={p}>{p === "All" ? "All plans" : p}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="input-field md:w-40"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="text-left p-4 font-semibold">User</th>
              <th className="text-left p-4 font-semibold">Plan</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Joined</th>
              <th className="text-left p-4 font-semibold">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                  No users match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {u.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium flex items-center gap-1.5">
                          {u.name}
                          {u.role === "admin" && (
                            <FiShield size={12} className="text-brand" />
                          )}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge text={u.plan} color={planColor(u.plan)} />
                  </td>
                  <td className="p-4">
                    <Badge text={u.status} color={statusColor(u.status)} />
                  </td>
                  <td className="p-4 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                    {formatShortDate(u.joined)}
                  </td>
                  <td className="p-4 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                    {formatShortDate(u.lastActive)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}