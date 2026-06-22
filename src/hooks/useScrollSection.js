import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useScrollSection
 * Tracks which story section is currently in the viewport using
 * IntersectionObserver. Returns the active section ID and a ref
 * registry function to register section DOM nodes.
 */
export function useScrollSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  const registerRef = useCallback((id, node) => {
    if (node) sectionRefs.current[id] = node;
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.dataset.sectionId);
        }
      });
    }, options);

    const refs = sectionRefs.current;
    Object.entries(refs).forEach(([, node]) => {
      if (node) observerRef.current.observe(node);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sectionIds]);

  return { activeId, registerRef };
}

/**
 * useWindowSize — tracks viewport dimensions
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
