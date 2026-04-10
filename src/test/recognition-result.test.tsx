import { fireEvent, render, screen } from "@testing-library/react";
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

    fireEvent.click(screen.getAllByRole("button", { name: /連續八度/i })[0]);

    const primaryPanel = screen.getByTestId("selected-issue-panel");
    expect(primaryPanel).toHaveTextContent("連續八度");
    expect(primaryPanel).toHaveTextContent("避免外聲部形成連續純八度");
  });
});
