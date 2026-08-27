import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Ticker, tickerItems } from "./Ticker";

describe("Ticker", () => {
  it("renders every ticker item at least once", () => {
    render(<Ticker />);
    for (const item of tickerItems) {
      expect(screen.getAllByText(item).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("duplicates the item list once for a seamless loop", () => {
    render(<Ticker />);
    const firstItem = tickerItems[0];
    expect(screen.getAllByText(firstItem).length).toBe(2);
  });
});
