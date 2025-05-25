import { render, screen } from "@testing-library/react";
import { EventList } from "./EventList";

jest.mock("./EventCard", () => ({
  __esModule: true,
  EventCard: ({ event }: { event: any }) => (
    <div data-testid="event-card">{event.name}</div>
  ),
}));

describe("EventList", () => {
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
    {
      id: "3",
      name: "Wedding Celebration",
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
      description: "Celebrate love and unity in a beautiful wedding ceremony.",
    },
  ];

  it("renders one EventCard for each event", () => {
    render(<EventList events={mockEvents} />);
    const cards = screen.getAllByTestId("event-card");
    expect(cards).toHaveLength(3);
  });

  it("displays the correct event names", () => {
    render(<EventList events={mockEvents} />);
    expect(screen.getByText(mockEvents[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockEvents[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockEvents[2].name)).toBeInTheDocument();
  });

  it("renders nothing if events list is empty", () => {
    render(<EventList events={[]} />);
    expect(screen.queryByTestId("event-card")).toBeNull();
  });
});
