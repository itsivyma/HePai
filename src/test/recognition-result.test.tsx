import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import B4RecognitionResult from "@/pages/B4_RecognitionResult";

describe("B4RecognitionResult", () => {
  it("brings the tapped issue to the primary detail slot", async () => {
    render(
      <MemoryRouter>
        <B4RecognitionResult />
      </MemoryRouter>
    );

    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("連續五度 #1");

    fireEvent.click(
      within(screen.getByTestId("issue-navigator")).getByRole("button", { name: /連續八度/i })
    );

    const primaryPanel = screen.getByTestId("selected-issue-panel");
    expect(primaryPanel).toHaveTextContent("連續八度");
    expect(primaryPanel).toHaveTextContent("避免外聲部形成連續純八度");
  });

  it("keeps the selected issue summary available outside the score on mobile", () => {
    render(
      <MemoryRouter>
        <B4RecognitionResult />
      </MemoryRouter>
    );

    const overlay = screen.getByTestId("selected-issue-overlay");
    const mobileCard = screen.getByTestId("selected-issue-mobile-card");
    const issueNavigator = screen.getByTestId("issue-navigator");

    expect(overlay).toHaveClass("hidden", "sm:block");
    expect(mobileCard).toHaveClass("sm:hidden", "rounded-[2rem]", "border", "bg-card");
    expect(screen.queryByText("問題導覽")).not.toBeInTheDocument();
    expect(screen.queryByText("點選任一錯誤，更新譜面高亮與下方詳細說明。")).not.toBeInTheDocument();
    expect(overlay).toHaveTextContent("連續五度 #1");
    expect(mobileCard).toHaveTextContent("連續五度 #1");
    expect(within(issueNavigator).getByRole("button", { name: /連續五度 #1/i })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(within(issueNavigator).getByRole("button", { name: /連續五度 #2/i }));

    expect(overlay).toHaveTextContent("連續五度 #2");
    expect(mobileCard).toHaveTextContent("連續五度 #2");
    expect(within(issueNavigator).getByRole("button", { name: /連續五度 #1/i })).toHaveAttribute("aria-pressed", "false");
    expect(within(issueNavigator).getByRole("button", { name: /連續五度 #2/i })).toHaveAttribute("aria-pressed", "true");
  });
});
