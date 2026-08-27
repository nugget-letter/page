import { heroContent } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-[120px] pb-20 px-6 md:px-[52px] bg-grad-motion bg-[length:200%_200%] animate-[gradient-shift_18s_ease_infinite]"
    >
      <div className="max-w-[1160px] mx-auto w-full">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-orange mb-7">
          {heroContent.eyebrow}
        </span>

        <h1 className="font-gmarket text-[40px] md:text-[68px] leading-[1.15] tracking-tight mb-6">
          {heroContent.headline}
          <br />
          <span className="bg-grad bg-clip-text text-transparent">{heroContent.highlight}</span>
        </h1>

        <p className="text-base leading-[1.85] text-mid mb-10 whitespace-pre-line">
          {heroContent.description}
        </p>

        <div className="flex gap-3.5 flex-wrap">
          <a
            href={heroContent.primaryCta.href}
            className="bg-grad text-white rounded-full px-[30px] py-[15px] text-[15px] font-bold hover:-translate-y-0.5 transition-transform inline-block"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="bg-white border border-line rounded-full px-[30px] py-[15px] text-[15px] font-medium hover:border-orange transition-colors inline-block"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
