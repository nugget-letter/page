import { caseStudy, getCaseStudyMultiplier } from "@/lib/content";

const MAX_BAR_HEIGHT = 90;

export function CaseStudy() {
  const multiplier = getCaseStudyMultiplier();
  const beforeHeight = MAX_BAR_HEIGHT / multiplier;
  const afterHeight = MAX_BAR_HEIGHT;

  return (
    <section className="bg-[#111111] py-16 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2">CASE STUDY</div>
        <h2 className="text-white text-lg font-bold mb-8">{caseStudy.metricLabel}</h2>

        <div className="flex items-end gap-6" style={{ height: MAX_BAR_HEIGHT + 24 }}>
          <div className="flex flex-col items-center">
            <div
              data-testid="case-bar-before"
              className="w-9 bg-[#333333] rounded-t"
              style={{ height: `${beforeHeight}px` }}
            />
            <span className="text-white/50 text-xs mt-1.5">도입 전</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              data-testid="case-bar-after"
              className="w-9 bg-grad rounded-t"
              style={{ height: `${afterHeight}px` }}
            />
            <span className="text-white text-xs mt-1.5 font-bold">
              도입 후 · <span>{`${multiplier}배`}</span>
            </span>
          </div>
          <p className="text-white/40 text-[13px] self-center ml-2">{caseStudy.secondaryMetric}</p>
        </div>
      </div>
    </section>
  );
}
