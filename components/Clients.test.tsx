import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Clients } from "./Clients";
import { approvedClientLogos } from "@/lib/content";

describe("Clients", () => {
  it("renders the approved client list twice, for a seamless marquee loop, and nothing extra", () => {
    render(<Clients />);
    const chips = screen.getAllByTestId("client-chip");
    expect(chips).toHaveLength(approvedClientLogos.length * 2);

    for (const name of approvedClientLogos) {
      expect(screen.getAllByText(name)).toHaveLength(2);
    }

    const renderedNames = new Set(chips.map((chip) => chip.textContent));
    expect(renderedNames.size).toBe(approvedClientLogos.length);
  });

  it("never renders the competitor name", () => {
    const { container } = render(<Clients />);
    expect(container.textContent).not.toContain("뉴닉");
  });
});
