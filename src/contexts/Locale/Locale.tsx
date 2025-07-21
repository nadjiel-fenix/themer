/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/en";
import "dayjs/locale/pt-br";

import type { Locale, LocaleProps } from "./types";

export const Context = createContext<LocaleProps | null>(null);

export function Provider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem("locale") || "en-us") as Locale
  );

  const setLocaleWrapper = (locale: Locale) => {
    setLocale((prev) => {
      if (prev === locale) return prev;

      localStorage.setItem("locale", locale);

      return locale;
    });
  };

  return (
    <Context.Provider value={{ locale, setLocale: setLocaleWrapper }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        {children}
      </LocalizationProvider>
    </Context.Provider>
  );
}

const useLocale = (): LocaleProps | null => {
  const context = useContext(Context);

  return context;
};

export default useLocale;
