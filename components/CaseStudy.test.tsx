import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy } from "./CaseStudy";
import { caseStudy, getCaseStudyMultiplier } from "@/lib/content";

describe("CaseStudy", () => {
  it("renders the metric label and multiplier", () => {
    render(<CaseStudy />);
    expect(screen.getByText(caseStudy.metricLabel)).toBeInTheDocument();
    expect(screen.getByText(`${getCaseStudyMultiplier()}배`)).toBeInTheDocument();
  });

  it("renders the after-bar taller than the before-bar, proportional to the values", () => {
    render(<CaseStudy />);
    const before = screen.getByTestId("case-bar-before");
    const after = screen.getByTestId("case-bar-after");

    const beforeHeight = parseFloat(before.style.height);
    const afterHeight = parseFloat(after.style.height);
    expect(afterHeight).toBeGreaterThan(beforeHeight);
    expect(afterHeight / beforeHeight).toBeCloseTo(getCaseStudyMultiplier(), 1);
  });

  it("never mentions a competitor by name", () => {
    const { container } = render(<CaseStudy />);
    expect(container.textContent).not.toContain("뉴닉");
  });
});
