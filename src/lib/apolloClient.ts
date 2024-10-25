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
          altitudes {
            min
            max
          }
          criteria {
            id
          }
          route {
            string
            arrival
            departure
            fixes {
              id
              icaoCode
            }
          }
          arrivals
          departures
        }
      }
    `,
  });

  return response.data.routes;
}

export async function fetchSuggestions(flightPlan) {
  // Extract only the required fields for the query
  const filteredFlightPlan = {
    aircraft: flightPlan.aircraft,
    departure: flightPlan.departure,
    arrival: flightPlan.arrival,
    altitude: flightPlan.altitude,
    route: flightPlan.route,
    remarks: flightPlan.remarks,
  };

  const response = await client.query({
    query: gql`
      query AdaptFlightPlanRoute($flightPlan: FlightPlanInput!) {
        suggestFlightPlanRoutes(flightPlan: $flightPlan) {
          reason
          route {
            arrival
            departure
            string
          }
          altitude
          criteria {
            id
          }
        }
      }
    `,
    variables: {
      flightPlan: filteredFlightPlan,
    },
  });

  return response.data.suggestFlightPlanRoutes || [];
}
