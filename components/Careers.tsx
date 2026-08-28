import { careerListing } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function Careers() {
  return (
    <section id="careers" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <h2 className="font-gmarket break-keep text-[36px] md:text-[64px] mb-8">채용</h2>
        </ScrollReveal>
        <div className="bg-dark rounded p-6">
          <h3 className="font-gmarket text-xl text-white">{careerListing.title}</h3>
          <p className="text-sm text-white/50 mt-1">{careerListing.type}</p>
          <p className="text-sm text-white/70 mt-3">
            채용 관련 문의는{" "}
            <a href="#contact" className="text-yellow font-bold">
              문의하기
            </a>
            를 통해 남겨주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
