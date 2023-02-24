import { ReactElement, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { ClientOnly } from "@module/core/components/ClientOnly";

export interface ResponsiveImageProps {
  src: string;
  LoadingComponent?: ReactElement;
}

export function ResponsiveImage({
  src,
  LoadingComponent,
  ...props
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(!LoadingComponent);

  return (
    <>
      {!loaded && LoadingComponent && (
        <StyledImage as={"div"}>{LoadingComponent}</StyledImage>
      )}
      <ClientOnly>
        <StyledImage
          src={src}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          {...(!loaded && {
            style: {
              height: 0,
              width: 0,
            },
          })}
          {...props}
        />
      </ClientOnly>
    </>
  );
}

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  -webkit-user-drag: none;
`;
