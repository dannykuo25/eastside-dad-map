"use client";

import type { Venue } from "@/types/venue";

const FACILITY_LABELS: Record<string, string> = {
  slide: "溜滑梯",
  swings: "盪鞦韆",
  sandpit: "沙坑",
  shade: "陰影",
  sprayground: "噴水裝置",
  restroom: "廁所",
  seesaw: "蹺蹺板",
  fountain: "飲水機",
  soccer_field: "足球場",
  tennis_court: "網球場",
  basketball_court: "籃球場",
  baseball_field: "棒球場",
  trail: "小步道",
};

interface VenueCardProps {
  venue: Venue | null;
  onClose: () => void;
}

function parseRating(rating: string): { filled: number; total: number } {
  const match = rating.match(/^(\d+)\/(\d+)$/);
  if (!match) {
    return { filled: 0, total: 5 };
  }
  return { filled: parseInt(match[1], 10), total: parseInt(match[2], 10) };
}

function StarRating({ rating }: { rating: string }) {
  const { filled, total } = parseRating(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={index < filled ? "text-neon" : "text-zinc-600"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-sm text-zinc-400">Stroller {rating}</span>
    </div>
  );
}

export default function VenueCard({ venue, onClose }: VenueCardProps) {
  if (!venue) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-20">
      <div className="mx-auto max-w-lg rounded-t-2xl border border-zinc-800 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-sm">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">{venue.name}</h2>
            <p className="text-sm text-zinc-400">{venue.area}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            aria-label="Close venue details"
          >
            ✕
          </button>
        </div>

        <StarRating rating={venue.stroller_rating} />

        {venue.facilities.length > 0 && (
          <section className="mt-4">
            <h3 className="text-xs font-semibold tracking-wide text-zinc-400">設施</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {venue.facilities.map((facility) => (
                <span
                  key={facility}
                  className="rounded-full border border-neon/40 bg-neon/10 px-2.5 py-1 text-xs font-medium text-neon"
                >
                  {FACILITY_LABELS[facility] ?? facility}
                </span>
              ))}
            </div>
          </section>
        )}

        {venue.photos && venue.photos.length > 0 && (
          <section className="mt-4">
            <h3 className="text-xs font-semibold tracking-wide text-zinc-400">現場照片</h3>
            <div className="mt-2 flex snap-x gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {venue.photos.map((photo, index) => (
                <img
                  key={photo}
                  src={photo}
                  alt={`${venue.name} photo ${index + 1}`}
                  loading="lazy"
                  className="h-36 w-52 shrink-0 snap-start rounded-lg border border-zinc-700 object-cover"
                />
              ))}
            </div>
          </section>
        )}

        <ul className="mt-4 space-y-1.5">
          {venue.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-zinc-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-lg border border-neon/40 bg-zinc-900/80 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neon">
            Dad&apos;s Insider Tip
          </p>
          <p className="text-sm leading-relaxed text-zinc-200">{venue.dad_tip.trim()}</p>
        </div>
      </div>
    </div>
  );
}
