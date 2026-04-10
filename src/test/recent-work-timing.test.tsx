import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import B3ImageProcess from "@/pages/B3_ImageProcess";
import B4RecognitionResult from "@/pages/B4_RecognitionResult";

const STORAGE_KEY = "hepai_demo_recent_works";

describe("recent work persistence timing", () => {
  it("does not persist demo work on the processing screen", () => {
    window.localStorage.removeItem(STORAGE_KEY);

    render(
      <MemoryRouter>
        <B3ImageProcess />
      </MemoryRouter>
    );

    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("persists demo work after the recognition result is reached", async () => {
    window.localStorage.removeItem(STORAGE_KEY);

    render(
      <MemoryRouter>
        <B4RecognitionResult />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(window.localStorage.getItem(STORAGE_KEY)).toContain("demo-score-capture");
    });
  });
});
