import { subscribeUrl } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function Subscribe() {
  return (
    <section id="subscribe" className="py-20 px-6 md:px-[52px] bg-light">
      <div className="max-w-[1160px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-gmarket text-[36px] md:text-[72px] leading-[1.05] mb-8">
            매일 아침, 너겟으로 시작하세요
          </h2>
        </ScrollReveal>
        <a
          href={subscribeUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-dark text-white rounded-full px-[32px] py-[16px] text-[15px] font-bold inline-block mt-6 hover:-translate-y-0.5 transition-transform"
        >
          무료로 구독 시작하기 →
        </a>
      </div>
    </section>
  );
}
