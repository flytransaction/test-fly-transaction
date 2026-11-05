// Fake auth helpers — swap these with real API calls later

export type User = {
  name: string;
  email: string;
  role: "user" | "admin";
};

const KEY = "flytx_user";

export function saveUser(user: User) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

// Demo users — remove once backend is ready
const DEMO_USERS = [
  { email: "user@demo.com", password: "user123", name: "Demo User", role: "user" as const },
  { email: "admin@demo.com", password: "admin123", name: "Demo Admin", role: "admin" as const },
];

export function login(email: string, password: string): { ok: true; user: User } | { ok: false; error: string } {
  const match = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) return { ok: false, error: "Invalid email or password" };
  const user: User = { name: match.name, email: match.email, role: match.role };
  saveUser(user);
  return { ok: true, user };
}