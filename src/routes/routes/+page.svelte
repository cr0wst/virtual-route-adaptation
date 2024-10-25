<script lang="ts">
  import RouteCard from "$lib/components/RouteCard.svelte";
  import { derived } from "svelte/store";

  let { data } = $props();

  let filter = $state();

  let filteredRoutes = $derived.by(() => {
    if (!filter) return data.routes;

    // Split the filter by spaces to get possible ICAO codes
    let terms = filter.trim().split(/\s+/);
    let departureFilter = terms[0].toLowerCase(); // First term
    let arrivalFilter = terms[1]?.toLowerCase(); // Second term, if available

    return data.routes.filter((route) => {
      // If only one term is provided, check both departures and arrivals
      if (!arrivalFilter) {
        return (
          route.departures.some((departure) =>
            departure.toLowerCase().includes(departureFilter),
          ) ||
          route.arrivals.some((arrival) =>
            arrival.toLowerCase().includes(departureFilter),
          ) ||
          route.route.string.toLowerCase().includes(departureFilter) ||
          route.id.toLowerCase().includes(departureFilter)
        );
      }

      // If two terms are provided, check departure for the first and arrival for the second
      return (
        route.departures.some((departure) =>
          departure.toLowerCase().includes(departureFilter),
        ) &&
        route.arrivals.some((arrival) =>
          arrival.toLowerCase().includes(arrivalFilter),
        )
      );
    });
  });
</script>

<div class="w-full border-b">
  <h1 class="pb-2 text-3xl font-bold text-gray-700 dark:text-white">
    Approved Routes
  </h1>
</div>

<!-- Filter Panel -->
<div class="my-2 flex w-full items-center justify-between">
  <input
    type="text"
    id="filter"
    class="w-full rounded-md border border-gray-300 p-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
    placeholder="Search..."
    bind:value={filter}
  />
</div>

<!-- Routes Grid -->
<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
  {#each filteredRoutes as route}
    <RouteCard {route} />
  {/each}
</div>
