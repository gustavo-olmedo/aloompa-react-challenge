import { Event, FlexCol, EventDescription } from "./styles";

interface EventItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const EventList = ({ events }: { events: EventItem[] }) => {
  return (
    <>
      {events.map((event) => (
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
      ))}
    </>
  );
};
