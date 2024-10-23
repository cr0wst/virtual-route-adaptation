<script lang="ts">
  import RouteCard from "$lib/components/RouteCard.svelte";
  import { derived } from "svelte/store";

  let { data } = $props();

  let filter = $state()

  let filteredRoutes = $derived.by(() => {
    if (!filter) return data.routes;

    // Split the filter by spaces to get possible ICAO codes
    let terms = filter.trim().split(/\s+/);
    let departureFilter = terms[0].toLowerCase(); // First term
    let arrivalFilter = terms[1]?.toLowerCase();  // Second term, if available

    return data.routes.filter(route => {
      // If only one term is provided, check both departures and arrivals
      if (!arrivalFilter) {
        return (
          route.departures.some(departure => departure.toLowerCase().includes(departureFilter)) ||
          route.arrivals.some(arrival => arrival.toLowerCase().includes(departureFilter)) ||
          route.route.string.toLowerCase().includes(departureFilter) ||
          route.id.toLowerCase().includes(departureFilter)
        );
      }

      // If two terms are provided, check departure for the first and arrival for the second
      return (
        route.departures.some(departure => departure.toLowerCase().includes(departureFilter)) &&
        route.arrivals.some(arrival => arrival.toLowerCase().includes(arrivalFilter))
      );
    });
  });

</script>

<!-- Filter Panel -->
<div class="flex justify-between items-center w-full mb-2">
  <input type="text" id="filter"
         class="border border-gray-300 rounded-md p-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200 w-full"
         placeholder="Search..."
         bind:value={filter}
  />
</div>


<!-- Routes Grid -->
<div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
  {#each filteredRoutes as route}
    <RouteCard {route} />
  {/each}
</div>
