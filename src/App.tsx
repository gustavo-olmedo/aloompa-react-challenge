import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { Loader } from "./components/Loader";

export const App = () => {
  const { data, loading, error } = useQuery(gql`
    query GetEvents {
      events {
        id
        name
        image
        description
      }
    }
  `);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const events: Array<{
    id: string;
    name: string;
    image: string;
    description: string;
  }> = data?.events || []; // data from query goes here

  return (
    <Wrapper>
      <h1>Hip Hop Fest</h1>
      {events.map((event) => (
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
    </Wrapper>
  );
};

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled(FlexCol)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Event = styled.div`
  margin-bottom: 36px;
  display: flex;
  flex-direction: row;
`;

const EventDescription = styled(FlexCol)`
  padding: 20px;
  justify-content: center;
  max-width: 650px;
`;
