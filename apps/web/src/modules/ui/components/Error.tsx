import { ComponentProps } from "react";
import styled from "styled-components";
import { isEmpty } from "rambda";

const GENERAL_ERROR = "Error has occurred 🔥";

type ErrorType = Error;

export interface ErrorProps {
  error?: ErrorType | ErrorType[];
}

export const createErrorMessage = (err?: ErrorType): string => {
  if (typeof err === "string") {
    return err;
  }

  return err?.toString() || GENERAL_ERROR;
};

export const createErrorMessages = (
  error?: ErrorType | ErrorType[]
): string[] => {
  return isEmpty(error)
    ? [GENERAL_ERROR]
    : [error].flat().filter(Boolean).map(createErrorMessage);
};

const Error = ({
  error,
  ...props
}: ErrorProps & ComponentProps<typeof StyledWrapper>) => {
  const errorMessages = createErrorMessages(error);

  return (
    <StyledWrapper {...props} data-cy={"error-wrapper"}>
      {errorMessages.map((err) => (
        <p key={err} data-cy={"error"}>
          {err}
        </p>
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  font-size: 1rem;
`;

export default Error;
