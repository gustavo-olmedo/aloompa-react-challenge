import React from "react";
import {
  AcceptButton,
  Backdrop,
  CloseButton,
  Message,
  Modal,
  Title,
} from "./styles";

export type CustomError = Error | { message?: string } | string | undefined;

interface ErrorModalProps {
  error: CustomError;
  open: boolean;
  onRequestClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  error,
  open,
  onRequestClose,
}) => {
  if (!open || !error) return null;

  const getMessage = () => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (typeof error === "object" && error !== null) {
      const maybeError = error as { message?: unknown };
      if (typeof maybeError.message === "string") {
        return maybeError.message;
      }
    }
    return "An unexpected error occurred.";
  };

  return (
    <Backdrop onClick={onRequestClose}>
      <Modal
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <CloseButton onClick={onRequestClose}>&times;</CloseButton>
        <Title>Error</Title>
        <Message>{getMessage()}</Message>
        <AcceptButton onClick={onRequestClose}>Accept</AcceptButton>
      </Modal>
    </Backdrop>
  );
};

export default ErrorModal;
