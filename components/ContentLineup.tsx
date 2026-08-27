"use client";

import { useState } from "react";
import { contentCategories } from "@/lib/content";

export function ContentLineup() {
  const [activeId, setActiveId] = useState(contentCategories[0].id);
  const active = contentCategories.find((c) => c.id === activeId)!;

  return (
    <section id="content" className="py-20 px-6 md:px-[52px] bg-light">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] font-bold mb-8">너겟이 만드는 콘텐츠</h2>

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
            <div key={item.title} className="bg-white rounded-2xl border border-line p-6">
              <span className="text-[10px] font-bold tracking-wide text-orange bg-peach px-2.5 py-0.5 rounded-full">
                {item.meta}
              </span>
              <h3 className="font-gmarket text-[15px] font-bold mt-3">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
