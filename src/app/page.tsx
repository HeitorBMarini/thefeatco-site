import Hero from "@/components/home/Hero";
import Drop from "@/components/home/Drop";
import Photo from "@/components/home/Photo";
import Welcome from "@/components/home/Welcome";
import Record from "@/components/home/Record";

export default function Home() {
  return (
    <>
      <Hero />
      <Drop />
      <Photo src="/img/banner-4.webp" alt="Quatro pessoas vestindo as camisetas FeaT&Co preta e off-white" />
      <Welcome />
      <Photo src="/img/banner-1.webp" alt="Dupla vestindo FeaT&Co off-white e preta" />
      <Record />
    </>
  );
}
