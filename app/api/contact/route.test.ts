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
