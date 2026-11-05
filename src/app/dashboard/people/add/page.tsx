"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { addPerson, nextPersonId } from "@/lib/mockData";

export default function AddPersonPage() {
  const { ready } = useAuthGuard();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [error, setError] = useState("");

  if (!ready) {
    return <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Name is required.");

    addPerson({
      id: nextPersonId(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    });
    router.push("/dashboard/people");
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/people"
          className="text-sm text-brand hover:underline inline-flex items-center gap-1 mb-2"
        >
          <FiArrowLeft size={14} /> Back to people
        </Link>
        <h1 className="text-2xl font-bold">Add Person</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Create a person, then add their transactions inside their profile.
        </p>
      </div>

      {error && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#dc2626",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="input-field"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 90000 00000"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="someone@example.com"
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Notes <span style={{ color: "var(--text-muted)" }}>(optional)</span>
          </label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Who is this person? Any context..."
            className="input-field resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary gap-2">
            <FiSave size={16} /> Save Person
          </button>
          <Link href="/dashboard/people" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}