import { useRef } from 'react';
import { motion } from 'framer-motion';

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
      </motion.div>
    </div>
  );
}
