<script lang="ts">
  import FlightPlanCard from "$lib/components/FlightPlanCard.svelte";

  let { title, pilots } = $props<{ title: string; pilots: any[] }>();
</script>

<div class="flex flex-col gap-2 pb-2">
  <h2 class="py-2 text-2xl font-semibold text-gray-700 dark:text-white">
    {title} ({pilots.length})
  </h2>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {#each pilots as pilot}
      <div
        class="flex flex-col items-stretch transition ease-in hover:drop-shadow-lg"
      >
        <div class="grid-col-1 grid min-h-full flex-grow">
          <FlightPlanCard flightPlan={pilot.flight_plan} {pilot} />
        </div>
      </div>
    {/each}
  </div>
</div>
