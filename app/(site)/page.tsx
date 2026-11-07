import { Depth } from "@/components/gotham/depth";
import { Experience } from "@/components/gotham/experience";
import { Hero } from "@/components/gotham/hero";
import { HowItWorks, Infrastructure, Problem, Roadmap } from "@/components/gotham/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Experience />
      <Infrastructure />
      <Roadmap />
      <Depth />
    </>
  );
}
