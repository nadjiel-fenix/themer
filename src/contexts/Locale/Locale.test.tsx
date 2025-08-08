import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act, type PropsWithChildren } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TablePagination } from "@mui/material";
import dayjs from "dayjs";

import { Theme } from "../Theme";

import useLocale, { Provider } from "./Locale";

import type { LocaleProps } from "./types";

function createWrapper(props?: LocaleProps) {
  return ({ children }: PropsWithChildren) => {
    return (
      <Provider {...props}>
        {children}
        {props?.children}
      </Provider>
    );
  };
}

function createWrapperWithTheme(props?: LocaleProps) {
  return ({ children }: PropsWithChildren) => {
    return (
      <Theme.Provider>{createWrapper(props)({ children })}</Theme.Provider>
    );
  };
}

describe("Locale", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to system", () => {
    // Act
    const { result } = renderHook(() => useLocale(), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(result.current.locale).toMatch(new RegExp(navigator.language, "i"));
  });

  it("defaults to storage", () => {
    // Arrange
    localStorage.setItem("locale", "pt-br");

    // Act
    const { result } = renderHook(() => useLocale(), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(result.current.locale).toBe("pt-br");
  });

  it("accepts english", async () => {
    // Arrange
    const { result } = renderHook(() => useLocale(), {
      wrapper: createWrapper(),
    });

    // Act
    await act(async () => result.current.setLocale("en-us"));

    // Assert
    expect(result.current.locale).toBe("en-us");
  });

  it("accepts portuguese", async () => {
    // Arrange
    const { result } = renderHook(() => useLocale(), {
      wrapper: createWrapper(),
    });

    // Act
    await act(async () => result.current.setLocale("pt-br"));

    // Assert
    expect(result.current.locale).toBe("pt-br");
  });

  it("updates MUI calendar", async () => {
    // Arrange
    const { result } = renderHook(() => useLocale(), {
      wrapper: createWrapper({
        children: <DatePicker defaultValue={dayjs("2020-09-14")} />,
      }),
    });

    // Act
    await act(async () => result.current.setLocale("pt-br"));

    const button = screen.getByLabelText(/Choose date/i);
    await userEvent.click(button);

    // Assert
    expect(await screen.findByText(/Setembro/i)).toBeVisible();
  });

  it("updates MUI components with Theme", async () => {
    // Arrange
    const { result } = renderHook(() => useLocale(), {
      wrapper: createWrapperWithTheme({
        children: (
          <TablePagination
            count={2000}
            rowsPerPage={10}
            page={1}
            component="div"
            onPageChange={() => {}}
          />
        ),
      }),
    });

    // Act
    await act(async () => result.current.setLocale("pt-br"));

    // Assert
    expect(await screen.findByText(/Linhas por página/i)).toBeVisible();
  });
});
