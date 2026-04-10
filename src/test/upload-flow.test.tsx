import { render, screen } from "@testing-library/react";
import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import B2Upload from "@/pages/B2_Upload";

describe("B2Upload", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not auto-advance to processing without user action", () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={["/grading/upload"]}>
        <Routes>
          <Route path="/grading/upload" element={<B2Upload />} />
          <Route path="/grading/process" element={<div>processing</div>} />
        </Routes>
      </MemoryRouter>
    );

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.getByText("對齊完成")).toBeInTheDocument();
    expect(screen.queryByText("processing")).not.toBeInTheDocument();
  });
});
