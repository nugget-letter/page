import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

let observerCallback: IntersectionObserverCallback = () => {};

beforeEach(() => {
  class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      observerCallback = callback;
    }
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("ScrollReveal", () => {
  it("starts hidden and reveals once the observed element intersects", () => {
    render(
      <ScrollReveal>
        <p>content</p>
      </ScrollReveal>
    );

    const wrapper = screen.getByText("content").parentElement!;
    expect(wrapper.className).toContain("opacity-0");
    expect(wrapper.className).not.toContain("opacity-100");

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
      vi.runAllTimers();
    });

    expect(wrapper.className).toContain("opacity-100");
    expect(wrapper.className).not.toContain("opacity-0");
  });

  it("stays hidden when the element has not intersected yet", () => {
    render(
      <ScrollReveal>
        <p>not yet visible</p>
      </ScrollReveal>
    );

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
      vi.runAllTimers();
    });

    const wrapper = screen.getByText("not yet visible").parentElement!;
    expect(wrapper.className).toContain("opacity-0");
  });

  it("waits the given delayMs before revealing, for staggered siblings", () => {
    render(
      <ScrollReveal delayMs={300}>
        <p>staggered content</p>
      </ScrollReveal>
    );

    const wrapper = screen.getByText("staggered content").parentElement!;

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(wrapper.className).toContain("opacity-0");

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(wrapper.className).toContain("opacity-100");
  });
});
