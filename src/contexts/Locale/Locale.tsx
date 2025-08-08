/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
} from "react";
import { LocalizationProvider as MuiLocaleProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/en";
import "dayjs/locale/pt-br";

import type { KebabLocale, LocaleProps } from "./types";

export const Context = createContext<LocaleProps | null>(null);

export function Provider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<KebabLocale>(
    () => (localStorage.getItem("locale") || "en-us") as KebabLocale
  );

  const setLocaleWrapper = (locale: KebabLocale) => {
    setLocale((prev) => {
      if (prev === locale) return prev;

      localStorage.setItem("locale", locale);

      return locale;
    });
  };

  return (
    <Context.Provider value={{ locale, setLocale: setLocaleWrapper }}>
      <MuiLocaleProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
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
