<script lang="ts">
  let { data } = $props();
</script>

<!-- Routes Grid -->
<div class="grid grid-cols-3 gap-6">
  {#each data.routes as route}
    <div
      class="rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <!-- Route Header (ID and Badge) -->
      <div
        class="text-gray-1000 mb-3 flex items-center justify-between text-lg font-semibold dark:text-gray-200"
      >
        {route.id}
        <span
          class="rounded bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-gray-100"
        >
          ADAR DB
        </span>
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
      <div
        class="mt-3 rounded-md bg-gray-200 p-3 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200"
      >
        {route.route.string}
      </div>

      <!-- Criteria Badges (if exists) -->
      {#if route.criteria.length > 0}
        <div class="mt-2 flex flex-wrap gap-2">
          {#each route.criteria as c}
            <span
              class="rounded bg-blue-700 px-2.5 py-0.5 text-xs font-medium text-gray-100 dark:bg-blue-600 dark:text-gray-100"
            >
              {c.id}
            </span>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
