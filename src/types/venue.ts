export type VenueCategory = "park" | "nature" | "cafe" | "indoor";

export interface Venue {
  id: string;
  name: string;
  area: string;
  category: VenueCategory;
  lat: number;
  lng: number;
  stroller_rating: string;
  features: string[];
  dad_tip: string;
}
