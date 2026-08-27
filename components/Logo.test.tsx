import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the color variant by default", () => {
    render(<Logo />);
    const img = screen.getByAltText("nugget.");
    expect(img).toHaveAttribute("src", "/logo/nugget-logo-color.svg");
  });

  it("renders the white variant when requested", () => {
    render(<Logo variant="white" />);
    const img = screen.getByAltText("nugget.");
    expect(img).toHaveAttribute("src", "/logo/nugget-logo-white.svg");
  });
});
