import { Event, EventDescription, FlexCol } from "./styles";

export interface EventItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const EventCard = ({ event }: { event: EventItem }) => (
  <Event>
    <FlexCol>
      <h2 style={{ textAlign: "center" }}>{event.name}</h2>
      <img
        src={event.image}
        alt={event.name}
        height={250}
        style={{ borderRadius: "20px" }}
      />
    </FlexCol>
    <EventDescription>
      <p>{event.description}</p>
    </EventDescription>
  </Event>
);
