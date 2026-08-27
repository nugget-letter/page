import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentLineup } from "./ContentLineup";
import { contentCategories } from "@/lib/content";

describe("ContentLineup", () => {
  it("shows the first category's items by default", () => {
    render(<ContentLineup />);
    expect(screen.getByText(contentCategories[0].items[0].title)).toBeInTheDocument();
  });

  it("switches displayed items when a different tab is clicked", () => {
    render(<ContentLineup />);
    const secondTab = screen.getByRole("button", { name: contentCategories[1].label });

    fireEvent.click(secondTab);

    expect(screen.getByText(contentCategories[1].items[0].title)).toBeInTheDocument();
    expect(screen.queryByText(contentCategories[0].items[0].title)).not.toBeInTheDocument();
  });
});
