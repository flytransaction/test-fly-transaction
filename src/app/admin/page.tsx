"use client";

import Link from "next/link";
import {
  FiUsers,
  FiUserCheck,
  FiAlertTriangle,
  FiShield,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  MOCK_USERS,
  computeAdminStats,
  formatShortDate,
} from "@/lib/adminMockData";
import { SEED_RECORDS, formatINR, computeStats } from "@/lib/mockData";

export default function AdminPage() {
  const { ready } = useAuthGuard("admin");
  const stats = computeAdminStats(MOCK_USERS);
  const txStats = computeStats(SEED_RECORDS);
  const recentUsers = [...MOCK_USERS]
    .sort((a, b) => b.joined.localeCompare(a.joined))
    .slice(0, 5);

  if (!ready) {
    return (
      <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>
        Loading...
      </div>
    );
  }

  const STATS = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <FiUsers size={20} />,
      color: "#0EA5E9",
    },
    {
      label: "Active",
      value: stats.activeUsers,
      icon: <FiUserCheck size={20} />,
      color: "#22c55e",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <FiAlertTriangle size={20} />,
      color: "#f59e0b",
    },
    {
      label: "Admins",
      value: stats.admins,
      icon: <FiShield size={20} />,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          System overview and user activity
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${s.color}20`, color: s.color }}
              >
                {s.icon}
              </div>
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Platform revenue */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiTrendingUp size={18} className="text-brand" />
          <h2 className="font-semibold text-lg">Platform revenue</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
              Income
            </div>
            <div className="text-lg font-bold" style={{ color: "#22c55e" }}>
              {formatINR(txStats.income)}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
              Expenses
            </div>
            <div className="text-lg font-bold" style={{ color: "#ef4444" }}>
              {formatINR(txStats.expense)}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>
              Net
            </div>
            <div className="text-lg font-bold text-brand">
              {formatINR(txStats.balance)}
            </div>
          </div>
        </div>
      </div>

      {/* Recent users */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Recent signups</h2>
          <Link
            href="/admin/users"
            className="text-sm text-brand hover:underline flex items-center gap-1"
          >
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Email</th>
                <th className="text-left p-3 font-semibold">Plan</th>
                <th className="text-left p-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3" style={{ color: "var(--text-muted)" }}>{u.email}</td>
                  <td className="p-3">{u.plan}</td>
                  <td className="p-3 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                    {formatShortDate(u.joined)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}