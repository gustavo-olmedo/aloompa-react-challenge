import styled from "styled-components";

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled(FlexCol)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Event = styled.div`
  margin-bottom: 36px;
  display: flex;
  flex-direction: row;
`;

export const EventDescription = styled(FlexCol)`
  padding: 20px;
  justify-content: center;
  max-width: 650px;
`;
