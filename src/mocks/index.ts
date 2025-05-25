import { ApolloLink, Observable } from "@apollo/client";
import { mockEvents } from "./events";

export const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    setTimeout(() => {
      switch (operation.operationName) {
        case "events":
          observer.next({
            data: {
              events: mockEvents,
            },
          });
          observer.complete();
          break;
        default:
          console.warn(
            `[MOCK] Unhandled operation: ${operation.operationName}`
          );
          observer.next({
            data: {},
          });
          observer.complete();
      }
    }, 1500); // simulate 1500ms delay
  });
});
