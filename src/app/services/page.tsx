import Link from "next/link";
import {
  FiServer,
  FiCode,
  FiCloud,
  FiTrendingUp,
  FiCreditCard,
  FiPieChart,
} from "react-icons/fi";

export const metadata = {
  title: "Services — FlyTransaction",
  description: "IT and Financial Services, built for modern businesses.",
};

const IT_SERVICES = [
  {
    icon: <FiServer size={22} />,
    title: "Cloud Infrastructure",
    desc: "Managed hosting, backup, and disaster recovery with 99.9% uptime.",
  },
  {
    icon: <FiCode size={22} />,
    title: "Custom Development",
    desc: "Web apps, APIs, and integrations built to fit your workflow.",
  },
  {
    icon: <FiCloud size={22} />,
    title: "DevOps & Automation",
    desc: "CI/CD pipelines, monitoring, and zero-downtime deployments.",
  },
];

const FIN_SERVICES = [
  {
    icon: <FiCreditCard size={22} />,
    title: "Payment Processing",
    desc: "Accept UPI, cards, net banking, and NEFT/RTGS in one place.",
  },
  {
    icon: <FiPieChart size={22} />,
    title: "Financial Reporting",
    desc: "Automated P&L, cash flow, and tax reports every month.",
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Transaction Analytics",
    desc: "Real-time insights into volume, trends, and anomalies.",
  },
];

function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-6">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{
          backgroundColor: "rgba(14,165,233,0.12)",
          color: "#0EA5E9",
        }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="container-custom py-16 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-brand">Services</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Two focused practices — IT Services and Financial Services — built to
          work together seamlessly.
        </p>
      </section>

      {/* IT Services */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="container-custom">
          <div className="mb-10">
            <div className="text-sm font-semibold text-brand mb-2">
              PRACTICE 01
            </div>
            <h2 className="text-3xl font-bold mb-2">IT Services</h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Everything you need to build, ship, and run reliable software.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {IT_SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Financial Services */}
      <section className="container-custom py-16">
        <div className="mb-10">
          <div className="text-sm font-semibold text-brand mb-2">
            PRACTICE 02
          </div>
          <h2 className="text-3xl font-bold mb-2">Financial Services</h2>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            Process payments, reconcile accounts, and report with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FIN_SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* Mini CTA */}
      <section className="container-custom pb-20">
        <div className="card p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">
            Not sure which service fits?
          </h3>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>
            Our team will help you pick the right combination in one quick call.
          </p>
          <Link href="/contact" className="btn-primary">
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}