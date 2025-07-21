import { enUS, ptBR } from "@mui/material/locale";

import type { CamelLocale, Locale } from "./types";

const muiLocales = { enUS, ptBR };

export function toKebabLocale(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function toCamelLocale(input: string): string {
  return input
    .split("-")
    .map((part, i) => (i === 0 ? part : part.toUpperCase()))
    .join("");
}

export function getMuiLocale(kebabLocale: Locale) {
  return muiLocales[toCamelLocale(kebabLocale) as CamelLocale];
}
