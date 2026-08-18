"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

/* ─── BRAND TOKENS (match page.tsx) ─── */
const NAVY = "#0B2540";
const RED = "#C8102E";
const MUTED = "#6B7280";
const BORDER = "rgba(11,37,64,0.10)";

const CHAT_API_ENDPOINT = "/api/chat";

/* ─── CONTACT DETAILS ─── */
const PHONE_DISPLAY = "0203 051 0367";
const PHONE_TEL = "+442030510367";
const WEBSITE_URL = "https://ilktechnology.com";
const CONTACT_PAGE_URL = `${WEBSITE_URL}/contact`;

interface ChatMessage {
  role: "user" | "model";
  text: string;
  showContact?: boolean;
}

const GREETING: ChatMessage = {
  role: "model",
  text: "Hi! I can help you find the right refrigeration or retail fit-out solution from ILK Technology — Arneg, True Refrigeration, cold rooms, checkouts, bespoke installs and more. What are you looking for?",
};

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", text: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(CHAT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(0, -1), // prior turns, excluding the one just sent
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.reply ?? "Sorry, something went wrong.",
          showContact: data.showContact === true,
        },
      ]);
    } catch (err) {
      console.error("Chat send failed:", err);
      setError("Couldn't reach the assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ai-chat-launcher {
          position: fixed; bottom: 24px; right: 24px; z-index: 900;
          width: 58px; height: 58px; border-radius: 50%;
          background: ${RED}; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(200,16,46,0.35);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .ai-chat-launcher:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(200,16,46,0.45);
        }
        .ai-chat-panel {
          position: fixed; bottom: 96px; right: 24px; z-index: 900;
          width: 360px; max-width: calc(100vw - 32px);
          height: 500px; max-height: calc(100vh - 140px);
          background: #fff; border-radius: 10px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(11,37,64,0.28);
          display: flex; flex-direction: column;
          border-top: 3px solid ${RED};
          animation: ai-chat-in 0.18s ease-out;
        }
        @keyframes ai-chat-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ai-chat-header {
          background: ${NAVY}; padding: 16px 18px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ai-chat-header-title {
          font-size: 13px; font-weight: 800; color: #fff;
          letter-spacing: -0.01em;
        }
        .ai-chat-header-sub {
          font-size: 10px; color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;
        }
        .ai-chat-close {
          background: none; border: none; color: rgba(255,255,255,0.6);
          font-size: 16px; cursor: pointer; padding: 4px;
        }
        .ai-chat-close:hover { color: #fff; }
        .ai-chat-contact-bar {
          display: flex; align-items: center; justify-content: center;
          padding: 8px 14px; background: #f4f6f8;
          border-bottom: 1px solid ${BORDER};
          font-size: 11.5px;
        }
        .ai-chat-contact-link {
          display: inline-flex; align-items: center; gap: 5px;
          color: ${NAVY}; text-decoration: none; font-weight: 600;
          padding: 4px 10px; border-radius: 14px;
          border: 1px solid rgba(11,37,64,0.14);
          background: #fff; transition: border-color 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .ai-chat-contact-link:hover {
          border-color: ${RED}; color: ${RED};
        }
        .ai-chat-contact-link--phone {
          animation: ai-chat-phone-pulse 2.2s infinite;
        }
        @keyframes ai-chat-phone-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,16,46,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(200,16,46,0); }
        }
        .ai-chat-body {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 10px;
          background: #fafafa;
        }
        .ai-chat-msg {
          max-width: 82%; padding: 9px 13px; border-radius: 12px;
          font-size: 13px; line-height: 1.55;
        }
        .ai-chat-msg--user {
          align-self: flex-end; background: ${NAVY}; color: #fff;
          border-bottom-right-radius: 3px;
        }
        .ai-chat-msg--model {
          align-self: flex-start; background: #fff; color: ${NAVY};
          border: 1px solid ${BORDER};
          border-bottom-left-radius: 3px;
        }
        .ai-chat-msg--model a {
          color: ${RED}; font-weight: 600; text-decoration: none;
        }
        .ai-chat-msg--model a:hover { text-decoration: underline; }
        .ai-chat-msg-actions {
          display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;
        }
        .ai-chat-msg-action {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11.5px; font-weight: 700; text-decoration: none;
          padding: 6px 11px; border-radius: 16px;
          transition: background-color 0.15s, border-color 0.15s;
          box-shadow: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .ai-chat-msg-action:active {
          transform: none;
        }
        .ai-chat-msg-action--call {
          background: ${RED}; color: #fff;
          border: 1px solid ${RED};
        }
        .ai-chat-msg-action--call:hover {
          background: #a50e25; border-color: #a50e25;
        }
        .ai-chat-msg-action--contact {
          background: #fff; color: ${NAVY};
          border: 1px solid rgba(11,37,64,0.25);
        }
        .ai-chat-msg-action--contact:hover {
          background: #f4f6f8; border-color: ${NAVY};
        }
        .ai-chat-typing {
          align-self: flex-start; display: flex; gap: 4px;
          padding: 10px 13px; background: #fff; border: 1px solid ${BORDER};
          border-radius: 12px; border-bottom-left-radius: 3px;
        }
        .ai-chat-typing span {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${MUTED}; opacity: 0.5;
          animation: ai-chat-bounce 1.1s infinite;
        }
        .ai-chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .ai-chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes ai-chat-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
        .ai-chat-error {
          font-size: 11.5px; color: ${RED}; padding: 0 4px;
        }
        .ai-chat-form {
          display: flex; gap: 8px; padding: 12px;
          border-top: 1px solid ${BORDER}; background: #fff;
        }
        .ai-chat-input {
          flex: 1; border: 1px solid rgba(11,37,64,0.18);
          border-radius: 20px; padding: 9px 15px; font-size: 13px;
          outline: none; font-family: inherit; color: ${NAVY};
          transition: border-color 0.15s;
        }
        .ai-chat-input:focus { border-color: ${RED}; }
        .ai-chat-send {
          width: 36px; height: 36px; border-radius: 50%;
          background: ${RED}; border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.15s, opacity 0.15s;
        }
        .ai-chat-send:hover { background: #a50e25; }
        .ai-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 480px) {
          .ai-chat-panel { right: 16px; bottom: 88px; width: calc(100vw - 32px); }
          .ai-chat-launcher { right: 16px; bottom: 16px; }
        }
      `}</style>

      {open && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <div>
              <div className="ai-chat-header-title">Ask about True Refrigeration</div>
              <div className="ai-chat-header-sub">Usually replies instantly</div>
            </div>
            <button
              className="ai-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="ai-chat-contact-bar">
            <a
              className="ai-chat-contact-link ai-chat-contact-link--phone"
              href={`tel:${PHONE_TEL}`}
            >
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L13 12l5 2v3a2 2 0 0 1-2 2C8.7 19 1 11.3 1 2a2 2 0 0 1 2-2"
                  stroke={NAVY}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="ai-chat-body" ref={scrollRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ai-chat-msg ${
                  m.role === "user" ? "ai-chat-msg--user" : "ai-chat-msg--model"
                }`}
              >
                <div>{m.text}</div>
                {m.role === "model" && m.showContact && (
                  <div className="ai-chat-msg-actions">
                    <a
                      className="ai-chat-msg-action ai-chat-msg-action--call"
                      href={`tel:${PHONE_TEL}`}
                    >
                      📞 Call {PHONE_DISPLAY}
                    </a>
                    <a
                      className="ai-chat-msg-action ai-chat-msg-action--contact"
                      href={CONTACT_PAGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ✉️ Contact page
                    </a>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="ai-chat-typing">
                <span /><span /><span />
              </div>
            )}
            {error && <p className="ai-chat-error">{error}</p>}
          </div>

          <form className="ai-chat-form" onSubmit={sendMessage}>
            <input
              className="ai-chat-input"
              placeholder="Ask about a product, warranty, finish…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="ai-chat-send"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path d="M2 10L18 2L11 18L9 11L2 10Z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        className="ai-chat-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.03 2 11c0 2.4 1.05 4.58 2.78 6.19-.13 1.24-.5 2.6-1.28 3.81-.16.24.02.55.3.5 1.9-.32 3.34-1.05 4.28-1.65.9.3 1.9.15 2.92.15 5.52 0 10-4.03 10-9s-4.48-9-10-9z"
              fill="#fff"
            />
          </svg>
        )}
      </button>
    </>
  );
}