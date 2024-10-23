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
