import { Hero } from "@/components/site/Hero";
import { FeaturedArtifacts } from "@/components/site/FeaturedArtifacts";
import { SelectedEngagements } from "@/components/site/SelectedEngagements";
import { HowIWork } from "@/components/site/HowIWork";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArtifacts />
      <SelectedEngagements />
      <HowIWork />
      <About />
      <Contact />
    </>
  );
}
