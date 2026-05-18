import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { AudienceSegments } from "@/components/site/AudienceSegments";
import { FeaturedArtifacts } from "@/components/site/FeaturedArtifacts";
import { SelectedEngagements } from "@/components/site/SelectedEngagements";
import { TrainingGallery } from "@/components/site/TrainingGallery";
import { EngagementShapes } from "@/components/site/EngagementShapes";
import { MeasurementMethodology } from "@/components/site/MeasurementMethodology";
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
      <MeasurementMethodology />
      <PressStrip />
      <HowIWork />
      <About />
      <Contact />
    </>
  );
}
