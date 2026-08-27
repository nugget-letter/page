import { Logo } from "./Logo";
import { contactEmail } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-dark text-white/60 py-12 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row justify-between gap-6">
        <Logo variant="white" className="h-6" />
        <div className="text-sm">
          <p>{contactEmail}</p>
          <p className="mt-2">© {new Date().getFullYear()} nugget. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
