import { approvedClientLogos } from "@/lib/content";

export function Clients() {
  return (
    <section id="clients" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] mb-8">함께한 기업들</h2>
        <div className="flex flex-wrap gap-3">
          {approvedClientLogos.map((name) => (
            <span
              key={name}
              data-testid="client-chip"
              className="px-5 py-3 rounded-full border border-line text-sm text-mid"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
