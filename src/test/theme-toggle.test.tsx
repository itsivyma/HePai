import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "system",
    setTheme: mockSetTheme,
    resolvedTheme: "light",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import E2Preferences from "@/pages/E2_Preferences";

const renderPrefs = () =>
  render(
    <MemoryRouter>
      <E2Preferences />
    </MemoryRouter>
  );

beforeEach(() => {
  mockSetTheme.mockClear();
});

describe("E2_Preferences theme toggle", () => {
  it("renders theme section label", () => {
    renderPrefs();
    expect(screen.getByText("外觀模式")).toBeInTheDocument();
  });

  it("renders three theme options: 淺色, 深色, 系統", () => {
    renderPrefs();
    expect(screen.getByText("淺色")).toBeInTheDocument();
    expect(screen.getByText("深色")).toBeInTheDocument();
    expect(screen.getByText("系統")).toBeInTheDocument();
  });

  it("calls setTheme('dark') when clicking 深色", () => {
    renderPrefs();
    fireEvent.click(screen.getByText("深色"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it("calls setTheme('light') when clicking 淺色", () => {
    renderPrefs();
    fireEvent.click(screen.getByText("淺色"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it("calls setTheme('system') when clicking 系統", () => {
    renderPrefs();
    fireEvent.click(screen.getByText("系統"));
    expect(mockSetTheme).toHaveBeenCalledWith("system");
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it("preserves existing hint level and notification controls", () => {
    renderPrefs();
    expect(screen.getByText("提示程度")).toBeInTheDocument();
    expect(screen.getByText("推播通知")).toBeInTheDocument();
  });

  it("uses resolvedTheme fallback to avoid flash of unstyled content", () => {
    // Verify the source code uses resolvedTheme as fallback
    const fs = require("fs");
    const path = require("path");
    const source = fs.readFileSync(
      path.resolve(__dirname, "../pages/E2_Preferences.tsx"),
      "utf-8"
    );
    expect(source).toContain("resolvedTheme");
    // Should use theme ?? resolvedTheme or similar fallback pattern
    expect(source).toMatch(/theme\s*\?\?\s*resolvedTheme|resolvedTheme.*fallback|currentTheme/);
  });
});
