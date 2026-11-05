import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { PLANS } from "@/lib/constants";

export const metadata = {
  title: "Plans — FlyTransaction",
  description: "Simple, transparent pricing for every business size.",
};

export default function PlansPage() {
  return (
    <>
      {/* Header */}
      <section className="container-custom py-16 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent <span className="text-brand">Plans</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Start free for 7 days. No credit card required. Cancel anytime.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="container-custom pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative ${
                plan.highlighted ? "ring-2 ring-brand" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <FiCheck
                      size={18}
                      className="flex-shrink-0 text-brand mt-0.5"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full ${
                  plan.highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="container-custom pb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Feature comparison
        </h2>
        <div
          className="card overflow-x-auto"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="text-center p-4 font-semibold">Basic</th>
                <th className="text-center p-4 font-semibold text-brand">
                  Standard
                </th>
                <th className="text-center p-4 font-semibold">Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Transactions / month", "100", "1,000", "Unlimited"],
                ["Users", "1", "5", "Unlimited"],
                ["Reports", "Basic", "Advanced", "Custom"],
                ["API access", "—", "✓", "✓"],
                ["Priority support", "—", "✓", "✓"],
                ["Dedicated manager", "—", "—", "✓"],
              ].map((row, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="p-4" style={{ color: "var(--text-muted)" }}>
                    {row[0]}
                  </td>
                  <td className="p-4 text-center">{row[1]}</td>
                  <td className="p-4 text-center">{row[2]}</td>
                  <td className="p-4 text-center">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}