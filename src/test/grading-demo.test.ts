import { describe, expect, it } from "vitest";

import {
  DEMO_RECOGNITION_ISSUES,
  buildRecognitionCards,
  readDemoRecentWorks,
  upsertDemoRecentWork,
} from "@/lib/grading-demo";

describe("grading demo helpers", () => {
  it("moves the selected recognition issue to the first position", () => {
    const cards = buildRecognitionCards(DEMO_RECOGNITION_ISSUES, "parallel-octave");

    expect(cards[0].id).toBe("parallel-octave");
    expect(cards[0].title).toBe("連續八度");
    expect(cards).toHaveLength(4);
  });

  it("inserts the demo work at the top without duplicating it", () => {
    const firstInsert = upsertDemoRecentWork([]);
    const secondInsert = upsertDemoRecentWork(firstInsert);

    expect(firstInsert[0].id).toBe("demo-score-capture");
    expect(secondInsert.filter((work) => work.id === "demo-score-capture")).toHaveLength(1);
  });

  it("falls back to an empty list when stored JSON is not a valid demo work array", () => {
    window.localStorage.setItem("hepai_demo_recent_works", JSON.stringify({ foo: "bar" }));
    expect(readDemoRecentWorks()).toEqual([]);

    window.localStorage.setItem(
      "hepai_demo_recent_works",
      JSON.stringify([{ id: 123, title: "bad shape" }])
    );
    expect(readDemoRecentWorks()).toEqual([]);
  });
});
