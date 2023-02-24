import type { ReactNode } from "react";
import styled from "styled-components";

const baseStyle = styled.h1`
  color: ${(props) => props.theme.colors.title};
  line-height: 1;
  font-weight: 800;
`;

const TitleComponents = {
  h1: styled(baseStyle)`
    font-size: 3rem;
    line-height: 1.5;
    text-align: center;
  `,
  h2: styled(baseStyle)`
    font-size: 1.75rem;
    line-height: 1.35rem;
  `,
} as const;

export interface TitleProps {
  children: ReactNode;
  level?: keyof typeof TitleComponents;
}

const Title = ({ level = "h1", children }: TitleProps) => {
  const Component = TitleComponents[level];

  return <Component as={level}>{children}</Component>;
};

export default Title;
