import {
  ApolloClient,
  InMemoryCache,
  from,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

import { mockLink } from "../../mocks";
import { errorMiddleware, typenameMiddleware } from "./apollo-middleware";

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const REACT_APP_GRAPHQL_API = process.env.REACT_APP_GRAPHQL_API;

  const httpLink =
    process.env.REACT_APP_STAGE === "development" ||
    process.env.REACT_APP_STAGE === "test"
      ? mockLink
      : ApolloLink.split(
          (operation) => operation.getContext().public !== true,
          new HttpLink({ uri: REACT_APP_GRAPHQL_API })
        );

  return new ApolloClient({
    link: from([typenameMiddleware, errorMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
};

// Singleton pattern
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
};
