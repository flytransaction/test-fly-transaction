import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function CTA() {
  return (
    <section className="container-custom py-20">
      <div
        className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to take off with FlyTransaction?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust us with their transaction
            records. Get started in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-brand-dark font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Free Account
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}