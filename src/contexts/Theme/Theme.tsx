/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useMemo,
  useState,
  useContext,
  type PropsWithChildren,
} from "react";
import { ThemeProvider, type Theme as MuiTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { light, dark } from "../../themes";

const themes = { light, dark };

type Theme = keyof typeof themes;

interface ThemeProps {
  theme: Theme;
  value: MuiTheme;
  setTheme: (theme: Theme) => void;
}

export const Context = createContext<ThemeProps | null>(null);

export function Provider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "light"
  );

  const value = useMemo(() => {
    return themes[theme];
  }, [theme]);

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
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
