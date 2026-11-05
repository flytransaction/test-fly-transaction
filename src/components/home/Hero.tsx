import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(14,165,233,0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.08), transparent 50%)",
        }}
      />

      <div className="container-custom py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 card">
            <span className="w-2 h-2 rounded-full bg-brand" />
            <span style={{ color: "var(--text-muted)" }}>
              Trusted by 10,000+ users
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Secure{" "}
            <span className="text-brand">Transaction Records</span>{" "}
            for the Modern Business
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            FlyTransaction records every IT and financial transaction with
            bank-grade security, so you can focus on growth — not paperwork.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary gap-2">
              Get Started Free
              <FiArrowRight size={18} />
            </Link>
            <Link href="/plans" className="btn-secondary">
              View Plans
            </Link>
          </div>

          {/* Trust line */}
          <p
            className="text-sm mt-6"
            style={{ color: "var(--text-muted)" }}
          >
            7-day free trial · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}