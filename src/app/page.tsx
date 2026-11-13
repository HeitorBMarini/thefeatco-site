import Hero from "@/components/home/Hero";
import Units from "@/components/home/Units";
import Welcome from "@/components/home/Welcome";
import Lookbook from "@/components/home/Lookbook";
import Record from "@/components/home/Record";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Units />
      <Welcome />
      <Lookbook />
      <Marquee dark={false} />
      <Record />
    </>
  );
}
