import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";
import { GRAPHQL_API_URL } from "$env/static/private";

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
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
