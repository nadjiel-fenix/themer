export function toKebabLocale(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function toCamelLocale(input: string): string {
  return input
    .split("-")
    .map((part, i) => (i === 0 ? part : part.toUpperCase()))
    .join("");
}
