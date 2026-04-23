"use client";

import Link from "next/link";
import React from "react";

const NAVY = "#0B2540";
const RED = "#C8102E";
const MUTED = "#6B7280";

export default function TermsPage() {
  return (
    <>
      <style>{`
        :root {
          --navy: ${NAVY};
          --red: ${RED};
          --muted: ${MUTED};
        }
        * { box-sizing: border-box; }
        html,body,#root { height: 100%; }
        body {
          font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
          margin: 0; background: #fff; color: var(--navy); -webkit-font-smoothing:antialiased;
        }
        .page {
          max-width: 1180px;
          margin: 36px auto;
          padding: 28px;
        }
        .header {
          display:flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .brand {
          font-weight: 800;
          font-size: 20px;
          color: var(--navy);
        }
        .brand span { color: var(--red); }
        .eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .title {
          font-size: clamp(20px, 3.6vw, 34px);
          font-weight: 800;
          margin: 6px 0 10px;
          color: var(--navy);
        }
        .subtitle {
          color: #6b7280;
          margin-bottom: 22px;
          line-height: 1.6;
        }

        .layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* TOC */
        .toc {
          position: sticky;
          top: 24px;
          align-self: start;
          border: 1px solid rgba(11,37,64,0.06);
          padding: 18px;
          border-radius: 8px;
          background: #fff;
          height: fit-content;
        }
        .toc h4 {
          margin: 0 0 8px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .toc ul {
          list-style: none;
          padding: 0;
          margin: 8px 0 0;
        }
        .toc a {
          display:block;
          padding: 8px 6px;
          color: var(--navy);
          text-decoration: none;
          font-size: 14px;
          border-radius: 6px;
        }
        .toc a:hover, .toc a:focus {
          background: rgba(200,16,46,0.04);
          color: var(--red);
          outline: none;
        }

        /* content */
        .content {
          background: #fff;
          padding: 28px;
          border-radius: 8px;
          box-shadow: 0 8px 30px rgba(11,37,64,0.03);
          line-height: 1.65;
        }
        .section {
          margin-bottom: 26px;
        }
        .section h3 {
          margin: 0 0 12px;
          font-size: 18px;
          color: var(--navy);
        }
        .muted { color: #6b7280; font-size: 14px; }

        .actions {
          display:flex;
          gap:12px;
          margin-bottom: 18px;
        }
        .btn {
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:10px 14px;
          background: var(--red);
          color:#fff;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-weight:700;
          cursor: pointer;
        }
        .btn.secondary {
          background: #fff;
          color: var(--navy);
          border: 1px solid rgba(11,37,64,0.06);
        }

        /* print */
        @media print {
          body { background: #fff; color: #000; }
          .toc, .actions, .header { display: none; }
          .page { margin: 0; padding: 0; }
          .content { box-shadow: none; padding: 0; border-radius: 0; }
        }

        /* responsive */
        @media (max-width: 920px) {
          .layout { grid-template-columns: 1fr; }
          .toc { order: 2; position: relative; margin-top: 12px; }
        }
      `}</style>

      <main className="page" id="top">
        <header className="header">
          <div className="brand">ILK <span>Technology</span></div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/" className="btn secondary">Home</Link>
          </div>
        </header>

        <p className="eyebrow">Terms of Service</p>
        <h1 className="title">Website Terms & Conditions</h1>
        <p className="subtitle muted">
          These Terms of Service govern your use of the ILK Technology website and services. Please read them carefully.
        </p>

        <div className="layout" role="presentation">
          <nav className="toc" aria-label="Table of contents">
            <h4>On this page</h4>
            <ul>
              <li><a href="#acceptance">1. Acceptance</a></li>
              <li><a href="#use">2. Permitted use</a></li>
              <li><a href="#account">3. Account & data</a></li>
              <li><a href="#ip">4. Intellectual property</a></li>
              <li><a href="#liability">5. Limitation of liability</a></li>
              <li><a href="#termination">6. Termination</a></li>
              <li><a href="#governing">7. Governing law</a></li>
              <li><a href="#contact">8. Contact</a></li>
            </ul>
          </nav>

          <article className="content" aria-labelledby="terms-heading">
            <div className="actions" role="toolbar" aria-label="Actions">
              <a className="btn" href="#contact" onClick={() => { /* anchor jump handled by browser */ }}>
                Contact Us
              </a>
              <button className="btn secondary" onClick={() => window.print()}>
                Print / Save
              </button>
            </div>

            <section id="acceptance" className="section">
              <h3>1. Acceptance of terms</h3>
              <p>
                By accessing or using the ILK Technology website (the &quot;Site&quot;) you agree to be bound by these Terms of Service
                and any other policies posted on the Site. If you do not agree to these terms, do not use the Site.
              </p>
            </section>

            <section id="use" className="section">
              <h3>2. Permitted use</h3>
              <p>
                You may use the Site for lawful purposes and in accordance with these Terms. You must not use the Site to upload,
                post or transmit any content that is unlawful, harmful, or infringes third-party rights.
              </p>
              <ul>
                <li>Do not attempt to circumvent security or abuse services.</li>
                <li>Do not harvest data from the Site without our permission.</li>
              </ul>
            </section>

            <section id="account" className="section">
              <h3>3. Account information and data</h3>
              <p>
                Where you provide personal or company information through contact forms, newsletter signups, or account features,
                you confirm that the information is accurate and you are authorized to provide it. How we collect and process
                personal data is described in our <a href="/privacy">Privacy Policy</a>.
              </p>
            </section>

            <section id="ip" className="section">
              <h3>4. Intellectual property</h3>
              <p>
                All content on the Site, including text, images, logos, and design (the &quot;Content&quot;) is owned or licensed by ILK Technology.
                You may view and download Content for personal, non-commercial use only. Any other use requires our prior written consent.
              </p>
            </section>

            <section id="liability" className="section">
              <h3>5. Limitation of liability</h3>
              <p>
                To the maximum extent permitted by law, ILK Technology and its officers, employees and suppliers will not be liable for
                any indirect, incidental, special or consequential loss arising from your use of the Site. Our total aggregate liability
                for direct losses is limited to £100 or the amount you paid to use the relevant service, if applicable.
              </p>
            </section>

            <section id="termination" className="section">
              <h3>6. Suspension and termination</h3>
              <p>
                We may suspend or terminate your access to the Site at any time for breach of these Terms or for any lawful reason.
                Sections that by their nature are intended to survive termination will continue in effect.
              </p>
            </section>

            <section id="governing" className="section">
              <h3>7. Governing law</h3>
              <p>
                These Terms are governed by the laws of England and Wales. Any dispute arising from these Terms will be subject to the
                exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section id="contact" className="section">
              <h3>8. Contact</h3>
              <p className="muted">
                If you have questions about these Terms, please write to:
              </p>
              <p>
                ILK Technology Ltd<br />
                Poplar View, East Lane Business Park<br />
                Wembley, HA9 7RD, United Kingdom<br />
                Email: <a href="mailto:info@ilktechnology.com">info@ilktechnology.com</a>
              </p>
            </section>

            <p className="muted" style={{ marginTop: 6 }}>
              Last updated: 2026-04-23
            </p>
          </article>
        </div>
      </main>
    </>
  );
}