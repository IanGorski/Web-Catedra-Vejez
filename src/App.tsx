
import { lazy, Suspense, useEffect, useState } from 'react';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { BackToTop } from '@/components/ui';
import LangProvider from '@/components/LangProvider';

import Banner     from '@/sections/Banner';
import Navbar     from '@/sections/Navbar';
import Hero       from '@/sections/Hero';
import Audiencias from '@/sections/Audiencias';
import Stats      from '@/sections/Stats';
import Hub        from '@/sections/Hub';
import Contacto   from '@/sections/Contacto';
import Footer     from '@/sections/Footer';

const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));
const ChatBot = lazy(() => import('@/components/ChatBot/ChatBot'));
const InstitucionalBadge = lazy(() => import('@/components/InstitucionalBadge'));

export default function App() {
  useAnimateOnScroll();
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isMobileChatLayout, setIsMobileChatLayout] = useState(false);
  const [shouldRenderDeferred, setShouldRenderDeferred] = useState(false);

  // Eliminar el splash screen cuando React termina de montar
  useEffect(() => {
    const splash = document.getElementById('app-splash');
    if (!splash) return;

    if (window.matchMedia('(max-width: 767px)').matches) {
      splash.remove();
      return;
    }

    splash.classList.add('splash-out');
    const t = window.setTimeout(() => splash.remove(), 220);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const enableDeferred = () => setShouldRenderDeferred(true);
    const timerId = window.setTimeout(enableDeferred, 1200);

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
    events.forEach((eventName) => {
      window.addEventListener(eventName, enableDeferred, { once: true, passive: true });
    });

    return () => {
      window.clearTimeout(timerId);
      events.forEach((eventName) => {
        window.removeEventListener(eventName, enableDeferred);
      });
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 599px)');
    const syncViewport = (event?: MediaQueryListEvent) => {
      setIsMobileChatLayout(event ? event.matches : mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  return (
    <LangProvider>
      {/* Link invisible para saltar al contenido */}
      <a className="skip-link" href="#inicio">Saltar al contenido</a>
      {/* Barra de progreso de scroll */}
      <div className="scroll-progress" aria-hidden="true" />
      <Banner />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Audiencias />
        <Stats />
        <Hub />
        <Contacto />
      </main>
      <Footer />
      {!(isMobileChatLayout && isChatBotOpen) && <BackToTop />}
      {shouldRenderDeferred && (
        <Suspense fallback={null}>
          {!(isMobileChatLayout && isChatBotOpen) && <WhatsAppButton />}
          <ChatBot onOpenChange={setIsChatBotOpen} />
          <InstitucionalBadge />
        </Suspense>
      )}
    </LangProvider>
  );
}
