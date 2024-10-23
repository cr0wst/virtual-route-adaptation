<script lang="ts">
  import SourcePill from "$lib/components/SourcePill.svelte";
  import Route from "$lib/components/Route.svelte";
  import Remarks from "$lib/components/Remarks.svelte";

  let { callsign, cid, flightPlan } = $props();
</script>

<div
  class="rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
>
  <!-- Route Header (ID and Badge) -->
  <div
    class="text-gray-1000 mb-3 flex items-center justify-between text-2xl font-bold dark:text-gray-200"
  >
    <div class="text-xl font-medium text-gray-500 dark:text-gray-50">
      {flightPlan.assigned_transponder}
    </div>

    {callsign}

    <div class="flex items-center gap-1">
      <div
        class="bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-100 dark:bg-blue-600 dark:text-gray-100"
      >
        {flightPlan.departure}
      </div>
      <div
        class="bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-100 dark:bg-blue-600 dark:text-gray-100"
      >
        {flightPlan.arrival}
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between border-y border-gray-200 p-2">
    <div class="mt-1 text-sm text-gray-800 dark:text-gray-300">
      <span class="font-semibold">Altitude:</span>
      {flightPlan.altitude > 18000
        ? `FL${flightPlan.altitude / 100}`
        : flightPlan.altitude}
    </div>

    <div class="mt-1 text-sm text-gray-800 dark:text-gray-300">
      <span class="font-semibold">Aircraft:</span>
      {flightPlan.aircraft_faa}
    </div>
  </div>
  <!-- Route String -->
  <Route route={flightPlan.route} />

  <Remarks remarks={flightPlan.remarks} />
</div>
