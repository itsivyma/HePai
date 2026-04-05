import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BottomTabBar from "@/components/layout/BottomTabBar";

const renderTabBar = () =>
  render(
    <MemoryRouter initialEntries={["/grading"]}>
      <BottomTabBar />
    </MemoryRouter>
  );

describe("BottomTabBar", () => {
  it("renders all four tab labels", () => {
    renderTabBar();
    expect(screen.getByText("批改")).toBeInTheDocument();
    expect(screen.getByText("題庫")).toBeInTheDocument();
    expect(screen.getByText("報告")).toBeInTheDocument();
    expect(screen.getByText("我的")).toBeInTheDocument();
  });

  it("uses liquid-glass-strong class", () => {
    const { container } = renderTabBar();
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("liquid-glass-strong");
  });

  it("no longer uses legacy glass-strong class", () => {
    const { container } = renderTabBar();
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveClass("glass-strong");
  });
});
