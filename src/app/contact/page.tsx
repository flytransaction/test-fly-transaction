"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet — just show success message
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Contact form submitted:", data);
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      {/* Header */}
      <section className="container-custom py-16 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get in <span className="text-brand">Touch</span>
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Questions, feedback, or a custom plan? We reply within one business
          day.
        </p>
      </section>

      {/* Form + Info */}
      <section className="container-custom pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact info cards */}
          <div className="space-y-4 md:col-span-1">
            {[
              {
                icon: <FiMail size={20} />,
                label: "Email",
                value: "hello@flytransaction.com",
              },
              {
                icon: <FiPhone size={20} />,
                label: "Phone",
                value: "+91 90000 00000",
              },
              {
                icon: <FiMapPin size={20} />,
                label: "Office",
                value: "Mumbai, India",
              },
            ].map((item) => (
              <div key={item.label} className="card p-5 flex gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(14,165,233,0.12)",
                    color: "#0EA5E9",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-medium uppercase tracking-wide mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </div>
                  <div className="text-sm font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card p-8 md:col-span-2">
            {sent && (
              <div
                className="mb-6 p-4 rounded-lg text-sm"
                style={{
                  backgroundColor: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#16a34a",
                }}
              >
                ✓ Thanks! Your message has been recorded. (No backend yet — form
                data is logged to console.)
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you need..."
                  className="input-field resize-none"
                />
              </div>

              <button type="submit" className="btn-primary gap-2 w-full md:w-auto">
                Send Message
                <FiSend size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}