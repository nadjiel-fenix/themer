import type { Theme as MuiTheme } from "@mui/material";
import type { KebabLocale } from "../Locale/types";

export type { Theme as MuiTheme } from "@mui/material";

export type Theme = "light" | "dark";

export interface ThemeProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  muiTheme: MuiTheme;
  locale: KebabLocale;
  setLocale: (locale: KebabLocale) => void;
}
