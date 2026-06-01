
import { useEffect, useState } from 'react';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';
import { BackToTop } from '@/components/ui';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatBot from '@/components/ChatBot/ChatBot';
import LangProvider from '@/components/LangProvider';

import InstitucionalBadge from '@/components/InstitucionalBadge';

import Banner     from '@/sections/Banner';
import Navbar     from '@/sections/Navbar';
import Hero       from '@/sections/Hero';
import Audiencias from '@/sections/Audiencias';
import Stats      from '@/sections/Stats';
import Hub        from '@/sections/Hub';
import Contacto   from '@/sections/Contacto';
import Footer     from '@/sections/Footer';

export default function App() {
  useAnimateOnScroll();
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isMobileChatLayout, setIsMobileChatLayout] = useState(false);

  // Eliminar el splash screen cuando React termina de montar
  useEffect(() => {
    const splash = document.getElementById('app-splash');
    if (!splash) return;
    splash.classList.add('splash-out');
    const t = window.setTimeout(() => splash.remove(), 520);
    return () => window.clearTimeout(t);
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
      {!(isMobileChatLayout && isChatBotOpen) && <WhatsAppButton />}
      <ChatBot onOpenChange={setIsChatBotOpen} />
      <InstitucionalBadge />
    </LangProvider>
  );
}
