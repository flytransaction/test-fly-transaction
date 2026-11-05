// ================= TYPES =================

export type Person = {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;     // ISO
};

export type RecordItem = {
  id: string;
  personId: string;      // 👈 links to Person
  date: string;
  type: "Payment" | "Receipt" | "Refund" | "Transfer" | "Withdrawal" | "Expense";
  description: string;
  notes: string;
  amount: number;        // + = received by you, − = paid by you
  status: "Completed" | "Pending" | "Failed";
};

// ================= SEED DATA =================

export const SEED_PEOPLE: Person[] = [
  { id: "P-1001", name: "Rahul Sharma", phone: "+91 98100 10001", email: "rahul@demo.com",  notes: "Regular client — monthly retainer.", createdAt: "2025-01-12" },
  { id: "P-1002", name: "Priya Patel",  phone: "+91 98100 10002", email: "priya@demo.com",  notes: "Freelancer — design work.",          createdAt: "2025-02-20" },
  { id: "P-1003", name: "Amit Verma",   phone: "+91 98100 10003", email: "amit@demo.com",   notes: "Customer — refunds occasionally.",    createdAt: "2025-03-05" },
  { id: "P-1004", name: "Vendor Co.",   phone: "+91 98100 10004", email: "vendor@demo.com", notes: "Office supplies vendor.",             createdAt: "2025-04-10" },
];

export const SEED_RECORDS: RecordItem[] = [
  { id: "TXN-9001", personId: "P-1001", date: "2025-11-03", type: "Payment",    description: "November retainer",        amount:  12500, status: "Completed", notes: "Paid by client via NEFT." },
  { id: "TXN-9002", personId: "P-1003", date: "2025-11-02", type: "Refund",     description: "Order #884 refund",        amount:  -1800, status: "Completed", notes: "Refunded after cancellation." },
  { id: "TXN-9003", personId: "P-1004", date: "2025-11-02", type: "Transfer",   description: "Monthly payout",           amount:  -4500, status: "Pending",   notes: "Awaiting bank confirmation." },
  { id: "TXN-9004", personId: "P-1002", date: "2025-11-01", type: "Payment",    description: "Design work — logo",       amount:  3500, status: "Completed", notes: "Delivered on time." },
  { id: "TXN-9005", personId: "P-1001", date: "2025-10-28", type: "Payment",    description: "October retainer",         amount:  12500, status: "Completed", notes: "" },
  { id: "TXN-9006", personId: "P-1004", date: "2025-10-25", type: "Expense",    description: "Office supplies",          amount:  -2200, status: "Failed",    notes: "Card declined, retry next week." },
];

// ================= STORAGE — PEOPLE =================

const PEOPLE_KEY = "flytx_people";
const RECORDS_KEY = "flytx_records";

export function loadPeople(): Person[] {
  if (typeof window === "undefined") return SEED_PEOPLE;
  try {
    const raw = localStorage.getItem(PEOPLE_KEY);
    if (!raw) { savePeople(SEED_PEOPLE); return SEED_PEOPLE; }
    return JSON.parse(raw) as Person[];
  } catch {
    return SEED_PEOPLE;
  }
}

export function savePeople(people: Person[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
}

export function addPerson(person: Person): Person[] {
  const all = loadPeople();
  const next = [person, ...all];
  savePeople(next);
  return next;
}

export function updatePerson(updated: Person): Person[] {
  const all = loadPeople();
  const next = all.map((p) => (p.id === updated.id ? updated : p));
  savePeople(next);
  return next;
}

export function deletePersonAndRecords(personId: string): { people: Person[]; records: RecordItem[] } {
  const nextPeople = loadPeople().filter((p) => p.id !== personId);
  const nextRecords = loadRecords().filter((r) => r.personId !== personId);
  savePeople(nextPeople);
  saveRecords(nextRecords);
  return { people: nextPeople, records: nextRecords };
}

export function nextPersonId(): string {
  const all = loadPeople();
  const nums = all.map((p) => parseInt(p.id.replace(/\D/g, ""), 10)).filter((n) => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return `P-${max + 1}`;
}

// ================= STORAGE — RECORDS =================

export function loadRecords(): RecordItem[] {
  if (typeof window === "undefined") return SEED_RECORDS;
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (!raw) { saveRecords(SEED_RECORDS); return SEED_RECORDS; }
    return JSON.parse(raw) as RecordItem[];
  } catch {
    return SEED_RECORDS;
  }
}

export function saveRecords(records: RecordItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

export function addRecord(record: RecordItem): RecordItem[] {
  const all = loadRecords();
  const next = [record, ...all];
  saveRecords(next);
  return next;
}

export function updateRecord(updated: RecordItem): RecordItem[] {
  const all = loadRecords();
  const next = all.map((r) => (r.id === updated.id ? updated : r));
  saveRecords(next);
  return next;
}

export function deleteRecord(id: string): RecordItem[] {
  const all = loadRecords();
  const next = all.filter((r) => r.id !== id);
  saveRecords(next);
  return next;
}

export function nextRecordId(): string {
  const all = loadRecords();
  const nums = all.map((r) => parseInt(r.id.replace(/\D/g, ""), 10)).filter((n) => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 9000;
  return `TXN-${max + 1}`;
}

// ================= HELPERS =================

export function getPersonTotals(personId: string, records: RecordItem[]) {
  const mine = records.filter((r) => r.personId === personId && r.status === "Completed");
  const received = mine.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0);
  const paid     = mine.filter((r) => r.amount < 0).reduce((s, r) => s + Math.abs(r.amount), 0);
  return { received, paid, net: received - paid };
}

export function computeStats(records: RecordItem[]) {
  const completed = records.filter((r) => r.status === "Completed");
  const income  = completed.filter((r) => r.amount > 0).reduce((s, r) => s + r.amount, 0);
  const expense = completed.filter((r) => r.amount < 0).reduce((s, r) => s + Math.abs(r.amount), 0);
  const pending = records.filter((r) => r.status === "Pending").length;
  return { income, expense, balance: income - expense, pending, total: records.length };
}

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}