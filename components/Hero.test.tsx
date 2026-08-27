import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { heroContent } from "@/lib/content";

describe("Hero", () => {
  it("renders the headline, highlight, and both CTAs with correct hrefs", () => {
    render(<Hero />);
    expect(screen.getByText(heroContent.headline)).toBeInTheDocument();
    expect(screen.getByText(heroContent.highlight)).toBeInTheDocument();

    const primary = screen.getByRole("link", { name: heroContent.primaryCta.label });
    expect(primary).toHaveAttribute("href", heroContent.primaryCta.href);

    const secondary = screen.getByRole("link", { name: heroContent.secondaryCta.label });
    expect(secondary).toHaveAttribute("href", heroContent.secondaryCta.href);
  });

  it("never renders a <video> element (motion is CSS-only per spec)", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("video")).toBeNull();
  });
});
