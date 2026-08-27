import { b2bServices } from "@/lib/content";

export function B2BServices() {
  return (
    <section id="services" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] mb-3">B2B 콘텐츠 상품</h2>
        <p className="text-mid mb-10">
          기업이 필요한 콘텐츠를 리소스 걱정 없이, 너겟의 제작 노하우로 만들어 드립니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {b2bServices.map((service) => (
            <div key={service.name} className="bg-white rounded-2xl border border-line p-6">
              <span className="text-[10px] font-bold tracking-wide text-orange bg-peach px-2.5 py-0.5 rounded-full">
                {service.category}
              </span>
              <h3 className="font-gmarket text-[15px] mt-3 mb-2">{service.name}</h3>
              <p className="text-sm text-mid leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="bg-grad text-white rounded-full px-[30px] py-[15px] text-[15px] font-bold inline-block hover:-translate-y-0.5 transition-transform"
        >
          가격 문의하기
        </a>
      </div>
    </section>
  );
}
