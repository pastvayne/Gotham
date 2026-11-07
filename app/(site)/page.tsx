import { Depth } from "@/components/gotham/depth";
import { Experience } from "@/components/gotham/experience";
import { Hero } from "@/components/gotham/hero";
import { Ecosystem, Problem, Roadmap } from "@/components/gotham/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Experience />
      <Ecosystem />
      <Roadmap />
      <Depth />
    </>
  );
}
