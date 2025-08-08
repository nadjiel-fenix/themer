import type { Localization } from "@mui/material/locale";

export type MuiLocale = Localization;

export type Locale = "en-us" | "pt-br";

export type KebabLocale = Locale;

export type CamelLocale = "enUS" | "ptBR";

export interface LocaleProps {
  locale: Locale;
  setLocale: (theme: Locale) => void;
}
