import { json } from "@sveltejs/kit";
import { ZID_AIRPORTS } from "$lib/utils";
import type { Pilot } from "$lib/types";
import { fetchFlightPlanData } from "$lib/server/flightPlanCache";
import { fetchSuggestions } from "$lib/apolloClient";

export const GET = async () => {
  const { pilots, prefiles } = await fetchFlightPlanData();

  let filteredPilots = applyFilters(pilots);
  let filteredPrefiles = applyFilters(prefiles);

  // Fetch all the suggestions and filter out pilots or prefiles that don't have any.
  // for the ones that do have them, add the suggestions to the object.
  const suggestions = await Promise.all(
    filteredPilots
      .concat(filteredPrefiles)
      .map((p) => fetchSuggestions(p.flight_plan)),
  );

  filteredPilots = filteredPilots.map((p, i) => ({
    ...p,
    suggestions: suggestions[i],
  }));

  filteredPrefiles = filteredPrefiles.map((p, i) => ({
    ...p,
    suggestions: suggestions[i + filteredPilots.length],
  }));

  return json({
    pilots: filteredPilots,
    prefiles: filteredPrefiles,
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
