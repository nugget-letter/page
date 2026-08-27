import { careerListing } from "@/lib/content";

export function Careers() {
  return (
    <section id="careers" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] mb-8">채용</h2>
        <div className="bg-white rounded-2xl border border-line p-6 flex justify-between items-center">
          <div>
            <h3 className="font-gmarket text-lg">{careerListing.title}</h3>
            <p className="text-sm text-mid mt-1">{careerListing.type}</p>
          </div>
          <a href={careerListing.href} className="text-orange text-sm font-bold">
            자세히 보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
