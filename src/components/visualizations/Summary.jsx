import { motion } from 'framer-motion';
import { KEY_STATS, PALETTE, PIPELINE_STEPS } from '../../data/storyData.js';

const ICON_MAP = {
  '9':   '🧬',
  '3':   '🐭',
  '0':   '✅',
  '16%': '🎯',
};

export default function Summary() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-4 overflow-y-auto py-4">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          The DIOSynVax Pipeline
        </h3>
        <p className="text-xs text-ink-muted">
          A generalizable approach for any virus family with dangerous variant diversity
        </p>
      </div>

      {/* Key stats grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {KEY_STATS.map((stat, i) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.45, type: 'spring' }}
            className="rounded-2xl p-3 border"
            style={{
              background: stat.color + '0C',
              borderColor: stat.color + '30',
            }}
          >
            <div className="text-xl mb-0.5">{ICON_MAP[stat.value]}</div>
            <div
              className="font-display text-2xl font-black leading-none"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-ink mt-0.5 leading-snug">
              {stat.label}
            </div>
            <div className="text-xs text-ink-faint mt-1 leading-snug">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Pipeline mini-flow */}
      <div className="w-full max-w-xs">
        <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2 text-center">
          Computational Pipeline
        </div>
        <div className="flex flex-col gap-1">
          {PIPELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              {/* Step node */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: step.color }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-bold text-ink">{step.tool}</span>
                </div>
                <div className="text-xs text-ink-muted leading-tight">{step.action}</div>
              </div>
              {/* Arrow connector */}
              {i < PIPELINE_STEPS.length - 1 && (
                <svg width="12" height="12" className="text-ink-faint flex-shrink-0">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Source citation */}
      <div className="text-xs text-ink-faint text-center max-w-xs border-t border-cream-200 pt-3">
        Vishwanath et al., <em>Nature Biomedical Engineering</em>, published online Sept. 2023.<br />
        DOI: 10.1038/s41551-023-01094-2
      </div>
    </div>
  );
}
