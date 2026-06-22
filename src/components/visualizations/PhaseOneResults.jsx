import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHASE1_OUTCOMES, PALETTE } from '../../data/storyData.js';

const VERDICT_ICONS = {
  pass:    { bg: '#DCFCE7', border: '#86EFAC', text: '#166534', symbol: '✓' },
  partial: { bg: '#FFFBEB', border: '#FCD34D', text: '#92400E', symbol: '⚠' },
  info:    { bg: '#EFF6FF', border: '#93C5FD', text: '#1E40AF', symbol: 'ℹ' },
};

function VerdictCard({ outcome, index, isSelected, onClick }) {
  const style = VERDICT_ICONS[outcome.verdict];

  return (
    <motion.button
      onClick={() => onClick(outcome.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.45, type: 'spring' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden"
      style={{
        borderColor: isSelected ? outcome.color : style.border,
        background: isSelected ? outcome.color + '12' : style.bg,
        boxShadow: isSelected ? `0 0 0 3px ${outcome.color}25` : 'none',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Verdict badge */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
          style={{ background: outcome.color, color: 'white' }}
        >
          {style.symbol}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-ink text-sm leading-tight">{outcome.title}</div>
          <div
            className="text-xs font-semibold"
            style={{ color: outcome.color }}
          >
            {outcome.subtitle}
          </div>
        </div>

        {/* Chevron */}
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          animate={{ rotate: isSelected ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-ink-faint"
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 pt-1 text-xs text-ink-muted leading-relaxed border-t" style={{ borderColor: outcome.color + '30' }}>
              {outcome.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

const OVERALL_VERDICT = {
  summary: 'The design concept is validated. The delivery needs an upgrade.',
  points: [
    { icon: '🧬', text: 'Antigen design: RBD antibodies confirmed in humans — concept proven' },
    { icon: '🚧', text: 'Neutralization breadth: limited by DNA delivery ceiling, not the antigen itself' },
    { icon: '💉', text: 'mRNA formulation of T2_17 showed better results — next step is mRNA clinical trials' },
    { icon: '🔬', text: 'Pipeline is generalizable to other virus families (influenza, HIV, RSV)' },
  ],
};

export default function PhaseOneResults() {
  const [selected, setSelected] = useState('safety');

  const toggle = (id) => setSelected((prev) => (prev === id ? null : id));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-4 overflow-y-auto py-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span
            className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ background: PALETTE.amber + '20', color: PALETTE.amber }}
          >
            Phase I · Humans · 2026
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          Trial Scorecard
        </h3>
        <p className="text-xs text-ink-muted">
          Munro et al. · Journal of Infection · Tap each outcome for details
        </p>
      </div>

      {/* Outcome cards */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {PHASE1_OUTCOMES.map((outcome, i) => (
          <VerdictCard
            key={outcome.id}
            outcome={outcome}
            index={i}
            isSelected={selected === outcome.id}
            onClick={toggle}
          />
        ))}
      </div>

      {/* Overall verdict strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="w-full max-w-xs rounded-2xl p-4 border"
        style={{ background: '#F8FAFC', borderColor: '#E2E8F0' }}
      >
        <div className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
          Bottom Line
        </div>
        <p className="text-sm font-semibold text-ink mb-3 leading-snug">
          "{OVERALL_VERDICT.summary}"
        </p>
        <ul className="space-y-1.5">
          {OVERALL_VERDICT.points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-ink-muted leading-snug">
              <span className="flex-shrink-0">{p.icon}</span>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Source */}
      <p className="text-xs text-ink-faint text-center max-w-xs">
        Critical analysis based on{' '}
        <a
          href="https://www.sciencedirect.com/science/article/pii/S0163445326000848"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-1 hover:text-ink-muted transition-colors"
        >
          Munro et al., J. Infection, 2026
        </a>
      </p>
    </div>
  );
}
