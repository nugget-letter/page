import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";
import { contactEmail } from "@/lib/content";

describe("Footer", () => {
  it("renders the contact email and current year copyright", () => {
    render(<Footer />);
    expect(screen.getByText(contactEmail)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
