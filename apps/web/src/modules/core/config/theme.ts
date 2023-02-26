const colors = {
  text: "#312e2e",
  title: "#000",
  neutral: "#fff",
  notificationBg: "#faf8f8",
  layoutBg: "#f6f3f3",
  contentBg: "#fff",
  favoriteButtonBg: "#c5c5c5",
  error: "#534c4c",
  errorBg: "#e6b7b7",
  errorCodeBorder: "#191818",
  iconActive: `#0050e6`,
} as const;

const shadows = {
  base: `rgb(0 0 0 / 10%) 0px 1px 3px 1px, rgb(0 0 0 / 7%) 0px 0px 0px 1px`,
};

const breakpoints = {
  large: "1024px",
  xxlarge: "1600px",
};

export const theme = {
  colors,
  breakpoints,
  shadows,
} as const;

export type ThemeType = typeof theme;
