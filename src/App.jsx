import { useState, useEffect } from 'react';
import Hero from './components/Hero.jsx';
import ScrollyLayout from './components/ScrollyLayout.jsx';

// ─── Reading progress bar ────────────────────────────────────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollTop / (scrollHeight - clientHeight);
      setProgress(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-cream-200">
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.12s linear',
          background: 'linear-gradient(90deg, #1D4ED8, #0891B2, #059669)',
        }}
      />
    </div>
  );
}

function Footer() {
  const tools = [
    'IQ-TREE · Phylogenetics',
    'HyPhy · Evolutionary analysis',
    'FoldX · Structural stability',
    'MODELLER · Homology modelling',
    'GROMACS · Energy minimization',
    'MUSCLE · Sequence alignment',
  ];

  return (
    <footer className="bg-ink text-cream-200 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Institutions */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold tracking-widest uppercase text-ink-faint mb-3">
              Participating Institutions
            </h4>
            <ul className="text-xs text-ink-faint leading-relaxed space-y-1">
              {[
                'University of Regensburg, Germany',
                'University Hospital Regensburg, Germany',
                'University of Cambridge, UK',
                'Cambridge University Hospitals NHS, UK',
                'University of Southampton, UK',
                'University Hospital Southampton NHS, UK',
                'Imperial College London, UK',
                'London School of Hygiene & Tropical Medicine, UK',
                'DIOSynVax Ltd, Cambridge, UK',
                'PHARMExcel Ltd, Welwyn Garden City, UK',
                'ProBioGen AG, Berlin, Germany',
                'Ethris GmbH, Planegg, Germany',
                'Microsoft Health Futures, Redmond, WA, USA',
              ].map((inst) => (
                <li key={inst} className="flex items-start gap-1.5">
                  <span className="mt-1 w-1 h-1 rounded-full bg-science-teal flex-shrink-0" />
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* Paper 1 */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-ink-faint mb-3">
              Study 1 — Preclinical
            </h4>
            <p className="text-sm text-cream-200 leading-snug mb-3">
              "A computationally designed antigen eliciting broad humoral
              responses against SARS-CoV-2 and related sarbecoviruses"
            </p>
            <div className="text-xs text-ink-faint mb-1">Vishwanath et al. · 2023</div>
            <a
              href="https://www.nature.com/articles/s41551-023-01094-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-science-teal hover:text-white transition-colors underline underline-offset-2"
            >
              Nature Biomedical Engineering, 2023
            </a>
            <p className="text-xs text-ink-faint mt-2">
              DOI: <a
                href="https://doi.org/10.1038/s41551-023-01094-2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-science-teal hover:text-white transition-colors underline underline-offset-2"
              >
                10.1038/s41551-023-01094-2
              </a>
            </p>
          </div>

          {/* Paper 2 */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-ink-faint mb-3">
              Study 2 — Phase I Trial
            </h4>
            <p className="text-sm text-cream-200 leading-snug mb-3">
              "A phase I, needle free, dose escalation clinical trial of
              pEVAC-PS, a candidate pan-Sarbecovirus Vaccine"
            </p>
            <div className="text-xs text-ink-faint mb-1">Munro et al. · 2026</div>
            <a
              href="https://www.sciencedirect.com/science/article/pii/S0163445326000848"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-science-amber hover:text-white transition-colors underline underline-offset-2"
            >
              Journal of Infection, 2026
            </a>
            <p className="text-xs text-ink-faint mt-2">
              DOI: <a
                href="https://doi.org/10.1016/j.jinf.2026.03.012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-science-amber hover:text-white transition-colors underline underline-offset-2"
              >
                10.1016/j.jinf.2026.03.012
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-faint text-center md:text-left max-w-lg">
            Scrollytelling built with React · Framer Motion · Recharts · Tailwind CSS.
            Narrative derived from peer-reviewed research. Bar chart values are
            representative medians consistent with described statistical significance (all p ≤ 0.0002).
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/*<span className="inline-block w-1.5 h-1.5 rounded-full bg-science-amber" />
            <span className="text-xs text-ink-faint">Phase I results published — Munro et al. 2026</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App root ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-cream-100">
      <ReadingProgressBar />
      <Hero />
      <ScrollyLayout />
      <Footer />
    </div>
  );
}
