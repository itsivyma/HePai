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

    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("平行五度");
    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("第二小節，第 1 拍至第 2 拍");
    expect(screen.getByRole("button", { name: "平行五度，第二小節，第 1 拍至第 2 拍" })).toBeInTheDocument();

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

    expect(screen.getByRole("region", { name: "錯誤導覽" })).toBeInTheDocument();
    expect(overlay).toHaveClass("hidden", "sm:block");
    expect(mobileCard).toHaveClass("sm:hidden", "rounded-[2rem]", "border", "bg-card");
    expect(screen.queryByText("問題導覽")).not.toBeInTheDocument();
    expect(screen.queryByText("點選任一錯誤，更新譜面高亮與下方詳細說明。")).not.toBeInTheDocument();
    expect(overlay).toHaveTextContent("平行五度");
    expect(mobileCard).toHaveTextContent("平行五度");
    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("第二小節，第 1 拍至第 2 拍");
    expect(screen.getByRole("button", { name: "平行五度，第二小節，第 1 拍至第 2 拍" })).toBeInTheDocument();

    fireEvent.click(
      within(issueNavigator).getByRole("button", { name: /平行五度.*第二小節，第 2 拍至第 3 拍/i })
    );

    expect(overlay).toHaveTextContent("平行五度");
    expect(mobileCard).toHaveTextContent("平行五度");
    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("第二小節，第 2 拍至第 3 拍");
  });

  it("preserves the native aspect ratio of the score capture image", () => {
    // Robustness guard: if someone swaps /public/score-original.png for a
    // differently-proportioned photograph, `preserveAspectRatio="none"`
    // would silently stretch the notation vertically or horizontally. The
    // current image (2560×1051) happens to match the 2048×840 viewBox
    // closely enough to hide the bug, but future edits shouldn't depend
    // on that coincidence. Use `xMidYMid meet` so any future aspect
    // mismatch letterboxes rather than distorts the music.
    const { container } = render(
      <MemoryRouter>
        <B4RecognitionResult />
      </MemoryRouter>
    );

    const scoreImage = container.querySelector(
      "svg[aria-labelledby='recognition-score-title'] image"
    );
    expect(scoreImage).not.toBeNull();
    expect(scoreImage).toHaveAttribute("preserveAspectRatio", "xMidYMid meet");
  });
});
