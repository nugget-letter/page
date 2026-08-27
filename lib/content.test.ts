import { describe, expect, it } from "vitest";
import {
  approvedClientLogos,
  b2bServices,
  caseStudy,
  getCaseStudyMultiplier,
} from "./content";

describe("content data", () => {
  it("computes the case study multiplier from before/after values", () => {
    expect(getCaseStudyMultiplier()).toBe(caseStudy.after / caseStudy.before);
    expect(getCaseStudyMultiplier()).toBeCloseTo(5);
  });

  it("never includes a competitor name in any text field", () => {
    const forbidden = ["뉴닉"];
    const haystacks = [
      caseStudy.metricLabel,
      caseStudy.secondaryMetric,
      ...b2bServices.map((s) => `${s.name} ${s.description}`),
    ];
    for (const word of forbidden) {
      for (const text of haystacks) {
        expect(text).not.toContain(word);
      }
    }
  });

  it("keeps the approved client logo list to only publicly-disclosed clients", () => {
    const approved = new Set([
      "KB국민은행",
      "카카오",
      "네이버",
      "케이뱅크",
      "미래에셋증권",
      "네이버페이",
      "삼성",
      "삼양",
    ]);
    for (const name of approvedClientLogos) {
      expect(approved.has(name)).toBe(true);
    }
  });

  it("never attaches a price field to a B2B service entry", () => {
    for (const service of b2bServices) {
      expect(service).not.toHaveProperty("price");
    }
  });
});
