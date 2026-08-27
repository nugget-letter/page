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

  it("shows an error message and keeps the form when the network request itself fails", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("network down"));
    render(<Contact />);

    fillForm();

    await waitFor(() =>
      expect(screen.getByText("전송에 실패했습니다. 잠시 후 다시 시도해주세요.")).toBeInTheDocument()
    );
    expect(screen.queryByText(/문의가 접수되었습니다/)).not.toBeInTheDocument();
    expect(screen.getByLabelText("회사명")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "문의 보내기" })).not.toBeDisabled();
  });
});
