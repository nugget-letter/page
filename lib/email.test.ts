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
