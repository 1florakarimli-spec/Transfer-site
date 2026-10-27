import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Clock, 
  ArrowRight,
  Building2
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Xidmətləriniz haqqında məlumat almaq istəyirəm.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F9FC] border border-[#E4E7EC] text-[#155EEF] text-xs font-semibold">
          <span>🇹🇷</span>
          <span>{FOUNDER_NAME} — {SLOGAN}</span>
          <span>🇦🇿</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#102A56] tracking-tight">
          Türkiyə və Azərbaycan Arasında{' '}
          <span className="text-[#155EEF]">{t('about_h1_highlight')}</span>
        </h1>
        <p className="text-[#475467] text-xs sm:text-base leading-relaxed">{t('about_desc')}</p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E7EC] space-y-3.5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#155EEF] flex items-center justify-center border border-[#C7D7FD]">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#102A56]">{t('about_mission_h')}</h2>
          <p className="text-[#475467] text-xs sm:text-sm leading-relaxed">{t('about_mission_desc')}</p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E7EC] space-y-3.5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#027A48] flex items-center justify-center border border-emerald-500/20">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#102A56]">{t('about_vision_h')}</h2>
          <p className="text-[#475467] text-xs sm:text-sm leading-relaxed">{t('about_vision_desc')}</p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] tracking-tight">{t('about_principles_h')}</h2>
          <p className="text-[#667085] text-xs sm:text-sm">{t('about_principles_desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] space-y-2.5">
            <div className="p-2 rounded-lg bg-[#EEF4FF] text-[#155EEF] w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A56]">{t('about_p1_h')}</h3>
            <p className="text-[#667085] text-xs leading-relaxed">{t('about_p1_desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] space-y-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-[#027A48] w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A56]">{t('about_p2_h')}</h3>
            <p className="text-[#667085] text-xs leading-relaxed">{t('about_p2_desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] space-y-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A56]">{t('about_p3_h')}</h3>
            <p className="text-[#667085] text-xs leading-relaxed">{t('about_p3_desc')}</p>
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E4E7EC] text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#102A56]">{t('about_cta_h')}</h3>
        <p className="text-xs sm:text-sm text-[#667085] max-w-lg mx-auto">{t('about_cta_desc')}</p>
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
            <span>{t('guarantee_btn')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
