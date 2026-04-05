import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * TDD tests for Liquid Glass design tokens.
 * Verifies CSS custom properties and utility classes
 * for both light and dark modes.
 */

let cssContent: string;

beforeAll(() => {
  cssContent = readFileSync(
    resolve(__dirname, "../index.css"),
    "utf-8"
  );
});

describe("Light mode CSS variables (:root)", () => {
  it("preserves existing color tokens unchanged", () => {
    expect(cssContent).toContain("--primary: 192 72% 42%");
    expect(cssContent).toContain("--accent: 210 72% 55%");
    expect(cssContent).toContain("--background: 210 25% 97%");
    expect(cssContent).toContain("--foreground: 220 15% 18%");
    expect(cssContent).toContain("--success: 152 60% 42%");
    expect(cssContent).toContain("--warning: 38 92% 50%");
    expect(cssContent).toContain("--destructive: 0 75% 55%");
  });

  it("defines glass design tokens in :root", () => {
    expect(cssContent).toContain("--glass-bg:");
    expect(cssContent).toContain("--glass-bg-strong:");
    expect(cssContent).toContain("--glass-bg-subtle:");
    expect(cssContent).toContain("--glass-border:");
    expect(cssContent).toContain("--glass-border-strong:");
    expect(cssContent).toContain("--glass-border-subtle:");
    expect(cssContent).toContain("--glass-highlight:");
    expect(cssContent).toContain("--glass-shadow:");
  });
});

describe("Dark mode CSS variables (.dark)", () => {
  it("defines .dark selector with color overrides", () => {
    expect(cssContent).toMatch(/\.dark\s*\{/);
  });

  it("preserves same hue families in dark mode", () => {
    const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/s);
    expect(darkMatch).not.toBeNull();
    const darkBlock = darkMatch![1];

    expect(darkBlock).toMatch(/--primary:\s*192/);
    expect(darkBlock).toMatch(/--accent:\s*210/);
    expect(darkBlock).toMatch(/--background:\s*220/);
    expect(darkBlock).toMatch(/--success:\s*152/);
    expect(darkBlock).toMatch(/--warning:\s*38/);
    expect(darkBlock).toMatch(/--destructive:\s*0/);
  });

  it("defines dark mode glass tokens with reduced opacity", () => {
    const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/s);
    expect(darkMatch).not.toBeNull();
    const darkBlock = darkMatch![1];

    expect(darkBlock).toContain("--glass-bg:");
    expect(darkBlock).toContain("--glass-bg-strong:");
    expect(darkBlock).toContain("--glass-bg-subtle:");
    expect(darkBlock).toContain("--glass-border:");
    expect(darkBlock).toContain("--glass-highlight:");
    expect(darkBlock).toContain("--glass-shadow:");
  });
});

describe("Liquid Glass utility classes", () => {
  it("defines .liquid-glass base class", () => {
    expect(cssContent).toMatch(/\.liquid-glass\s*\{/);
  });

  it("defines .liquid-glass-strong class", () => {
    expect(cssContent).toMatch(/\.liquid-glass-strong\s*\{/);
  });

  it("defines .liquid-glass-subtle class", () => {
    expect(cssContent).toMatch(/\.liquid-glass-subtle\s*\{/);
  });

  it("liquid-glass classes use backdrop-filter with blur and saturate", () => {
    const lgMatch = cssContent.match(/\.liquid-glass\s*\{([^}]+)\}/s);
    expect(lgMatch).not.toBeNull();
    const lgBlock = lgMatch![1];

    expect(lgBlock).toContain("backdrop-filter:");
    expect(lgBlock).toContain("blur(");
    expect(lgBlock).toContain("saturate(");
  });

  it("liquid-glass classes reference glass CSS tokens", () => {
    const lgMatch = cssContent.match(/\.liquid-glass\s*\{([^}]+)\}/s);
    expect(lgMatch).not.toBeNull();
    const lgBlock = lgMatch![1];

    expect(lgBlock).toContain("var(--glass-bg)");
    expect(lgBlock).toContain("var(--glass-border)");
  });

  it("defines .liquid-glass-shine pseudo-element for specular highlight", () => {
    expect(cssContent).toMatch(/\.liquid-glass-shine::after/);
  });

  it("legacy glass classes are removed after full migration", () => {
    const legacyGlass = cssContent.match(/^\s*\.glass\s*\{/m);
    expect(legacyGlass).toBeNull();
  });
});

describe("Accessibility fallbacks", () => {
  it("provides prefers-reduced-transparency fallback", () => {
    expect(cssContent).toContain("prefers-reduced-transparency: reduce");
  });

  it("provides prefers-reduced-motion fallback", () => {
    expect(cssContent).toContain("prefers-reduced-motion: reduce");
  });

  it("disables backdrop-filter in reduced-transparency mode", () => {
    const rtMatch = cssContent.match(
      /prefers-reduced-transparency:\s*reduce\)\s*\{([\s\S]*?)\}\s*\}/
    );
    expect(rtMatch).not.toBeNull();
    const rtBlock = rtMatch![1];
    expect(rtBlock).toContain("backdrop-filter: none");
  });
});
