import { NextRequest, NextResponse } from "next/server";

/* ─── BREVO CONFIG ───
   Get these from https://app.brevo.com
   - BREVO_API_KEY: Settings > SMTP & API > API Keys (create a new API key)
   - SENDER_EMAIL / SENDER_NAME: must be a verified sender in Brevo
   - RECIPIENT_EMAIL: where enquiries should land (e.g. sales@ilktechnology.co.uk)

   Add BREVO_API_KEY to your .env.local file as:
   BREVO_API_KEY=your_key_here
   (never hardcode the real key directly in this file / commit it to git)
*/
const BREVO_API_KEY = process.env.BREVO_API_KEY || "YOUR_BREVO_API_KEY";
const SENDER_EMAIL = "ilk.tech.uk@gmail.com"; // TODO: add sender email
const SENDER_NAME = "True Refrigeration Enquiries"; // TODO: adjust display name
const RECIPIENT_EMAIL = "info@ilktechnology.com"; // TODO: add recipient email

interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  product: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryPayload = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const htmlContent = buildEmailHtml(body);

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: RECIPIENT_EMAIL }],
        replyTo: { email: body.email, name: body.name },
        subject: `New Enquiry — ${body.product}`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Brevo API error:", res.status, errText);
      return NextResponse.json(
        { error: "Failed to send enquiry." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-enquiry route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ─── EMAIL TEMPLATE ───
   Table-based layout for maximum email-client compatibility (Outlook,
   Gmail, Apple Mail). Uses the same brand palette as the site.
*/
const NAVY = "#0B2540";
const RED = "#C8102E";
const MUTED = "#6B7280";
const BORDER = "#E5E9EF";

function buildEmailHtml(body: EnquiryPayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${BORDER};" valign="top">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="150" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${RED};padding-right:16px;">
              ${label}
            </td>
            <td valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${NAVY};">
              ${value || "<span style=\"color:#9CA3AF;\">—</span>"}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const message = escapeHtml(body.message || "").replace(/\n/g, "<br/>");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Product Enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#F1F3F6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F1F3F6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 30px rgba(11,37,64,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:${NAVY};padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="6" style="background:${RED};"></td>
                  <td style="padding:36px 40px 32px;">
                    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:${RED};">
                      True Refrigeration &middot; ILK Technology
                    </p>
                    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;">
                      New Product Enquiry
                    </h1>
                    <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,0.55);">
                      A visitor just submitted an enquiry from the website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Product ribbon -->
          <tr>
            <td style="background:#FBEAEC;padding:16px 40px;border-bottom:1px solid ${BORDER};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${RED};padding-bottom:4px;">
                    Enquiring About
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Courier New',monospace;font-size:15px;font-weight:700;color:${NAVY};">
                    ${escapeHtml(body.product)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:8px 40px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", escapeHtml(body.name))}
                ${row("Email", `<a href="mailto:${escapeHtml(body.email)}" style="color:${NAVY};text-decoration:none;border-bottom:1px solid ${RED};">${escapeHtml(body.email)}</a>`)}
                ${row("Company", escapeHtml(body.company || ""))}
                ${row("Phone", escapeHtml(body.phone || ""))}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${RED};">
                Message / Requirements
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border:1px solid ${BORDER};border-radius:6px;">
                <tr>
                  <td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${NAVY};">
                    ${message || "<span style=\"color:#9CA3AF;\">No additional message provided.</span>"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:30px 40px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:4px;background:${RED};">
                    <a href="mailto:${escapeHtml(body.email)}?subject=${encodeURIComponent(`Re: Your enquiry — ${body.product}`)}"
                       style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
                      Reply to ${escapeHtml(body.name.split(" ")[0] || "Enquirer")} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};padding-top:20px;">
                <tr>
                  <td style="padding-top:20px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${MUTED};line-height:1.7;">
                    This enquiry was submitted via the True Refrigeration product page on the ILK Technology website.
                    <br/>Reply directly to this email to respond to the customer.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">
          <tr>
            <td style="padding:20px 40px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9CA3AF;">
              ILK Technology &middot; Authorised True Refrigeration Distributor
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
