import { NextResponse } from "next/server";
import { Resend } from "resend";

/** Resend는 Node API에 의존 — Edge가 아닌 Node 런타임으로 고정 (Vercel 502 방지). */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 이 출처에서만 `Access-Control-Allow-Origin` 허용 (프리플라이트·크로스 오리진 대비). */
const CORS_ORIGINS = new Set([
  "https://next-portfolio-phi-topaz.vercel.app",
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://127.0.0.1:3000"]
    : []),
  ...(process.env.CORS_ALLOWED_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? []),
]);

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  if (!origin || !CORS_ORIGINS.has(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(request: Request, data: unknown, status: number): NextResponse {
  return NextResponse.json(data, { status, headers: corsHeaders(request) });
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmailHtml(input: {
  name: string;
  email: string;
  message: string;
}): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const messageHtml = escapeHtml(input.message).replace(/\n/g, "<br/>");

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;background-color:#e8ecf2;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#e8ecf2;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background-color:#22264b;padding:22px 26px;border-bottom:3px solid #14b8a6;">
              <p style="margin:0;font-family:Segoe UI,system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;color:#5eead4;text-transform:uppercase;">Portfolio · Contact</p>
              <p style="margin:10px 0 0;font-family:Segoe UI,system-ui,sans-serif;font-size:19px;font-weight:700;line-height:1.35;color:#fef6ff;">새 메시지가 도착했어요</p>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 26px 8px;font-family:Segoe UI,system-ui,sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:0 0 14px;border-bottom:1px solid #f1f5f9;">
                    <span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.1em;color:#64748b;text-transform:uppercase;">이름</span>
                    <span style="display:block;margin-top:6px;font-size:15px;color:#0f172a;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0 18px;border-bottom:1px solid #f1f5f9;">
                    <span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.1em;color:#64748b;text-transform:uppercase;">회신 주소</span>
                    <a href="mailto:${email}" style="display:inline-block;margin-top:6px;font-size:15px;color:#0d9488;font-weight:600;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:4px 0 10px;font-size:10px;font-weight:700;letter-spacing:0.1em;color:#64748b;text-transform:uppercase;">메시지</p>
              <div style="margin:0;padding:18px 20px;background-color:#f8fafc;border-radius:10px;border-left:4px solid #14b8a6;font-size:14px;line-height:1.7;color:#334155;font-family:Segoe UI,system-ui,sans-serif;">${messageHtml}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px 24px;font-family:Segoe UI,system-ui,sans-serif;font-size:12px;line-height:1.55;color:#94a3b8;">
              포트폴리오 사이트 연락 폼에서 보낸 메일이에요. 답장 시 상단 회신 주소로 전달됩니다.
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:Segoe UI,system-ui,sans-serif;font-size:11px;color:#94a3b8;">© Jiu's Portfolio notification</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(request, { error: "잘못된 요청이에요." }, 400);
  }

  if (!body || typeof body !== "object") {
    return json(request, { error: "잘못된 요청이에요." }, 400);
  }

  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return json(request, { error: "모든 항목을 입력해 주세요." }, 400);
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.message) {
    return json(request, { error: "모든 항목을 입력해 주세요." }, 400);
  }

  if (trimmed.message.length > 8000) {
    return json(request, { error: "메시지가 너무 길어요." }, 400);
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email);
  if (!emailOk) {
    return json(request, { error: "이메일 형식을 확인해 주세요." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    const hint =
      process.env.NODE_ENV === "development"
        ? " .env에 RESEND_API_KEY를 설정해 주세요."
        : " Vercel → Project → Settings → Environment Variables에 RESEND_API_KEY를 등록했는지 확인해 주세요.";
    return json(request, { error: `서버에 메일 설정이 없어요.${hint}` }, 503);
  }

  if (!to || !from) {
    const hint =
      process.env.NODE_ENV === "development"
        ? " .env에 CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL을 설정해 주세요."
        : " Vercel 환경 변수에 CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL을 등록했는지 확인해 주세요.";
    return json(request, { error: `메일 주소가 설정되지 않았어요.${hint}` }, 503);
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: trimmed.email,
      subject: `[Portfolio] ${trimmed.name} 님이 메시지를 보냈어요`,
      text: [
        "── 새 메시지 (Portfolio) ──",
        "",
        `이름: ${trimmed.name}`,
        `회신: ${trimmed.email}`,
        "",
        "── 내용 ──",
        trimmed.message,
        "",
        "포트폴리오 연락 폼에서 전송됨.",
      ].join("\n"),
      html: buildContactEmailHtml(trimmed),
    });

    if (error) {
      console.error("[api/contact] Resend error:", error);
      return json(
        request,
        { error: "메일 전송에 실패했어요. 잠시 후 다시 시도해 주세요." },
        502,
      );
    }

    return json(request, { ok: true as const }, 200);
  } catch (e) {
    console.error("[api/contact]", e);
    return json(
      request,
      { error: "메일 전송에 실패했어요. 잠시 후 다시 시도해 주세요." },
      502,
    );
  }
}
