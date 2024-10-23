<script lang="ts">
  import CriteriaPill from "$lib/components/CriteriaPill.svelte";
  import SourcePill from "$lib/components/SourcePill.svelte";
  import Route from "$lib/components/Route.svelte";

  let { route } = $props();
</script>

<div
  class="rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
>
  <!-- Route Header (ID and Badge) -->
  <div
    class="text-gray-1000 mb-3 flex items-center justify-between text-lg font-semibold dark:text-gray-200"
  >
    {route.id}
    <SourcePill label="ADAR"/>
  </div>

  <!-- Departures and Arrivals -->
  <div class="text-sm text-gray-800 dark:text-gray-300">
    <span class="font-semibold">Departure:</span>
    {route.departures.join(", ")}
  </div>

  <div class="mt-1 text-sm text-gray-800 dark:text-gray-300">
    <span class="font-semibold">Arrival:</span>
    {route.arrivals.join(", ")}
  </div>

  <!-- Altitudes -->
  <div class="mt-1 text-sm text-gray-800 dark:text-gray-300">
    <span class="font-semibold">Altitudes:</span>
    {route.altitudes.min} - {route.altitudes.max}
  </div>

  <!-- Route String -->
  <Route label="{route.route.string}"/>

  <!-- Criteria Badges (if exists) -->
  {#if route.criteria.length > 0}
    <div class="mt-2 flex flex-wrap gap-2">
      {#each route.criteria as c}
        <CriteriaPill label="{c.id}"/>
      {/each}
    </div>
  {/if}
</div>