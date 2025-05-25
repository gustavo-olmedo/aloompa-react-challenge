import { ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const typenameMiddleware = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map((data) => {
    return data;
  });
});

// Log errors
export const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && process.env.REACT_APP_STAGE === "development") {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});
