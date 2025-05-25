import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 96px);
  width: 100%;
  padding: 20px;
  text-align: center;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

export const Message = styled.p`
  font-size: 1rem;
  color: white;
  margin-bottom: 20px;
`;
