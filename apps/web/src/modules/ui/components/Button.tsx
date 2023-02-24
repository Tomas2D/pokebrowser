import type { ComponentProps, ReactNode } from "react";
import styled from "styled-components";

const baseStyle = styled.button`
  color: ${(props) => props.theme.colors.text};
  line-height: 1;
  font-weight: bold;
  border-radius: 8px;
`;

export const ButtonComponents = {
  primary: styled(baseStyle)`
    font-size: 1.25rem;
    line-height: 1.5;
    text-align: center;
  `,
  empty: styled.button`
    border: 0;
    line-height: 1;
    background: none;
    cursor: pointer;
  `,
} as const;

export interface ButtonProps {
  children: ReactNode;
  level?: keyof typeof ButtonComponents;
  buttonProps?: ComponentProps<typeof baseStyle>;
}

const Button = ({ level = "primary", children, buttonProps }: ButtonProps) => {
  const Component = ButtonComponents[level];

  return (
    <Component type={"button"} {...buttonProps}>
      {children}
    </Component>
  );
};

export default Button;
