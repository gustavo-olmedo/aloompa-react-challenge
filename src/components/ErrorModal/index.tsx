import React from "react";
import styled from "styled-components";

export type CustomError = Error | { message?: string } | string | undefined;

interface ErrorModalProps {
  error: CustomError;
  open: boolean;
  onRequestClose: () => void;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #ffffff;
  color: #333;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  position: relative;
  text-align: center;
  animation: fadeIn 0.2s ease-out;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #e74c3c;
  font-size: 1.5rem;
`;

const Message = styled.p`
  margin: 1rem 0 2rem;
  font-size: 1rem;
  color: #555;
  word-break: break-word;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const AcceptButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

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
