import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, Subscriber } from '../types';
import { Logo } from './Logo';
import { WhatsAppLogo } from './WhatsAppLogo';
import { useLanguage } from '../i18n/LanguageContext';
import {
  PhoneCall,
  Calculator,
  Users,
  History,
  Info,
  HelpCircle,
  Home,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Zap,
  X,
} from 'lucide-react';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000 } from '../utils/calculator';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  currentSubscriber: Subscriber | null;
  onOpenAuth: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuChange: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currentSubscriber,
  onOpenAuth,
  mobileMenuOpen,
  onMobileMenuChange,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const aboutActive = ['about', 'who-we-are', 'history'].includes(currentPage);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    onMobileMenuChange(false);
    setAboutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAboutOpen(false);
        onMobileMenuChange(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
    );
    focusables[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      hamburgerRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  const drawerTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, damping: 30, stiffness: 280 };
  const fadeTransition = reduceMotion ? { duration: 0 } : { duration: 0.2 };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    t('wa_general')
  )}`;

  const primaryItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('nav_home'), icon: <Home className="w-4 h-4" /> },
    { id: 'calculator', label: t('nav_calculator'), icon: <Calculator className="w-4 h-4" /> },
  ];

  const aboutItems: { id: NavPage; label: string; icon: React.ReactNode; hint: string }[] = [
    { id: 'about', label: t('nav_about'), icon: <Info className="w-4 h-4" />, hint: t('nav_about_hint') },
    { id: 'who-we-are', label: t('nav_who_we_are'), icon: <Users className="w-4 h-4" />, hint: t('nav_who_we_are_hint') },
    { id: 'history', label: t('nav_history'), icon: <History className="w-4 h-4" />, hint: t('nav_history_hint') },
  ];

  const helpItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: 'faq', label: t('nav_faq'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'contact', label: t('nav_contact'), icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_12px_rgba(16,40,88,0.10)] border-b border-[#E4E7EC]' : 'border-b border-[#E4E7EC]'
      }`}
    >
      {/* Brand top accent line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#102A56] via-[#155EEF] to-[#377DFF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem] gap-2 sm:gap-4">
          {/* Logo */}
          <Logo
            size="md"
            spinning={false}
            onClick={() => handleNavClick('home')}
            className="hover:opacity-90 transition min-w-0"
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {primaryItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#EEF4FF] text-[#155EEF] font-semibold'
                      : 'text-[#475467] hover:text-[#101828] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <span className="hidden xl:inline-flex">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* About Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setAboutOpen((open) => !open)}
                className={`px-2.5 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  aboutActive
                    ? 'bg-[#EEF4FF] text-[#155EEF] font-semibold'
                    : 'text-[#475467] hover:text-[#101828] hover:bg-[#F7F9FC]'
                }`}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                <Info className="w-4 h-4 hidden xl:block" />
                <span>{t('nav_about_group')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-[calc(100%+6px)] left-0 w-64 rounded-2xl bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(16,40,88,0.12)] p-2 z-50"
                  >
                    {aboutItems.map((item) => {
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-[#EEF4FF] text-[#155EEF]'
                              : 'text-[#344054] hover:bg-[#F7F9FC]'
                          }`}
                        >
                          <span className={isActive ? 'text-[#155EEF]' : 'text-[#155EEF]'}>{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold leading-tight">{item.label}</span>
                            <span className="block text-[11px] text-[#98A2B3] truncate">{item.hint}</span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {helpItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#EEF4FF] text-[#155EEF] font-semibold'
                      : 'text-[#475467] hover:text-[#101828] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <span className="hidden xl:inline-flex">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg border border-[#E4E7EC] overflow-hidden text-xs font-bold">
              <button
                onClick={() => setLang('az')}
                className={`px-2.5 py-1.5 transition cursor-pointer ${
                  lang === 'az' ? 'bg-[#155EEF] text-white' : 'bg-white text-[#475467] hover:bg-[#F7F9FC]'
                }`}
                aria-label="Azərbaycan dili"
              >
                AZ
              </button>
              <button
                onClick={() => setLang('tr')}
                className={`px-2.5 py-1.5 transition cursor-pointer ${
                  lang === 'tr' ? 'bg-[#155EEF] text-white' : 'bg-white text-[#475467] hover:bg-[#F7F9FC]'
                }`}
                aria-label="Türkçe"
              >
                TR
              </button>
            </div>

            {/* User Profile / Login */}
            <button
              onClick={onOpenAuth}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                currentSubscriber
                  ? 'bg-[#EEF4FF] text-[#155EEF] border border-[#C7D7FD]'
                  : 'btn-surface'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {currentSubscriber
                  ? currentSubscriber.name?.split(' ')[0] || t('nav_profile')
                  : t('nav_login')}
              </span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('nav_official_whatsapp')}
              className="btn-whatsapp h-10 px-3 sm:px-3.5 rounded-lg text-sm flex items-center gap-2"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white shrink-0" />
              <span className="hidden sm:inline">{WHATSAPP_PHONE}</span>
              <span className="sm:hidden font-bold">WhatsApp</span>
            </a>

            {/* Hamburger Menu Button */}
            <button
              ref={hamburgerRef}
              onClick={() => onMobileMenuChange(!mobileMenuOpen)}
              className="lg:hidden relative w-11 h-11 min-w-11 min-h-11 rounded-xl bg-[#F7F9FC] border border-[#E4E7EC] flex flex-col items-center justify-center gap-[5px] p-2 transition-all cursor-pointer hover:border-[#155EEF] hover:bg-[#EEF4FF] active:scale-95 focus-visible:outline-3 focus-visible:outline-[#155EEF]/35"
              aria-label={mobileMenuOpen ? t('nav_close') : t('nav_menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <span
                className={`w-5 h-[2px] rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-[#155EEF]' : 'bg-[#344054]'
                }`}
              />
              <span
                className={`w-5 h-[2px] rounded-full bg-[#344054] transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-[2px] rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-[#155EEF]' : 'bg-[#344054]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Drawer === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
              className="fixed inset-0 bg-[#101828]/40 backdrop-blur-sm"
              onClick={() => onMobileMenuChange(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              id="mobile-drawer"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t('nav_menu')}
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={drawerTransition}
              className="fixed top-0 right-0 bottom-0 w-[min(82vw,24rem)] max-w-sm bg-white border-l border-[#E4E7EC] shadow-[-20px_0_60px_rgba(16,40,88,0.15)] flex flex-col overflow-hidden z-10"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E7EC] bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse" />
                  <span className="text-sm font-bold text-[#101828]">IM GLOBAL TRANSFER</span>
                </div>
                <button
                  onClick={() => onMobileMenuChange(false)}
                  className="w-8 h-8 rounded-lg bg-[#F7F9FC] border border-[#E4E7EC] flex items-center justify-center text-[#475467] hover:text-[#101828] hover:bg-[#EEF4FF] cursor-pointer transition"
                  aria-label={t('nav_close')}
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none px-4 py-4 space-y-5">
                {/* Language Switcher */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F9FC] border border-[#E4E7EC]">
                  <span className="text-xs font-semibold text-[#475467] mr-auto">{t('nav_language')}</span>
                  <div className="flex items-center rounded-lg border border-[#E4E7EC] overflow-hidden text-xs font-bold">
                    <button
                      onClick={() => setLang('az')}
                      className={`px-3 py-1.5 transition cursor-pointer ${
                        lang === 'az' ? 'bg-[#155EEF] text-white' : 'bg-white text-[#475467]'
                      }`}
                    >
                      AZ
                    </button>
                    <button
                      onClick={() => setLang('tr')}
                      className={`px-3 py-1.5 transition cursor-pointer ${
                        lang === 'tr' ? 'bg-[#155EEF] text-white' : 'bg-white text-[#475467]'
                      }`}
                    >
                      TR
                    </button>
                  </div>
                </div>

                {/* Live Rate Mini Card */}
                <div className="p-4 rounded-xl bg-[#EEF4FF] border border-[#C7D7FD] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#475467] font-medium flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#155EEF]" />
                      <span>{t('nav_live_rate')}</span>
                    </span>
                    <span className="text-[#155EEF] font-mono text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-[#C7D7FD]">
                      {t('nav_active')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-white border border-[#E4E7EC]">
                      <div className="text-[10px] text-[#98A2B3]">1,000 ₺ (TRY)</div>
                      <div className="text-sm font-bold text-[#101828] tabular-nums">
                        {RATE_STANDARD_PER_1000.toFixed(2)} ₼
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-[#C7D7FD]">
                      <div className="text-[10px] text-[#155EEF]">31k+ VIP ⭐</div>
                      <div className="text-sm font-bold text-[#155EEF] tabular-nums">
                        {RATE_VIP_PER_1000.toFixed(2)} ₼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#98A2B3] font-bold px-1 pb-1">
                    {t('nav_main_nav')}
                  </p>
                  {primaryItems.map((item, i) => {
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={reduceMotion ? { duration: 0 } : { delay: i * 0.03, duration: 0.18 }}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                          isActive
                            ? 'bg-[#EEF4FF] text-[#155EEF] border border-[#C7D7FD]'
                            : 'text-[#344054] hover:bg-[#F7F9FC] border border-transparent'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#98A2B3] font-bold px-1 pb-1">
                    {t('nav_leadership')}
                  </p>
                  {aboutItems.map((item, i) => {
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={reduceMotion ? { duration: 0 } : { delay: (i + 2) * 0.03, duration: 0.18 }}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                          isActive
                            ? 'bg-[#EEF4FF] text-[#155EEF] border border-[#C7D7FD]'
                            : 'text-[#344054] hover:bg-[#F7F9FC] border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[#155EEF]">{item.icon}</span>
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </motion.button>
                    );
                  })}
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#98A2B3] font-bold px-1 pb-1">
                    {t('nav_support')}
                  </p>
                  {helpItems.map((item, i) => {
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={reduceMotion ? { duration: 0 } : { delay: (i + 5) * 0.03, duration: 0.18 }}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                          isActive
                            ? 'bg-[#EEF4FF] text-[#155EEF] border border-[#C7D7FD]'
                            : 'text-[#344054] hover:bg-[#F7F9FC] border border-transparent'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA Strip */}
              <div className="shrink-0 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] border-t border-[#E4E7EC] space-y-2 bg-white">
                <button
                  onClick={() => { onMobileMenuChange(false); onOpenAuth(); }}
                  className="w-full btn-surface py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#155EEF]" />
                  <span>{currentSubscriber ? `${t('nav_profile')}: ${currentSubscriber.name}` : t('nav_enter_subscribe')}</span>
                </button>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-whatsapp py-3 px-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 text-center leading-snug"
                >
                  <WhatsAppLogo className="w-4 h-4 fill-white" />
                  <span>{t('nav_official_whatsapp')}: {WHATSAPP_PHONE}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
