import LegalPage from "@/components/ui/LegalPage";

export const metadata = {
  title: "Privacy Policy — FlyTransaction",
  description: "How FlyTransaction collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 5, 2025"
      intro="FlyTransaction is committed to protecting your privacy. This policy explains what information we collect, how we use it, who we share it with, and the choices you have. We do not sell your personal data — ever."
      sections={[
        {
          title: "Information We Collect",
          body: (
            <>
              <p>
                <strong>Account data:</strong> name, email, password (hashed),
                and optionally phone number and profile details you choose to
                add.
              </p>
              <p>
                <strong>Usage data:</strong> pages visited, features used, IP
                address, browser type, and device identifiers — collected to
                improve the Service and detect abuse.
              </p>
              <p>
                <strong>Transaction data:</strong> records you create or import
                into the platform, including amounts, dates, descriptions, and
                statuses.
              </p>
              <p>
                <strong>Payment data:</strong> billing address and the last four
                digits of your card. Full card numbers are handled directly by
                our PCI-DSS-compliant payment processor and never touch our
                servers.
              </p>
            </>
          ),
        },
        {
          title: "How We Use Your Information",
          body: (
            <p>
              We use your information to provide and improve the Service,
              authenticate you, process payments, send service-related
              notifications, respond to support requests, detect and prevent
              fraud, and comply with legal obligations. We do not use your
              data for advertising.
            </p>
          ),
        },
        {
          title: "Legal Basis for Processing (GDPR)",
          body: (
            <p>
              If you are in the European Economic Area, our legal bases for
              processing are: (a) performance of a contract — to provide the
              Service; (b) legitimate interests — to secure and improve the
              Service; (c) consent — for optional communications; and (d)
              legal obligation — to comply with applicable law.
            </p>
          ),
        },
        {
          title: "Sharing & Disclosure",
          body: (
            <>
              <p>
                We share data only with: (a) service providers who help us run
                the platform (hosting, payment processing, email delivery) under
                strict confidentiality agreements; (b) authorities, when legally
                required and after careful review; (c) successors in the event
                of a merger or acquisition, subject to the same privacy
                commitments.
              </p>
              <p>
                We <strong>never</strong> sell your personal data to third
                parties.
              </p>
            </>
          ),
        },
        {
          title: "Data Retention",
          body: (
            <p>
              We retain account data while your account is active and for up to
              12 months after closure for legal and accounting purposes. You
              can request earlier deletion of your personal data (see Your
              Rights below), subject to legal retention requirements.
            </p>
          ),
        },
        {
          title: "Data Security",
          body: (
            <p>
              We use industry-standard safeguards: TLS 1.3 in transit, AES-256
              at rest, hashed passwords (bcrypt/argon2), role-based access
              controls, audit logs, and regular security reviews. No system is
              100% secure — you are responsible for safeguarding your
              credentials.
            </p>
          ),
        },
        {
          title: "Cookies & Tracking",
          body: (
            <p>
              We use strictly necessary cookies for session management and a
              small number of analytics cookies to understand usage. You can
              control cookies via your browser settings. See our Cookie Policy
              for details.
            </p>
          ),
        },
        {
          title: "Your Rights",
          body: (
            <>
              <p>
                Depending on your jurisdiction, you may have the right to
                access, correct, or delete your personal data; to restrict or
                object to processing; to data portability; and to withdraw
                consent at any time.
              </p>
              <p>
                To exercise any of these rights, email{" "}
                <a
                  href="mailto:privacy@flytransaction.com"
                  className="text-brand hover:underline"
                >
                  privacy@flytransaction.com
                </a>
                . We respond within 30 days.
              </p>
            </>
          ),
        },
        {
          title: "Children's Privacy",
          body: (
            <p>
              The Service is not intended for anyone under 18. We do not
              knowingly collect personal information from children. If you
              believe a child has provided us with data, contact us and we will
              delete it promptly.
            </p>
          ),
        },
        {
          title: "International Transfers",
          body: (
            <p>
              Your data may be processed in countries outside your own, where
              privacy laws may differ. Where required, we use Standard
              Contractual Clauses or equivalent safeguards to ensure your data
              remains protected.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              Questions or concerns about this policy? Email{" "}
              <a
                href="mailto:privacy@flytransaction.com"
                className="text-brand hover:underline"
              >
                privacy@flytransaction.com
              </a>{" "}
              or write to us at our Mumbai office. We aim to resolve all
              privacy concerns promptly.
            </p>
          ),
        },
      ]}
    />
  );
}