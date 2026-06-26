import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const parseMarkdown = (text) =>
  text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });

export default function SectionText({ section, isActive, registerRef }) {
  const ref = useRef(null);
  const [imgOpen, setImgOpen] = useState(false);

  const setRef = (node) => {
    ref.current = node;
    registerRef(section.id, node);
  };

  return (
    <div
      ref={setRef}
      data-section-id={section.id}
      className="min-h-[90vh] flex items-center py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {/* Section number */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: isActive ? '#1D4ED8' : '#94A3B8' }}
          >
            {section.num}
          </span>
          <div
            className="h-px flex-1 max-w-[40px] transition-all duration-500"
            style={{ background: isActive ? '#1D4ED8' : '#CBD5E1' }}
          />
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight mb-2">
          {section.title}
        </h2>
        <p className="text-sm font-medium text-ink-muted uppercase tracking-wider mb-7">
          {section.subtitle}
        </p>

        {/* Body paragraphs */}
        <div className="space-y-4">
          {section.body.map((para, i) => (
            <p key={i} className="text-base md:text-lg text-ink-soft leading-relaxed">
              {parseMarkdown(para)}
            </p>
          ))}
        </div>

        {/* Callout stat */}
        {section.callout && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 p-5 rounded-2xl border border-blue-100 bg-blue-50"
          >
            <div className="font-display text-4xl font-black text-science-blue leading-none mb-1">
              {section.callout.value}
            </div>
            <div className="text-sm text-ink-muted leading-snug">
              {section.callout.label}
            </div>
          </motion.div>
        )}

        {/* Popup image trigger */}
        {section.popupImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6"
          >
            <button
              onClick={() => setImgOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 text-sm font-semibold text-science-blue shadow-sm group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2M9 12l2 2 4-4" />
              </svg>
              View Virus Structure Diagram
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {imgOpen && section.popupImage && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={() => setImgOpen(false)}
          >
            <motion.div
              key="lightbox-panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-6xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={section.popupImage.src}
                alt={section.popupImage.caption}
                className="w-full h-auto block"
              />
              {section.popupImage.caption && (
                <div className="absolute bottom-0 inset-x-0 px-5 py-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-xs text-white/80 leading-snug">{section.popupImage.caption}</p>
                </div>
              )}
              <button
                onClick={() => setImgOpen(false)}
                aria-label="Close diagram"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
