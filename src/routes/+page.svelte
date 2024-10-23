<script lang="ts">
  import FlightPlanCard from "$lib/components/FlightPlanCard.svelte";
  import { derived } from "svelte/store";

  let { data } = $props();

  let { pilots, prefiles } = data;

  const ZID_AIRPORTS = [
    "KEKX",
    "KAMT",
    "KAID",
    "KDWU",
    "KHLB",
    "KEDJ",
    "KSJS",
    "KLEX",
    "KUSW",
    "KTZR",
    "KLOU",
    "KGEO",
    "KHAO",
    "KFFT",
    "KCUL",
    "KRGA",
    "KLUK",
    "KCVG",
    "KJVY",
    "KBAK",
    "KRSV",
    "KCFJ",
    "KVES",
    "KDCY",
    "KMGY",
    "KMIE",
    "KDLZ",
    "KEYE",
    "KPRG",
    "KEVV",
    "KLHQ",
    "KFGX",
    "KSER",
    "KFRH",
    "KGAS",
    "KFTK",
    "KPMH",
    "KEHR",
    "KHOC",
    "KHBE",
    "KHNB",
    "KTYQ",
    "KIND",
    "KUMP",
    "KMQJ",
    "KHFY",
    "KJRO",
    "KDAY",
    "KCMH",
    "KJKL",
    "KSME",
    "KCQA",
    "KHTW",
    "KLWV",
    "KAOH",
    "KLOZ",
    "KLNP",
    "KSDF",
    "KUYF",
    "KIMS",
    "KBLF",
    "KCEV",
    "KOXD",
    "KPKB",
    "KMWO",
    "KBMG",
    "KSYM",
    "KAJG",
    "KIOB",
    "KAXV",
    "KUWL",
    "KVTA",
    "KOVO",
    "KJQD",
    "KOSU",
    "KUNI",
    "KOWB",
    "KTEL",
    "KCYO",
    "KEOP",
    "KPBX",
    "KGFD",
    "KGPC",
    "KBKW",
    "KRID",
    "KLCK",
    "KRZT",
    "KBRY",
    "KSCX",
    "KGEZ",
    "KSCA",
    "KEBD",
    "KSGH",
    "KDVK",
    "KTWT",
    "KSIV",
    "KSXL",
    "KAAS",
    "KHUF",
    "KHTS",
    "KMRT",
    "KBFR",
    "KEKQ",
    "KCPF",
    "KCRW",
    "KBYL",
    "KILN",
    "KFFO",
    "KZZV",
  ];

  const filteredPilots = pilots.filter((p) => {
    // Flight plan needs to exist, be IFR, and have a departure and arrival airport in ZID
    return (
      p.flight_plan &&
      p.flight_plan.flight_rules === "I" &&
      (ZID_AIRPORTS.includes(p.flight_plan.departure) ||
        ZID_AIRPORTS.includes(p.flight_plan.arrival))
    );
  });

  const filteredPrefiles = prefiles.filter((p) => {
    // Flight plan needs to exist, be IFR, and have a departure and arrival airport in ZID
    return (
      p.flight_plan &&
      p.flight_plan.flight_rules === "I" &&
      (ZID_AIRPORTS.includes(p.flight_plan.departure) ||
        ZID_AIRPORTS.includes(p.flight_plan.arrival))
    );
  });

  let arrivals = $derived(
    filteredPilots.filter((p) => ZID_AIRPORTS.includes(p.flight_plan.arrival)),
  );

  let departures = $derived(
    filteredPilots.filter((p) =>
      ZID_AIRPORTS.includes(p.flight_plan.departure),
    ),
  );
</script>

<div class="flex flex-col gap-2 pb-2">
  <h2 class="text-2xl font-bold text-gray-700">Departures</h2>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {#each departures as pilot}
      <FlightPlanCard
        flightPlan={pilot.flight_plan}
        cid={pilot.cid}
        callsign={pilot.callsign}
      />
    {/each}
  </div>
</div>

<div class="flex flex-col gap-2 pb-2">
  <h2 class="text-2xl font-bold text-gray-700">Arrivals</h2>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {#each arrivals as pilot}
      <FlightPlanCard
        flightPlan={pilot.flight_plan}
        cid={pilot.cid}
        callsign={pilot.callsign}
      />
    {/each}
  </div>
</div>

<div class="flex flex-col gap-2">
  <h2 class="text-2xl font-bold text-gray-700">Pre-files</h2>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {#each filteredPrefiles as pilot}
      <FlightPlanCard
        flightPlan={pilot.flight_plan}
        cid={pilot.cid}
        callsign={pilot.callsign}
      />
    {/each}
  </div>
</div>
