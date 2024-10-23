import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  // Fetch data from the VATSIM Data API
  const response = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
  const data = await response.json();

  // Return the data to the client
  return data
};
