import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-custom py-24 text-center">
      <h1 className="text-6xl font-bold mb-4 text-brand">404</h1>
      <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">Go home</Link>
    </section>
  );
}