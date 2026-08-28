import { b2bServices } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function B2BServices() {
  return (
    <section id="services" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <h2 className="font-gmarket break-keep text-[36px] md:text-[64px] mb-3">B2B 콘텐츠 상품</h2>
        </ScrollReveal>
        <p className="text-mid mb-10">
          콘텐츠는 만들고 싶은데 손이 부족한 팀을 위해 — 기획부터 제작까지 너겟이 대신합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {b2bServices.map((service) => (
            <div key={service.name} className="bg-dark rounded p-6">
              <span className="text-[10px] font-bold tracking-widest text-yellow uppercase">
                {service.category}
              </span>
              <h3 className="font-gmarket text-[19px] mt-3 mb-2 text-white">{service.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="bg-dark text-white rounded-full px-[32px] py-[16px] text-[15px] font-bold inline-block hover:-translate-y-0.5 transition-transform"
        >
          가격 문의하기
        </a>
      </div>
    </section>
  );
}
