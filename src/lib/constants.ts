export const NAV_LINKS = [
  { label: "About Us",  href: "/about" },
  { label: "Services",  href: "/services" },
  { label: "Plans",     href: "/plans" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Plans",    href: "/plans" },
    { label: "Contact",  href: "/contact" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy",     href: "/privacy" },
    { label: "Cookie Policy",      href: "/cookies" },
  ],
  account: [
    { label: "Login",         href: "/login" },
    { label: "Create Account", href: "/register" },
  ],
};

export const PLANS = [
  {
    name: "Basic",
    price: "₹499",
    period: "/month",
    features: ["Up to 100 transactions", "Basic reports", "Email support", "1 user"],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "₹1,499",
    period: "/month",
    features: ["Up to 1,000 transactions", "Advanced reports", "Priority support", "5 users", "API access"],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "₹4,999",
    period: "/month",
    features: ["Unlimited transactions", "Custom reports", "24/7 support", "Unlimited users", "API access", "Dedicated manager"],
    highlighted: false,
  },
];

export const FAQS = [
  { q: "What is FlyTransaction?",       a: "FlyTransaction is a secure platform for managing IT and financial transactions with full audit records." },
  { q: "Is my data safe?",              a: "Yes. All data is encrypted at rest and in transit. We maintain detailed audit logs." },
  { q: "Can I cancel anytime?",         a: "Yes. Plans are month-to-month and can be cancelled anytime from your dashboard." },
  { q: "Do you offer a free trial?",    a: "Yes, all plans include a 7-day free trial. No credit card required." },
  { q: "How do I contact support?",     a: "Email us via the Contact page or use live chat in your dashboard." },
  { q: "Which payment methods work?",   a: "We accept UPI, cards, net banking, and NEFT/RTGS for enterprise plans." },
];

export const WHY_US = [
  { title: "Secure by Design",   desc: "Bank-grade encryption, 2FA, and full audit trails on every action.", icon: "shield" },
  { title: "Fast & Reliable",    desc: "99.9% uptime SLA with sub-second response times globally.", icon: "zap" },
  { title: "Transparent Pricing", desc: "No hidden fees. Pay for what you use, cancel anytime.", icon: "receipt" },
  { title: "24/7 Support",       desc: "Real humans on chat and email around the clock.", icon: "headset" },
];