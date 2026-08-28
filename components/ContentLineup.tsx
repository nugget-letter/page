"use client";

import { useState } from "react";
import { contentCategories } from "@/lib/content";
import { ScrollReveal } from "./ScrollReveal";

export function ContentLineup() {
  const [activeId, setActiveId] = useState(contentCategories[0].id);
  const active = contentCategories.find((c) => c.id === activeId)!;

  return (
    <section id="content" className="py-20 px-6 md:px-[52px] bg-light">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <h2 className="font-gmarket break-keep text-[36px] md:text-[64px] mb-8">너겟이 만드는 콘텐츠</h2>
        </ScrollReveal>

        <div className="flex gap-2 mb-8 flex-wrap">
          {contentCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              aria-pressed={cat.id === activeId}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                cat.id === activeId ? "bg-dark text-white" : "bg-white border border-line text-mid"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {active.items.map((item) => (
            <div key={item.title} className="bg-dark rounded p-6">
              <span className="text-[10px] font-bold tracking-widest text-yellow uppercase">
                {item.meta}
              </span>
              <h3 className="font-gmarket text-[19px] leading-snug mt-3 text-white">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
