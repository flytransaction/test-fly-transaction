"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiClock,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  loadRecords,
  loadPeople,
  computeStats,
  formatINR,
  Person,
  RecordItem,
} from "@/lib/mockData";

export default function DashboardPage() {
  const { user, ready } = useAuthGuard();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setRecords(loadRecords());
    setPeople(loadPeople());
  }, []);

  const stats = computeStats(records);

  if (!ready) {
    return <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;
  }

  const STATS = [
    { label: "Total Balance", value: formatINR(stats.balance), icon: <FiDollarSign size={20} />, color: "#0EA5E9" },
    { label: "Income",        value: formatINR(stats.income),  icon: <FiTrendingUp size={20} />, color: "#22c55e" },
    { label: "Expenses",      value: formatINR(stats.expense), icon: <FiTrendingDown size={20} />, color: "#ef4444" },
    { label: "Pending",       value: `${stats.pending} records`, icon: <FiClock size={20} />, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name} 👋</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {people.length} people · {records.length} total records
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                {s.icon}
              </div>
            </div>
            <div className="text-xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/dashboard/people" className="card p-6 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiUsers size={20} className="text-brand" />
              <h2 className="font-semibold text-lg">People</h2>
            </div>
            <FiArrowRight size={18} style={{ color: "var(--text-muted)" }} />
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {people.length} {people.length === 1 ? "person" : "people"} in your ledger
          </p>
        </Link>

        <Link href="/dashboard/records" className="card p-6 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiDollarSign size={20} className="text-brand" />
              <h2 className="font-semibold text-lg">All Records</h2>
            </div>
            <FiArrowRight size={18} style={{ color: "var(--text-muted)" }} />
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {records.length} transactions across everyone
          </p>
        </Link>
      </div>
    </div>
  );
}