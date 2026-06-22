import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PHYLO_NODES, PALETTE } from '../../data/storyData.js';

const HOST_COLORS = {
  human: PALETTE.blue,
  bat:   PALETTE.amber,
  civet: PALETTE.teal,
};

const HOST_ICONS = {
  human: '👤',
  bat:   '🦇',
  civet: '🐾',
};

function toRad(deg) { return (deg * Math.PI) / 180; }
function polarToXY(cx, cy, r, angleDeg) {
  return {
    x: cx + r * Math.cos(toRad(angleDeg - 90)),
    y: cy + r * Math.sin(toRad(angleDeg - 90)),
  };
}

export default function PhyloTree() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  const CX = 200, CY = 210;
  const allBranches = [
    ...PHYLO_NODES.clade2.map((n) => ({ ...n, clade: 'clade2' })),
    ...PHYLO_NODES.clade1.map((n) => ({ ...n, clade: 'clade1' })),
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-2">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          The Sarbecovirus Family Tree
        </h3>
        <p className="text-xs text-ink-muted">
          T2_13 sits at the evolutionary center of the entire family
        </p>
      </div>

      <svg viewBox="30 20 340 380" className="w-full" style={{ maxHeight: 340 }}>
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.2" />
            <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Clade rings */}
        <circle cx={CX} cy={CY} r={95} fill="none" stroke={PALETTE.blue} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        <circle cx={CX} cy={CY} r={145} fill="none" stroke={PALETTE.amber} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />

        {/* Clade labels */}
        <text x={CX - 100} y={CY - 90} fontSize="8" fill={PALETTE.blue} fontFamily="Inter" fontWeight="600" opacity="0.7">
          Clade 2 — ACE2-binding
        </text>
        <text x={CX - 105} y={CY + 135} fontSize="8" fill={PALETTE.amber} fontFamily="Inter" fontWeight="600" opacity="0.7">
          Clade 1 — Non-ACE2
        </text>

        {/* Branch lines + nodes */}
        {allBranches.map((node, i) => {
          const pos = polarToXY(CX, CY, node.r, node.angle);
          const midR = node.r * 0.55;
          const midPos = polarToXY(CX, CY, midR, node.angle);
          const color = node.clade === 'clade2' ? HOST_COLORS[node.host] : PALETTE.amber;
          const delay = i * 0.06 + 0.2;

          return (
            <g key={node.id}>
              {/* Branch line */}
              <motion.line
                x1={CX} y1={CY}
                x2={pos.x} y2={pos.y}
                stroke={color}
                strokeWidth="1.2"
                opacity="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={revealed ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ delay, duration: 0.5, ease: 'easeOut' }}
              />
              {/* Leaf node */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={5}
                fill={color}
                opacity={0.85}
                initial={{ scale: 0 }}
                animate={revealed ? { scale: 1 } : {}}
                transition={{ delay: delay + 0.4, duration: 0.3, type: 'spring' }}
              />
              {/* Label */}
              <motion.text
                x={pos.x + (pos.x > CX ? 7 : -7)}
                y={pos.y + 3}
                textAnchor={pos.x > CX ? 'start' : 'end'}
                fontSize="7.5"
                fontFamily="Inter"
                fill={color}
                fontWeight={node.host === 'human' ? '700' : '400'}
                initial={{ opacity: 0 }}
                animate={revealed ? { opacity: 1 } : {}}
                transition={{ delay: delay + 0.5 }}
              >
                {node.id === 'SARS-CoV-2' ? '★ ' : ''}
                {node.label}
              </motion.text>
            </g>
          );
        })}

        {/* Center glow */}
        <circle cx={CX} cy={CY} r={28} fill="url(#centerGlow)" />

        {/* T2_13 center node */}
        <motion.circle
          cx={CX} cy={CY} r={22}
          fill={PALETTE.blue}
          fillOpacity="0.12"
          stroke={PALETTE.blue}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={revealed ? { scale: [0, 1.1, 1] } : {}}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
        />
        <motion.circle
          cx={CX} cy={CY} r={10}
          fill={PALETTE.blue}
          initial={{ scale: 0 }}
          animate={revealed ? { scale: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.4 }}
        />
        <motion.text
          x={CX} y={CY - 28}
          textAnchor="middle"
          fontSize="9"
          fontFamily="Inter"
          fontWeight="700"
          fill={PALETTE.blue}
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          T2_13 (Synthetic)
        </motion.text>
        <motion.text
          x={CX} y={CY + 2}
          textAnchor="middle"
          fontSize="7"
          fontFamily="Inter"
          fontWeight="700"
          fill="white"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          Center
        </motion.text>
      </svg>

      {/* Legend */}
      <div className="flex gap-5 text-xs text-ink-muted">
        {Object.entries(HOST_COLORS).map(([host, color]) => (
          <div key={host} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
            <span className="capitalize">{HOST_ICONS[host]} {host}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
