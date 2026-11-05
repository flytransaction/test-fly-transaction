import { FiShield, FiLock, FiEye, FiCheckCircle } from "react-icons/fi";

export const metadata = {
  title: "About Us — FlyTransaction",
  description: "FlyTransaction records all data carefully and safely.",
};

const VALUES = [
  {
    icon: <FiShield size={22} />,
    title: "Security First",
    desc: "Bank-grade encryption at rest and in transit. Every record is protected.",
  },
  {
    icon: <FiLock size={22} />,
    title: "Privacy by Default",
    desc: "Your data belongs to you. We never sell, share, or mine it.",
  },
  {
    icon: <FiEye size={22} />,
    title: "Full Transparency",
    desc: "Detailed audit logs let you see exactly who accessed what, when.",
  },
  {
    icon: <FiCheckCircle size={22} />,
    title: "Careful Records",
    desc: "Every transaction is validated, timestamped, and stored durably.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header block */}
      <section className="container-custom py-16 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-brand">FlyTransaction</span>
        </h1>
        <p
          className="text-lg max-w-3xl mx-auto leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          FlyTransaction records all data carefully and safely. We exist to give
          businesses a trustworthy ledger of their IT and financial
          transactions — with the security, speed, and clarity modern teams
          deserve.
        </p>
      </section>

      {/* Story section */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="container-custom grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div
              className="space-y-4 text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              <p>
                FlyTransaction started with a simple frustration: transaction
                records were scattered, insecure, and nearly impossible to
                audit. Small businesses were losing hours every week chasing
                data across spreadsheets and emails.
              </p>
              <p>
                We built FlyTransaction to solve exactly that — a single, secure
                place where every IT and financial transaction is recorded
                carefully and safely, with instant search, export, and
                role-based access.
              </p>
              <p>
                Today, thousands of businesses rely on our platform for
                compliance, reporting, and peace of mind.
              </p>
            </div>
          </div>
          <div className="card p-8">
            <h3 className="font-semibold text-xl mb-4">By the numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: "10K+", l: "Active users" },
                { n: "2M+", l: "Records stored" },
                { n: "99.9%", l: "Uptime SLA" },
                { n: "24/7", l: "Support" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-brand">{s.n}</div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-custom py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6 flex gap-4">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "rgba(14,165,233,0.12)",
                  color: "#0EA5E9",
                }}
              >
                {v.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{v.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}