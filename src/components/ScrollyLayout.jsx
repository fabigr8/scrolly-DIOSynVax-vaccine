import { useScrollSection } from '../hooks/useScrollSection.js';
import { STORY_SECTIONS } from '../data/storyData.js';
import SectionText from './SectionText.jsx';
import StickyPanel from './StickyPanel.jsx';

export default function ScrollyLayout() {
  const sectionIds = STORY_SECTIONS.map((s) => s.id);
  const { activeId, registerRef } = useScrollSection(sectionIds);

  const activeSection = STORY_SECTIONS.find((s) => s.id === activeId) ?? STORY_SECTIONS[0];

  return (
    <section className="bg-cream-100">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-science-blue" />
          <span className="text-xs font-bold tracking-widest uppercase text-science-blue">
            The Research
          </span>
        </div>
      </div>

      {/* Two-column scrollytelling layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Mobile: stack vertically */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">

          {/* Left — scrolling text (45% on desktop) */}
          <div className="w-full md:w-[45%] md:pr-4">
            {STORY_SECTIONS.map((section) => (
              <SectionText
                key={section.id}
                section={section}
                isActive={activeId === section.id}
                registerRef={registerRef}
              />
            ))}
            {/* Bottom padding so last section can scroll to active */}
            <div className="h-[30vh]" />
          </div>

          {/* Right — sticky visualization panel (55% on desktop) */}
          <div
            className="w-full md:w-[55%] sticky-panel"
            style={{ height: '100vh', position: 'sticky', top: 0, alignSelf: 'flex-start' }}
          >
            <StickyPanel activeSection={activeSection} sections={STORY_SECTIONS} />
          </div>
        </div>
      </div>
    </section>
  );
}
