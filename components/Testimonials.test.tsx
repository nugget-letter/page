import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Testimonials } from "./Testimonials";
import { testimonials } from "@/lib/content";

describe("Testimonials", () => {
  it("renders every quote and source twice, for a seamless marquee loop", () => {
    render(<Testimonials />);
    for (const t of testimonials) {
      expect(screen.getAllByText(`"${t.quote}"`)).toHaveLength(2);
      expect(screen.getAllByText(t.source)).toHaveLength(2);
    }
  });

  it("never labels a quote as coming from a 구독자 (redundant with the section heading)", () => {
    const { container } = render(<Testimonials />);
    expect(container.textContent).not.toContain("구독자 ·");
  });
});
