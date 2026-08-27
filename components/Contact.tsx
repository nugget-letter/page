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

    try {
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
    } catch {
      setStatus("error");
      setErrorMessage("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
