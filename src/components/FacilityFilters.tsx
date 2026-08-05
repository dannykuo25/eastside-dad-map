"use client";

import type { Facility } from "@/types/venue";

const FACILITIES: { id: Facility; label: string }[] = [
  { id: "slide", label: "溜滑梯" },
  { id: "swings", label: "盪鞦韆" },
  { id: "sandpit", label: "沙坑" },
  { id: "shade", label: "陰影" },
  { id: "sprayground", label: "噴水裝置" },
  { id: "restroom", label: "廁所" },
  { id: "seesaw", label: "蹺蹺板" },
  { id: "fountain", label: "飲水機"},
  { id: "soccer_field", label: "足球場" },
  { id: "tennis_court", label: "網球場" },
  { id: "basketball_court", label: "籃球場" },
  { id: "baseball_field", label: "棒球場" },
  { id: "trail", label: "小步道" },
];

export default function FacilityFilters({ selected, onChange }: { selected: Facility[]; onChange: (facility: Facility) => void }) {
  return (
    <fieldset className="mt-4 border-t border-zinc-800 pt-3">
      <legend className="px-0 text-xs font-semibold tracking-wider text-zinc-400">設施篩選</legend>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
        {FACILITIES.map((facility) => (
          <label key={facility.id} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200">
            <input type="checkbox" checked={selected.includes(facility.id)} onChange={() => onChange(facility.id)} className="h-4 w-4 accent-[#39ff14]" />
            {facility.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
