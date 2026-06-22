import { AnimatePresence, motion } from 'framer-motion';
import VariantChase from './visualizations/VariantChase.jsx';
import AntibodyDonut from './visualizations/AntibodyDonut.jsx';
import EpitopeMap from './visualizations/EpitopeMap.jsx';
import PhyloTree from './visualizations/PhyloTree.jsx';
import GlycanMask from './visualizations/GlycanMask.jsx';
import NeutralizationChart from './visualizations/NeutralizationChart.jsx';
import Summary from './visualizations/Summary.jsx';
import PhaseOneResults from './visualizations/PhaseOneResults.jsx';

const VIZ_MAP = {
  variantChase:     VariantChase,
  antibodyDonut:    AntibodyDonut,
  epitopeMap:       EpitopeMap,
  phyloTree:        PhyloTree,
  glycanMask:       GlycanMask,
  neutralization:   NeutralizationChart,
  summary:          Summary,
  phaseOneResults:  PhaseOneResults,
};

const slideVariants = {
  enter: (dir) => ({
    opacity: 0,
    y: dir >= 0 ? 40 : -40,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    y: dir >= 0 ? -40 : 40,
    scale: 0.96,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
};

export default function StickyPanel({ activeSection, sections }) {
  const activeIdx = sections.findIndex((s) => s.id === activeSection?.id);
  const vizKey = activeSection?.vizKey ?? 'variantChase';
  const VizComponent = VIZ_MAP[vizKey] ?? VIZ_MAP.variantChase;

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center p-4 md:p-8">
      {/* Panel card */}
      <div className="viz-card w-full h-full max-h-[88vh] flex flex-col overflow-hidden">
        {/* Top bar with section indicator */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-cream-200">
          {sections.map((s, i) => (
            <div
              key={s.id}
              className="progress-dot w-2 h-2 rounded-full bg-cream-300 transition-all duration-300"
              style={{
                backgroundColor: s.id === activeSection?.id ? '#1D4ED8' : '#CBD5E1',
                transform: s.id === activeSection?.id ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
          <span className="ml-auto text-xs text-ink-faint font-medium">
            {activeSection?.num ?? '—'} / 07
          </span>
        </div>

        {/* Visualization area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={activeIdx}>
            <motion.div
              key={vizKey}
              custom={activeIdx}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <VizComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom annotation */}
        <div className="px-5 py-3 border-t border-cream-200">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSection?.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-xs text-ink-faint text-center"
            >
              {activeSection?.subtitle ?? 'Scroll to explore the research'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
