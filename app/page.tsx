import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { AudienceSegments } from "@/components/site/AudienceSegments";
import { FeaturedArtifacts } from "@/components/site/FeaturedArtifacts";
import { SelectedEngagements } from "@/components/site/SelectedEngagements";
import { TrainingGallery } from "@/components/site/TrainingGallery";
import { EngagementShapes } from "@/components/site/EngagementShapes";
import { First90Days } from "@/components/site/First90Days";
import { MeasurementMethodology } from "@/components/site/MeasurementMethodology";
import { RecentThinking } from "@/components/site/RecentThinking";
import { PressStrip } from "@/components/site/PressStrip";
import { HowIWork } from "@/components/site/HowIWork";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AudienceSegments />
      <FeaturedArtifacts />
      <SelectedEngagements />
      <TrainingGallery />
      <EngagementShapes />
      <First90Days />
      <MeasurementMethodology />
      <RecentThinking />
      <PressStrip />
      <HowIWork />
      <About />
      <Contact />
    </>
  );
}
