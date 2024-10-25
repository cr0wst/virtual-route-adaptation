import type { Load } from "@sveltejs/kit";
import { error, redirect } from "@sveltejs/kit";

export const load: Load = async ({ params, fetch }) => {
  const { id } = params;
  const response = await fetch(`/api/flight-plan/${id}`);
  if (response.status === 404) {
    return error(404, "Not found");
  }

  const pilot = await response.json();
  return pilot;
};
