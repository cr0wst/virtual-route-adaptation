import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params, fetch }) => {
  return await fetch("/api/flight-plan").then((r) => r.json());
};
