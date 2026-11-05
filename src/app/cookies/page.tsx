import LegalPage from "@/components/ui/LegalPage";

export const metadata = {
  title: "Cookie Policy — FlyTransaction",
  description: "How FlyTransaction uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="November 5, 2025"
      intro="This Cookie Policy explains how FlyTransaction uses cookies and similar technologies (local storage, session storage) when you visit our website or use our app. It describes what these technologies are, why we use them, and your rights to control their use."
      sections={[
        {
          title: "What Are Cookies?",
          body: (
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They allow the site to remember your actions and
              preferences over time. Similar technologies include local storage
              and session storage, which function in a comparable way for our
              app.
            </p>
          ),
        },
        {
          title: "Types of Cookies We Use",
          body: (
            <>
              <p>
                <strong>1. Strictly necessary cookies:</strong> required for the
                Service to function — e.g., session tokens that keep you logged
                in, and security tokens that protect against cross-site request
                forgery. These cannot be disabled.
              </p>
              <p>
                <strong>2. Preference cookies:</strong> remember your settings
                such as language and theme (light/dark/system). They are stored
                in your browser only.
              </p>
              <p>
                <strong>3. Analytics cookies:</strong> help us understand how
                people use the Service so we can improve it. These are
                anonymized and aggregated.
              </p>
              <p>
                <strong>4. Marketing cookies:</strong> we currently do{" "}
                <strong>not</strong> use marketing cookies. If this changes, we
                will update this policy and, where required, obtain consent.
              </p>
            </>
          ),
        },
        {
          title: "Third-Party Cookies",
          body: (
            <p>
              Some features depend on trusted third parties who may set their
              own cookies — for example, our payment processor during checkout,
              or our analytics provider. These third parties are bound by their
              own privacy policies, which we encourage you to review.
            </p>
          ),
        },
        {
          title: "Cookies We Set (Summary)",
          body: (
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="text-left p-2 font-semibold">Name</th>
                    <th className="text-left p-2 font-semibold">Purpose</th>
                    <th className="text-left p-2 font-semibold">Duration</th>
                    <th className="text-left p-2 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["flytx_session", "Keeps you logged in", "Session", "Necessary"],
                    ["theme", "Stores light/dark preference", "1 year", "Preference"],
                    ["flytx_user", "Stores your basic profile locally", "Until logout", "Preference"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      {row.map((cell, j) => (
                        <td key={j} className="p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          title: "Managing Cookies",
          body: (
            <>
              <p>
                You can control cookies through your browser settings. Most
                browsers let you block or delete cookies. Note that disabling
                strictly necessary cookies will break core features like
                staying logged in.
              </p>
              <p>
                Browser guides:{" "}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Chrome</a>{" · "}
                <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Firefox</a>{" · "}
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Safari</a>
              </p>
            </>
          ),
        },
        {
          title: "Changes to This Policy",
          body: (
            <p>
              We may update this Cookie Policy occasionally. When we do, we
              will update the &quot;Last updated&quot; date at the top. If we
              make material changes, we will notify you via email or a
              prominent notice on the Service.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              Questions? Email{" "}
              <a
                href="mailto:privacy@flytransaction.com"
                className="text-brand hover:underline"
              >
                privacy@flytransaction.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}