import { FLIGHT_PLAN_CACHE_DURATION } from "$lib/utils";
import type { Pilot } from "$lib/types";

let FLIGHT_PLAN_CACHE: any = null;

export async function fetchFlightPlanData(): Promise<{
  pilots: Pilot[];
  prefiles: Pilot[];
}> {
  if (
    !FLIGHT_PLAN_CACHE ||
    FLIGHT_PLAN_CACHE.lastUpdated < Date.now() - FLIGHT_PLAN_CACHE_DURATION
  ) {
    const response = await fetch("https://data.vatsim.net/v3/vatsim-data.json");

    const data = await response.json();
    // Add fake prefiles for testing
    data.prefiles.push(
      {
        cid: "99999990",
        callsign: "FLC314",
        name: "Test PIlot",
        flight_plan: {
          aircraft_faa: "C172/G",
          flight_rules: "I",
          departure: "KCMH",
          arrival: "KBWI",
          altitude: "35000",
          route:
            "KCMH VHP J29 AIR J110 FAK J110 MOL J110 BAE J110 ETX J110 BROSS J110 OTWAY J110 BUNTS J110 SIE CAMRN3 KBWI",
          remarks: "RMK/TEST FLIGHT PLAN (DEBUG ONLY)",
        },
      },
      {
        cid: "99999910",
        callsign: "FLC320",
        name: "Good Test PIlot",
        flight_plan: {
          aircraft_faa: "C172/G",
          flight_rules: "I",
          departure: "KCVG",
          arrival: "KBKL",
          altitude: "35000",
          route: "ROCKT3 ARRAY GEDDY ROLLN ROLLN2",
          remarks: "RMK/TEST FLIGHT PLAN (DEBUG ONLY) PBN/A1B1C1D1L1O1S2",
        },
      },
      {
        cid: "99999991",
        callsign: "FLC315",
        name: "Test PIlot Plus One",
        flight_plan: {
          aircraft_faa: "C172/G",
          flight_rules: "I",
          departure: "KBWI",
          arrival: "KCMH",
          altitude: "35000",
          route:
            "KBWI CAMRN3 SIE J110 BUNTS J110 OTWAY J110 BROSS J110 ETX J110 BAE J110 MOL J110 FAK J110 AIR J29 VHP KCMH",
          remarks: "RMK/TEST FLIGHT PLAN (DEBUG ONLY)",
        },
      },
    );

    // Add fake pilots for testing
    data.pilots.push(
      {
        cid: "99999911",
        callsign: "FLC321",
        name: "Bad Test PIlot",
        flight_plan: {
          aircraft_faa: "C172/G",
          flight_rules: "I",
          departure: "KLUK",
          arrival: "KSDF",
          altitude: "35000",
          route: "DCT",
          remarks: "RMK/TEST FLIGHT PLAN (DEBUG ONLY) PBN/A1B1C1D1L1O1S2",
        },
      },
      {
        cid: "99999992",
        callsign: "FLC316",
        name: "Test PIlot Plus Two",
        flight_plan: {
          aircraft_faa: "C172/G",
          flight_rules: "I",
          departure: "KCMH",
          arrival: "KBWI",
          altitude: "35000",
          route: "OWEBO DCT NUSMM ANTHM3",
          remarks: "RMK/TEST FLIGHT PLAN (DEBUG ONLY)",
        },
      },
      {
        cid: "99999993",
        callsign: "FLC317",
        name: "Test PIlot Plus Three",
        flight_plan: {
          aircraft_faa: "C172/G",
          flight_rules: "I",
          departure: "KBWI",
          arrival: "KCMH",
          altitude: "35000",
          route:
            "KBWI CAMRN3 SIE J110 BUNTS J110 OTWAY J110 BROSS J110 ETX J110 BAE J110 MOL J110 FAK J110 AIR J29 VHP KCMH",
          remarks: "RMK/TEST FLIGHT PLAN (DEBUG ONLY)",
        },
      },
    );

    FLIGHT_PLAN_CACHE = {
      data: data,
      lastUpdated: Date.now(),
    };
  }

  return FLIGHT_PLAN_CACHE.data;
}
