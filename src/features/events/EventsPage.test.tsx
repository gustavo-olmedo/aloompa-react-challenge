import { render, screen } from "@testing-library/react";
import { EventsPage } from "./EventsPage";

jest.mock("./EventList", () => ({
  __esModule: true,
  EventList: ({ events }: { events: any[] }) => (
    <div data-testid="event-list">{events.length} events</div>
  ),
}));

jest.mock("../../components/Loader", () => ({
  __esModule: true,
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

jest.mock("../../components/ApolloErrorModal", () => ({
  __esModule: true,
  default: ({ apolloError }: { apolloError: any }) =>
    apolloError ? (
      <div data-testid="error">Error: {apolloError.message}</div>
    ) : null,
}));

// 🔹 Mock Apollo useQuery
jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return {
    ...actual,
    useQuery: jest.fn(),
  };
});

import { useQuery } from "@apollo/client";

describe("EventsPage", () => {
  const mockEvents = [
    { id: "1", name: "Event 1" },
    { id: "2", name: "Event 2" },
  ];

  it("renders loader when loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    });

    render(<EventsPage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders event list when data is loaded", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { events: mockEvents },
      loading: false,
      error: undefined,
    });

    render(<EventsPage />);
    expect(screen.getByText("Hip Hop Fest")).toBeInTheDocument();
    expect(screen.getByTestId("event-list")).toHaveTextContent("2 events");
  });

  it("renders error modal when there is an error", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: { message: "GraphQL error" },
    });

    render(<EventsPage />);
    expect(screen.getByTestId("error")).toHaveTextContent("GraphQL error");
  });
});
