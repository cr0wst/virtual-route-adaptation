import { json } from "@sveltejs/kit";
import { ZID_AIRPORTS } from "$lib/utils";
import { fetchFlightPlanData } from "$lib/server/flightPlanCache";
import type { Pilot } from "$lib/types";
import { fetchSuggestions } from "$lib/apolloClient";

export const GET = async ({ params }) => {
  const { id } = params;

  const { pilots, prefiles } = await fetchFlightPlanData();

  const pilot = pilots.concat(prefiles).find((p) => p.callsign === id);

  if (!pilot) {
    return new Response("Not found", { status: 404 });
  }

  const suggestions = await fetchSuggestions(pilot.flight_plan);

  return json({ pilot, suggestions });
};
