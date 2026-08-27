import { sendContactEmail } from "@/lib/email";

type ContactRequestBody = {
  company?: string;
  name?: string;
  email?: string;
  type?: string;
  message?: string;
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const SHORT_FIELD_MAX_LENGTH = 200;
const MESSAGE_MAX_LENGTH = 5000;

export async function POST(request: Request): Promise<Response> {
  const body: ContactRequestBody = await request.json();

  if (!body.company || !body.name || !body.email || !body.type) {
    return Response.json({ ok: false, error: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(body.email)) {
    return Response.json({ ok: false, error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (
    body.company.length > SHORT_FIELD_MAX_LENGTH ||
    body.name.length > SHORT_FIELD_MAX_LENGTH ||
    body.type.length > SHORT_FIELD_MAX_LENGTH ||
    (body.message ?? "").length > MESSAGE_MAX_LENGTH
  ) {
    return Response.json({ ok: false, error: "입력값이 너무 깁니다." }, { status: 400 });
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
  } catch (error) {
    console.error("[contact] send failed", error);
    return Response.json({ ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
