"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  color?: string;
  hero: string;
  gallery?: string[];
  sizes: string[]; // e.g. ["3750mm","2500mm"...]
  specs: string[]; // bullet points
  overview?: string[]; // paragraphs
  note?: string;
  mailTo?: string; // optional override
};

export default function ProductDetail({
  title,
  color,
  hero,
  gallery = [],
  sizes,
  specs,
  overview = [],
  note,
  mailTo,
}: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = gallery.length ? gallery : [hero];
  const mailtoQuote = mailTo ?? `mailto:sales@ilktechnology.com?subject=Request%20a%20Quote%20-%20${encodeURIComponent(title)}`;
  const mailtoSurvey = `mailto:sales@ilktechnology.com?subject=Site%20Survey%20Request%20-%20${encodeURIComponent(title)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div
            className="relative w-full h-[60vh] sm:h-[56vh] md:h-[64vh] lg:h-[72vh] cursor-zoom-in"
            onClick={() => { setLightboxOpen(true); setIndex(0); }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${title} gallery`}
          >
            <Image src={hero} alt={title} fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Title / CTA / Side */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-slate-900">{title}</h1>
            {color && <p className="mt-2 text-sm text-slate-600 uppercase font-semibold">{`Colour: ${color}`}</p>}

            <div className="mt-4 text-slate-700 space-y-4">
              {overview.length ? (
                overview.map((p, i) => <p key={i} className="leading-relaxed">{p}</p>)
              ) : (
                <p className="leading-relaxed">
                  High-quality refrigerated display case with flexible shelving, LED canopy lighting and professional finish — ideal for retail and convenience environments.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={mailtoQuote}
                className="inline-block bg-slate-900 text-white px-5 py-3 rounded-md font-bold hover:bg-slate-800 text-center"
                aria-label={`Request a quote for ${title}`}
              >
                Request a Quote
              </a>

              <a
                href={mailtoSurvey}
                className="inline-block border border-slate-200 bg-white text-slate-800 px-5 py-3 rounded-md font-semibold hover:bg-slate-50 text-center"
                aria-label={`Schedule a site survey for ${title}`}
              >
                Schedule a Site Survey
              </a>
            </div>

            {note && <p className="mt-4 text-sm text-slate-500">{note}</p>}
          </div>

          <aside className="w-full lg:w-80 flex-shrink-0 bg-white p-5 rounded-md shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 uppercase">Sizes available</h3>
            <div className="mt-3">
              <div className="text-sm text-slate-800 font-medium">Height: 203cm — Depth: 75cm</div>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                {sizes.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-700">Case specs</h4>
              <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-1">
                {specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <button
                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-slate-50 border border-slate-100 hover:bg-slate-100"
                onClick={() => { setLightboxOpen(true); setIndex(0); }}
                aria-label="Open image gallery"
              >
                View images
              </button>
            </div>
          </aside>
        </div>

        {/* Gallery thumbnails (if available) */}
        {images.length > 1 && (
          <div className="mt-6 max-w-6xl">
            <div className="flex gap-3 overflow-auto pb-2">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => { setIndex(i); setLightboxOpen(true); }}
                  className="flex-none w-28 h-20 rounded-md overflow-hidden border border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-slate-900 focus:outline-none"
                  aria-label={`Open image ${i + 1}`}
                >
                  <div className="relative w-full h-full">
                    <Image src={src} alt={`${title} ${i + 1}`} fill style={{ objectFit: "cover" }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-[1400px] w-full h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 z-60 bg-white/90 rounded-full p-2 shadow"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close gallery"
              >
                ✕
              </button>

              <div className="absolute inset-0">
                <Image src={images[index]} alt={`${title} large ${index + 1}`} fill style={{ objectFit: "contain" }} />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow"
                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>

                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 shadow"
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}