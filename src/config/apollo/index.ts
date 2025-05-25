import {
  ApolloClient,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from "@apollo/client";

import { mockLink } from "../../mocks";

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = mockLink;

  return new ApolloClient({
    link: from([httpLink]),
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
