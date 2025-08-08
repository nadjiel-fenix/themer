import type { PropsWithChildren } from "react";
import type { Localization } from "@mui/material/locale";

export type MuiLocale = Localization;

export type Locale = "en-us" | "pt-br";

export type KebabLocale = Locale;

export type CamelLocale = "enUS" | "ptBR";

export type DayJsLocale = "en" | "pt-br";

export interface LocaleProps extends PropsWithChildren {
  defaultValue?: KebabLocale;
}

export interface LocaleContext {
  locale: KebabLocale;
  setLocale: (locale: KebabLocale) => void;
}
