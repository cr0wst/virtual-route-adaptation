<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { FLIGHT_PLAN_CACHE_DURATION } from "$lib/utils";
  import FlightPlanCard from "$lib/components/FlightPlanCard.svelte";
  import { derived } from "svelte/store";
  import RouteCard from "$lib/components/RouteCard.svelte";
  import SuggestionCard from "$lib/components/SuggestionCard.svelte";
  import CriteriaPill from "$lib/components/CriteriaPill.svelte";

  let { data } = $props();

  let pilot = $derived(data.pilot);
  let suggestions = $derived(data.suggestions);

  onMount(() => {
    const interval = setInterval(() => {
      invalidate(`/api/flight-plan/${data.callsign}`);
    }, FLIGHT_PLAN_CACHE_DURATION);

    return () => clearInterval(interval);
  });
</script>

<div class="mb-2 w-full border-b">
  <h1 class="pb-2 text-3xl font-bold text-gray-700 dark:text-white">
    {pilot.cid} - {pilot.name}
  </h1>
</div>

<div class="flex flex-col gap-6 lg:flex-row">
  <div class="lg:w-1/2">
    <h2 class="mb-1 text-xl font-semibold">Flight Information</h2>
    <FlightPlanCard
      callsign={pilot.callsign}
      cid={pilot.cid}
      flightPlan={pilot.flight_plan}
    />
  </div>
  <div class="lg:w-1/2">
    <h2 class="mb-1 text-xl font-semibold">Route Adaptation</h2>
    {#if suggestions.length > 0}
      <div class="grid grid-cols-1 gap-2 pb-2">
        {#each suggestions as suggestion}
          <SuggestionCard {suggestion} />
        {/each}
      </div>
    {:else}
      <div
        class="flex items-center justify-center rounded border border-green-700 bg-green-50 py-4 text-2xl font-light text-green-700"
      >
        Route is Valid!
      </div>
    {/if}
  </div>
</div>
