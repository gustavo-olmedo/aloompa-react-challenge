import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../graphql/queries";
import { Loader } from "../../components/Loader";
import { Wrapper, Event, FlexCol, EventDescription } from "./styles";
import ApolloErrorModal from "../../components/ApolloErrorModal";

export const EventsPage = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <h1>Hip Hop Fest</h1>
      {data?.events?.map((event) => (
        <Event key={event.id}>
          <FlexCol>
            <h2 style={{ textAlign: "center" }}>{event.name}</h2>
            <img
              src={event.image}
              height={250}
              style={{ borderRadius: "20px" }}
            />
          </FlexCol>
          <EventDescription>
            <p>{event.description}</p>
          </EventDescription>
        </Event>
      ))}
      <ApolloErrorModal apolloError={error} />
    </Wrapper>
  );
};
