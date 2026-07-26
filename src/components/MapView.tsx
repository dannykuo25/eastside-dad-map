"use client";

import Map, { Marker } from "react-map-gl";
import type { Venue } from "@/types/venue";

interface MapViewProps {
  venues: Venue[];
  selectedVenueId: string | null;
  onSelectVenue: (venue: Venue) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView({
  venues,
  selectedVenueId,
  onSelectVenue,
}: MapViewProps) {
  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-zinc-900 p-6 text-center">
        <p className="text-lg font-semibold text-neon">Mapbox token missing</p>
        <p className="max-w-sm text-sm text-zinc-400">
          Add <code className="text-neon">NEXT_PUBLIC_MAPBOX_TOKEN</code> to{" "}
          <code className="text-zinc-300">.env.local</code> and restart the dev
          server.
        </p>
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: -122.2015,
        latitude: 47.6101,
        zoom: 11.5,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      {venues.map((venue) => {
        const isSelected = selectedVenueId === venue.id;

        return (
          <Marker
            key={venue.id}
            longitude={venue.lng}
            latitude={venue.lat}
            anchor="bottom"
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              onSelectVenue(venue);
            }}
          >
            <button
              type="button"
              aria-label={`Select ${venue.name}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-black shadow-lg transition-transform ${
                isSelected
                  ? "scale-125 bg-white text-black"
                  : "bg-neon text-black hover:scale-110"
              }`}
            >
              📍
            </button>
          </Marker>
        );
      })}
    </Map>
  );
}
