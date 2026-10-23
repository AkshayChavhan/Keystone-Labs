import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DATASETS, type DatasetName } from '@/lib/content.fixtures';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Services } from '@/components/sections/Services';
import { FastMenu } from '@/components/sections/FastMenu';
import { Work } from '@/components/sections/Work';
import { Solutions } from '@/components/sections/Solutions';
import { About } from '@/components/sections/About';
import { Insights } from '@/components/sections/Insights';
import { Contact } from '@/components/sections/Contact';
import { DataToggle } from './DataToggle';

export const metadata: Metadata = { title: 'Break UI', robots: { index: false, follow: false } };

function isDataset(value: string | undefined): value is DatasetName {
  return value !== undefined && value in DATASETS;
}

// Dev-only: renders the data-driven sections with a chosen dataset. 404s in production builds.
export default async function BreakUiPage({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  if (process.env.NODE_ENV !== 'development') notFound();
  const { data } = await searchParams;
  const name: DatasetName = isDataset(data) ? data : 'worst';
  const d = DATASETS[name];

  return (
    <div className="break-ui pt-16 sm:pt-[72px]">
      {/* Content appears instantly so switching datasets doesn't replay the scroll reveals. */}
      <style>{`.break-ui [data-reveal]{opacity:1!important;transform:none!important}`}</style>
      <TechMarquee items={d.techStack} />
      <Services items={d.services} extras={d.extraServices} />
      <FastMenu features={d.fastMenuFeatures} images={d.fastMenuImages} video={d.fastMenuVideo} />
      <Work items={d.projects} />
      <Solutions items={d.solutions} />
      <About founder={d.founder} />
      <Insights items={d.insights} author={d.founder.name} />
      <Contact email={d.email} phoneDisplay={d.phoneDisplay} />
      <DataToggle current={name} />
    </div>
  );
}
