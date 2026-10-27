import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  History, 
  Calendar, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface HistoryPageProps {
  onNavigate: (page: NavPage) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Xidmətləriniz haqqında ətraflı məlumat almaq istəyirəm.`
  )}`;

  const milestones = [
    {
      year: '2018',
      title: t('history_m1_title'),
      desc: t('history_m1_desc'),
    },
    {
      year: '2020',
      title: t('history_m2_title'),
      desc: t('history_m2_desc'),
    },
    {
      year: '2022',
      title: t('history_m3_title'),
      desc: t('history_m3_desc'),
    },
    {
      year: '2024–2026',
      title: t('history_m4_title'),
      desc: t('history_m4_desc'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F9FC] border border-[#E4E7EC] text-[#155EEF] text-xs font-semibold">
          <span>🇹🇷</span>
          <span>{FOUNDER_NAME} — {SLOGAN}</span>
          <span>🇦🇿</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#102A56] tracking-tight">
          Fəaliyyət İlləri &{' '}
          <span className="text-[#155EEF]">{t('history_h1_our')}</span>
        </h1>
        <p className="text-[#475467] text-xs sm:text-base leading-relaxed">{t('history_intro')}</p>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-4xl mx-auto space-y-6">
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E4E7EC] space-y-2.5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-[#EEF4FF] text-[#155EEF] font-mono font-bold text-xs sm:text-sm border border-[#C7D7FD]">
                {item.year}
              </span>
              <span className="text-[#027A48] text-xs font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('history_done')}</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#102A56] pt-1">{item.title}</h3>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E4E7EC] text-center space-y-4 max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-[#102A56]">{t('history_cta_h')}</h3>
        <p className="text-xs sm:text-sm text-[#667085] max-w-lg mx-auto">{t('history_cta_desc')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#155EEF] text-white font-bold text-xs sm:text-sm hover:bg-[#1d4ed8] transition cursor-pointer"
          >{t('about_cta_calc')}</button>
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba59] transition cursor-pointer"
          >
            <WhatsAppLogo className="w-4 h-4 fill-white" />
            <span>WhatsApp: {WHATSAPP_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
