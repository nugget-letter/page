import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders every section in the order defined by the spec", () => {
    const { container } = render(<Home />);
    const sectionIds = Array.from(container.querySelectorAll("[id]")).map((el) => el.id);

    expect(sectionIds).toEqual([
      "hero",
      "clients",
      "content",
      "services",
      "subscribe",
      "careers",
      "contact",
    ]);
  });
});
