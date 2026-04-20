import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

interface FormState {
  email: string;
  surname: string;
  country: string;
  preferences: string;
}

export default function NewsletterModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormState>({
    email: "",
    surname: "",
    country: "",
    preferences: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // parse body safely (unknown) and try to read an `error` string
        let parsedBody: unknown;
        try {
          parsedBody = await res.json();
        } catch {
          parsedBody = undefined;
        }

        let serverMessage = "Failed to subscribe";
        if (typeof parsedBody === "object" && parsedBody !== null) {
          const pb = parsedBody as Record<string, unknown>;
          if (typeof pb.error === "string" && pb.error.trim().length > 0) {
            serverMessage = pb.error;
          }
        }

        throw new Error(serverMessage);
      }

      setSuccess(true);
    } catch (err: unknown) {
      // avoid `any` — use `unknown` and narrow
      const message = err instanceof Error ? err.message : String(err ?? "An unknown error occurred");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        padding: 20,
      }}
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#fff",
          borderRadius: 8,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>Subscribe to the newsletter</h3>
          <button aria-label="Close" onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 20 }}>
            ×
          </button>
        </div>

        {success ? (
          <div style={{ padding: 12, background: "#ECFDF5", borderRadius: 6, color: "#065f46" }}>
            Thank you — you are subscribed. We will be in touch from info@ilktechnology.com.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            <label style={{ fontSize: 13 }}>
              Email*
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 4, border: "1px solid #ddd" }}
              />
            </label>

            <label style={{ fontSize: 13 }}>
              Surname
              <input
                name="surname"
                type="text"
                value={form.surname}
                onChange={handleChange}
                placeholder="Smith"
                style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 4, border: "1px solid #ddd" }}
              />
            </label>

            <label style={{ fontSize: 13 }}>
              Country
              <input
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                placeholder="United Kingdom"
                style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 4, border: "1px solid #ddd" }}
              />
            </label>

            <label style={{ fontSize: 13 }}>
              Preferences (optional)
              <input
                name="preferences"
                type="text"
                value={form.preferences}
                onChange={handleChange}
                placeholder="Refrigerated displays, News and trends, etc."
                style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 4, border: "1px solid #ddd" }}
              />
            </label>

            {error && <div style={{ color: "#b91c1c" }}>{error}</div>}

            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#C8102E",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: 4,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Sending…" : "Subscribe"}
              </button>
              <button type="button" onClick={onClose} style={{ background: "transparent", border: "1px solid #ddd", padding: "8px 12px", borderRadius: 4 }}>
                Cancel
              </button>
            </div>

            <small style={{ color: "#6b7280" }}>
              By subscribing you agree to our privacy policy. We will only use your data to send you newsletter emails.
            </small>
          </form>
        )}
      </div>
    </div>
  );
}