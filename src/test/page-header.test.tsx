import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";

const renderHeader = (props = {}) =>
  render(
    <MemoryRouter>
      <PageHeader title="測試標題" {...props} />
    </MemoryRouter>
  );

describe("PageHeader", () => {
  it("renders the title text", () => {
    renderHeader();
    expect(screen.getByText("測試標題")).toBeInTheDocument();
  });

  it("uses liquid-glass class for frosted header", () => {
    const { container } = renderHeader();
    const header = container.firstElementChild as HTMLElement;
    expect(header.className).toContain("liquid-glass");
  });

  it("no longer uses inline backdrop-blur-md", () => {
    const { container } = renderHeader();
    const header = container.firstElementChild as HTMLElement;
    expect(header.className).not.toContain("backdrop-blur-md");
    expect(header.className).not.toContain("bg-background/90");
  });
});
