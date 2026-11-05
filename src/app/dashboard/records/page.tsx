"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  loadRecords,
  loadPeople,
  formatINR,
  formatDate,
  RecordItem,
  Person,
} from "@/lib/mockData";

const TYPES = ["All", "Payment", "Receipt", "Refund", "Transfer", "Withdrawal", "Expense"] as const;

export default function RecordsOverviewPage() {
  const { ready } = useAuthGuard();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>("All");

  useEffect(() => {
    setRecords(loadRecords());
    setPeople(loadPeople());
  }, []);

  const peopleMap = useMemo(() => Object.fromEntries(people.map((p) => [p.id, p])), [people]);

  const filtered = useMemo(() => {
    return records
      .filter((r) => typeFilter === "All" || r.type === typeFilter)
      .filter((r) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        const personName = peopleMap[r.personId]?.name?.toLowerCase() || "";
        return (
          r.id.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.notes.toLowerCase().includes(q) ||
          personName.includes(q)
        );
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [records, search, typeFilter, peopleMap]);

  if (!ready) {
    return <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      {/* Back link */}
      <Link
        href="/dashboard"
        className="text-sm text-brand hover:underline inline-flex items-center gap-1"
      >
        <FiArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div>
        <h1 className="text-2xl font-bold">All Records</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {filtered.length} of {records.length} records — click a person to manage their transactions
        </p>
      </div>

      <div className="card p-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <FiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by person, ID, description..."
              className="input-field pl-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="input-field md:w-40"
          >
            {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All types" : t}</option>)}
          </select>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="text-left p-4 font-semibold">Date</th>
              <th className="text-left p-4 font-semibold">Person</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-right p-4 font-semibold">Amount</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const p = peopleMap[r.personId];
                return (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="p-4 whitespace-nowrap">{formatDate(r.date)}</td>
                    <td className="p-4">
                      <Link href={`/dashboard/people/${r.personId}`} className="font-medium hover:text-brand">
                        {p?.name || "Unknown"}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div>{r.description}</div>
                      {r.notes && (
                        <div className="text-xs mt-0.5 truncate max-w-[280px]" style={{ color: "var(--text-muted)" }} title={r.notes}>
                          {r.notes}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap font-semibold" style={{ color: r.amount >= 0 ? "#22c55e" : "#ef4444" }}>
                      {r.amount >= 0 ? "+" : ""}{formatINR(r.amount)}
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                        style={{
                          backgroundColor: r.status === "Completed" ? "rgba(34,197,94,0.12)" : r.status === "Pending" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                          color: r.status === "Completed" ? "#16a34a" : r.status === "Pending" ? "#d97706" : "#dc2626",
                        }}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/dashboard/people/${r.personId}`} className="inline-flex items-center gap-1 text-brand hover:underline text-xs">
                        Open <FiExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}