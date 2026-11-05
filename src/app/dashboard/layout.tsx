
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiUser,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { clearUser } from "@/lib/auth";

const NAV = [
  { label: "Records", href: "/dashboard/records", icon: <FiFileText size={18} /> },
  { label: "Profile", href: "/dashboard/profile", icon: <FiUser size={18} /> },
  { label: "Settings", href: "/dashboard/settings", icon: <FiSettings size={18} /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  return (
    <div className="container-custom py-8">
      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <span className="font-semibold">Dashboard</span>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex items-center justify-center card"
            aria-label="Toggle menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            card p-3 h-fit md:sticky md:top-20
            ${open ? "block" : "hidden"} md:block
          `}
        >
          <nav className="space-y-1">
            {NAV.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-brand text-white" : "hover:opacity-80"
                  }`}
                  style={!active ? { color: "var(--text-muted)" } : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="mt-4 pt-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: "#dc2626" }}
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
