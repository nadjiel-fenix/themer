/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useMemo,
  useState,
  useContext,
  type PropsWithChildren,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { light, dark } from "../../themes";

import { useLocale, getMuiLocale } from "../Locale";

import type { Theme, ThemeProps } from "./types";

const themes = { light, dark };

export const Context = createContext<ThemeProps | null>(null);

export function Provider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") || "light") as Theme
  );
  const { locale = "en-us" } = useLocale() ?? {};

  const value = useMemo(() => {
    return createTheme(themes[theme], getMuiLocale(locale));
  }, [theme, locale]);

  const setThemeWrapper = (theme: Theme) => {
    setTheme((prev) => {
      if (prev === theme) return prev;

      localStorage.setItem("theme", theme);

      return theme;
    });
  };

  return (
    <Context.Provider value={{ theme, value, setTheme: setThemeWrapper }}>
      <ThemeProvider theme={value}>
        {children}
        <CssBaseline />
      </ThemeProvider>
    </Context.Provider>
  );
}

const useTheme = (): ThemeProps => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useTheme must be used within a Theme.Provider");
  }

  return context;
};

export default useTheme;
