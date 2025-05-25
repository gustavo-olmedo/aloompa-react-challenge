import React from "react";
import { render, screen } from "@testing-library/react";
import { EventCard } from "./EventCard";

describe("EventCard", () => {
  const mockEvent = {
    id: "1",
    name: "Live Concert Night",
    image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    description:
      "Experience the thrill of live music with electrifying performances.",
  };

  it("renders the event name", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
  });

  it("renders the event description", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
  });

  it("renders the event image with correct alt text", () => {
    render(<EventCard event={mockEvent} />);
    const img = screen.getByAltText(mockEvent.name) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockEvent.image);
    expect(img.height).toBe(250);
  });
});
