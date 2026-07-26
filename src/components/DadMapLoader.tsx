"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/types/venue";

const DadMap = dynamic(() => import("@/components/DadMap"), { ssr: false });

interface DadMapLoaderProps {
  venues: Venue[];
}

export default function DadMapLoader({ venues }: DadMapLoaderProps) {
  return <DadMap venues={venues} />;
}
