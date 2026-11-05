"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Everything you need to know about FlyTransaction.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium hover:opacity-80 transition-opacity"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown
                    size={20}
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: "var(--text-muted)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}