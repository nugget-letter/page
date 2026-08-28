import { Logo } from "./Logo";
import { companyInfo, contactEmail, legalLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-dark text-white/60 py-12 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row justify-between gap-6">
        <Logo className="h-10 rounded-lg shrink-0" />
        <div className="text-sm">
          <p>{contactEmail}</p>
          <p className="mt-2">© {new Date().getFullYear()} nugget. All rights reserved.</p>
          <p className="mt-4 text-xs text-white/40 leading-relaxed">
            {companyInfo.entityName} · 사업자등록번호 {companyInfo.registrationNumber}
            <br />
            개인정보보호책임자: {companyInfo.privacyOfficer}
          </p>
          <div className="flex gap-4 mt-3">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs text-white/40 hover:text-white/60">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
