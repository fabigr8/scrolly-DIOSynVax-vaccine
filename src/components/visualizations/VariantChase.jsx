import { motion } from 'framer-motion';
import { VARIANTS_DATA, PALETTE } from '../../data/storyData.js';

const VARIANT_POSITIONS = [
  { cx: 180, cy: 200, r: 52 },
  { cx: 290, cy: 140, r: 44 },
  { cx: 380, cy: 220, r: 40 },
  { cx: 140, cy: 300, r: 36 },
  { cx: 340, cy: 310, r: 60 },
  { cx: 230, cy: 340, r: 68 },
];

function VariantBubble({ variant, pos, delay }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Outer pulse ring */}
      <motion.circle
        cx={pos.cx}
        cy={pos.cy}
        r={pos.r}
        fill="none"
        stroke={variant.color}
        strokeWidth="1.5"
        opacity="0.3"
        animate={{ r: [pos.r, pos.r + 12, pos.r], opacity: [0.3, 0.05, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay + 0.5 }}
      />
      {/* Main bubble */}
      <circle
        cx={pos.cx}
        cy={pos.cy}
        r={pos.r}
        fill={variant.color}
        fillOpacity="0.15"
        stroke={variant.color}
        strokeWidth="1.5"
      />
      {/* Mutation dots inside */}
      {Array.from({ length: Math.min(variant.mutationsInRBD, 8) }).map((_, i) => {
        const angle = (i * (360 / Math.min(variant.mutationsInRBD, 8)) * Math.PI) / 180;
        const mr = pos.r * 0.5;
        return (
          <motion.circle
            key={i}
            cx={pos.cx + mr * Math.cos(angle)}
            cy={pos.cy + mr * Math.sin(angle)}
            r={3}
            fill={variant.color}
            opacity={0.7}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: delay + i * 0.1 }}
          />
        );
      })}
      {/* Label */}
      <text
        x={pos.cx}
        y={pos.cy - 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="Inter"
        fill={variant.color}
      >
        {variant.label}
      </text>
      <text
        x={pos.cx}
        y={pos.cy + 10}
        textAnchor="middle"
        fontSize="9"
        fontFamily="Inter"
        fill={PALETTE.muted}
      >
        {variant.date}
      </text>
      <text
        x={pos.cx}
        y={pos.cy + 22}
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="Inter"
        fill={variant.color}
        fontWeight="600"
      >
        {variant.mutationsInRBD} RBD mut.
      </text>
    </motion.g>
  );
}

export default function VariantChase() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="text-center px-4">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          SARS-CoV-2 Variant Explosion
        </h3>
        <p className="text-xs text-ink-muted">
          Each bubble = a Variant of Concern · Size ∝ RBD mutations
        </p>
      </div>

      <svg
        viewBox="60 80 440 350"
        className="w-full max-w-lg"
        style={{ maxHeight: '360px' }}
        aria-label="Variant bubbles chart"
      >
        {/* Background grid */}
        {[100, 150, 200, 250, 300, 350].map((y) => (
          <line key={y} x1="60" y1={y} x2="500" y2={y} stroke="#EDE9DF" strokeWidth="0.5" />
        ))}

        {/* Timeline arrow */}
        <line x1="80" y1="390" x2="480" y2="390" stroke="#CBD5E1" strokeWidth="1.5" />
        <polygon points="480,387 487,390 480,393" fill="#CBD5E1" />
        <text x="80" y="405" fontSize="9" fill={PALETTE.muted} fontFamily="Inter">2020</text>
        <text x="440" y="405" fontSize="9" fill={PALETTE.muted} fontFamily="Inter">2023</text>

        {VARIANTS_DATA.map((v, i) => (
          <VariantBubble
            key={v.label}
            variant={v}
            pos={VARIANT_POSITIONS[i]}
            delay={i * 0.18}
          />
        ))}

        {/* Wuhan origin */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <circle cx="100" cy="190" r="18" fill={PALETTE.faint} fillOpacity="0.3" stroke={PALETTE.faint} strokeWidth="1" />
          <text x="100" y="187" textAnchor="middle" fontSize="8" fill={PALETTE.muted} fontFamily="Inter" fontWeight="600">Wuhan</text>
          <text x="100" y="198" textAnchor="middle" fontSize="7" fill={PALETTE.muted} fontFamily="Inter">Jan 2020</text>
        </motion.g>

        {/* Connecting arrows from Wuhan to variants */}
        {VARIANT_POSITIONS.map((pos, i) => {
          const dx = pos.cx - 100;
          const dy = pos.cy - 190;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / dist;
          const uy = dy / dist;
          const x1 = 100 + 18 * ux;
          const y1 = 190 + 18 * uy;
          const x2 = pos.cx - pos.r * ux;
          const y2 = pos.cy - pos.r * uy;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={VARIANTS_DATA[i].color}
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.45"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-ink-muted px-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: PALETTE.amber }} />
          <span>Moderate escape</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: PALETTE.red }} />
          <span>High escape</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: PALETTE.purple }} />
          <span>Severe immune escape</span>
        </div>
      </div>
    </div>
  );
}
