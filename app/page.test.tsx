import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import {
  approvedClientLogos,
  b2bServices,
  careerListing,
  caseStudy,
  contactEmail,
  contentCategories,
  heroContent,
  navLinks,
  stats,
  testimonials,
} from "@/lib/content";
import { tickerItems } from "@/components/Ticker";

describe("Home page", () => {
  it("renders every id-bearing section in the order defined by the spec", () => {
    const { container } = render(<Home />);
    const sectionIds = Array.from(container.querySelectorAll("[id]")).map((el) => el.id);

    expect(sectionIds).toEqual([
      "hero",
      "clients",
      "content",
      "services",
      "subscribe",
      "careers",
      "contact",
    ]);
  });

  it("renders distinctive content for every one of the 13 assembled sections", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";

    // 1. Nav
    expect(text).toContain(navLinks[0].label);
    // 2. Hero
    expect(text).toContain(heroContent.headline);
    // 3. Ticker
    expect(text).toContain(tickerItems[0]);
    // 4. StatsBand
    expect(text).toContain(stats[0].label);
    // 5. CaseStudy
    expect(text).toContain(caseStudy.metricLabel);
    // 6. Clients
    expect(text).toContain(approvedClientLogos[0]);
    // 7. ContentLineup (default active tab is the first category)
    expect(text).toContain(contentCategories[0].items[0].title);
    // 8. B2BServices
    expect(text).toContain(b2bServices[0].name);
    // 9. Testimonials
    expect(text).toContain(testimonials[0].quote);
    // 10. Subscribe (no dedicated content.ts export for this heading)
    expect(text).toContain("매일 아침, 너겟으로 시작하세요");
    // 11. Careers
    expect(text).toContain(careerListing.title);
    // 12. Contact (heading text matches the Hero CTA label verbatim)
    expect(text).toContain(heroContent.primaryCta.label);
    // 13. Footer
    expect(text).toContain(contactEmail);
  });

  it("never mentions a competitor name anywhere on the whole page", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    const forbidden = ["뉴닉"];

    for (const word of forbidden) {
      expect(text).not.toContain(word);
    }
  });

  it("never shows a won-price anywhere on the whole page", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/\d+\s*만\s*원/);
  });

  it("only shows approved client logos anywhere on the whole page", () => {
    const { container } = render(<Home />);
    const approved = new Set(approvedClientLogos);
    const chips = Array.from(container.querySelectorAll('[data-testid="client-chip"]'));

    expect(chips.length).toBeGreaterThan(0);
    for (const chip of chips) {
      expect(approved.has(chip.textContent ?? "")).toBe(true);
    }
  });
});
