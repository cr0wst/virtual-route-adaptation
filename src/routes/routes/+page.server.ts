import type { PageServerLoad } from "./$types";
import { fetchRoutes } from "$lib/apolloClient";

export const load: PageServerLoad = async ({ params }) => {
  const routes = await fetchRoutes();
  return {
    routes,
  };
};
