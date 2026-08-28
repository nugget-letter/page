import { caseStudy, getCaseStudyMultiplier } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

const MAX_BAR_HEIGHT = 180;

export function CaseStudy() {
  const multiplier = getCaseStudyMultiplier();
  const beforeHeight = MAX_BAR_HEIGHT / multiplier;
  const afterHeight = MAX_BAR_HEIGHT;

  return (
    <section className="bg-[#111111] py-24 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="text-[11px] tracking-[0.2em] text-white/40 mb-3">CASE STUDY</div>
          <h2 className="font-gmarket break-keep text-white text-[32px] md:text-[52px] leading-tight mb-14 max-w-[720px] mx-auto text-center">
            {caseStudy.metricLabel}
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-12">
            <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-16">
              <div className="flex items-end gap-8" style={{ height: MAX_BAR_HEIGHT + 24 }}>
                <div className="flex flex-col items-center">
                  <div
                    data-testid="case-bar-before"
                    className="w-16 bg-[#333333] rounded-t"
                    style={{ height: `${beforeHeight}px` }}
                  />
                  <span className="text-white/50 text-xs mt-2">도입 전</span>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    data-testid="case-bar-after"
                    className="w-16 bg-grad rounded-t"
                    style={{ height: `${afterHeight}px` }}
                  />
                  <span className="text-white text-xs mt-2 font-bold">도입 후</span>
                </div>
              </div>

              <div>
                <div className="font-gmarket text-[88px] md:text-[120px] leading-none bg-grad bg-clip-text text-transparent">
                  {multiplier}배
                </div>
                <div className="text-white/50 text-sm mt-2">고객사 MAU 증가</div>
              </div>
            </div>

            <p className="text-white/40 text-[14px] break-keep max-w-[420px]">
              {caseStudy.secondaryMetric}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
