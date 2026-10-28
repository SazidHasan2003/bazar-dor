import Hero from "@/components/Hero";
import MarketSections from "@/components/MarketSections";
import MarketSectionsSkeleton from "@/components/MarketSectionsSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Suspense fallback={<MarketSectionsSkeleton />}>
        <MarketSections />
      </Suspense>
    </main>
  );
}
