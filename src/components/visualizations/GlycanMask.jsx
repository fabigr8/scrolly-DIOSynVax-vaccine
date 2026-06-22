import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PALETTE } from '../../data/storyData.js';

// Antigen design cards (T2_13 through T2_18)
const DESIGNS = [
  {
    id: 'T2_13',
    label: 'T2_13',
    subtitle: 'Core sequence',
    desc: 'Phylogenetically central — equidistant from all sarbecoviruses in the tree.',
    s309: false, cr3022: false, b38Masked: false, b38Type: 'native',
    winner: false,
  },
  {
    id: 'T2_14',
    label: 'T2_14',
    subtitle: 'S309 matched',
    desc: 'T2_13 with S309 epitope mutated to match wild-type SARS-CoV.',
    s309: true, cr3022: false, b38Masked: false, b38Type: 'native',
    winner: false,
  },
  {
    id: 'T2_15',
    label: 'T2_15',
    subtitle: 'CR3022 matched',
    desc: 'T2_13 with CR3022 epitope mutated to match wild-type SARS-CoV.',
    s309: false, cr3022: true, b38Masked: false, b38Type: 'native',
    winner: false,
  },
  {
    id: 'T2_16',
    label: 'T2_16',
    subtitle: 'B38 matched (SARS-2)',
    desc: 'T2_13 with B38 epitope matched to SARS-CoV-2. Reduces breadth — confirms B38 is problematic.',
    s309: false, cr3022: false, b38Masked: false, b38Type: 'sars2',
    winner: false,
  },
  {
    id: 'T2_17',
    label: 'T2_17 ★',
    subtitle: 'Glycan-masked B38 on T2_14',
    desc: 'T2_14 with a glycan added at the B38 site — masks the variable region, focuses immune response on conserved patches.',
    s309: true, cr3022: false, b38Masked: true, b38Type: 'masked',
    winner: true,
  },
  {
    id: 'T2_18',
    label: 'T2_18',
    subtitle: 'Glycan-masked B38 on T2_15',
    desc: 'T2_15 with a glycan added at the B38 site.',
    s309: false, cr3022: true, b38Masked: true, b38Type: 'masked',
    winner: false,
  },
];

function MiniProtein({ design }) {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      {/* Protein blob */}
      <ellipse cx="40" cy="44" rx="32" ry="26" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />

      {/* S309 epitope (top left) */}
      <circle
        cx="22"
        cy="34"
        r="9"
        fill={design.s309 ? PALETTE.blue : '#E2E8F0'}
        stroke={design.s309 ? PALETTE.blue : '#CBD5E1'}
        strokeWidth="1"
        opacity={design.s309 ? 0.9 : 0.5}
      />
      <text x="22" y="37" textAnchor="middle" fontSize="5.5" fill={design.s309 ? 'white' : '#94A3B8'} fontFamily="Inter" fontWeight="700">
        S309
      </text>

      {/* CR3022 epitope (bottom left) */}
      <circle
        cx="28"
        cy="55"
        r="8"
        fill={design.cr3022 ? PALETTE.teal : '#E2E8F0'}
        stroke={design.cr3022 ? PALETTE.teal : '#CBD5E1'}
        strokeWidth="1"
        opacity={design.cr3022 ? 0.9 : 0.5}
      />
      <text x="28" y="58" textAnchor="middle" fontSize="4.5" fill={design.cr3022 ? 'white' : '#94A3B8'} fontFamily="Inter" fontWeight="700">
        CR30
      </text>

      {/* B38 epitope (right side) */}
      {design.b38Masked ? (
        <>
          {/* Glycan sugar blob on top of B38 */}
          <circle cx="56" cy="42" r="10" fill="#94A3B8" opacity="0.3" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="51" cy="37" r="5" fill="#D1D5DB" opacity="0.6" />
          <circle cx="61" cy="37" r="5" fill="#D1D5DB" opacity="0.6" />
          <circle cx="56" cy="32" r="4" fill="#E5E7EB" opacity="0.6" />
          <text x="56" y="45" textAnchor="middle" fontSize="5" fill="#6B7280" fontFamily="Inter" fontWeight="600">🛡</text>
        </>
      ) : (
        <circle
          cx="56"
          cy="42"
          r="10"
          fill={design.b38Type === 'sars2' ? PALETTE.red : PALETTE.red}
          stroke={PALETTE.red}
          strokeWidth="1"
          opacity={0.7}
        />
      )}
      {!design.b38Masked && (
        <text x="56" y="45" textAnchor="middle" fontSize="5.5" fill="white" fontFamily="Inter" fontWeight="700">
          B38
        </text>
      )}
    </svg>
  );
}

export default function GlycanMask() {
  const [selectedId, setSelectedId] = useState('T2_17');
  const selected = DESIGNS.find((d) => d.id === selectedId);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          The Six Antigen Designs
        </h3>
        <p className="text-xs text-ink-muted">
          Tap a design to explore — T2_17 was the winning candidate
        </p>
      </div>

      {/* Design grid */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        {DESIGNS.map((d) => (
          <motion.button
            key={d.id}
            onClick={() => setSelectedId(d.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-200"
            style={{
              borderColor: selectedId === d.id ? (d.winner ? PALETTE.blue : '#94A3B8') : '#E2E8F0',
              background: selectedId === d.id ? '#EFF6FF' : '#FFFFFF',
              boxShadow: d.winner && selectedId === d.id ? '0 0 0 3px rgba(29,78,216,0.15)' : 'none',
            }}
          >
            <MiniProtein design={d} />
            <div className="text-xs font-bold text-ink mt-1">{d.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Selected card */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xs rounded-2xl p-4 border"
            style={{
              borderColor: selected.winner ? PALETTE.blue + '60' : '#E2E8F0',
              background: selected.winner ? '#EFF6FF' : '#F8FAFC',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-ink">{selected.label}</span>
              {selected.winner && (
                <span className="text-xs font-bold text-white bg-science-blue rounded-full px-2 py-0.5">
                  Winner
                </span>
              )}
              <span className="ml-auto text-xs text-ink-muted">{selected.subtitle}</span>
            </div>
            <p className="text-xs text-ink-muted leading-snug">{selected.desc}</p>

            {/* Epitope indicators */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {[
                { key: 's309', label: 'S309', color: PALETTE.blue, active: selected.s309 },
                { key: 'cr3022', label: 'CR3022', color: PALETTE.teal, active: selected.cr3022 },
                {
                  key: 'b38',
                  label: selected.b38Masked ? 'B38 🛡' : 'B38',
                  color: selected.b38Masked ? '#94A3B8' : PALETTE.red,
                  active: true,
                },
              ].map((e) => (
                <span
                  key={e.key}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: e.active ? e.color + '20' : '#F1F5F9',
                    color: e.active ? e.color : '#94A3B8',
                    border: `1px solid ${e.active ? e.color + '40' : '#E2E8F0'}`,
                  }}
                >
                  {e.label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
