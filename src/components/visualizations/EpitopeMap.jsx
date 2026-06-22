import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EPITOPE_REGIONS, PALETTE } from '../../data/storyData.js';

function EpitopeRegionBlob({ region, isHovered, onClick }) {
  return (
    <motion.g
      onClick={() => onClick(region.id)}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Glow ring when hovered */}
      {isHovered && (
        <motion.circle
          cx={region.cx}
          cy={region.cy}
          r={region.r + 10}
          fill="none"
          stroke={region.color}
          strokeWidth="2"
          opacity="0.4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
        />
      )}
      {/* Main epitope blob */}
      <motion.circle
        cx={region.cx}
        cy={region.cy}
        r={region.r}
        fill={region.color}
        fillOpacity={isHovered ? 0.85 : 0.5}
        stroke={region.color}
        strokeWidth="2"
        animate={{
          fillOpacity: isHovered ? 0.85 : 0.5,
          r: isHovered ? region.r + 2 : region.r,
        }}
        transition={{ duration: 0.25 }}
      />
      {/* Residue dots inside */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 72 * Math.PI) / 180;
        const dr = region.r * 0.48;
        return (
          <circle
            key={i}
            cx={region.cx + dr * Math.cos(angle)}
            cy={region.cy + dr * Math.sin(angle)}
            r={3}
            fill="white"
            opacity={0.6}
          />
        );
      })}
      {/* Label */}
      <text
        x={region.cx}
        y={region.cy + 4}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fontFamily="Inter"
        fill="white"
      >
        {region.id}
      </text>
    </motion.g>
  );
}

export default function EpitopeMap() {
  const [selected, setSelected] = useState(null);

  const toggle = (id) => setSelected((prev) => (prev === id ? null : id));
  const activeRegion = EPITOPE_REGIONS.find((r) => r.id === selected);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          The RBD Epitope Landscape
        </h3>
        <p className="text-xs text-ink-muted">
          Tap an epitope region to learn more · From Fig. 1b of the paper
        </p>
      </div>

      {/* SVG protein surface */}
      <div className="w-full max-w-sm">
        <svg viewBox="60 60 280 220" className="w-full" style={{ maxHeight: 220 }}>
          {/* Protein surface blob */}
          <ellipse cx="200" cy="170" rx="140" ry="100" fill="#F0F7FF" stroke="#BFDBFE" strokeWidth="1.5" />
          {/* Interior gradient hint */}
          <ellipse cx="200" cy="165" rx="100" ry="70" fill="#DBEAFE" opacity="0.4" />

          {/* ACE2 receptor hint at edge */}
          <motion.rect
            x="315" y="155" width="30" height="32" rx="6"
            fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5"
            animate={{ x: [315, 320, 315] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x="330" y="169" textAnchor="middle" fontSize="7" fill="#059669" fontFamily="Inter" fontWeight="700">ACE2</text>
          <text x="330" y="179" textAnchor="middle" fontSize="6.5" fill="#059669" fontFamily="Inter">receptor</text>

          {/* Connection line to B38 */}
          <motion.line
            x1="315" y1="170" x2="303" y2="170"
            stroke="#059669" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Conservation gradient label */}
          <defs>
            <linearGradient id="conservGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={PALETTE.red} />
              <stop offset="100%" stopColor={PALETTE.blue} />
            </linearGradient>
          </defs>
          <text x="68" y="78" fontSize="8" textAnchor="start" fill={PALETTE.muted} fontFamily="Inter">Variable</text>
          <text x="330" y="78" fontSize="8" textAnchor="end" fill={PALETTE.muted} fontFamily="Inter">Conserved</text>
          <rect x="68" y="82" width="262" height="4" rx="2" fill="url(#conservGrad)" opacity="0.6" />

          {/* Epitope regions */}
          {EPITOPE_REGIONS.map((region) => (
            <EpitopeRegionBlob
              key={region.id}
              region={region}
              isHovered={selected === region.id}
              onClick={toggle}
            />
          ))}
        </svg>
      </div>

      {/* Info card for selected epitope */}
      <AnimatePresence mode="wait">
        {activeRegion ? (
          <motion.div
            key={activeRegion.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm rounded-2xl p-4 border"
            style={{
              background: activeRegion.color + '10',
              borderColor: activeRegion.color + '50',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                style={{ background: activeRegion.color }}
              >
                {activeRegion.id}
              </div>
              <div>
                <div className="font-semibold text-ink text-sm">{activeRegion.label}</div>
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: activeRegion.color }}
                >
                  {activeRegion.subtitle}
                </div>
                <p className="text-xs text-ink-muted leading-snug">
                  {activeRegion.description}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <div className="flex justify-center gap-6 text-xs">
              {EPITOPE_REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => toggle(r.id)}
                  className="flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                  <span>{r.id}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-ink-faint mt-2">← Tap an epitope</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
