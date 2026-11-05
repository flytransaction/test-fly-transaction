"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPhone,
  FiMail,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  loadPeople,
  loadRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  updatePerson,
  nextRecordId,
  getPersonTotals,
  formatINR,
  formatDate,
  Person,
  RecordItem,
} from "@/lib/mockData";

const TYPES: RecordItem["type"][] = [
  "Payment", "Receipt", "Refund", "Transfer", "Withdrawal", "Expense",
];

function emptyForm(): {
  direction: "in" | "out";
  amount: string;
  type: RecordItem["type"];
  description: string;
  date: string;
  status: RecordItem["status"];
  notes: string;
} {
  return {
    direction: "in",
    amount: "",
    type: "Payment",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    status: "Completed",
    notes: "",
  };
}

export default function PersonDetailPage() {
  const { ready } = useAuthGuard();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [person, setPerson] = useState<Person | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // edit person
  const [editingPerson, setEditingPerson] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", email: "", notes: "" });

  // add record form
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const p = loadPeople().find((x) => x.id === id);
    if (!p) { router.replace("/dashboard/people"); return; }
    setPerson(p);
    setEditForm({ name: p.name, phone: p.phone, email: p.email, notes: p.notes });
    setRecords(loadRecords());
    setLoaded(true);
  }, [id, router]);

  if (!ready || !loaded || !person) {
    return <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;
  }

  const myRecords = records
    .filter((r) => r.personId === id)
    .sort((a, b) => b.date.localeCompare(a.date));
  const totals = getPersonTotals(id, records);

  // ========== PERSON EDIT ==========
  const savePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name.trim()) return;
    const updated: Person = { ...person, ...editForm };
    updatePerson(updated);
    setPerson(updated);
    setEditingPerson(false);
  };

  // ========== RECORD FORM ==========
  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setFormError("");
    setShowAddForm(true);
  };

  const openEdit = (r: RecordItem) => {
    setEditId(r.id);
    setForm({
      direction: r.amount >= 0 ? "in" : "out",
      amount: String(Math.abs(r.amount)),
      type: r.type,
      description: r.description,
      date: r.date,
      status: r.status,
      notes: r.notes,
    });
    setFormError("");
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditId(null);
    setFormError("");
  };

  const saveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) return setFormError("Amount must be greater than 0.");

    const signed = form.direction === "in" ? Math.abs(amt) : -Math.abs(amt);

    if (editId) {
      updateRecord({
        id: editId,
        personId: id,
        date: form.date,
        type: form.type,
        description: form.description.trim() || form.type,
        notes: form.notes.trim(),
        amount: signed,
        status: form.status,
      });
    } else {
      addRecord({
        id: nextRecordId(),
        personId: id,
        date: form.date,
        type: form.type,
        description: form.description.trim() || form.type,
        notes: form.notes.trim(),
        amount: signed,
        status: form.status,
      });
    }

    setRecords(loadRecords());
    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteRecord(deleteId);
    setRecords(loadRecords());
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link
          href="/dashboard/people"
          className="text-sm text-brand hover:underline inline-flex items-center gap-1 mb-2"
        >
          <FiArrowLeft size={14} /> Back to people
        </Link>
      </div>

      {/* Person card */}
      <div className="card p-6">
        {editingPerson ? (
          <form onSubmit={savePerson} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <input
                  type="text"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary gap-2">
                <FiSave size={16} /> Save
              </button>
              <button type="button" onClick={() => setEditingPerson(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                {person.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold">{person.name}</h1>
                <div className="text-xs mt-1 space-y-0.5" style={{ color: "var(--text-muted)" }}>
                  {person.phone && <div className="flex items-center gap-1.5"><FiPhone size={11} /> {person.phone}</div>}
                  {person.email && <div className="flex items-center gap-1.5"><FiMail size={11} /> {person.email}</div>}
                </div>
                {person.notes && (
                  <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                    {person.notes}
                  </p>
                )}
              </div>
            </div>
            <button onClick={() => setEditingPerson(true)} className="btn-secondary gap-2 text-sm">
              <FiEdit2 size={14} /> Edit Person
            </button>
          </div>
        )}

        {/* Totals */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Received from</div>
            <div className="text-lg font-bold" style={{ color: "#22c55e" }}>{formatINR(totals.received)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Paid to</div>
            <div className="text-lg font-bold" style={{ color: "#ef4444" }}>{formatINR(totals.paid)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Net balance</div>
            <div className="text-lg font-bold" style={{ color: totals.net >= 0 ? "#22c55e" : "#ef4444" }}>
              {formatINR(totals.net)}
            </div>
          </div>
        </div>
      </div>

      {/* Records header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Records</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {myRecords.length} {myRecords.length === 1 ? "transaction" : "transactions"} with {person.name.split(" ")[0]}
          </p>
        </div>
        {!showAddForm && (
          <button onClick={openAdd} className="btn-primary gap-2">
            <FiPlus size={16} /> Add Record
          </button>
        )}
      </div>

      {/* Add/Edit form */}
      {showAddForm && (
        <form onSubmit={saveRecord} className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editId ? "Edit Record" : "New Record"}</h3>
            <button type="button" onClick={closeForm} className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-80">
              <FiX size={18} />
            </button>
          </div>

          {formError && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#dc2626",
              }}
            >
              {formError}
            </div>
          )}

          {/* Direction */}
          <div className="grid grid-cols-2 gap-3">
            {(["in", "out"] as const).map((d) => {
              const active = form.direction === d;
              const color = d === "in" ? "#22c55e" : "#ef4444";
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setForm({ ...form, direction: d })}
                  className="py-2.5 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: active ? `${color}20` : "var(--bg-soft)",
                    border: active ? `2px solid ${color}` : "1px solid var(--border)",
                    color: active ? color : "var(--text)",
                  }}
                >
                  {d === "in" ? "Money In (from them)" : "Money Out (to them)"}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount (₹) *</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as RecordItem["type"] })}
                className="input-field"
              >
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as RecordItem["status"] })}
                className="input-field"
              >
                {(["Completed", "Pending", "Failed"] as const).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short label (optional)"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Notes <span style={{ color: "var(--text-muted)" }}>(optional)</span>
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Reference numbers, context, anything useful..."
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary gap-2">
              <FiSave size={16} /> {editId ? "Update" : "Save"} Record
            </button>
            <button type="button" onClick={closeForm} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {/* Records table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="text-left p-4 font-semibold">Date</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-left p-4 font-semibold">Notes</th>
              <th className="text-right p-4 font-semibold">Amount</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                  No records yet for {person.name}.{" "}
                  {!showAddForm && (
                    <button onClick={openAdd} className="text-brand hover:underline">
                      Add the first one →
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              myRecords.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="p-4 whitespace-nowrap">{formatDate(r.date)}</td>
                  <td className="p-4">
                    <div className="font-medium">{r.description}</div>
                    <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>
                      {r.id} · {r.type}
                    </div>
                  </td>
                  <td className="p-4 text-xs max-w-[200px] truncate" style={{ color: "var(--text-muted)" }} title={r.notes}>
                    {r.notes || "—"}
                  </td>
                  <td
                    className="p-4 text-right whitespace-nowrap font-semibold"
                    style={{ color: r.amount >= 0 ? "#22c55e" : "#ef4444" }}
                  >
                    {r.amount >= 0 ? "+" : ""}
                    {formatINR(r.amount)}
                  </td>
                  <td className="p-4">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor:
                          r.status === "Completed" ? "rgba(34,197,94,0.12)" :
                          r.status === "Pending"   ? "rgba(245,158,11,0.12)" :
                                                     "rgba(239,68,68,0.12)",
                        color:
                          r.status === "Completed" ? "#16a34a" :
                          r.status === "Pending"   ? "#d97706" :
                                                     "#dc2626",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(r)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-80"
                        style={{ color: "#0EA5E9" }}
                        aria-label="Edit"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(r.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-80"
                        style={{ color: "#dc2626" }}
                        aria-label="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setDeleteId(null)}
        >
          <div className="card p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Delete this record?</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Record <strong>{deleteId}</strong> will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#dc2626" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}