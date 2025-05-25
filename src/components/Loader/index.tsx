import React from "react";
import { Message, Spinner, SpinnerWrapper } from "./styles";

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  message = "Loading, please wait...",
}) => {
  return (
    <SpinnerWrapper>
      <Spinner />
      <Message>{message}</Message>
    </SpinnerWrapper>
  );
};
