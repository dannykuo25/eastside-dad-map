export type VenueCategory = "park" | "nature" | "cafe" | "indoor";
export type Facility =
  | "slide"
  | "swings"
  | "sandpit"
  | "shade"
  | "sprayground"
  | "restroom"
  | "seesaw"
  | "fountain"
  | "soccer_field"
  | "tennis_court"
  | "basketball_court"
  | "baseball_field"
  | "trail";

export interface Venue {
  id: string;
  name: string;
  area: string;
  category: VenueCategory;
  lat: number;
  lng: number;
  stroller_rating: string;
  features: string[];
  facilities: Facility[];
  photos?: string[];
  dad_tip: string;
}
