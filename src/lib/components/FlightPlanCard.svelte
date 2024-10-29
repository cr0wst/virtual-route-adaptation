<script lang="ts">
  import Route from "$lib/components/Route.svelte";
  import Remarks from "$lib/components/Remarks.svelte";
  import CriteriaPill from "$lib/components/CriteriaPill.svelte";
  import SourcePill from "$lib/components/SourcePill.svelte";

  let { pilot } = $props<{
    pilot: any;
  }>();
</script>

<div
  class="rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
>
  <!-- Route Header (ID and Badge) -->
  <div
    class="text-gray-1000 mb-3 flex items-center justify-between text-2xl font-bold dark:text-gray-200"
  >
    <div class="text-xl font-medium text-gray-500 dark:text-gray-50">
      {pilot.flight_plan.assigned_transponder}
    </div>

    {pilot.callsign}

    <div class="flex items-center gap-1">
      <div
        class="bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-100 dark:bg-blue-600 dark:text-gray-100"
      >
        {pilot.flight_plan.departure}
      </div>
      <div
        class="bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-100 dark:bg-blue-600 dark:text-gray-100"
      >
        {pilot.flight_plan.arrival}
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between border-y border-gray-200 p-2">
    <div class="mt-1 text-sm text-gray-800 dark:text-gray-300">
      <span class=" font-semibold uppercase text-gray-600">Altitude</span>
      {pilot.flight_plan.altitude > 18000
        ? `FL${pilot.flight_plan.altitude / 100}`
        : pilot.flight_plan.altitude}
    </div>

    <div class="mt-1 text-sm text-gray-800 dark:text-gray-300">
      <span class=" font-semibold uppercase text-gray-600">Aircraft</span>
      {pilot.flight_plan.aircraft_faa}
    </div>
  </div>
  <!-- Route String -->
  <Route route={pilot.flight_plan.route} />

  <Remarks remarks={pilot.flight_plan.remarks} />

  <hr />
  <Route route={pilot.suggestion.route} label="New Routing" />
</div>
