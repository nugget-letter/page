import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { B2BServices } from "./B2BServices";
import { b2bServices } from "@/lib/content";

describe("B2BServices", () => {
  it("renders every service name and description", () => {
    render(<B2BServices />);
    for (const service of b2bServices) {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    }
  });

  it("never renders a won price anywhere in the section", () => {
    const { container } = render(<B2BServices />);
    expect(container.textContent).not.toMatch(/\d+\s*만\s*원/);
  });

  it("renders a single pricing-inquiry CTA pointing at the contact section", () => {
    render(<B2BServices />);
    const cta = screen.getByRole("link", { name: "가격 문의하기" });
    expect(cta).toHaveAttribute("href", "#contact");
  });
});
