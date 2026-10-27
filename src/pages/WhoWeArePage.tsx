import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  Globe,
  Headphones,
  Sparkles
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface WhoWeArePageProps {
  onNavigate: (page: NavPage) => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com) komandası! Sizə sualım var.`
  )}`;

  const teamDepartments = [
    {
      title: t('who_d1_title'),
      desc: t('who_d1_desc'),
      icon: <Briefcase className="w-5 h-5 text-[#155EEF]" />,
      members: t('who_d1_members'),
    },
    {
      title: t('who_d2_title'),
      desc: t('who_d2_desc'),
      icon: <Globe className="w-5 h-5 text-[#027A48]" />,
      members: t('who_d2_members'),
    },
    {
      title: t('who_d3_title'),
      desc: t('who_d3_desc'),
      icon: <Headphones className="w-5 h-5 text-teal-400" />,
      members: t('who_d3_members'),
    },
    {
      title: t('who_d4_title'),
      desc: t('who_d4_desc'),
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      members: t('who_d4_members'),
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
          Biz Kimik?{' '}
          <span className="text-[#155EEF]">{t('who_h1_highlight')}</span>
        </h1>
        <p className="text-[#475467] text-xs sm:text-base leading-relaxed">{t('who_desc')}</p>
      </div>

      {/* Founder Profile Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E4E7EC] space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#155EEF] p-1 shrink-0 shadow-xl">
            <div className="w-full h-full rounded-full bg-[#F7F9FC] flex items-center justify-center font-bold text-xl sm:text-2xl text-[#155EEF]">
              İM
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A6F4C5] text-[#027A48] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('who_founder_badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              {FOUNDER_NAME}
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed max-w-2xl">{t('who_founder_quote')}<strong>{SLOGAN}</strong>{t('who_founder_quote_end')}</p>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] tracking-tight">{t('who_depts_h')}</h2>
          <p className="text-[#667085] text-xs sm:text-sm">{t('who_depts_desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {teamDepartments.map((dept, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E4E7EC] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-[#F7F9FC] w-fit">
                  {dept.icon}
                </div>
                <span className="text-[11px] font-mono text-[#667085] bg-[#F7F9FC] px-2.5 py-1 rounded-md">
                  {dept.members}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#102A56]">{dept.title}</h3>
              <p className="text-xs text-[#667085] leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
