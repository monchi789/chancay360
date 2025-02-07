import Hero from "@/app/components/Hero";
import ValueProposition from "@/app/components/ValueProposition";
import News from "@/app/components/News";
import FeaturedProjects from "@/app/components/FeaturedProjects";
import JobBoard from "@/app/components/JobBoard";
import CallToAction from "@/app/components/CallToAction";
export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <News />
      <FeaturedProjects />
      <JobBoard />
      <CallToAction/>
    </main>
  );
}
