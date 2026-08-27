import { careerListing } from "@/lib/content";

export function Careers() {
  return (
    <section id="careers" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] mb-8">채용</h2>
        <div className="bg-white rounded-2xl border border-line p-6">
          <h3 className="font-gmarket text-lg">{careerListing.title}</h3>
          <p className="text-sm text-mid mt-1">{careerListing.type}</p>
          <p className="text-sm text-mid mt-3">
            채용 관련 문의는{" "}
            <a href="#contact" className="text-orange font-bold">
              문의하기
            </a>
            를 통해 남겨주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
