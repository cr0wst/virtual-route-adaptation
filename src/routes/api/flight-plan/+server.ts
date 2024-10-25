import { json } from "@sveltejs/kit";
import { ZID_AIRPORTS } from "$lib/utils";
import type { Pilot } from "$lib/types";
import { fetchFlightPlanData } from "$lib/server/flightPlanCache";

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
