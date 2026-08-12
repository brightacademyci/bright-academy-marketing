import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Philosophy } from "@/components/Philosophy";
import { Approach } from "@/components/Approach";
import { Achievements } from "@/components/Achievements";
import { Programs } from "@/components/Programs";
import { Sites } from "@/components/Sites";
import { Gallery } from "@/components/Gallery";
import { EnrollCta } from "@/components/EnrollCta";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Philosophy />
      <Approach />
      <Achievements />
      <Programs />
      <Sites />
      <Gallery />
      <EnrollCta />
      <Footer />
    </main>
  );
}
