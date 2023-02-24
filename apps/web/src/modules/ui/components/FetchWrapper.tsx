import {
  ComponentType,
  FunctionComponent,
  JSXElementConstructor,
  ReactNode,
} from "react";
import { Empty } from "./Empty";
import { Loader } from "./Loader";
import Error, { ErrorProps } from "./Error";

interface FetchWrapperProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: ErrorProps["error"];
  EmptyComponent?: FunctionComponent;
  LoaderComponent?: FunctionComponent;
  ErrorComponent?:
    | ComponentType<ErrorProps>
    | JSXElementConstructor<ErrorProps>;
  children: ReactNode;
}

export function FetchWrapper({
  isLoading,
  isEmpty,
  error,
  EmptyComponent = Empty,
  LoaderComponent = Loader,
  ErrorComponent = Error,
  children,
}: FetchWrapperProps) {
  if (isLoading) {
    return <LoaderComponent />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isEmpty) {
    return <EmptyComponent />;
  }

  return <>{children}</>;
}
