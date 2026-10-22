import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Services } from '@/components/sections/Services';
import { FastMenu } from '@/components/sections/FastMenu';
import { Work } from '@/components/sections/Work';
import { Solutions } from '@/components/sections/Solutions';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
import { Insights } from '@/components/sections/Insights';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <FastMenu />
      <Work />
      <Solutions />
      <Process />
      <About />
      <Insights />
      <Contact />
    </>
  );
}
