import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollProvider, useScrollSystem } from './context/ScrollContext';
import MascotCanvas from './components/Mascot/MascotCanvas';
import ConversationPanel from './components/UI/ConversationPanel';
import MascotGuidanceBubble from './components/UI/MascotGuidanceBubble';
import SignatureHeader from './components/UI/SignatureHeader';
import FullscreenMenu from './components/UI/FullscreenMenu';
import SearchModal from './components/UI/SearchModal';
import gsap from 'gsap';

// Lazy-loaded visual chapters
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Process = lazy(() => import('./pages/Process'));
const Materials = lazy(() => import('./pages/Materials'));
const Insights = lazy(() => import('./pages/Insights'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const WhyRightcon = lazy(() => import('./pages/WhyRightcon'));
const Technology = lazy(() => import('./pages/Technology'));
const ClientJourney = lazy(() => import('./pages/ClientJourney'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-charcoal text-white font-mono text-[9px] tracking-[0.25em] uppercase select-none">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 border border-accent border-t-transparent animate-spin"></div>
        <span>LOADING DESIGN SYSTEMS // TELEMETRY SETUP</span>
      </div>
    </div>
  );
}

function MainJourney() {
  const { isMobile, menuOpen, setMenuOpen, searchOpen, setSearchOpen } = useScrollSystem();
  const containerRef = useRef();

  // Mouse trail for custom luxury cursor
  const cursorDotRef = useRef();
  const cursorGlowRef = useRef();

  useEffect(() => {
    // Custom cursor movement handler
    const moveCursor = (e) => {
      if (isMobile) return;
      
      const { clientX, clientY } = e;
      
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: clientX - 8,
          y: clientY - 8,
          duration: 0.1,
          ease: "power2.out"
        });
      }
      
      if (cursorGlowRef.current) {
        gsap.to(cursorGlowRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-charcoal overflow-x-hidden selection:bg-accent selection:text-charcoal" ref={containerRef}>
      
      {/* 1. Custom Editorial Cursor (Desktop Only) */}
      {!isMobile && (
        <>
          <div 
            ref={cursorDotRef} 
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference"
          ></div>
          <div 
            ref={cursorGlowRef} 
            className="custom-cursor-glow"
          ></div>
        </>
      )}

      {/* 2. Global Signature Header & Fullscreen Menu */}
      <SignatureHeader onOpenMenu={() => setMenuOpen(true)} />
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* 3. 3D WebGL Canvas Overlay (Renders immediately) */}
      <MascotCanvas />

      {/* 4. Conversational AI Panel Interface */}
      <ConversationPanel />
      <MascotGuidanceBubble />

      {/* 5. Dynamic Page Router Switch */}
      <main className="relative z-10 w-full flex flex-col">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/process" element={<Process />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/why-rightcon" element={<WhyRightcon />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/client-journey" element={<ClientJourney />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollProvider>
        <MainJourney />
      </ScrollProvider>
    </BrowserRouter>
  );
}
