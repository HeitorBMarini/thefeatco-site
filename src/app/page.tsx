import Hero from "@/components/home/Hero";
import Units from "@/components/home/Units";
import Welcome from "@/components/home/Welcome";
import Lookbook from "@/components/home/Lookbook";
import Record from "@/components/home/Record";
import Craft from "@/components/home/Craft";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Units />
      <Welcome />
      <Craft />
      <Lookbook />
      <Marquee dark={false} />
      <Record />
    </>
  );
}
