import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Testimonials } from "./Testimonials";
import { testimonials } from "@/lib/content";

describe("Testimonials", () => {
  it("renders every quote and its source", () => {
    render(<Testimonials />);
    for (const t of testimonials) {
      expect(screen.getByText(`"${t.quote}"`)).toBeInTheDocument();
      expect(screen.getByText(t.source)).toBeInTheDocument();
    }
  });
});
