"use client";

import { useMemo, useState } from "react";
import FilterPills from "@/components/FilterPills";
import FacilityFilters from "@/components/FacilityFilters";
import MapView from "@/components/MapView";
import VenueCard from "@/components/VenueCard";
import { filterVenues, type FilterId } from "@/lib/filters";
import type { Facility, Venue } from "@/types/venue";

interface DadMapProps {
  venues: Venue[];
}

export default function DadMap({ venues }: DadMapProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const filteredVenues = useMemo(
    () => filterVenues(venues, activeFilter).filter((venue) =>
      selectedFacilities.every((facility) => venue.facilities.includes(facility))
    ),
    [venues, activeFilter, selectedFacilities]
  );

  const handleFilterChange = (filterId: FilterId) => {
    setActiveFilter(filterId);
    setSelectedVenue(null);
  };

  const toggleFacility = (facility: Facility) => {
    setSelectedFacilities((current) => current.includes(facility) ? current.filter((item) => item !== facility) : [...current, facility]);
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
        <FacilityFilters selected={selectedFacilities} onChange={toggleFacility} />
      </header>

      <main className="relative min-h-0 flex-1">
        <MapView
          venues={filteredVenues}
          selectedVenueId={selectedVenue?.id ?? null}
          onSelectVenue={setSelectedVenue}
        />
        {filteredVenues.length === 0 && (
          <div className="pointer-events-none absolute inset-x-4 top-4 rounded-xl border border-zinc-700 bg-zinc-950/95 p-4 text-center text-sm text-zinc-300 shadow-xl">
            沒有符合所有條件的地點。試著取消一個設施篩選。
          </div>
        )}
        <VenueCard venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      </main>
    </div>
  );
}
