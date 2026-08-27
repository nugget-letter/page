import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 실제 로드하는 서체는 Black Han Sans다 — "Gmarket Sans"는 Google Fonts에 없는
// 폰트였고(기존 imweb 사이트도 로드에 실패하고 있었다), 톤이 비슷한 이 폰트로
// 대체했다. 변수/토큰 이름(gmarket)은 하위 태스크와의 일관성을 위해 유지한다.
// 참고: "korean"은 next/font/google에서 Black_Han_Sans/Noto_Sans_KR 둘 다
// 유효한 subsets 값이 아니다(타입 에러) — 한국어가 이 폰트 계열의 기본 스크립트라
// Google Fonts가 별도 "korean" 서브셋을 제공하지 않고 항상 포함시키기 때문이다.
// subsets는 라틴/키릴 등 "추가" 스크립트를 위한 옵션일 뿐이라 한글 글리프는
// subsets: ["latin"] 상태에서도 이미 프리로드된다.
const gmarket = Black_Han_Sans({
  subsets: ["latin"],
  weight: ["400"],
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
