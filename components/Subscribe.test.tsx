import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Subscribe } from "./Subscribe";
import { subscribeUrl } from "@/lib/content";

describe("Subscribe", () => {
  it("links out to the Stibee subscription page", () => {
    render(<Subscribe />);
    const link = screen.getByRole("link", { name: /무료로 구독 시작하기/ });
    expect(link).toHaveAttribute("href", subscribeUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
