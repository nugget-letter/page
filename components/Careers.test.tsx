import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Careers } from "./Careers";
import { careerListing } from "@/lib/content";

describe("Careers", () => {
  it("renders the current job listing title and type", () => {
    render(<Careers />);
    expect(screen.getByText(careerListing.title)).toBeInTheDocument();
    expect(screen.getByText(careerListing.type)).toBeInTheDocument();
  });
});
