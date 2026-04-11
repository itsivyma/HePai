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

  it("renders the selected issue summary as a desktop badge plus a mobile badge", () => {
    render(
      <MemoryRouter>
        <B4RecognitionResult />
      </MemoryRouter>
    );

    const desktopBadge = screen.getByTestId("selected-issue-badge-desktop");
    const mobileBadge = screen.getByTestId("selected-issue-badge-mobile");
    const issueNavigator = screen.getByTestId("issue-navigator");

    expect(screen.getByRole("region", { name: "錯誤導覽" })).toBeInTheDocument();
    expect(desktopBadge).toHaveClass("hidden", "sm:block");
    expect(mobileBadge).toHaveClass("sm:hidden", "rounded-[2rem]", "border", "bg-card");
    expect(screen.queryByText("問題導覽")).not.toBeInTheDocument();
    expect(screen.queryByText("點選任一錯誤，更新譜面高亮與下方詳細說明。")).not.toBeInTheDocument();
    expect(desktopBadge).toHaveTextContent("平行五度");
    expect(mobileBadge).toHaveTextContent("平行五度");
    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("第二小節，第 1 拍至第 2 拍");
    expect(screen.getByRole("button", { name: "平行五度，第二小節，第 1 拍至第 2 拍" })).toBeInTheDocument();

    fireEvent.click(
      within(issueNavigator).getByRole("button", { name: /平行五度.*第二小節，第 2 拍至第 3 拍/i })
    );

    expect(desktopBadge).toHaveTextContent("平行五度");
    expect(mobileBadge).toHaveTextContent("平行五度");
    expect(screen.getByTestId("selected-issue-panel")).toHaveTextContent("第二小節，第 2 拍至第 3 拍");
  });

  it("never nests the desktop summary badge inside the score aspect frame", () => {
    // Regression guard: previously the desktop badge sat absolute inside
    // the aspect-[2048/840] wrapper of the score SVG, which at ≥sm
    // viewports stacked it over the bass clef and hid Soprano/Bass
    // voice-leading errors from the reader (see problem.png in the
    // original report). Keep the badge strictly OUTSIDE the SVG's aspect
    // frame so both staves remain fully visible on every viewport.
    const { container } = render(
      <MemoryRouter>
        <B4RecognitionResult />
      </MemoryRouter>
    );

    const desktopBadge = screen.getByTestId("selected-issue-badge-desktop");
    const scoreSvg = container.querySelector(
      "svg[aria-labelledby='recognition-score-title']"
    );
    expect(scoreSvg).not.toBeNull();
    const scoreFrame = scoreSvg!.parentElement;
    expect(scoreFrame).not.toBeNull();
    expect(scoreFrame).not.toContainElement(desktopBadge);
  });
});
