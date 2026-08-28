import { approvedClientLogos } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function Clients() {
  const looped = [...approvedClientLogos, ...approvedClientLogos];

  return (
    <section id="clients" className="py-20">
      <div className="max-w-[1160px] mx-auto px-6 md:px-[52px]">
        <ScrollReveal>
          <h2 className="font-gmarket break-keep text-[36px] md:text-[64px] mb-10">함께한 기업들</h2>
        </ScrollReveal>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-3 w-max animate-[ticker-scroll_40s_linear_infinite]">
          {looped.map((name, i) => (
            <span
              key={`${name}-${i}`}
              data-testid="client-chip"
              className="px-5 py-3 rounded-full bg-peach text-sm text-mid whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
