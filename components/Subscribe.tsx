import { subscribeUrl } from "@/lib/content";

export function Subscribe() {
  return (
    <section id="subscribe" className="py-20 px-6 md:px-[52px] bg-light">
      <div className="max-w-[1160px] mx-auto text-center">
        <h2 className="font-gmarket text-[28px] md:text-[48px] mb-4">
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
