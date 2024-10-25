import { json } from "@sveltejs/kit";
import { FLIGHT_PLAN_CACHE_DURATION, ZID_AIRPORTS } from "$lib/utils";

// Cache the data for 15 seconds. This isn't a perfect solution, but it's good
// enough for reducing the number of requests to the VATSIM Data API.
let FLIGHT_PLAN_CACHE = null;

export const GET = async () => {
  const { pilots, prefiles } = await fetchFlightPlanData();

  return json({
    arrivals: applyFilters(pilots).filter((p) =>
      ZID_AIRPORTS.includes(p.flight_plan.arrival),
    ),
    departures: applyFilters(pilots).filter((p) =>
      ZID_AIRPORTS.includes(p.flight_plan.departure),
    ),
    prefiles: applyFilters(prefiles),
  });
};

function applyFilters(pilots: Pilot[]) {
  return pilots.filter((p) => {
    // Flight plan needs to exist, be IFR, and have a departure and arrival airport in ZID
    return (
      p.flight_plan &&
      p.flight_plan.flight_rules === "I" &&
      (ZID_AIRPORTS.includes(p.flight_plan.departure) ||
        ZID_AIRPORTS.includes(p.flight_plan.arrival)) &&
      p.flight_plan.altitude &&
      !p.flight_plan.altitude.includes("VFR")
    );
  });
}

async function fetchFlightPlanData(): Promise<{
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

type Pilot = {
  cid: number;
  callsign: string;
  name: string;
  flight_plan: {
    flight_rules: string;
    aircraft: string;
    aircraft_faa: string;
    aircraft_short: string;
    departure: string;
    arrival: string;
    alternate: string;
    cruise_tas: number;
    altitude: string;
    deptime: string;
    enroute_time: string;
    fuel_time: string;
    remarks: string;
    route: string;
  };
};
