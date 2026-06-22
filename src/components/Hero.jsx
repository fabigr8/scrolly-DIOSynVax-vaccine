import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Animated SARS-CoV-2 particle using SVG + CSS
function VirusParticle({ size = 240, className = '' }) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Lipid membrane */}
      <circle cx="120" cy="120" r="72" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="2" />
      {/* Inner nucleocapsid */}
      <circle cx="120" cy="120" r="42" fill="#FECACA" opacity="0.5" />
      {/* RNA strands */}
      <path d="M100 100 Q120 110 140 100 Q120 90 100 100Z" fill="#F87171" opacity="0.6" />
      <path d="M105 120 Q120 130 135 120 Q120 110 105 120Z" fill="#EF4444" opacity="0.5" />
      <path d="M110 140 Q120 148 130 140 Q120 132 110 140Z" fill="#F87171" opacity="0.4" />

      {/* Spike proteins — radially distributed */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const innerR = 72;
        const outerR = 108;
        const x1 = 120 + innerR * Math.cos(angle);
        const y1 = 120 + innerR * Math.sin(angle);
        const x2 = 120 + outerR * Math.cos(angle);
        const y2 = 120 + outerR * Math.sin(angle);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            {/* S protein head (trimeric knob) */}
            <circle cx={x2} cy={y2} r="7" fill="#DC2626" />
            <circle cx={x2 - 4} cy={y2 - 3} r="3.5" fill="#EF4444" />
            <circle cx={x2 + 4} cy={y2 - 3} r="3.5" fill="#EF4444" />
          </g>
        );
      })}

      {/* RBD label */}
      <text x="168" y="68" fontSize="8" fill="#991B1B" fontFamily="Inter" fontWeight="600">
        RBD
      </text>
      <line x1="158" y1="70" x2="140" y2="78" stroke="#991B1B" strokeWidth="0.8" />
    </svg>
  );
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream-100">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29,78,216,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gradient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Floating virus particles */}
      <motion.div
        className="absolute top-16 right-12 opacity-20"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <VirusParticle size={180} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-8 opacity-10"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <VirusParticle size={130} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tags — two papers */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-science-blue">
            <span className="inline-block w-2 h-2 rounded-full bg-science-blue animate-pulse" />
            Nature Biomedical Engineering · 2023
          </span>
          <span className="text-ink-faint text-xs">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-science-amber">
            <span className="inline-block w-2 h-2 rounded-full bg-science-amber" />
            Phase I Trial · Journal of Infection · 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl font-black leading-tight text-ink mb-6"
        >
          The Vaccine That{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-science-blue">Sees the Future</span>
            <motion.span
              className="absolute -inset-1 rounded-lg bg-science-blue opacity-10 -z-0"
              animate={{ opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Scientists built a computationally designed antigen — engineered from the evolutionary
          family tree of all known sarbecoviruses — that neutralizes viruses before they even emerge.
        </motion.p>

        {/* Author / source lines */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 text-xs text-ink-faint mb-12">
          <span>Vishwanath et al. · University of Cambridge · DIOSynVax Ltd. · Insilico Design — <em>Nat. Biomed. Eng.</em> 2023</span>
          <span>Munro et al. · University of Cambridge · DIOSynVax Ltd. · Phase I Clinical Trial Results — <em>Journal of Infection</em> 2026</span>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 text-ink-muted"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
