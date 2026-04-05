import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * TDD tests for Tailwind config.
 */

let configContent: string;

beforeAll(() => {
  configContent = readFileSync(
    resolve(__dirname, "../../tailwind.config.ts"),
    "utf-8"
  );
});

describe("Tailwind config", () => {
  it("preserves all existing color tokens", () => {
    expect(configContent).toContain('"hsl(var(--primary))"');
    expect(configContent).toContain('"hsl(var(--accent))"');
    expect(configContent).toContain('"hsl(var(--success))"');
    expect(configContent).toContain('"hsl(var(--warning))"');
    expect(configContent).toContain('"hsl(var(--destructive))"');
  });

  it("preserves existing animations", () => {
    expect(configContent).toContain('"accordion-down"');
    expect(configContent).toContain('"fade-in"');
    expect(configContent).toContain('"slide-up"');
    expect(configContent).toContain('"pulse-soft"');
  });

  it("does NOT expose glass tokens as Tailwind colors (alpha-embedded values break /opacity)", () => {
    expect(configContent).not.toContain('"glass-bg"');
    expect(configContent).not.toContain('"glass-border"');
    expect(configContent).not.toContain('"glass-highlight"');
    expect(configContent).not.toContain('"glass-shadow"');
  });

  it("does not contain unused glass-shimmer animation", () => {
    expect(configContent).not.toContain('"glass-shimmer"');
  });
});
