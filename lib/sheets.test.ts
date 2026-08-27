import { describe, expect, it, vi, beforeEach } from "vitest";

describe("submitContactToSheet", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    process.env.APPS_SCRIPT_URL = "https://script.google.com/macros/s/test/exec";
    process.env.APPS_SCRIPT_SECRET = "test-secret";
  });

  const payload = {
    company: "테스트 회사",
    name: "홍길동",
    email: "hong@example.com",
    type: "제휴 문의",
    message: "안녕하세요",
  };

  it("POSTs the payload plus the shared secret to APPS_SCRIPT_URL", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    const { submitContactToSheet } = await import("./sheets");

    await submitContactToSheet(payload);

    expect(fetch).toHaveBeenCalledWith(
      "https://script.google.com/macros/s/test/exec",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ ...payload, secret: "test-secret" }),
      })
    );
  });

  it("throws when the Apps Script response reports ok: false", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: false, error: "sheet write failed" }),
    });
    const { submitContactToSheet } = await import("./sheets");

    await expect(submitContactToSheet(payload)).rejects.toThrow("sheet write failed");
  });

  it("throws when the HTTP response itself is not ok", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    const { submitContactToSheet } = await import("./sheets");

    await expect(submitContactToSheet(payload)).rejects.toThrow("Apps Script request failed with status 500");
  });

  it("throws a clear error and never calls fetch when APPS_SCRIPT_URL is unset", async () => {
    delete process.env.APPS_SCRIPT_URL;
    const { submitContactToSheet } = await import("./sheets");

    await expect(submitContactToSheet(payload)).rejects.toThrow("APPS_SCRIPT_URL is not set");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("throws a clear error and never calls fetch when APPS_SCRIPT_SECRET is unset", async () => {
    delete process.env.APPS_SCRIPT_SECRET;
    const { submitContactToSheet } = await import("./sheets");

    await expect(submitContactToSheet(payload)).rejects.toThrow("APPS_SCRIPT_SECRET is not set");
    expect(fetch).not.toHaveBeenCalled();
  });
});
