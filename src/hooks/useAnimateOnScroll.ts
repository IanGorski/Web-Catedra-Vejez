import { useEffect } from 'react';

export function useAnimateOnScroll(): void {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []); // [] → se ejecuta solo al montar, no en cada render
}
