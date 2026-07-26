"use client";

import { useMemo, useState } from "react";
import FilterPills from "@/components/FilterPills";
import MapView from "@/components/MapView";
import VenueCard from "@/components/VenueCard";
import { filterVenues, type FilterId } from "@/lib/filters";
import type { Venue } from "@/types/venue";

interface DadMapProps {
  venues: Venue[];
}

export default function DadMap({ venues }: DadMapProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const filteredVenues = useMemo(
    () => filterVenues(venues, activeFilter),
    [venues, activeFilter]
  );

  const handleFilterChange = (filterId: FilterId) => {
    setActiveFilter(filterId);
    setSelectedVenue(null);
  };

  return (
    <div className="flex h-dvh flex-col bg-black">
      <header className="shrink-0 border-b border-zinc-800 bg-zinc-950 px-4 pb-3 pt-4">
        <h1 className="text-lg font-bold tracking-tight text-white">
          Eastside Active Dad Map
        </h1>
        <p className="mb-3 text-xs text-zinc-500">
          硬核奶爸實測推車友善地圖
        </p>
        <FilterPills
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </header>

      <main className="relative min-h-0 flex-1">
        <MapView
          venues={filteredVenues}
          selectedVenueId={selectedVenue?.id ?? null}
          onSelectVenue={setSelectedVenue}
        />
        <VenueCard venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      </main>
    </div>
  );
}
