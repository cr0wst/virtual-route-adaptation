import { FLIGHT_PLAN_CACHE_DURATION } from "$lib/utils";
import type { Pilot } from "$lib/types";

let FLIGHT_PLAN_CACHE = null;

export async function fetchFlightPlanData(): Promise<{
  pilots: Pilot[];
  prefiles: Pilot[];
}> {
  if (
    !FLIGHT_PLAN_CACHE ||
    FLIGHT_PLAN_CACHE.lastUpdated < Date.now() - FLIGHT_PLAN_CACHE_DURATION
  ) {
    const response = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
    FLIGHT_PLAN_CACHE = {
      data: await response.json(),
      lastUpdated: Date.now(),
    };
  }

  return FLIGHT_PLAN_CACHE.data;
}
