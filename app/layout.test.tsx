import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders html with Korean lang attribute and children", () => {
    render(
      <RootLayout>
        <div>child content</div>
      </RootLayout>
    );
    expect(document.documentElement.lang).toBe("ko");
    expect(screen.getByText("child content")).toBeInTheDocument();
  });
});
