"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch, FiPlus, FiChevronRight, FiPhone, FiMail, FiArrowLeft } from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  loadPeople,
  loadRecords,
  getPersonTotals,
  formatINR,
  Person,
  RecordItem,
} from "@/lib/mockData";

export default function PeoplePage() {
  const { ready } = useAuthGuard();
  const [people, setPeople] = useState<Person[]>([]);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPeople(loadPeople());
    setRecords(loadRecords());
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return people;
    const q = search.toLowerCase();
    return people.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q)
    );
  }, [people, search]);

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

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">People</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {people.length} {people.length === 1 ? "person" : "people"} · select one to see their records
          </p>
        </div>
        <Link href="/dashboard/people/add" className="btn-primary gap-2">
          <FiPlus size={16} /> Add Person
        </Link>
      </div>

      {/* Search */}
      <div className="card p-4">
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
            placeholder="Search by name, email, or phone..."
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Grid of cards */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center" style={{ color: "var(--text-muted)" }}>
          {people.length === 0 ? (
            <>
              No people yet.{" "}
              <Link href="/dashboard/people/add" className="text-brand hover:underline">
                Add your first one →
              </Link>
            </>
          ) : (
            "No matches for your search."
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => {
            const totals = getPersonTotals(p.id, records);
            const initials = p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            return (
              <Link
                key={p.id}
                href={`/dashboard/people/${p.id}`}
                className="card p-5 hover:opacity-90 transition-opacity"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-base truncate">{p.name}</h3>
                      <FiChevronRight size={18} style={{ color: "var(--text-muted)" }} className="flex-shrink-0" />
                    </div>
                    <div className="text-xs mt-1 space-y-0.5" style={{ color: "var(--text-muted)" }}>
                      {p.phone && <div className="flex items-center gap-1.5"><FiPhone size={11} /> {p.phone}</div>}
                      {p.email && <div className="flex items-center gap-1.5 truncate"><FiMail size={11} /> {p.email}</div>}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                      <div>
                        <div style={{ color: "var(--text-muted)" }}>Received</div>
                        <div className="font-semibold" style={{ color: "#22c55e" }}>
                          {formatINR(totals.received)}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: "var(--text-muted)" }}>Paid</div>
                        <div className="font-semibold" style={{ color: "#ef4444" }}>
                          {formatINR(totals.paid)}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: "var(--text-muted)" }}>Net</div>
                        <div className="font-semibold" style={{ color: totals.net >= 0 ? "#22c55e" : "#ef4444" }}>
                          {formatINR(totals.net)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}