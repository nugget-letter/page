# 너겟 홈페이지 Phase 1(기반 구축) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** imweb에서 운영 중인 nugget.im을 Next.js + Vercel 기반 코드베이스로 이전하고, 확정된 "Warm Editorial + 다크 대비 섹션" 비주얼 방향과 매체소개서 기반 B2B 콘텐츠를 반영한 새 홈페이지를 만든다.

**Architecture:** Next.js (App Router, TypeScript) 단일 페이지 앱. `app/page.tsx`가 13개의 독립된 섹션 컴포넌트(`components/*.tsx`)를 순서대로 조립한다. 콘텐츠는 `lib/content.ts`의 타입 있는 정적 데이터에서 가져온다(이 단계엔 외부 API 연동 없음). 문의폼만 유일하게 서버 로직(`app/api/contact/route.ts`)을 가진다.

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Vitest + React Testing Library (테스트) · Resend (문의폼 이메일 발송) · Vercel (배포)

## Global Constraints

이 목록은 스펙(`docs/superpowers/specs/2026-08-27-nugget-homepage-foundation-design.md`)에서 그대로 가져온 프로젝트 전체 규칙이다. 모든 태스크는 암묵적으로 이 제약을 지켜야 한다.

- 경쟁사명(뉴닉 등)은 코드/카피 어디에도 절대 넣지 않는다.
- Pilot 섹션의 "세무사 브랜드메시지 서비스"는 홈페이지에 노출하지 않는다.
- B2B 상품 섹션(`B2BServices`)은 가격을 공개하지 않는다 — 카테고리/설명만 노출, CTA는 "가격 문의하기".
- `Clients` 섹션은 이미 공개적으로 노출 중인 로고만 사용한다(KB국민은행·카카오·네이버·케이뱅크·미래에셋증권·네이버페이·삼성·삼양). CRM의 미계약/협상중 리드는 어떤 경우에도 노출하지 않는다.
- 브랜드 컬러 토큰은 기존 값을 그대로 승계한다: `--orange:#FF6B35` `--yellow:#FFB800` `--peach:#FFF3EC` `--peach2:#FFE4D4` `--dark:#1C1C1C` `--mid:#555` `--gray:#999` `--line:#EBEBEB` `--light:#FAF9F7` `--grad: linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)`.
- 폰트는 Gmarket Sans(제목) + Noto Sans KR(본문), Google Fonts를 통해 로드한다.
- 히어로에 영상은 쓰지 않는다 — CSS 그라디언트 모션만 사용한다.
- 마스코트(냠냐미)는 이번 개편에 포함하지 않는다.
- 문의폼은 배포 전 반드시 `contact@nugget.im`으로 실제 이메일이 도착하는지 수동 확인해야 한다(자동 테스트로 대체 불가).

---

## 파일 구조

```
nugget-page/
  app/
    layout.tsx              # 루트 레이아웃, 폰트, 메타데이터
    page.tsx                # 전 섹션 조립
    globals.css             # Tailwind 지시문 + CSS 변수 토큰
    api/
      contact/
        route.ts            # POST 핸들러 — 문의폼 이메일 발송
  components/
    Logo.tsx
    Nav.tsx
    Hero.tsx
    Ticker.tsx
    StatsBand.tsx
    CaseStudy.tsx
    Clients.tsx
    ContentLineup.tsx
    B2BServices.tsx
    Testimonials.tsx
    Subscribe.tsx
    Careers.tsx
    Contact.tsx
    Footer.tsx
  lib/
    content.ts               # 타입 있는 정적 콘텐츠 데이터
    email.ts                 # Resend 클라이언트 래퍼 (테스트에서 모킹 대상)
  public/
    logo/                    # assets/nugget-logo-*.{svg,png}를 복사
  test/
    setup.ts                 # Vitest + RTL 전역 설정
  tailwind.config.ts
  next.config.ts
  tsconfig.json
  vitest.config.ts
  package.json
  .env.example
```

각 컴포넌트 파일은 섹션 하나만 책임진다(스펙의 컴포넌트 표와 1:1 대응). `lib/content.ts`는 카피/데이터를 컴포넌트 코드와 분리해, 콘텐츠팀이 나중에 테스티모니얼 문구 등을 교체할 때 컴포넌트 로직을 건드리지 않아도 되게 한다.

---

### Task 1: 프로젝트 스캐폴드 + 디자인 토큰 + 폰트

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `vitest.config.ts`, `test/setup.ts`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Test: `app/layout.test.tsx`

**Interfaces:**
- Produces: `RootLayout` 컴포넌트 (`app/layout.tsx`, default export) — `<html lang="ko">`에 `font-gmarket`/`font-noto` CSS 변수 클래스를 적용. 이후 모든 컴포넌트가 Tailwind 유틸리티 `text-orange`/`text-yellow`/`bg-peach`/`bg-dark`/`text-mid`/`text-gray`/`border-line`/`bg-light`/`bg-grad`(커스텀 그라디언트 유틸)를 사용할 수 있다.

- [ ] **Step 1: package.json 작성**

```json
{
  "name": "nugget-page",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^4.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: 의존성 설치**

Run: `cd ~/Desktop/클로드/nugget-page && npm install`
Expected: `node_modules/` 생성, 에러 없이 종료

- [ ] **Step 3: TypeScript / Next / Tailwind 설정 파일 작성**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": { "@/*": ["./*"] },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

`tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FF6B35",
        yellow: "#FFB800",
        peach: "#FFF3EC",
        peach2: "#FFE4D4",
        dark: "#1C1C1C",
        mid: "#555555",
        gray: "#999999",
        line: "#EBEBEB",
        light: "#FAF9F7",
      },
      backgroundImage: {
        grad: "linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)",
        "grad-motion": "linear-gradient(120deg, #ffffff 40%, #FFF3EC 60%, #ffffff 80%)",
      },
      fontFamily: {
        gmarket: ["var(--font-gmarket)", "sans-serif"],
        noto: ["var(--font-noto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

`vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

`@vitejs/plugin-react`가 devDependencies에 빠져 있으므로 추가로 설치한다.

Run: `npm install -D @vitejs/plugin-react`

`test/setup.ts`:
```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: globals.css — Tailwind 지시문 + PostCSS 설정**

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}
```

`postcss.config.js`:
```javascript
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

- [ ] **Step 5: 실패하는 레이아웃 테스트 작성**

`app/layout.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders html with Korean lang attribute and children", () => {
    render(
      <RootLayout>
        <div>child content</div>
      </RootLayout>
    );
    expect(document.documentElement.lang).toBe("ko");
    expect(screen.getByText("child content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: 테스트 실행 → 실패 확인**

Run: `npm run test -- app/layout.test.tsx`
Expected: FAIL — `app/layout.tsx`가 아직 없어서 모듈을 찾을 수 없다는 에러

- [ ] **Step 7: app/layout.tsx 구현**

```tsx
import type { Metadata } from "next";
import { Gmarket_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const gmarket = Gmarket_Sans({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-gmarket",
});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "너겟 — 금융 콘텐츠 에이전시",
  description: "너도 Get 할 수 있는 경제 소식, 너겟",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${gmarket.variable} ${noto.variable}`}>
      <body className="font-noto text-dark bg-white">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: 테스트 재실행 → 통과 확인**

Run: `npm run test -- app/layout.test.tsx`
Expected: PASS

- [ ] **Step 9: 임시 page.tsx 작성 (다음 태스크에서 교체됨)**

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>준비 중</main>;
}
```

- [ ] **Step 10: 빌드 확인**

Run: `npm run build`
Expected: 에러 없이 빌드 완료

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.js vitest.config.ts test/ app/
git commit -m "chore: scaffold Next.js app with design tokens and fonts"
```

---

### Task 2: 콘텐츠 데이터 모듈 (`lib/content.ts`)

**Files:**
- Create: `lib/content.ts`
- Test: `lib/content.test.ts`

**Interfaces:**
- Consumes: 없음
- Produces:
  - `navLinks: { label: string; href: string }[]`
  - `heroContent: { eyebrow: string; headline: string; highlight: string; description: string; primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string } }`
  - `stats: { value: string; label: string }[]`
  - `caseStudy: { before: number; after: number; unit: string; metricLabel: string; secondaryMetric: string }`
  - `getCaseStudyMultiplier(): number` — `after / before`를 반올림 없이 계산
  - `approvedClientLogos: string[]` — 승인된 로고 이름만
  - `contentCategories: { id: string; label: string; items: { title: string; meta: string }[] }[]`
  - `b2bServices: { category: string; name: string; description: string }[]` (가격 필드 없음 — 의도적)
  - `testimonials: { quote: string; source: string }[]`
  - `careerListing: { title: string; type: string; href: string }`
  - `subscribeUrl: string`
  - `contactEmail: string`

- [ ] **Step 1: 실패하는 테스트 작성**

`lib/content.test.ts`:
```typescript
import { describe, expect, it } from "vitest";
import {
  approvedClientLogos,
  b2bServices,
  caseStudy,
  getCaseStudyMultiplier,
} from "./content";

describe("content data", () => {
  it("computes the case study multiplier from before/after values", () => {
    expect(getCaseStudyMultiplier()).toBe(caseStudy.after / caseStudy.before);
    expect(getCaseStudyMultiplier()).toBeCloseTo(5);
  });

  it("never includes a competitor name in any text field", () => {
    const forbidden = ["뉴닉"];
    const haystacks = [
      caseStudy.metricLabel,
      caseStudy.secondaryMetric,
      ...b2bServices.map((s) => `${s.name} ${s.description}`),
    ];
    for (const word of forbidden) {
      for (const text of haystacks) {
        expect(text).not.toContain(word);
      }
    }
  });

  it("keeps the approved client logo list to only publicly-disclosed clients", () => {
    const approved = new Set([
      "KB국민은행",
      "카카오",
      "네이버",
      "케이뱅크",
      "미래에셋증권",
      "네이버페이",
      "삼성",
      "삼양",
    ]);
    for (const name of approvedClientLogos) {
      expect(approved.has(name)).toBe(true);
    }
  });

  it("never attaches a price field to a B2B service entry", () => {
    for (const service of b2bServices) {
      expect(service).not.toHaveProperty("price");
    }
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- lib/content.test.ts`
Expected: FAIL — `lib/content.ts` 모듈 없음

- [ ] **Step 3: lib/content.ts 구현**

```typescript
export const navLinks = [
  { label: "너겟이 하는 일", href: "#content" },
  { label: "구독하기", href: "#subscribe" },
  { label: "채용", href: "#careers" },
  { label: "함께한 기업들", href: "#clients" },
];

export const heroContent = {
  eyebrow: "FINANCIAL CONTENT AGENCY",
  headline: "금융이 어렵다는 고정관념을",
  highlight: "콘텐츠로 깹니다",
  description:
    "1.5만 명이 매일 아침 읽는 경제 뉴스레터.\nKB국민은행, 카카오, 네이버도 선택한 금융 콘텐츠 파트너예요.",
  primaryCta: { label: "B2B 파트너십 문의", href: "#contact" },
  secondaryCta: {
    label: "무료 구독하기",
    href: "https://page.stibee.com/subscriptions/132031",
  },
};

export const stats = [
  { value: "1.5만+", label: "뉴스레터 구독자" },
  { value: "5배", label: "콘텐츠 도입 후 고객사 MAU 평균 증가" },
  { value: "38%", label: "뉴스레터 평균 오픈율" },
  { value: "3만+", label: "일일 콘텐츠 뷰 증가" },
];

export const caseStudy = {
  before: 100000,
  after: 500000,
  unit: "MAU",
  metricLabel: "콘텐츠 도입 후, 고객사 MAU가 달라졌습니다",
  secondaryMetric: "일일 콘텐츠 View 수 3만 명 이상 증가",
};

export function getCaseStudyMultiplier(): number {
  return caseStudy.after / caseStudy.before;
}

export const approvedClientLogos = [
  "KB국민은행",
  "카카오",
  "네이버",
  "케이뱅크",
  "미래에셋증권",
  "네이버페이",
  "삼성",
  "삼양",
];

export const contentCategories = [
  {
    id: "daily-news",
    label: "데일리 경제 뉴스",
    items: [
      { title: "출근길에 읽는 오늘의 경제", meta: "데일리" },
      { title: "이번 주 꼭 알아야 할 금리 이슈", meta: "데일리" },
    ],
  },
  {
    id: "money-tips",
    label: "재테크 상식",
    items: [
      { title: "작고 귀여운 월급 굴리는 법", meta: "재테크" },
      { title: "청년도약계좌 총정리", meta: "재테크" },
    ],
  },
  {
    id: "bite-news",
    label: "한입 뉴스",
    items: [
      { title: "5줄로 끝내는 오늘의 경제 뉴스", meta: "한입" },
    ],
  },
];

export const b2bServices = [
  {
    category: "콘텐츠 제휴",
    name: "데일리 경제 뉴스 콘텐츠",
    description: "경제를 어려워하는 사람들도 쉽게 이해할 수 있도록 꼭 필요한 뉴스만 풀어 전달합니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "재테크 상식 콘텐츠",
    description: "다양한 재테크 방법과 경제 정책을 소개하고 실행 방법까지 알려주는 콘텐츠입니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "한입 뉴스 콘텐츠",
    description: "하루에 꼭 알아야 하는 경제 뉴스 5~6가지를 간략하게 정리해 전달합니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "오리지널 콘텐츠 제작",
    description: "기업이 필요한 콘텐츠를 너겟의 톤앤매너와 노하우를 더해 맞춤 제작합니다.",
  },
  {
    category: "콘텐츠 제휴",
    name: "콘텐츠 제작 및 운영 대행",
    description: "기업의 콘텐츠 팀을 대신해 기획/제작/운영을 전체적으로 대행합니다.",
  },
  {
    category: "광고",
    name: "뉴스레터 브랜디드 콘텐츠",
    description: "너겟의 친근한 내러티브로 거부감 없이 서비스·제품·브랜드를 홍보합니다.",
  },
];

export const testimonials = [
  // 실제 구독자 인용은 콘텐츠팀이 검토 후 교체할 예정 — 아래는 형식 확인용 샘플
  {
    quote: "경제 뉴스가 이렇게 쉽게 읽힐 수 있다는 걸 처음 알았어요.",
    source: "구독자 · 사회초년생",
  },
  {
    quote: "출근길 5분이면 오늘 알아야 할 경제 이슈가 다 정리돼요.",
    source: "구독자 · 2년차 직장인",
  },
];

export const careerListing = {
  title: "콘텐츠 에디터",
  type: "정규직 · 서울",
  href: "#careers",
};

export const subscribeUrl = "https://page.stibee.com/subscriptions/132031";
export const contactEmail = "contact@nugget.im";
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- lib/content.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/
git commit -m "feat: add typed static content module with data-integrity guards"
```

---

### Task 3: Logo 컴포넌트 + 자산 배치

**Files:**
- Create: `public/logo/` (assets/에서 복사)
- Create: `components/Logo.tsx`
- Test: `components/Logo.test.tsx`

**Interfaces:**
- Consumes: 없음
- Produces: `Logo({ variant?: "color" | "white"; className?: string })` — `<img>` 렌더링, `variant` 기본값 `"color"`

- [ ] **Step 1: 로고 자산을 public/logo로 복사**

Run:
```bash
mkdir -p public/logo
cp assets/nugget-logo-color.svg assets/nugget-logo-white.svg public/logo/
```

- [ ] **Step 2: 실패하는 테스트 작성**

`components/Logo.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the color variant by default", () => {
    render(<Logo />);
    const img = screen.getByAltText("nugget.");
    expect(img).toHaveAttribute("src", "/logo/nugget-logo-color.svg");
  });

  it("renders the white variant when requested", () => {
    render(<Logo variant="white" />);
    const img = screen.getByAltText("nugget.");
    expect(img).toHaveAttribute("src", "/logo/nugget-logo-white.svg");
  });
});
```

- [ ] **Step 3: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Logo.test.tsx`
Expected: FAIL — `components/Logo.tsx` 없음

- [ ] **Step 4: components/Logo.tsx 구현**

```tsx
type LogoProps = {
  variant?: "color" | "white";
  className?: string;
};

export function Logo({ variant = "color", className }: LogoProps) {
  const src = `/logo/nugget-logo-${variant}.svg`;
  return <img src={src} alt="nugget." className={className} />;
}
```

- [ ] **Step 5: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Logo.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add public/logo/ components/Logo.tsx components/Logo.test.tsx
git commit -m "feat: add Logo component with color/white variants"
```

---

### Task 4: Nav 컴포넌트

**Files:**
- Create: `components/Nav.tsx`
- Test: `components/Nav.test.tsx`

**Interfaces:**
- Consumes: `navLinks` (`lib/content.ts`), `Logo` (`components/Logo.tsx`)
- Produces: `Nav()` — 기본 export 아님, named export `Nav`. 데스크톱 네비게이션 + 모바일 메뉴 토글(`aria-expanded` 상태로 테스트 가능)

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Nav.test.tsx`:
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("renders all nav links from content data", () => {
    render(<Nav />);
    expect(screen.getByText("너겟이 하는 일")).toBeInTheDocument();
    expect(screen.getByText("구독하기")).toBeInTheDocument();
  });

  it("toggles the mobile menu open state when the menu button is clicked", () => {
    render(<Nav />);
    const button = screen.getByRole("button", { name: "메뉴 열기" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Nav.test.tsx`
Expected: FAIL — `components/Nav.tsx` 없음

- [ ] **Step 3: components/Nav.tsx 구현**

```tsx
"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[68px] px-6 md:px-[52px] bg-white/96 backdrop-blur-md border-b border-line">
      <a href="#hero" aria-label="nugget. 홈으로">
        <Logo className="h-6" />
      </a>

      <ul className="hidden md:flex gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-[15px] font-medium text-mid hover:text-orange transition-colors">
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
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Nav.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/Nav.test.tsx
git commit -m "feat: add Nav component with mobile menu toggle"
```

---

### Task 5: Hero 컴포넌트 (Warm Editorial + 그라디언트 모션)

**Files:**
- Create: `components/Hero.tsx`
- Test: `components/Hero.test.tsx`

**Interfaces:**
- Consumes: `heroContent` (`lib/content.ts`)
- Produces: `Hero()` — named export. `id="hero"` 섹션.

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Hero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { heroContent } from "@/lib/content";

describe("Hero", () => {
  it("renders the headline, highlight, and both CTAs with correct hrefs", () => {
    render(<Hero />);
    expect(screen.getByText(heroContent.headline)).toBeInTheDocument();
    expect(screen.getByText(heroContent.highlight)).toBeInTheDocument();

    const primary = screen.getByRole("link", { name: heroContent.primaryCta.label });
    expect(primary).toHaveAttribute("href", heroContent.primaryCta.href);

    const secondary = screen.getByRole("link", { name: heroContent.secondaryCta.label });
    expect(secondary).toHaveAttribute("href", heroContent.secondaryCta.href);
  });

  it("never renders a <video> element (motion is CSS-only per spec)", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("video")).toBeNull();
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Hero.test.tsx`
Expected: FAIL — `components/Hero.tsx` 없음

- [ ] **Step 3: components/Hero.tsx 구현**

```tsx
import { heroContent } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-[120px] pb-20 px-6 md:px-[52px] bg-grad-motion bg-[length:200%_200%] animate-[gradient-shift_18s_ease_infinite]"
    >
      <div className="max-w-[1160px] mx-auto w-full">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-orange mb-7">
          {heroContent.eyebrow}
        </span>

        <h1 className="font-gmarket text-[40px] md:text-[68px] font-bold leading-[1.15] tracking-tight mb-6">
          {heroContent.headline}
          <br />
          <span className="bg-grad bg-clip-text text-transparent">{heroContent.highlight}</span>
        </h1>

        <p className="text-base leading-[1.85] text-mid mb-10 whitespace-pre-line">
          {heroContent.description}
        </p>

        <div className="flex gap-3.5 flex-wrap">
          <a
            href={heroContent.primaryCta.href}
            className="bg-grad text-white rounded-full px-[30px] py-[15px] text-[15px] font-bold hover:-translate-y-0.5 transition-transform inline-block"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="bg-white border border-line rounded-full px-[30px] py-[15px] text-[15px] font-medium hover:border-orange transition-colors inline-block"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
```

`app/globals.css`에 그라디언트 모션 키프레임 추가:
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Hero.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/Hero.test.tsx app/globals.css
git commit -m "feat: add Hero section with CSS-only gradient motion"
```

---

### Task 6: Ticker 컴포넌트

**Files:**
- Create: `components/Ticker.tsx`
- Test: `components/Ticker.test.tsx`

**Interfaces:**
- Consumes: `stats`의 label들 대신 별도 짧은 문구 배열(컴포넌트 내부 상수 `tickerItems: string[]`)
- Produces: `Ticker()` — named export

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Ticker.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Ticker, tickerItems } from "./Ticker";

describe("Ticker", () => {
  it("renders every ticker item at least once", () => {
    render(<Ticker />);
    for (const item of tickerItems) {
      expect(screen.getAllByText(item).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("duplicates the item list once for a seamless loop", () => {
    render(<Ticker />);
    const firstItem = tickerItems[0];
    expect(screen.getAllByText(firstItem).length).toBe(2);
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Ticker.test.tsx`
Expected: FAIL — `components/Ticker.tsx` 없음

- [ ] **Step 3: components/Ticker.tsx 구현**

```tsx
export const tickerItems = [
  "너도 GET 할 수 있는 경제 소식",
  "1.5만 명이 매일 아침 읽는 뉴스레터",
  "KB국민은행 · 카카오 · 네이버가 선택한 콘텐츠 파트너",
];

export function Ticker() {
  const looped = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden bg-dark py-3">
      <div className="flex gap-12 whitespace-nowrap animate-[ticker-scroll_24s_linear_infinite]">
        {looped.map((item, i) => (
          <span key={`${item}-${i}`} className="text-white text-sm font-medium">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

`app/globals.css`에 키프레임 추가:
```css
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Ticker.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Ticker.tsx components/Ticker.test.tsx app/globals.css
git commit -m "feat: add Ticker component with looped scrolling items"
```

---

### Task 7: StatsBand 컴포넌트

**Files:**
- Create: `components/StatsBand.tsx`
- Test: `components/StatsBand.test.tsx`

**Interfaces:**
- Consumes: `stats` (`lib/content.ts`)
- Produces: `StatsBand()` — named export

- [ ] **Step 1: 실패하는 테스트 작성**

`components/StatsBand.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatsBand } from "./StatsBand";
import { stats } from "@/lib/content";

describe("StatsBand", () => {
  it("renders every stat value and label", () => {
    render(<StatsBand />);
    for (const stat of stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/StatsBand.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/StatsBand.tsx 구현**

```tsx
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
            <div className="font-gmarket text-[44px] font-bold bg-grad bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-[13px] text-white/45 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/StatsBand.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/StatsBand.tsx components/StatsBand.test.tsx
git commit -m "feat: add StatsBand component"
```

---

### Task 8: CaseStudy 컴포넌트 (신규, 다크 대비 섹션)

**Files:**
- Create: `components/CaseStudy.tsx`
- Test: `components/CaseStudy.test.tsx`

**Interfaces:**
- Consumes: `caseStudy`, `getCaseStudyMultiplier` (`lib/content.ts`)
- Produces: `CaseStudy()` — named export. 막대그래프는 `after`/`before` 비율로 계산한 인라인 `height` 퍼센트를 가진 두 개의 `div[data-testid="case-bar-before"]`, `div[data-testid="case-bar-after"]`로 렌더링

- [ ] **Step 1: 실패하는 테스트 작성**

`components/CaseStudy.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy } from "./CaseStudy";
import { caseStudy, getCaseStudyMultiplier } from "@/lib/content";

describe("CaseStudy", () => {
  it("renders the metric label and multiplier", () => {
    render(<CaseStudy />);
    expect(screen.getByText(caseStudy.metricLabel)).toBeInTheDocument();
    expect(screen.getByText(`${getCaseStudyMultiplier()}배`)).toBeInTheDocument();
  });

  it("renders the after-bar taller than the before-bar, proportional to the values", () => {
    render(<CaseStudy />);
    const before = screen.getByTestId("case-bar-before");
    const after = screen.getByTestId("case-bar-after");

    const beforeHeight = parseFloat(before.style.height);
    const afterHeight = parseFloat(after.style.height);
    expect(afterHeight).toBeGreaterThan(beforeHeight);
    expect(afterHeight / beforeHeight).toBeCloseTo(getCaseStudyMultiplier(), 1);
  });

  it("never mentions a competitor by name", () => {
    const { container } = render(<CaseStudy />);
    expect(container.textContent).not.toContain("뉴닉");
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/CaseStudy.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/CaseStudy.tsx 구현**

```tsx
import { caseStudy, getCaseStudyMultiplier } from "@/lib/content";

const MAX_BAR_HEIGHT = 90;

export function CaseStudy() {
  const multiplier = getCaseStudyMultiplier();
  const beforeHeight = MAX_BAR_HEIGHT / multiplier;
  const afterHeight = MAX_BAR_HEIGHT;

  return (
    <section className="bg-[#111111] py-16 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2">CASE STUDY</div>
        <h2 className="text-white text-lg font-bold mb-8">{caseStudy.metricLabel}</h2>

        <div className="flex items-end gap-6" style={{ height: MAX_BAR_HEIGHT + 24 }}>
          <div className="flex flex-col items-center">
            <div
              data-testid="case-bar-before"
              className="w-9 bg-[#333333] rounded-t"
              style={{ height: `${beforeHeight}px` }}
            />
            <span className="text-white/50 text-xs mt-1.5">도입 전</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              data-testid="case-bar-after"
              className="w-9 bg-grad rounded-t"
              style={{ height: `${afterHeight}px` }}
            />
            <span className="text-white text-xs mt-1.5 font-bold">도입 후 · {multiplier}배</span>
          </div>
          <p className="text-white/40 text-[13px] self-center ml-2">{caseStudy.secondaryMetric}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/CaseStudy.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/CaseStudy.tsx components/CaseStudy.test.tsx
git commit -m "feat: add CaseStudy section with proportional before/after bar chart"
```

---

### Task 9: Clients 컴포넌트

**Files:**
- Create: `components/Clients.tsx`
- Test: `components/Clients.test.tsx`

**Interfaces:**
- Consumes: `approvedClientLogos` (`lib/content.ts`)
- Produces: `Clients()` — named export, `id="clients"`

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Clients.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Clients } from "./Clients";
import { approvedClientLogos } from "@/lib/content";

describe("Clients", () => {
  it("renders exactly the approved client list, nothing more", () => {
    render(<Clients />);
    const chips = screen.getAllByTestId("client-chip");
    expect(chips).toHaveLength(approvedClientLogos.length);
    for (const name of approvedClientLogos) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Clients.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/Clients.tsx 구현**

```tsx
import { approvedClientLogos } from "@/lib/content";

export function Clients() {
  return (
    <section id="clients" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] font-bold mb-8">함께한 기업들</h2>
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
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Clients.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Clients.tsx components/Clients.test.tsx
git commit -m "feat: add Clients section limited to pre-approved public logos"
```

---

### Task 10: ContentLineup 컴포넌트 (카테고리 탭)

**Files:**
- Create: `components/ContentLineup.tsx`
- Test: `components/ContentLineup.test.tsx`

**Interfaces:**
- Consumes: `contentCategories` (`lib/content.ts`)
- Produces: `ContentLineup()` — named export, `id="content"`. 클릭한 탭의 카테고리만 콘텐츠 그리드에 표시.

- [ ] **Step 1: 실패하는 테스트 작성**

`components/ContentLineup.test.tsx`:
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentLineup } from "./ContentLineup";
import { contentCategories } from "@/lib/content";

describe("ContentLineup", () => {
  it("shows the first category's items by default", () => {
    render(<ContentLineup />);
    expect(screen.getByText(contentCategories[0].items[0].title)).toBeInTheDocument();
  });

  it("switches displayed items when a different tab is clicked", () => {
    render(<ContentLineup />);
    const secondTab = screen.getByRole("button", { name: contentCategories[1].label });

    fireEvent.click(secondTab);

    expect(screen.getByText(contentCategories[1].items[0].title)).toBeInTheDocument();
    expect(screen.queryByText(contentCategories[0].items[0].title)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/ContentLineup.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/ContentLineup.tsx 구현**

```tsx
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
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/ContentLineup.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/ContentLineup.tsx components/ContentLineup.test.tsx
git commit -m "feat: add ContentLineup section with category tab switching"
```

---

### Task 11: B2BServices 컴포넌트 (신규, 가격 비공개)

**Files:**
- Create: `components/B2BServices.tsx`
- Test: `components/B2BServices.test.tsx`

**Interfaces:**
- Consumes: `b2bServices` (`lib/content.ts`)
- Produces: `B2BServices()` — named export, `id="services"`

- [ ] **Step 1: 실패하는 테스트 작성**

`components/B2BServices.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { B2BServices } from "./B2BServices";
import { b2bServices } from "@/lib/content";

describe("B2BServices", () => {
  it("renders every service name and description", () => {
    render(<B2BServices />);
    for (const service of b2bServices) {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    }
  });

  it("never renders a won price anywhere in the section", () => {
    const { container } = render(<B2BServices />);
    expect(container.textContent).not.toMatch(/\d+\s*만\s*원/);
  });

  it("renders a single pricing-inquiry CTA pointing at the contact section", () => {
    render(<B2BServices />);
    const cta = screen.getByRole("link", { name: "가격 문의하기" });
    expect(cta).toHaveAttribute("href", "#contact");
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/B2BServices.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/B2BServices.tsx 구현**

```tsx
import { b2bServices } from "@/lib/content";

export function B2BServices() {
  return (
    <section id="services" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] font-bold mb-3">B2B 콘텐츠 상품</h2>
        <p className="text-mid mb-10">
          기업이 필요한 콘텐츠를 리소스 걱정 없이, 너겟의 제작 노하우로 만들어 드립니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {b2bServices.map((service) => (
            <div key={service.name} className="bg-white rounded-2xl border border-line p-6">
              <span className="text-[10px] font-bold tracking-wide text-orange bg-peach px-2.5 py-0.5 rounded-full">
                {service.category}
              </span>
              <h3 className="font-gmarket text-[15px] font-bold mt-3 mb-2">{service.name}</h3>
              <p className="text-sm text-mid leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="bg-grad text-white rounded-full px-[30px] py-[15px] text-[15px] font-bold inline-block hover:-translate-y-0.5 transition-transform"
        >
          가격 문의하기
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/B2BServices.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/B2BServices.tsx components/B2BServices.test.tsx
git commit -m "feat: add B2BServices section without public pricing"
```

---

### Task 12: Testimonials 컴포넌트 (신규)

**Files:**
- Create: `components/Testimonials.tsx`
- Test: `components/Testimonials.test.tsx`

**Interfaces:**
- Consumes: `testimonials` (`lib/content.ts`)
- Produces: `Testimonials()` — named export

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Testimonials.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Testimonials } from "./Testimonials";
import { testimonials } from "@/lib/content";

describe("Testimonials", () => {
  it("renders every quote and its source", () => {
    render(<Testimonials />);
    for (const t of testimonials) {
      expect(screen.getByText(`"${t.quote}"`)).toBeInTheDocument();
      expect(screen.getByText(t.source)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Testimonials.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/Testimonials.tsx 구현**

```tsx
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="py-20 px-6 md:px-[52px] bg-peach">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] font-bold mb-10">구독자들의 이야기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.quote} className="bg-white rounded-2xl p-8">
              <p className="text-base leading-relaxed text-dark mb-4">&quot;{t.quote}&quot;</p>
              <footer className="text-sm text-gray">{t.source}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Testimonials.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Testimonials.tsx components/Testimonials.test.tsx
git commit -m "feat: add Testimonials section (sample copy pending content team review)"
```

---

### Task 13: Subscribe + Careers 컴포넌트

**Files:**
- Create: `components/Subscribe.tsx`, `components/Careers.tsx`
- Test: `components/Subscribe.test.tsx`, `components/Careers.test.tsx`

**Interfaces:**
- Consumes: `subscribeUrl`, `careerListing` (`lib/content.ts`)
- Produces: `Subscribe()` (`id="subscribe"`), `Careers()` (`id="careers"`) — named exports

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Subscribe.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Subscribe } from "./Subscribe";
import { subscribeUrl } from "@/lib/content";

describe("Subscribe", () => {
  it("links out to the Stibee subscription page", () => {
    render(<Subscribe />);
    const link = screen.getByRole("link", { name: /무료로 구독 시작하기/ });
    expect(link).toHaveAttribute("href", subscribeUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

`components/Careers.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Careers } from "./Careers";
import { careerListing } from "@/lib/content";

describe("Careers", () => {
  it("renders the current job listing title and type", () => {
    render(<Careers />);
    expect(screen.getByText(careerListing.title)).toBeInTheDocument();
    expect(screen.getByText(careerListing.type)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Subscribe.test.tsx components/Careers.test.tsx`
Expected: FAIL (두 컴포넌트 모두 없음)

- [ ] **Step 3: 두 컴포넌트 구현**

`components/Subscribe.tsx`:
```tsx
import { subscribeUrl } from "@/lib/content";

export function Subscribe() {
  return (
    <section id="subscribe" className="py-20 px-6 md:px-[52px] bg-light">
      <div className="max-w-[1160px] mx-auto text-center">
        <h2 className="font-gmarket text-[28px] md:text-[48px] font-bold mb-4">
          매일 아침, 너겟으로 시작하세요
        </h2>
        <a
          href={subscribeUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-grad text-white rounded-full px-[30px] py-[15px] text-[15px] font-bold inline-block mt-6"
        >
          무료로 구독 시작하기 →
        </a>
      </div>
    </section>
  );
}
```

`components/Careers.tsx`:
```tsx
import { careerListing } from "@/lib/content";

export function Careers() {
  return (
    <section id="careers" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="font-gmarket text-[30px] md:text-[44px] font-bold mb-8">채용</h2>
        <div className="bg-white rounded-2xl border border-line p-6 flex justify-between items-center">
          <div>
            <h3 className="font-gmarket text-lg font-bold">{careerListing.title}</h3>
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
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Subscribe.test.tsx components/Careers.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Subscribe.tsx components/Subscribe.test.tsx components/Careers.tsx components/Careers.test.tsx
git commit -m "feat: add Subscribe and Careers sections"
```

---

### Task 14: 이메일 발송 래퍼 (`lib/email.ts`)

**Files:**
- Create: `lib/email.ts`
- Test: `lib/email.test.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: 환경변수 `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
- Produces: `sendContactEmail(payload: ContactPayload): Promise<void>` — 실패 시 throw. `ContactPayload = { company: string; name: string; email: string; type: string; message: string }`. 이 함수는 Task 15에서 `vi.mock("@/lib/email")`로 모킹된다.

- [ ] **Step 1: .env.example 작성**

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=contact@nugget.im
```

- [ ] **Step 2: 실패하는 테스트 작성**

`lib/email.test.ts`:
```typescript
import { describe, expect, it, vi, beforeEach } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

describe("sendContactEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "contact@nugget.im";
  });

  it("sends an email to CONTACT_TO_EMAIL with the payload details", async () => {
    sendMock.mockResolvedValue({ data: { id: "123" }, error: null });
    const { sendContactEmail } = await import("./email");

    await sendContactEmail({
      company: "테스트 회사",
      name: "홍길동",
      email: "hong@example.com",
      type: "제휴 문의",
      message: "안녕하세요",
    });

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "contact@nugget.im",
        subject: expect.stringContaining("테스트 회사"),
      })
    );
  });

  it("throws when the email provider returns an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "provider down" } });
    const { sendContactEmail } = await import("./email");

    await expect(
      sendContactEmail({
        company: "테스트 회사",
        name: "홍길동",
        email: "hong@example.com",
        type: "제휴 문의",
        message: "안녕하세요",
      })
    ).rejects.toThrow("provider down");
  });
});
```

- [ ] **Step 3: 테스트 실행 → 실패 확인**

Run: `npm run test -- lib/email.test.ts`
Expected: FAIL — `lib/email.ts` 없음

- [ ] **Step 4: lib/email.ts 구현**

```typescript
import { Resend } from "resend";

export type ContactPayload = {
  company: string;
  name: string;
  email: string;
  type: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL!;

  const { error } = await resend.emails.send({
    from: "nugget.im 문의폼 <no-reply@nugget.im>",
    to,
    replyTo: payload.email,
    subject: `[문의] ${payload.company} - ${payload.type}`,
    text: `회사명: ${payload.company}\n담당자: ${payload.name}\n이메일: ${payload.email}\n유형: ${payload.type}\n\n${payload.message}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
```

- [ ] **Step 5: 테스트 재실행 → 통과 확인**

Run: `npm run test -- lib/email.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add lib/email.ts lib/email.test.ts .env.example
git commit -m "feat: add Resend email wrapper for contact form"
```

---

### Task 15: `/api/contact` Route Handler

**Files:**
- Create: `app/api/contact/route.ts`
- Test: `app/api/contact/route.test.ts`

**Interfaces:**
- Consumes: `sendContactEmail` (`lib/email.ts`)
- Produces: `POST(request: Request): Promise<Response>` — named export `POST`. 유효하지 않은 payload는 400, 발송 실패는 500, 성공은 200 `{ ok: true }`.

- [ ] **Step 1: 실패하는 테스트 작성**

`app/api/contact/route.test.ts`:
```typescript
import { describe, expect, it, vi, beforeEach } from "vitest";

const sendContactEmailMock = vi.fn();

vi.mock("@/lib/email", () => ({
  sendContactEmail: sendContactEmailMock,
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendContactEmailMock.mockReset();
  });

  function makeRequest(body: unknown) {
    return new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  it("returns 400 and does not send email when a required field is missing", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({ company: "", name: "홍길동", email: "hong@example.com", type: "제휴", message: "안녕" })
    );

    expect(res.status).toBe(400);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("returns 200 and sends the email when the payload is valid", async () => {
    sendContactEmailMock.mockResolvedValue(undefined);
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({
        company: "테스트 회사",
        name: "홍길동",
        email: "hong@example.com",
        type: "제휴 문의",
        message: "안녕하세요",
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
    expect(sendContactEmailMock).toHaveBeenCalledOnce();
  });

  it("returns 500 when the email provider throws", async () => {
    sendContactEmailMock.mockRejectedValue(new Error("provider down"));
    const { POST } = await import("./route");
    const res = await POST(
      makeRequest({
        company: "테스트 회사",
        name: "홍길동",
        email: "hong@example.com",
        type: "제휴 문의",
        message: "안녕하세요",
      })
    );

    expect(res.status).toBe(500);
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- app/api/contact/route.test.ts`
Expected: FAIL — `app/api/contact/route.ts` 없음

- [ ] **Step 3: app/api/contact/route.ts 구현**

```typescript
import { sendContactEmail } from "@/lib/email";

type ContactRequestBody = {
  company?: string;
  name?: string;
  email?: string;
  type?: string;
  message?: string;
};

export async function POST(request: Request): Promise<Response> {
  const body: ContactRequestBody = await request.json();

  if (!body.company || !body.name || !body.email || !body.type) {
    return Response.json({ ok: false, error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  try {
    await sendContactEmail({
      company: body.company,
      name: body.name,
      email: body.email,
      type: body.type,
      message: body.message ?? "",
    });
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- app/api/contact/route.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/api/contact/route.ts app/api/contact/route.test.ts
git commit -m "feat: add /api/contact route handler with validation and error responses"
```

---

### Task 16: Contact 폼 컴포넌트 (성공/실패 상태 수정)

**Files:**
- Create: `components/Contact.tsx`
- Test: `components/Contact.test.tsx`

**Interfaces:**
- Consumes: `fetch("/api/contact")`
- Produces: `Contact()` — named export, `id="contact"`. 성공 시에만 완료 화면 표시, 실패 시 에러 메시지 + 폼 유지(현재 버그였던 "무조건 성공" 동작 제거).

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Contact.test.tsx`:
```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Contact } from "./Contact";

describe("Contact", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  function fillForm() {
    fireEvent.change(screen.getByLabelText("회사명"), { target: { value: "테스트 회사" } });
    fireEvent.change(screen.getByLabelText("담당자명"), { target: { value: "홍길동" } });
    fireEvent.change(screen.getByLabelText("이메일"), { target: { value: "hong@example.com" } });
    fireEvent.change(screen.getByLabelText("문의 유형"), { target: { value: "제휴 문의" } });
    fireEvent.click(screen.getByRole("button", { name: "문의 보내기" }));
  }

  it("shows the success message only after the API call succeeds", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    render(<Contact />);

    fillForm();

    expect(screen.queryByText(/문의가 접수되었습니다/)).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/문의가 접수되었습니다/)).toBeInTheDocument());
  });

  it("shows an error message and keeps the form when the API call fails", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." }),
    });
    render(<Contact />);

    fillForm();

    await waitFor(() =>
      expect(screen.getByText("전송에 실패했습니다. 잠시 후 다시 시도해주세요.")).toBeInTheDocument()
    );
    expect(screen.queryByText(/문의가 접수되었습니다/)).not.toBeInTheDocument();
    expect(screen.getByLabelText("회사명")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Contact.test.tsx`
Expected: FAIL — `components/Contact.tsx` 없음

- [ ] **Step 3: components/Contact.tsx 구현**

```tsx
"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ company: "", name: "", email: "", type: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const body = await res.json();

    if (res.ok && body.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(body.error ?? "전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  if (status === "success") {
    return (
      <section id="contact" className="py-20 px-6 md:px-[52px] text-center">
        <p className="font-gmarket text-xl font-bold">문의가 접수되었습니다. 빠르게 연락드릴게요.</p>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-6 md:px-[52px]">
      <div className="max-w-[560px] mx-auto">
        <h2 className="font-gmarket text-[28px] font-bold mb-8">B2B 파트너십 문의</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            회사명
            <input
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="border border-line rounded-lg px-4 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            담당자명
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-line rounded-lg px-4 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            이메일
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-line rounded-lg px-4 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            문의 유형
            <select
              required
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border border-line rounded-lg px-4 py-2.5"
            >
              <option value="">선택해주세요</option>
              <option value="제휴 문의">콘텐츠 제휴</option>
              <option value="광고 문의">광고</option>
              <option value="기타">기타</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            문의 내용
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border border-line rounded-lg px-4 py-2.5 min-h-[120px]"
            />
          </label>

          {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-grad text-white rounded-full px-[30px] py-[15px] text-[15px] font-bold disabled:opacity-60"
          >
            문의 보내기
          </button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Contact.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Contact.tsx components/Contact.test.tsx
git commit -m "fix: contact form now reflects real API success/failure instead of always showing success"
```

---

### Task 17: Footer 컴포넌트

**Files:**
- Create: `components/Footer.tsx`
- Test: `components/Footer.test.tsx`

**Interfaces:**
- Consumes: `Logo` (`components/Logo.tsx`), `contactEmail` (`lib/content.ts`)
- Produces: `Footer()` — named export

- [ ] **Step 1: 실패하는 테스트 작성**

`components/Footer.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";
import { contactEmail } from "@/lib/content";

describe("Footer", () => {
  it("renders the contact email and current year copyright", () => {
    render(<Footer />);
    expect(screen.getByText(contactEmail)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- components/Footer.test.tsx`
Expected: FAIL

- [ ] **Step 3: components/Footer.tsx 구현**

```tsx
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
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- components/Footer.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx components/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

### Task 18: 전체 페이지 조립 + 통합 테스트

**Files:**
- Modify: `app/page.tsx`
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: 모든 컴포넌트(`components/*.tsx`)
- Produces: `Home()` (default export) — 13개 섹션을 스펙에 정의된 순서로 조립

- [ ] **Step 1: 실패하는 통합 테스트 작성**

`app/page.test.tsx`:
```tsx
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders every section in the order defined by the spec", () => {
    const { container } = render(<Home />);
    const sectionIds = Array.from(container.querySelectorAll("[id]")).map((el) => el.id);

    expect(sectionIds).toEqual([
      "hero",
      "clients",
      "content",
      "services",
      "subscribe",
      "careers",
      "contact",
    ]);
  });
});
```

(Nav/Ticker/StatsBand/CaseStudy/Testimonials/Footer는 `id`가 없는 섹션이라 이 리스트에는 안 잡힌다 — 순서 자체는 아래 구현에서 스펙 표와 동일하게 고정한다.)

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `npm run test -- app/page.test.tsx`
Expected: FAIL — 현재 `page.tsx`는 "준비 중"만 렌더링

- [ ] **Step 3: app/page.tsx 조립**

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { StatsBand } from "@/components/StatsBand";
import { CaseStudy } from "@/components/CaseStudy";
import { Clients } from "@/components/Clients";
import { ContentLineup } from "@/components/ContentLineup";
import { B2BServices } from "@/components/B2BServices";
import { Testimonials } from "@/components/Testimonials";
import { Subscribe } from "@/components/Subscribe";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <StatsBand />
        <CaseStudy />
        <Clients />
        <ContentLineup />
        <B2BServices />
        <Testimonials />
        <Subscribe />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: 테스트 재실행 → 통과 확인**

Run: `npm run test -- app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: assemble full homepage from all sections in spec order"
```

---

### Task 19: 전체 검증 + 수동 QA

**Files:** 없음 (검증 전용 태스크)

**Interfaces:** 없음

- [ ] **Step 1: 전체 테스트 스위트 실행**

Run: `npm run test`
Expected: 모든 테스트 PASS

- [ ] **Step 2: 타입 체크**

Run: `npm run typecheck`
Expected: 에러 없음

- [ ] **Step 3: 린트**

Run: `npm run lint`
Expected: 에러 없음

- [ ] **Step 4: 프로덕션 빌드**

Run: `npm run build`
Expected: 빌드 성공

- [ ] **Step 5: 로컬 개발 서버로 반응형 수동 확인**

Run: `npm run dev`

브라우저에서 `http://localhost:3000`을 열고 다음을 직접 확인한다 (자동화 불가 — 사람이 직접 봐야 함):
- 데스크톱(1280px+), 태블릿(≤960px), 모바일(≤600px) 폭에서 레이아웃이 깨지지 않는지
- Hero의 그라디언트 모션이 부드럽게 움직이는지
- CaseStudy 다크 섹션에서 로고(컬러 버전)가 잘 보이는지
- ContentLineup 탭 전환이 정상 동작하는지
- Contact 폼에 필수 항목을 비우고 제출 시 브라우저 기본 검증이 막는지, 채워서 제출 시 로딩 → 성공/실패 상태가 제대로 갈리는지

- [ ] **Step 6: 환경변수 설정 후 실제 이메일 수신 확인 (배포 전 필수)**

Vercel 프로젝트 설정에 `RESEND_API_KEY`, `CONTACT_TO_EMAIL=contact@nugget.im`을 등록한 뒤, 프리뷰 배포에서 문의폼을 실제로 제출해 `contact@nugget.im`에 이메일이 도착하는지 확인한다. **이 확인 없이는 배포하지 않는다** — 지금까지 아무도 모르게 문의가 유실되던 버그였기 때문이다.

- [ ] **Step 7: 최종 커밋**

```bash
git add -A
git commit -m "chore: verify Phase 1 build, tests, and manual QA pass" --allow-empty
```

---

## Self-Review 노트

- **스펙 커버리지:** 컴포넌트 표의 13개 섹션 전부 태스크로 존재(Task 3~13, 16, 17). 아키텍처(Next.js/Vercel/Tailwind/폰트)는 Task 1. 데이터 흐름(구독 링크, 문의폼 전송)은 Task 13/14/15/16. 에러 처리(문의폼 실패 상태)는 Task 16. 테스트(반응형, 이메일 수신 확인)는 Task 19. 도메인 전환(가비아 DNS)은 코드 작업이 아니므로 이 구현 계획에는 포함하지 않았다 — Vercel 배포 후 사용자가 직접 가비아 콘솔에서 진행해야 하는 별도 운영 작업이다.
- **플레이스홀더 스캔:** 없음 — 테스티모니얼 샘플 문구는 "TBD"가 아니라 콘텐츠팀이 나중에 교체할 실제 형식의 임시 카피로, 코드/테스트가 정상 동작하는 구체적인 값이다.
- **타입 일관성:** `ContactPayload`(email.ts) ↔ `POST` 핸들러(route.ts) ↔ `Contact` 폼 상태(Contact.tsx)가 모두 `{ company, name, email, type, message }` 필드명으로 일치한다.
