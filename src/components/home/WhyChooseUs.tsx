import { FiShield, FiZap, FiFileText, FiHeadphones } from "react-icons/fi";
import { WHY_US } from "@/lib/constants";
import { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  shield:  <FiShield size={24} />,
  zap:     <FiZap size={24} />,
  receipt: <FiFileText size={24} />,
  headset: <FiHeadphones size={24} />,
};

export default function WhyChooseUs() {
  return (
    <section className="container-custom py-20">
      {/* Section heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Why Choose <span className="text-brand">FlyTransaction</span>?
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Built with security, speed, and simplicity at its core.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_US.map((item) => (
          <div key={item.title} className="card p-6">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{
                backgroundColor: "rgba(14,165,233,0.12)",
                color: "#0EA5E9",
              }}
            >
              {ICONS[item.icon]}
            </div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}