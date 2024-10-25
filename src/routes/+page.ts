import type { PageData } from "./$types";

export const load: PageData = async ({ params, fetch }) => {
  return await fetch("/api/flight-plan").then((r) => r.json());
};
