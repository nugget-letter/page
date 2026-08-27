import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatsBand } from "./StatsBand";
import { stats } from "@/lib/content";

describe("StatsBand", () => {
  it("renders every stat value and label", () => {
    render(<StatsBand />);
    for (const stat of stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });
});
