import type { Venue } from "@/types/venue";

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "park", label: "🌳 Parks" },
  { id: "cafe", label: "☕ Coffee & Fuel" },
  { id: "indoor", label: "📚 Indoor & Storytime" },
] as const;

export type FilterId = (typeof FILTERS)[number]["id"];

export function filterVenues(venues: Venue[], filterId: FilterId): Venue[] {
  switch (filterId) {
    case "all":
      return venues;
    case "park":
      return venues.filter(
        (venue) => venue.category === "park" || venue.category === "nature"
      );
    case "cafe":
      return venues.filter((venue) => venue.category === "cafe");
    case "indoor":
      return venues.filter((venue) => venue.category === "indoor");
    default:
      return venues;
  }
}
