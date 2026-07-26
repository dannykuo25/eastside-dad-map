"use client";

import type { FilterId } from "@/lib/filters";
import { FILTERS } from "@/lib/filters";

interface FilterPillsProps {
  activeFilter: FilterId;
  onFilterChange: (filterId: FilterId) => void;
}

export default function FilterPills({
  activeFilter,
  onFilterChange,
}: FilterPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-neon font-semibold text-black"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
