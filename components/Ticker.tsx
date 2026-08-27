export const tickerItems = [
  "너도 GET 할 수 있는 경제 소식",
  "1.5만 명이 매일 아침 읽는 뉴스레터",
  "KB국민은행 · 카카오 · 네이버가 선택한 콘텐츠 파트너",
];

export function Ticker() {
  const looped = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden bg-dark py-3">
      <div className="flex gap-12 w-max whitespace-nowrap animate-[ticker-scroll_24s_linear_infinite]">
        {looped.map((item, i) => (
          <span key={`${item}-${i}`} className="text-white text-sm font-medium">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
