import { EventCard, EventItem } from "./EventCard";

export const EventList = ({ events }: { events: EventItem[] }) => (
  <>
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </>
);
