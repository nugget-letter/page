import { heroContent } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-[120px] pb-20 px-6 md:px-[52px] bg-grad-motion bg-[length:200%_200%] animate-[gradient-shift_18s_ease_infinite]"
    >
      <div className="max-w-[1160px] mx-auto w-full">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-orange mb-5">
          {heroContent.eyebrow}
        </span>

        <h1 className="font-gmarket text-[52px] md:text-[108px] leading-[0.98] tracking-tight mb-10">
          <ScrollReveal>
            <span className="block break-keep">{heroContent.headline}</span>
          </ScrollReveal>
          <ScrollReveal delayMs={150}>
            <span className="block break-keep bg-grad bg-clip-text text-transparent">
              {heroContent.highlight}
            </span>
          </ScrollReveal>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-base leading-[1.7] text-mid whitespace-pre-line max-w-[420px]">
            {heroContent.description}
          </p>

          <div className="flex gap-3.5 flex-wrap">
            <a
              href={heroContent.primaryCta.href}
              className="bg-grad text-white rounded-full px-[32px] py-[16px] text-[15px] font-bold hover:-translate-y-0.5 transition-transform inline-block"
            >
              {heroContent.primaryCta.label}
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="bg-transparent border-[1.5px] border-dark text-dark rounded-full px-[32px] py-[16px] text-[15px] font-bold hover:bg-dark hover:text-white transition-colors inline-block"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
