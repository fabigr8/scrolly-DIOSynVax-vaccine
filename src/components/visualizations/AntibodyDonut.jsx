import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ANTIBODY_DATA, PALETTE } from '../../data/storyData.js';

function AnimatedCounter({ target, duration = 1400 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <span>{count}</span>;
}

const CUSTOM_TOOLTIP = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-cream-200 rounded-xl px-4 py-3 shadow-lg text-sm">
        <div className="font-semibold text-ink">{payload[0].name.replace('\n', ' ')}</div>
        <div className="text-science-blue font-bold text-lg">{payload[0].value}%</div>
      </div>
    );
  }
  return null;
};

export default function AntibodyDonut() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="text-center px-4">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          Where Your Antibodies Actually Go
        </h3>
        <p className="text-xs text-ink-muted">
          Of antibodies generated against the full-length spike protein
        </p>
      </div>

      {/* Donut chart */}
      <div className="relative w-full" style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ANTIBODY_DATA}
              cx="50%"
              cy="50%"
              innerRadius="52%"
              outerRadius="74%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              animationBegin={100}
              animationDuration={1200}
              onMouseEnter={(_, index) => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {ANTIBODY_DATA.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  opacity={hovered === null || hovered === index ? 1 : 0.4}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CUSTOM_TOOLTIP />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="font-display text-4xl font-black text-science-blue leading-none">
            <AnimatedCounter target={16} duration={1200} />%
          </div>
          <div className="text-xs text-ink-muted font-medium mt-0.5">RBD-directed</div>
        </div>
      </div>

      {/* Legend cards */}
      <div className="flex flex-col gap-3 w-full max-w-xs px-4">
        {ANTIBODY_DATA.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: d.color + '14', border: `1.5px solid ${d.color}30` }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: d.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink leading-tight">
                {d.name.replace('\n', ' ')}
              </div>
            </div>
            <div
              className="font-display text-2xl font-black"
              style={{ color: d.color }}
            >
              {d.value}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* Source note */}
      <p className="text-xs text-ink-faint text-center px-6 max-w-xs">
        Source: Voss et al., Science 2021 — cited in paper Discussion.
      </p>
    </div>
  );
}
