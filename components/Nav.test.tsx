import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("renders all nav links from content data", () => {
    render(<Nav />);
    expect(screen.getByText("너겟이 하는 일")).toBeInTheDocument();
    expect(screen.getByText("구독하기")).toBeInTheDocument();
  });

  it("toggles the mobile menu open state when the menu button is clicked", () => {
    render(<Nav />);
    const button = screen.getByRole("button", { name: "메뉴 열기" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
