import type { Load } from "@sveltejs/kit";
import type { Pilot } from "$lib/types";

export const load: Load = async ({ params, fetch }) => {
  const data: { pilots: Pilot[]; prefiles: Pilot[] } = await fetch(
    "/api/flight-plan",
  ).then((r) => r.json());

  return data;
};
