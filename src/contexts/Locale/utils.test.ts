import { describe, it, expect } from "vitest";

import { ptBR, enUS } from "@mui/material/locale";

import {
  toKebabLocale,
  toCamelLocale,
  toMuiLocale,
  toDayJsLocale,
} from "./utils";

import type { CamelLocale, KebabLocale } from "./types";

describe("Locale.utils", () => {
  describe("toKebabLocale", () => {
    it("converts camel locale", () => {
      // Arrange
      const input: CamelLocale = "ptBR";

      // Act
      const output = toKebabLocale(input);

      // Assert
      expect(output).toBe("pt-br");
    });
  });

  describe("toCamelLocale", () => {
    it("converts kebab locale", () => {
      // Arrange
      const input: KebabLocale = "pt-br";

      // Act
      const output = toCamelLocale(input);

      // Assert
      expect(output).toBe("ptBR");
    });
  });

  describe("toMuiLocale", () => {
    it("converts english locale", () => {
      // Arrange
      const input: KebabLocale = "en-us";

      // Act
      const output = toMuiLocale(input);

      // Assert
      expect(output).toBe(enUS);
    });

    it("converts portuguese locale", () => {
      // Arrange
      const input: KebabLocale = "pt-br";

      // Act
      const output = toMuiLocale(input);

      // Assert
      expect(output).toBe(ptBR);
    });
  });

  describe("toDayJsLocale", () => {
    it("converts english locale", () => {
      // Arrange
      const input: KebabLocale = "en-us";

      // Act
      const output = toDayJsLocale(input);

      // Assert
      expect(output).toBe("en");
    });

    it("converts portuguese locale", () => {
      // Arrange
      const input: KebabLocale = "pt-br";

      // Act
      const output = toDayJsLocale(input);

      // Assert
      expect(output).toBe("pt-br");
    });
  });
});
