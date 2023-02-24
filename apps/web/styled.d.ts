import type { ThemeType } from "@module/core/config/theme";

declare module "styled-components" {
  // eslint-disable-next-line
  export interface DefaultTheme extends ThemeType {}
}
