import { Hero } from "@/components/hero/Hero";
import { InvisibleProblem } from "@/components/sections/InvisibleProblem";
import { TheSolution } from "@/components/sections/TheSolution";
import { Capabilities } from "@/components/sections/Capabilities";
import { TheProcess } from "@/components/sections/TheProcess";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InvisibleProblem />
      <TheSolution />
      <Capabilities />
      <TheProcess />
      <FinalCTA />
    </>
  );
}
