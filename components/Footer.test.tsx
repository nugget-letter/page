import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";
import { companyInfo, contactEmail, legalLinks } from "@/lib/content";

describe("Footer", () => {
  it("renders the contact email and current year copyright", () => {
    render(<Footer />);
    expect(screen.getByText(contactEmail)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  it("renders the business registration number and legal link labels", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(companyInfo.registrationNumber))).toBeInTheDocument();
    for (const link of legalLinks) {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  });
});
