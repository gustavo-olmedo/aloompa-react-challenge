import React, { useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import ErrorModal from "../ErrorModal";

export interface Props {
  apolloError: ApolloError | Error | undefined;
}

const ApolloErrorModal: React.FC<Props> = ({ apolloError }) => {
  const [errorModalActive, setErrorModalActive] = useState(false);

  useEffect(() => {
    setErrorModalActive(!!apolloError);
  }, [apolloError]);

  return (
    <ErrorModal
      error={apolloError}
      open={errorModalActive}
      onRequestClose={() => setErrorModalActive(false)}
    />
  );
};

export default ApolloErrorModal;
