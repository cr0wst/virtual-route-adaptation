import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";
import { PUBLIC_GRAPHQL_API_URL } from "$env/static/public";

const client = new ApolloClient({
  uri: PUBLIC_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export async function fetchRoutes() {
  const response = await client.query({
    query: gql`
      query GetRoutes {
        routes {
          id
          route
          departures
          arrivals
          altitudes {
            min
            max
          }
          criteria {
            id
            priority
          }
        }
      }
    `,
  });

  return response.data.routes;
}

export async function fetchSuggestions(flightPlan: any) {
  // Extract only the required fields for the query
  const filteredFlightPlan = {
    aircraft: flightPlan.aircraft_faa,
    departure: flightPlan.departure,
    arrival: flightPlan.arrival,
    altitude: flightPlan.altitude,
    route: flightPlan.route,
    remarks: flightPlan.remarks,
  };

  const response = await client.query({
    query: gql`
      query AdaptFlightPlanRoute($flightPlan: FlightPlanInput!) {
        suggestion(flightPlan: $flightPlan) {
          route
        }
      }
    `,
    variables: {
      flightPlan: filteredFlightPlan,
    },
  });

  return response.data.suggestion || [];
}
