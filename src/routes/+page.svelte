<script lang="ts">
  import FlightPlanCard from "$lib/components/FlightPlanCard.svelte";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { FLIGHT_PLAN_CACHE_DURATION } from "$lib/utils";

  let { data } = $props();

  let shownAirports = $state([]);

  let { arrivals, departures, prefiles } = $derived(data);

  let airports = $derived.by(() => {
    const a = new Set([
      ...departures.map((pilot) => pilot.flight_plan.departure),
      ...arrivals.map((pilot) => pilot.flight_plan.arrival),
    ]);

    return Array.from(a);
  });

  let filteredDepartures = $derived.by(() => {
    return departures.filter((pilot) =>
      shownAirports.includes(pilot.flight_plan.departure),
    );
  });

  let filteredArrivals = $derived.by(() => {
    return arrivals.filter((pilot) =>
      shownAirports.includes(pilot.flight_plan.arrival),
    );
  });

  onMount(() => {
    shownAirports = airports;
    const interval = setInterval(() => {
      invalidate("/api/flight-plan");
    }, FLIGHT_PLAN_CACHE_DURATION);

    return () => clearInterval(interval);
  });

  function toggleShownAirport(airport: string) {
    if (shownAirports.includes(airport)) {
      shownAirports = shownAirports.filter((a) => a !== airport);
    } else {
      shownAirports = [...shownAirports, airport];
    }
  }
</script>

<div class="w-full border-b">
  <h1 class="pb-2 text-3xl font-bold text-gray-700 dark:text-white">
    Current Flights
  </h1>
</div>
<div class="flex gap-2 border-b py-2">
  {#each airports as airport}
    <button
      class="rounded border border-orange-600 px-2.5 py-0.5 text-xs font-medium dark:border-blue-600
  {shownAirports.includes(airport)
        ? 'bg-orange-600 text-white dark:bg-blue-600'
        : 'text-orange-300 dark:text-blue-300'}"
      onclick={() => toggleShownAirport(airport)}
    >
      {airport}
    </button>
  {/each}
</div>

{#if filteredDepartures.length > 0}
  <div class="flex flex-col gap-2 pb-2">
    <h2 class="py-2 text-2xl font-semibold text-gray-700 dark:text-white">
      Departures ({filteredDepartures.length})
    </h2>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {#each filteredDepartures as pilot}
        <a
          class="flex flex-col items-stretch transition ease-in hover:drop-shadow-lg"
          href={`/${pilot.callsign}/analyze`}
        >
          <div class="grid-col-1 grid min-h-full flex-grow">
            <FlightPlanCard
              class="min-h-full flex-grow"
              flightPlan={pilot.flight_plan}
              cid={pilot.cid}
              callsign={pilot.callsign}
            />
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}

{#if filteredArrivals.length > 0}
  <div class="flex flex-col gap-2 pb-2">
    <h2 class="py-2 text-2xl font-semibold text-gray-700 dark:text-white">
      Arrivals ({filteredArrivals.length})
    </h2>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {#each filteredArrivals as pilot}
        <a
          class="flex flex-col items-stretch transition ease-in hover:drop-shadow-lg"
          href={`/${pilot.callsign}/analyze`}
        >
          <div class="grid-col-1 grid min-h-full flex-grow">
            <FlightPlanCard
              class="min-h-full flex-grow"
              flightPlan={pilot.flight_plan}
              cid={pilot.cid}
              callsign={pilot.callsign}
            />
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}

{#if prefiles.length > 0}
  <div class="flex flex-col gap-2">
    <h2 class="py-2 text-2xl font-semibold text-gray-700 dark:text-white">
      Pre-files ({prefiles.length})
    </h2>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {#each prefiles as pilot}
        <a
          class="flex flex-col items-stretch transition ease-in hover:drop-shadow-lg"
          href={`/${pilot.callsign}/analyze`}
        >
          <div class="grid-col-1 grid min-h-full flex-grow">
            <FlightPlanCard
              class="min-h-full flex-grow"
              flightPlan={pilot.flight_plan}
              cid={pilot.cid}
              callsign={pilot.callsign}
            />
          </div>
        </a>
      {/each}
    </div>
  </div>
{/if}
