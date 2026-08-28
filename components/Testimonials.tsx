import { testimonials } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function Testimonials() {
  const looped = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-peach overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6 md:px-[52px]">
        <ScrollReveal>
          <h2 className="font-gmarket break-keep text-[36px] md:text-[64px] mb-10">구독자들의 이야기</h2>
        </ScrollReveal>
      </div>
      <div className="flex gap-6 w-max animate-[ticker-scroll_50s_linear_infinite]">
        {looped.map((t, i) => (
          <blockquote key={`${t.quote}-${i}`} className="bg-dark rounded p-8 w-[360px] shrink-0">
            <p className="text-lg leading-relaxed text-white mb-4">&quot;{t.quote}&quot;</p>
            <footer className="text-sm text-white/50">{t.source}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
