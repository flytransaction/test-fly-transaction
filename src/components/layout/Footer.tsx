import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--bg-soft)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-3">
              <span className="text-brand">✈</span>
              <span>FlyTransaction</span>
            </Link>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Secure IT & financial transaction records, built for peace of mind.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:text-brand transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Account</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.account.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:text-brand transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:text-brand transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t text-center text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} FlyTransaction. All rights reserved.
        </div>
      </div>
    </footer>
  );
}