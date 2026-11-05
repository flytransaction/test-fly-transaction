"use client";

import { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiSave } from "react-icons/fi";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { getUser, saveUser, User } from "@/lib/auth";

export default function ProfilePage() {
  const { ready } = useAuthGuard();
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (u) {
      setUser(u);
      const extra = localStorage.getItem("flytx_profile_extra");
      if (extra) {
        const p = JSON.parse(extra);
        setPhone(p.phone || "");
        setBio(p.bio || "");
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) saveUser(user);
    localStorage.setItem("flytx_profile_extra", JSON.stringify({ phone, bio }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!ready || !user) {
    return <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>;
  }

  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {/* Avatar card */}
      <div className="card p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-brand text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>{user.email}</div>
          <div className="text-xs mt-1 uppercase tracking-wide text-brand font-semibold">
            {user.role}
          </div>
        </div>
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
          ✓ Profile saved
        </div>
      )}

      {/* Edit form */}
      <form onSubmit={handleSave} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <div className="relative">
            <FiUser size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <FiMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <div className="relative">
            <FiPhone size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 90000 00000"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="A short description about you"
            className="input-field resize-none"
          />
        </div>

        <button type="submit" className="btn-primary gap-2">
          <FiSave size={16} /> Save changes
        </button>
      </form>
    </div>
  );
}