import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import B8ErrorDetail from "@/pages/B8_ErrorDetail";

describe("B8ErrorDetail", () => {
  it("renders the selected demo issue when opened from demo work detail", () => {
    render(
      <MemoryRouter initialEntries={["/grading/error/parallel-octave?source=demo"]}>
        <Routes>
          <Route path="/grading/error/:id" element={<B8ErrorDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("連續八度")).toBeInTheDocument();
    expect(screen.getByText("第 5 到 6 小節")).toBeInTheDocument();
    expect(screen.getByText(/避免外聲部形成連續純八度/)).toBeInTheDocument();
  });
});
