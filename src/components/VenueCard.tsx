"use client";

import type { Venue } from "@/types/venue";

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
