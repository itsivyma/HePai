import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * TDD tests for ThemeProvider integration.
 * Verifies next-themes ThemeProvider wraps the ENTIRE application,
 * including pre-onboarding screens.
 */

let appSource: string;

beforeAll(() => {
  appSource = readFileSync(resolve(__dirname, "../App.tsx"), "utf-8");
});

describe("ThemeProvider integration in App.tsx", () => {
  it("imports ThemeProvider from next-themes", () => {
    expect(appSource).toMatch(/import.*ThemeProvider.*from\s+['"]next-themes['"]/);
  });

  it("wraps content with ThemeProvider using class attribute", () => {
    expect(appSource).toContain("<ThemeProvider");
    expect(appSource).toContain('attribute="class"');
  });

  it("defaults to system theme with enableSystem", () => {
    expect(appSource).toContain('defaultTheme="system"');
    expect(appSource).toContain("enableSystem");
  });

  it("ThemeProvider wraps ALL screens including pre-onboarding", () => {
    // The component's top-level return must render ThemeProvider as the outermost element.
    // This ensures all screens (splash, onboarding, login, main) get theme context.

    // Find the App component's direct return (the final return in the component body)
    // The pattern: the last `return (` before the component's closing should contain ThemeProvider
    const componentReturn = appSource.match(
      /const App\s*=\s*\(\)\s*=>\s*\{[\s\S]*?(return\s*\(\s*<ThemeProvider)/
    );
    expect(componentReturn).not.toBeNull();

    // Verify no screen-rendering early returns exist at the component top level
    // (they should be moved into a sub-function or conditional JSX inside ThemeProvider)
    const topLevelEarlyReturns = appSource.match(
      /const App[\s\S]*?(if \(screen ===.*return <[^;]+;)/
    );
    // If early returns exist, they must NOT be direct returns from App
    // They should be in a nested function (renderScreen, etc.)
    if (topLevelEarlyReturns) {
      // Check that these are inside a nested function, not at App's top level
      const earlyReturnCode = topLevelEarlyReturns[1];
      const nestedFnMatch = appSource.match(
        /const \w+\s*=\s*\(\)\s*(?::\s*\w+\s*)?=>\s*\{[\s\S]*?if \(screen ===/
      );
      expect(nestedFnMatch).not.toBeNull();
    }
  });
});
