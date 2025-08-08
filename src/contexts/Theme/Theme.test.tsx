import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, screen } from "@testing-library/react";
import { act, type PropsWithChildren } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TablePagination } from "@mui/material";

import useTheme, { Provider } from "./Theme";

import type { ThemeProps } from "./types";

function createWrapper(props?: ThemeProps) {
  return ({ children }: PropsWithChildren) => {
    return (
      <Provider {...props}>
        {children}
        {props?.children}
      </Provider>
    );
  };
}

describe("Theme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to system", () => {
    // Arrange
    const { result: preferredTheme } = renderHook(() =>
      useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light"
    );

    // Act
    const { result: theme } = renderHook(() => useTheme(), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(theme.current.theme).toBe(preferredTheme.current);
  });

  it("defaults to storage", () => {
    // Arrange
    localStorage.setItem("theme", "dark");

    // Act
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(result.current.theme).toBe("dark");
  });

  it("accepts light", async () => {
    // Arrange
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(),
    });

    // Act
    await act(async () => result.current.setTheme("light"));

    // Assert
    expect(result.current.theme).toBe("light");
  });

  it("accepts dark", async () => {
    // Arrange
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(),
    });

    // Act
    await act(async () => result.current.setTheme("dark"));

    // Assert
    expect(result.current.theme).toBe("dark");
  });

  it("updates components with locale", async () => {
    // Arrange
    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper({
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
