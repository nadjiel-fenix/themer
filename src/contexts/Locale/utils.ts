import { enUS, ptBR } from "@mui/material/locale";

import type { CamelLocale, KebabLocale, MuiLocale, DayJsLocale } from "./types";

const muiLocales = { enUS, ptBR };

const dayJsLocales: Record<CamelLocale, DayJsLocale> = {
  enUS: "en",
  ptBR: "pt-br",
};

export function toKebabLocale(input: CamelLocale): KebabLocale {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() as KebabLocale;
}

export function toCamelLocale(input: KebabLocale): CamelLocale {
  return input
    .split("-")
    .map((part, i) => (i === 0 ? part : part.toUpperCase()))
    .join("") as CamelLocale;
}

export function toMuiLocale(kebabLocale: KebabLocale): MuiLocale {
  return muiLocales[toCamelLocale(kebabLocale)];
}

export function toDayJsLocale(kebabLocale: KebabLocale): DayJsLocale {
  return dayJsLocales[toCamelLocale(kebabLocale)];
}
