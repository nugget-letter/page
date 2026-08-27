import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="py-20 px-6 md:px-[52px] bg-peach">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] mb-10">구독자들의 이야기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.quote} className="bg-white rounded-2xl p-8">
              <p className="text-base leading-relaxed text-dark mb-4">&quot;{t.quote}&quot;</p>
              <footer className="text-sm text-gray">{t.source}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
