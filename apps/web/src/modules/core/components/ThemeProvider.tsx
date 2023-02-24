import React, { ReactNode } from "react";
import {
  createGlobalStyle,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import { theme } from "../config/theme";

// @ts-expect-error
import vendorStyles from "@carbon/styles/css/styles.min.css";

interface ThemeProviderProps {
  children?: ReactNode;
}

const GlobalStyles = createGlobalStyle`
  ${vendorStyles}
  
  html.nprogress-busy {
    cursor: wait;
  }
  
  html, body {
    scroll-behavior: smooth;
  }
` as any;

const StyledComponentsThemeProvider__FIXED =
  StyledComponentsThemeProvider as any;

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledComponentsThemeProvider__FIXED theme={theme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </StyledComponentsThemeProvider__FIXED>
  );
}
