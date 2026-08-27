import { Resend } from "resend";

export type ContactPayload = {
  company: string;
  name: string;
  email: string;
  type: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL!;

  const { error } = await resend.emails.send({
    from: "nugget.im 문의폼 <no-reply@nugget.im>",
    to,
    replyTo: payload.email,
    subject: `[문의] ${payload.company} - ${payload.type}`,
    text: `회사명: ${payload.company}\n담당자: ${payload.name}\n이메일: ${payload.email}\n유형: ${payload.type}\n\n${payload.message}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
