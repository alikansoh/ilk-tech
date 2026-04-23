"use client";

import Link from "next/link";
import React from "react";

const NAVY = "#0B2540";
const RED = "#C8102E";
const MUTED = "#6B7280";

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        :root {
          --navy: ${NAVY};
          --red: ${RED};
          --muted: ${MUTED};
        }
        * { box-sizing: border-box; }
        body {
          font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
          margin: 0; background: #fff; color: var(--navy);
        }
        .page {
          max-width: 1180px;
          margin: 36px auto;
          padding: 28px;
        }
        .header {
          display:flex;
          align-items:center;
          gap:18px;
          margin-bottom: 18px;
        }
        .brand { font-weight:800; font-size:20px; color:var(--navy); }
        .brand span { color: var(--red); }
        .eyebrow { font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--muted); }
        .title { font-size: clamp(20px,3.6vw,34px); font-weight:800; margin:6px 0 10px; color:var(--navy); }
        .subtitle { color:#6b7280; margin-bottom:22px; line-height:1.6; }

        .layout { display:grid; grid-template-columns: 300px 1fr; gap: 28px; }

        .toc {
          position: sticky; top: 24px; align-self:start; border:1px solid rgba(11,37,64,0.06); padding:18px; border-radius:8px; background:#fff;
        }
        .toc h4 { margin:0 0 8px; font-size:12px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); }
        .toc ul { list-style:none; padding:0; margin:8px 0 0; }
        .toc a { display:block; padding:8px 6px; color:var(--navy); text-decoration:none; border-radius:6px; }
        .toc a:hover, .toc a:focus { background: rgba(200,16,46,0.04); color: var(--red); }

        .content { background:#fff; padding:28px; border-radius:8px; box-shadow:0 8px 30px rgba(11,37,64,0.03); line-height:1.65; }
        .section { margin-bottom:26px; }
        .section h3 { margin:0 0 12px; font-size:18px; color:var(--navy); }
        .muted { color:#6b7280; }

        .actions { display:flex; gap:12px; margin-bottom:18px; }
        .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 14px; background: var(--red); color:#fff; border:none; border-radius:6px; text-decoration:none; font-weight:700; cursor:pointer; }
        .btn.secondary { background:#fff; color:var(--navy); border:1px solid rgba(11,37,64,0.06); }

        @media (max-width:920px) {
          .layout { grid-template-columns: 1fr; }
          .toc { order: 2; position: relative; margin-top: 12px; }
        }

        @media print {
          .toc, .actions, .header { display: none; }
          .page { margin: 0; padding: 0; }
          .content { box-shadow: none; padding: 0; border-radius: 0; }
        }
      `}</style>

      <main className="page" id="top">
        <header className="header">
          <div className="brand">ILK <span>Technology</span></div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/" className="btn secondary">Home</Link>
          </div>
        </header>

        <p className="eyebrow">Privacy Policy</p>
        <h1 className="title">Privacy & Data Protection</h1>
        <p className="subtitle muted">
          This Privacy Policy explains how ILK Technology collects, uses, and protects personal data when you use our Site and services.
        </p>

        <div className="layout" role="presentation">
          <nav className="toc" aria-label="Table of contents">
            <h4>Contents</h4>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#no-account-payments">No accounts or payments</a></li>
              <li><a href="#collected">Data we collect</a></li>
              <li><a href="#use">How we use data</a></li>
              <li><a href="#legal">Legal basis</a></li>
              <li><a href="#cookies">Cookies</a></li>
              <li><a href="#third">Third parties</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#rights">Your rights</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <article className="content" aria-labelledby="privacy-heading">
            <div className="actions" role="toolbar" aria-label="Actions">
              <a className="btn" href="#contact">Contact Data Team</a>
              <button className="btn secondary" onClick={() => window.print()}>Print / Save</button>
            </div>

            <section id="overview" className="section">
              <h3>Overview</h3>
              <p>
                ILK Technology Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains what personal data we collect,
                how we use it, and the rights you have in relation to your personal data.
              </p>
            </section>

            <section id="no-account-payments" className="section">
              <h3>No account creation or payment processing</h3>
              <p>
                The Site does not provide user account creation or login functionality, and we do not process payments or collect payment card information.
                If you are directed to a third-party service (for example, for booking or payments) that service will be responsible for its own data handling and
                payment processes — please review their privacy and payment policies before providing any payment details.
              </p>
            </section>

            <section id="collected" className="section">
              <h3>Data we collect</h3>
              <p>
                We collect information that you provide when you contact us, sign up to our newsletter, request a quote or use our services. This may include:
              </p>
              <ul>
                <li>Identity information: name, job title, company</li>
                <li>Contact data: email address, phone number, postal address</li>
                <li>Communications: enquiries, messages and attachments you send</li>
                <li>Technical data: IP address, browser and device details, cookies</li>
              </ul>
            </section>

            <section id="use" className="section">
              <h3>How we use your data</h3>
              <p className="muted">
                We use data to:
              </p>
              <ul>
                <li>Respond to enquiries, provide quotes and deliver services</li>
                <li>Send newsletters and service updates if you have opted in</li>
                <li>Improve our website, products and customer experience</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </section>

            <section id="legal" className="section">
              <h3>Legal basis for processing</h3>
              <p>
                Depending on the processing activity, we rely on one or more lawful bases, including:
              </p>
              <ul>
                <li>Performance of a contract (e.g., to provide services you requested)</li>
                <li>Consent (e.g., for marketing communications)</li>
                <li>Legitimate interests (e.g., to operate and improve our business)</li>
                <li>Compliance with legal obligations</li>
              </ul>
            </section>

            <section id="cookies" className="section">
              <h3>Cookies & tracking</h3>
              <p>
                We use cookies and similar technologies to operate the Site, to analyse usage and to support advertising where applicable.
                Most browsers allow you to manage cookie preferences. Blocking cookies may reduce functionality.
              </p>
            </section>

            <section id="third" className="section">
              <h3>Sharing & third parties</h3>
              <p>
                We may share personal data with trusted third parties who provide services on our behalf (for example, EmailJS, analytics providers and cloud hosting).
                We require such parties to protect personal data in accordance with this policy. As noted above, we do not process payments or host account services on the Site.
              </p>
            </section>

            <section id="security" className="section">
              <h3>Security & retention</h3>
              <p>
                We implement technical and organisational measures to protect personal data. We retain personal data only for as long as necessary for the
                purposes set out in this Policy or as required by law.
              </p>
            </section>

            <section id="rights" className="section">
              <h3>Your rights</h3>
              <p>
                You may have rights under applicable data protection laws, including:
              </p>
              <ul>
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Erasure (right to be forgotten) in certain circumstances</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
              </ul>
              <p>If you wish to exercise any of these rights contact us using the details below. We will respond in accordance with applicable law.</p>
            </section>

            <section id="contact" className="section">
              <h3>Contact & complaints</h3>
              <p className="muted">Data protection officer / enquiries</p>
              <p>
                ILK Technology Ltd<br />
                Poplar View, East Lane Business Park<br />
                Wembley, HA9 7RD, United Kingdom<br />
                Email: <a href="mailto:info@ilktechnology.com">info@ilktechnology.com</a>
              </p>
              <p>
                If you remain unhappy after contacting us, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) in the UK.
              </p>
            </section>

            <p className="muted">Last updated: 2026-04-23</p>
          </article>
        </div>
      </main>
    </>
  );
}