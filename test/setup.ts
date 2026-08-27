import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google relies on a Next.js compiler transform (webpack/turbopack)
// that isn't applied under Vitest's plain Vite pipeline, so the named font
// loaders (e.g. Black_Han_Sans, Noto_Sans_KR) resolve to `undefined` there.
// Mock the module with explicit named exports (not a catch-all Proxy — a
// Proxy's universal `get` trap makes `then` resolve to a function too, which
// gets duck-typed as a thenable and awaited forever, hanging Vitest).
vi.mock("next/font/google", () => {
  const fontLoader = (options: { variable?: string } = {}) => ({
    className: "mock-font",
    variable: options.variable ?? "",
  });
  return {
    Black_Han_Sans: fontLoader,
    Noto_Sans_KR: fontLoader,
  };
});
