import React from 'react';
import { NavPage, Subscriber, WHATSAPP_RAW_NUMBER } from '../types';
import { WhatsAppLogo } from './WhatsAppLogo';
import { Calculator, Home, Menu, UserCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MobileBottomNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenAuth: () => void;
  onOpenMenu: () => void;
  currentSubscriber: Subscriber | null;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
  onOpenMenu,
  currentSubscriber,
}) => {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(t('wa_nav'))}`;

  const itemClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 min-w-0 flex-1 py-1 min-h-11 text-[11px] font-semibold transition-all cursor-pointer ${
      active ? 'text-[#155EEF]' : 'text-[#475467] hover:text-[#101828]'
    }`;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/98 backdrop-blur-xl border-t border-[#E4E7EC] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(16,40,88,0.08)]">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        <button className={itemClass(currentPage === 'home')} onClick={() => onNavigate('home')}>
          <Home className="w-5 h-5" />
          <span>{t('mobile_home')}</span>
        </button>
        <button
          className={itemClass(currentPage === 'calculator')}
          onClick={() => onNavigate('calculator')}
        >
          <Calculator className="w-5 h-5" />
          <span>{t('mobile_calc')}</span>
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
          aria-label={t('mobile_wa')}
        >
          <span className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(37,211,102,0.28)] flex items-center justify-center border-4 border-white group-active:scale-[0.98] transition-transform">
            <WhatsAppLogo className="w-6 h-6" />
          </span>
          <span className="text-[10px] font-bold text-[#128C7E] mt-0.5">{t('mobile_wa')}</span>
        </a>
        <button className={itemClass(Boolean(currentSubscriber))} onClick={onOpenAuth}>
          <UserCheck className="w-5 h-5" />
          <span>{currentSubscriber ? t('mobile_profile') : t('mobile_login')}</span>
        </button>
        <button className={itemClass(false)} onClick={onOpenMenu} aria-label={t('mobile_menu')}>
          <Menu className="w-5 h-5" />
          <span>{t('mobile_menu')}</span>
        </button>
      </div>
    </nav>
  );
};
