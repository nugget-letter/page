import { stats } from "@/lib/content";

export function StatsBand() {
  return (
    <section className="bg-dark py-12">
      <div className="max-w-[1160px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center py-4 ${i < stats.length - 1 ? "md:border-r md:border-white/10" : ""}`}
          >
            <div className="font-gmarket text-[44px] bg-grad bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-[13px] text-white/45 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
