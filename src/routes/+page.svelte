<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { FLIGHT_PLAN_CACHE_DURATION } from "$lib/utils";
  import FlightPlanCardStack from "$lib/components/FlightPlanCardStack.svelte";
  import type { Pilot } from "$lib/types";

  type PilotWithSuggestions = Pilot & { suggestion: { route: string } };

  let { data } = $props<{
    data: {
      arrivals: PilotWithSuggestions[];
      departures: PilotWithSuggestions[];
      prefiles: PilotWithSuggestions[];
    };
  }>();

  let { pilots, prefiles } = $derived(data);

  let filteredPilots = $derived.by(() => {
    return pilots.filter(
      (pilot: PilotWithSuggestions) =>
        pilot.suggestion && pilot.suggestion.route,
    );
  });

  let filteredPrefiles = $derived.by(() => {
    return prefiles.filter(
      (pilot: PilotWithSuggestions) =>
        pilot.suggestion && pilot.suggestion.route,
    );
  });

  onMount(() => {
    const interval = setInterval(() => {
      invalidate("/api/flight-plan");
    }, FLIGHT_PLAN_CACHE_DURATION);

    return () => clearInterval(interval);
  });
</script>

<div class="w-full border-b">
  <h1 class="pb-2 text-3xl font-bold text-gray-700 dark:text-white">
    Flights Needing Review
  </h1>
</div>

{#if filteredPilots.length > 0}
  <FlightPlanCardStack title="Active Pilots" pilots={filteredPilots} />
{/if}

{#if filteredPrefiles.length > 0}
  <FlightPlanCardStack title="Pre-Files" pilots={filteredPrefiles} />
{/if}
