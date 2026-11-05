import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";


export const metadata = {
  title: "FlyTransaction — Secure Transaction Records",
  description:
    "FlyTransaction records all data carefully and safely. IT & financial services built for modern business.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FAQ />
      <CTA />
    </>
  );
}
