import LegalPage from "@/components/ui/LegalPage";

export const metadata = {
  title: "Terms & Conditions — FlyTransaction",
  description: "Terms governing the use of the FlyTransaction platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="November 5, 2025"
      intro="Welcome to FlyTransaction. These Terms & Conditions ('Terms') govern your access to and use of the FlyTransaction platform, website, and services (collectively, the 'Service'). By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service."
      sections={[
        {
          title: "Account Registration",
          body: (
            <>
              <p>
                You must provide accurate, current, and complete information
                during registration and keep it updated. You are responsible
                for maintaining the confidentiality of your login credentials
                and for all activity that occurs under your account.
              </p>
              <p>
                You must be at least 18 years old and legally capable of
                entering into binding contracts to use the Service.
              </p>
            </>
          ),
        },
        {
          title: "Acceptable Use",
          body: (
            <p>
              You agree not to use the Service for any unlawful purpose, to
              transmit malicious code, to attempt unauthorized access, to
              interfere with other users, or to reverse-engineer any part of
              the platform. We reserve the right to suspend or terminate
              accounts that violate these rules.
            </p>
          ),
        },
        {
          title: "Subscriptions & Billing",
          body: (
            <>
              <p>
                Paid plans are billed monthly in advance. All fees are
                exclusive of applicable taxes unless stated otherwise. You
                authorize us to charge your chosen payment method on each
                renewal date.
              </p>
              <p>
                You may cancel at any time from your dashboard. Cancellation
                takes effect at the end of the current billing period — we do
                not provide pro-rated refunds for partial months, except where
                required by law.
              </p>
            </>
          ),
        },
        {
          title: "Intellectual Property",
          body: (
            <p>
              The Service, including its software, design, logos, and content
              (excluding your data), is owned by FlyTransaction and its
              licensors and protected by intellectual property laws. You may
              not copy, modify, distribute, or create derivative works without
              our written permission.
            </p>
          ),
        },
        {
          title: "Your Data",
          body: (
            <p>
              You retain ownership of all data you submit to the Service. You
              grant us a limited license to store, process, and display that
              data solely to provide the Service. We handle your data in
              accordance with our Privacy Policy.
            </p>
          ),
        },
        {
          title: "Service Availability",
          body: (
            <p>
              We aim for 99.9% monthly uptime but do not guarantee
              uninterrupted access. Scheduled maintenance will be announced in
              advance where practicable. We are not liable for downtime caused
              by third-party providers, network failures, or events beyond our
              reasonable control.
            </p>
          ),
        },
        {
          title: "Disclaimer of Warranties",
          body: (
            <p>
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, express or
              implied, including merchantability, fitness for a particular
              purpose, or non-infringement. We do not warrant that the Service
              will be error-free or that defects will be corrected.
            </p>
          ),
        },
        {
          title: "Limitation of Liability",
          body: (
            <p>
              To the maximum extent permitted by law, FlyTransaction shall not
              be liable for any indirect, incidental, special, consequential,
              or punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly. Our total liability under these
              Terms shall not exceed the amount you paid us in the 12 months
              preceding the claim.
            </p>
          ),
        },
        {
          title: "Termination",
          body: (
            <p>
              We may suspend or terminate your access to the Service at any
              time if you materially breach these Terms. You may terminate
              your account at any time through the dashboard. Upon termination,
              your right to use the Service ceases immediately, and we may
              delete your data after a reasonable retention period.
            </p>
          ),
        },
        {
          title: "Governing Law",
          body: (
            <p>
              These Terms are governed by the laws of India. Any disputes
              arising out of or in connection with these Terms shall be subject
              to the exclusive jurisdiction of the courts located in Mumbai,
              Maharashtra.
            </p>
          ),
        },
        {
          title: "Changes to These Terms",
          body: (
            <p>
              We may update these Terms from time to time. Material changes
              will be communicated via email or an in-app notice at least 14
              days before they take effect. Continued use of the Service after
              changes take effect constitutes acceptance of the revised Terms.
            </p>
          ),
        },
      ]}
    />
  );
}