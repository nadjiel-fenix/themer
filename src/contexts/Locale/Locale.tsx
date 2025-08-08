/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type PropsWithChildren,
} from "react";
import { LocalizationProvider as MuiLocaleProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/en";
import "dayjs/locale/pt-br";

import { toDayJsLocale } from "./utils";
import { Theme } from "../Theme";

import type { KebabLocale, LocaleProps } from "./types";

export const Context = createContext<LocaleProps | null>(null);

/**
 * Provides information about localization.
 * If this Provider is used within the context of a ThemeProvider,
 * the locale of the theme is also managed by this context.
 */
export function Provider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState(
    (localStorage.getItem("locale") || "en-us") as KebabLocale
  );

  const theme = useContext(Theme.Context);

  useEffect(() => {
    if (!theme) return;

    theme.setLocale?.(locale);
  }, [locale, theme]);

  const setLocaleWrapper = (locale: KebabLocale) => {
    setLocale((prev) => {
      if (prev === locale) return prev;

      localStorage.setItem("locale", locale);

      return locale;
    });
  };

  return (
    <Context.Provider value={{ locale, setLocale: setLocaleWrapper }}>
      <MuiLocaleProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={toDayJsLocale(locale)}
      >
        {children}
      </MuiLocaleProvider>
    </Context.Provider>
  );
}

const useLocale = (): LocaleProps => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useLocale must be used within a Locale.Provider");
  }

  return context;
};

export default useLocale;
