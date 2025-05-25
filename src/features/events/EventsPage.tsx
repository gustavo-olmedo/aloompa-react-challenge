import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../graphql/queries";
import { EventList } from "./EventList";
import { Loader } from "../../components/Loader";
import ApolloErrorModal from "../../components/ApolloErrorModal";
import { Wrapper } from "./styles";

export const EventsPage = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <h1>Hip Hop Fest</h1>
      <EventList events={data?.events || []} />
      <ApolloErrorModal apolloError={error} />
    </Wrapper>
  );
};
