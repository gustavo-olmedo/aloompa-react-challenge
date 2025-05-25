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
    {
      id: "1",
      name: "Live Concert Night",
      image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
      description:
        "Experience the thrill of live music with electrifying performances.",
    },
    {
      id: "2",
      name: "Corporate Seminar",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      description:
        "Join industry leaders for insightful discussions and networking.",
    },
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
