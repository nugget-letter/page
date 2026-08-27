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
  } catch (error) {
    console.error("[contact] send failed", error);
    return Response.json({ ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
