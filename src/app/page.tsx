import venuesData from "../../data/venues.json";
import DadMapLoader from "@/components/DadMapLoader";
import type { Venue } from "@/types/venue";

export default function Home() {
  const venues = venuesData as Venue[];

  return <DadMapLoader venues={venues} />;
}
