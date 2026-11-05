export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "Basic" | "Standard" | "Premium" | "Trial";
  status: "Active" | "Suspended" | "Pending";
  joined: string;   // ISO
  lastActive: string; // ISO
};

export const MOCK_USERS: AdminUser[] = [
  { id: "U-1001", name: "Aarav Sharma",   email: "aarav@demo.com",   role: "user",  plan: "Premium",  status: "Active",    joined: "2025-01-12", lastActive: "2025-11-04" },
  { id: "U-1002", name: "Priya Patel",    email: "priya@demo.com",   role: "user",  plan: "Standard", status: "Active",    joined: "2025-02-20", lastActive: "2025-11-05" },
  { id: "U-1003", name: "Rohan Mehta",    email: "rohan@demo.com",   role: "user",  plan: "Basic",    status: "Suspended", joined: "2025-03-04", lastActive: "2025-10-12" },
  { id: "U-1004", name: "Sneha Iyer",     email: "sneha@demo.com",   role: "user",  plan: "Premium",  status: "Active",    joined: "2025-04-18", lastActive: "2025-11-03" },
  { id: "U-1005", name: "Vikram Singh",   email: "vikram@demo.com",  role: "user",  plan: "Trial",    status: "Pending",   joined: "2025-05-01", lastActive: "2025-11-04" },
  { id: "U-1006", name: "Ananya Rao",     email: "ananya@demo.com",  role: "user",  plan: "Standard", status: "Active",    joined: "2025-06-10", lastActive: "2025-11-02" },
  { id: "U-1007", name: "Karan Verma",    email: "karan@demo.com",   role: "user",  plan: "Basic",    status: "Active",    joined: "2025-07-22", lastActive: "2025-10-29" },
  { id: "U-1008", name: "Meera Nair",     email: "meera@demo.com",   role: "user",  plan: "Premium",  status: "Active",    joined: "2025-08-14", lastActive: "2025-11-05" },
  { id: "U-1009", name: "Aditya Joshi",   email: "aditya@demo.com",  role: "admin", plan: "Premium",  status: "Active",    joined: "2025-01-01", lastActive: "2025-11-05" },
  { id: "U-1010", name: "Nisha Kapoor",   email: "nisha@demo.com",   role: "user",  plan: "Trial",    status: "Pending",   joined: "2025-10-30", lastActive: "2025-11-05" },
];

export function computeAdminStats(users: AdminUser[]) {
  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "Active").length,
    suspended: users.filter((u) => u.status === "Suspended").length,
    admins: users.filter((u) => u.role === "admin").length,
    premium: users.filter((u) => u.plan === "Premium").length,
    pending: users.filter((u) => u.status === "Pending").length,
  };
}

export function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}