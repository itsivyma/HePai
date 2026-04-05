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
    expect(header).toHaveClass("liquid-glass");
  });

  it("no longer uses inline backdrop-blur-md", () => {
    const { container } = renderHeader();
    const header = container.firstElementChild as HTMLElement;
    expect(header).not.toHaveClass("backdrop-blur-md");
    expect(header).not.toHaveClass("bg-background/90");
  });

  it("resets liquid-glass border and only applies bottom divider", () => {
    const { container } = renderHeader();
    const header = container.firstElementChild as HTMLElement;
    expect(header).toHaveClass("border-0");
    expect(header).toHaveClass("border-b");
  });
});
