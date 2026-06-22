import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell, LabelList,
} from 'recharts';
import { NEUTRALIZATION_DATA, PALETTE } from '../../data/storyData.js';

const TYPE_COLORS = {
  human: PALETTE.blue,
  bat:   PALETTE.amber,
};

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const item = NEUTRALIZATION_DATA.find((d) => d.shortLabel === label);
    return (
      <div className="bg-white border border-cream-200 rounded-xl p-3 shadow-xl text-xs max-w-[200px]">
        <div className="font-bold text-ink mb-1">{item?.virus?.replace('\n', ' ')}</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: PALETTE.blue }} />
          <span className="text-ink-muted">T2_17:</span>
          <span className="font-bold" style={{ color: PALETTE.blue }}>
            {payload.find(p => p.dataKey === 't2_17')?.value.toFixed(1)} log₁₀IC₅₀
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="text-ink-muted">PBS control:</span>
          <span className="font-bold text-ink-muted">
            {payload.find(p => p.dataKey === 'pbs')?.value.toFixed(1)} log₁₀IC₅₀
          </span>
        </div>
        <div className="text-ink-faint border-t border-cream-200 pt-1">
          p = {item?.pValue} · Host: {item?.type}
        </div>
      </div>
    );
  }
  return null;
};

export default function NeutralizationChart() {
  const [highlight, setHighlight] = useState(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-ink mb-1">
          Broad Cross-Neutralization by T2_17
        </h3>
        <p className="text-xs text-ink-muted max-w-xs">
          Rabbit sera after 4th immunization · log₁₀IC₅₀ values
        </p>
      </div>

      <div className="w-full" style={{ height: 290 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={NEUTRALIZATION_DATA.map((d) => ({ ...d, label: d.shortLabel }))}
            margin={{ top: 10, right: 24, left: -8, bottom: 16 }}
            barGap={2}
            barCategoryGap="30%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EDE9DF" vertical={false} />
            <XAxis
              dataKey="shortLabel"
              tick={{ fontSize: 10, fontFamily: 'Inter', fill: '#475569' }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              domain={[0, 4.5]}
              ticks={[0, 1, 2, 3, 4]}
              tick={{ fontSize: 10, fontFamily: 'Inter', fill: '#475569' }}
              axisLine={false}
              tickLine={false}
              label={{
                value: 'log₁₀IC₅₀',
                angle: -90,
                position: 'insideLeft',
                offset: 14,
                style: { fontSize: 9, fill: '#94A3B8', fontFamily: 'Inter' },
              }}
            />
            <Tooltip content={<CUSTOM_TOOLTIP />} cursor={{ fill: '#EFF6FF', radius: 4 }} />

            {/* PBS (baseline/control) bars */}
            <Bar dataKey="pbs" name="PBS control" fill="#CBD5E1" radius={[3, 3, 0, 0]}>
              {NEUTRALIZATION_DATA.map((entry) => (
                <Cell key={entry.shortLabel} fill="#CBD5E1" />
              ))}
            </Bar>

            {/* T2_17 bars */}
            <Bar
              dataKey="t2_17"
              name="T2_17"
              radius={[4, 4, 0, 0]}
              animationBegin={200}
              animationDuration={1000}
            >
              {NEUTRALIZATION_DATA.map((entry) => (
                <Cell
                  key={entry.shortLabel}
                  fill={TYPE_COLORS[entry.type]}
                  opacity={highlight === null || highlight === entry.shortLabel ? 1 : 0.35}
                  onMouseEnter={() => setHighlight(entry.shortLabel)}
                  onMouseLeave={() => setHighlight(null)}
                />
              ))}
            </Bar>

            {/* Reference line: significance threshold */}
            <ReferenceLine
              y={2}
              stroke={PALETTE.green}
              strokeDasharray="5 4"
              strokeWidth={1.5}
              label={{
                value: '— Neutralizing threshold',
                position: 'insideTopRight',
                offset: -4,
                style: { fontSize: 8, fill: PALETTE.green, fontFamily: 'Inter' },
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + note */}
      <div className="w-full max-w-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: PALETTE.blue }} />
              <span className="text-ink-muted">Human virus</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: PALETTE.amber }} />
              <span className="text-ink-muted">Bat virus</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-slate-300" />
              <span className="text-ink-muted">PBS control</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-faint leading-snug">
          Values are approximate representative medians consistent with described statistical
          significance (all p ≤ 0.0002, Fig. 3h). All 8 comparisons significant.
        </p>
      </div>
    </div>
  );
}
