import { NextRequest, NextResponse } from "next/server";

/* ─── GEMINI CHAT API ───
   Uses Gemini's free-tier API (gemini-3.5-flash-lite — the best free-tier
   RPM/RPD tradeoff) to power ILK Technology's on-site sales assistant.
   Get a free key at https://aistudio.google.com/apikey and set
   GEMINI_API_KEY in your .env.local — never expose it client-side.
*/

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-3.5-flash-lite"; // best free-tier RPM/RPD tradeoff
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `
You are the on-site assistant for ILK Technology Ltd, based in Wembley,
London. ILK Technology is the UK's authorised distribution partner for
Arneg and True Refrigeration, and also distributes Oscartielle, Intrac,
and Incold. They have 20+ years of experience, 1,000+ clients served, and
5,000+ installations.

WHAT ILK TECHNOLOGY SUPPLIES:
- Refrigeration cabinets (remote & plug-in systems)
- Cold rooms
- Checkouts & shelving
- Bespoke retail fit-out installs
- Isothermal panels & high-speed doors

ARNEG PRODUCT RANGE (in stock):
- Osaka 2 — compact remote vertical multideck cabinet for small/medium retail spaces, energy efficient, central refrigeration system
- Osaka 3 — extended-range remote vertical multideck cabinet for supermarkets, high capacity, multiplex capable
- Osaka 3 SC
- Panama 3 — open-front vertical multideck display cabinet, high visibility, grab-and-go retail, remote system, multiplex capable
- Panama 3 SC
- Bar Refrigeration
- Bar Refrigeration 1

TRUE REFRIGERATION RANGE (via ILK Technology, authorised partner):
Undercounter fridges/freezers, pizza prep tables, sandwich/salad prep
units, upright fridges/freezers, glass door merchandisers. Known for
premium quality, energy efficiency and a 7-year warranty (parts,
compressor & labour — UK, Europe & Ireland).

CUSTOM / BESPOKE FINISHES:
Available RAL colours: RAL 9010 (White), RAL 7024 (Graphite Grey),
RAL 9006 (White Aluminium), RAL 9004 (Signal Black), RAL 7016
(Anthracite Grey). Bespoke retail design process: Collaboration →
Consultation → Ideas/Design/Imagination → Factory Production → Final
Delivery.

PROCESS ("How It Works"):
1. Consult — understand store layout, footfall, product range, energy needs
2. Specify — technical team draws up equipment specification
3. Supply — delivered direct from ILK warehouse, fully tracked
4. Install — ready for engineer install or ILK's own installation service

KEY STATS:
- 48hrs typical quotation turnaround
- 100% authorised Arneg range
- UK-wide delivery, fully tracked, blanket-wrapped
- Site survey pricing: £150 in London, £350 outside London
- Response to enquiries within 48 hours (general enquiries) or 1 business
  day (True Refrigeration product enquiries)

NOTABLE CLIENTS: Nisa Local, Morrisons Daily, Londis, Premier, Co-op,
Costcutter, Asda Express, BP petrol stations, Spar.

CONTACT:
- Phone: 0203 051 0367
- Email: sales@ilktechnology.com or info@ilktechnology.com
- Location: Wembley, London
- Website sections: /about, /arneg, /truerefrigeration, /condensing-units,
  /contact

FAQs YOU CAN ANSWER DIRECTLY:
- Products supplied: refrigeration cabinets, remote & plug-in systems,
  cold rooms, checkouts, shelving, bespoke installs. Some in stock,
  bespoke on request.
- Site surveys & bespoke design: yes, on-site surveys and bespoke design
  offered — contact to arrange.
- Warranties: most products include manufacturer's warranty; ILK provides
  installation warranties where applicable and spare parts sourcing.
- Large cold rooms / turnkey projects: yes, ILK manages projects from
  single cabinets to fully integrated cold rooms and turnkey fit-outs,
  including installation and commissioning.
- Lead times: vary by product/project size; in-stock items ship quickly,
  bespoke/large installs get a quoted timeline after survey.
- Authorised Arneg dealer: yes, confirmed.

YOUR JOB:
Help visitors find the right product or service quickly, answer questions
about warranty, RAL finishes, the process, or company background using
the facts above ONLY. Keep replies short (2-4 sentences), friendly and
practical. When a visitor shows buying intent (asks about price,
availability, a site survey, or a specific model), direct them to use
the "Book a Consultation" / "Enquire Now" flow or call 0203 051 0367 /
email sales@ilktechnology.com — the team responds within 48 hours. Never
invent prices beyond the two published site-survey fees (£150 London /
£350 outside London) — all other pricing comes from the sales team, not
you. If asked something unrelated to refrigeration/retail equipment,
politely redirect back to how you can help with their refrigeration or
retail fit-out needs.
`.trim();

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

// Keywords that signal the visitor wants a quote / to buy / to book something —
// this is when we surface the phone + contact page as buttons in the reply.
const CONTACT_INTENT_PATTERNS = [
  /\bquote\b/i,
  /\bquotation/i,
  /\bpric(e|es|ing)\b/i,
  /\bcost\b/i,
  /\bsite survey\b/i,
  /\bsurvey\b/i,
  /\benquir(e|y|ies)\b/i,
  /\bbook\b/i,
  /\bconsultation\b/i,
  /\border\b/i,
  /\bpurchase\b/i,
  /\bbuy\b/i,
  /\bavailab(le|ility)\b/i,
  /\bget in touch\b/i,
  /\bcontact\b/i,
  /\bcall (you|us|back)\b/i,
  /\blead time\b/i,
];

function hasContactIntent(userMessage: string, replyText: string): boolean {
  return CONTACT_INTENT_PATTERNS.some(
    (pattern) => pattern.test(userMessage) || pattern.test(replyText)
  );
}

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key not configured on server." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const message: string = body?.message ?? "";
    const history: ChatMessage[] = Array.isArray(body?.history)
      ? body.history
      : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing 'message' string in request body." },
        { status: 400 }
      );
    }

    // Build Gemini "contents" array from prior turns + new user message
    const contents = [
      ...history.slice(-10).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        generationConfig: {
          maxOutputTokens: 300,
        },
      }),
    });

    // Graceful handling for free-tier rate limits (HTTP 429)
    if (res.status === 429) {
      return NextResponse.json(
        {
          error:
            "We're getting a lot of questions right now — please try again in a moment, or call us on 0203 051 0367.",
        },
        { status: 429 }
      );
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      return NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response. Please call 0203 051 0367 or email sales@ilktechnology.com and our team will help directly.";

    const showContact = hasContactIntent(message, reply);

    return NextResponse.json({ reply, showContact });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}