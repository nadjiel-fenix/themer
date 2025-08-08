/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import { light, dark } from "../../themes";

import { toMuiLocale } from "../Locale";

import type { ThemeProps, Theme, ThemeContext } from "./types";
import type { KebabLocale } from "../Locale/types";

const themes = { light, dark };

export const Context = createContext<ThemeContext | null>(null);

/**
 * Manages the theme of the application in integration with MUI.
 * This Provider also exposes utils to manage the locale of MUI's theme,
 * besides the theme object itself.
 */
export function Provider({ defaultValue = "light", children }: ThemeProps) {
  const preferredTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const [theme, setTheme] = useState(
    (localStorage.getItem("theme") || preferredTheme || defaultValue) as Theme
  );
  const [locale, setLocale] = useState("en-us" as KebabLocale);

  const muiTheme = useMemo(() => {
    return createTheme(themes[theme], toMuiLocale(locale));
  }, [theme, locale]);

  const setThemeWrapper = (theme: Theme) => {
    setTheme((prev) => {
      if (prev === theme) return prev;

      localStorage.setItem("theme", theme);

      return theme;
    });
  };

  return (
    <Context.Provider
      value={{
        theme,
        setTheme: setThemeWrapper,
        muiTheme,
        locale,
        setLocale,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        {children}
        <CssBaseline />
      </MuiThemeProvider>
    </Context.Provider>
  );
}

const useTheme = (): ThemeContext => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useTheme must be used within a Theme.Provider");
  }

  return context;
};

export default useTheme;
