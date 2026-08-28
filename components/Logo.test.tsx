import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the badge image", () => {
    render(<Logo />);
    const img = screen.getByAltText("nugget.");
    expect(img).toHaveAttribute("src", "/logo/nugget-badge.png");
  });
});
