import type { Theme as MuiTheme } from "@mui/material";

export type Theme = "light" | "dark";

export interface ThemeProps {
  theme: Theme;
  value: MuiTheme;
  setTheme: (theme: Theme) => void;
}
