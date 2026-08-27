import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Clients } from "./Clients";
import { approvedClientLogos } from "@/lib/content";

describe("Clients", () => {
  it("renders exactly the approved client list, nothing more", () => {
    render(<Clients />);
    const chips = screen.getAllByTestId("client-chip");
    expect(chips).toHaveLength(approvedClientLogos.length);
    for (const name of approvedClientLogos) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
