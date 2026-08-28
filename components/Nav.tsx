"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[68px] px-6 md:px-[52px] bg-white/95 backdrop-blur-md border-b border-line">
      <a href="#hero" aria-label="nugget. 홈으로" className="inline-flex shrink-0">
        <Logo className="h-10 rounded-lg" />
      </a>

      <ul className="hidden md:flex gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-[15px] font-bold text-dark hover:text-orange transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="메뉴 열기"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden"
      >
        {open ? "닫기" : "메뉴"}
      </button>

      {open && (
        <ul className="absolute top-[68px] left-0 right-0 flex flex-col bg-white border-b border-line md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block px-6 py-3 text-mid" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
