import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface FaqPageProps {
  onNavigate: (page: NavPage) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    t('wa_faq')
  )}`;

  const faqs = [
    {
      q: t('faq_q1'),
      a: t('faq_a1'),
    },
    {
      q: t('faq_q2'),
      a: t('faq_a2'),
    },
    {
      q: t('faq_q3'),
      a: t('faq_a3'),
    },
    {
      q: t('faq_q4'),
      a: t('faq_a4'),
    },
    {
      q: t('faq_q5'),
      a: t('faq_a5'),
    },
    {
      q: t('faq_q6'),
      a: t('faq_a6'),
    },
    {
      q: t('faq_q7'),
      a: t('faq_a7'),
    },
    {
      q: t('faq_q8'),
      a: t('faq_a8'),
    },
    {
      q: t('faq_q9'),
      a: t('faq_a9'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F9FC] border border-[#E4E7EC] text-[#155EEF] text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-[#155EEF]" />
          <span>{t('faq_badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102A56] tracking-tight">{t('faq_h1')}</h1>
        <p className="text-[#475467] text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">{t('faq_desc')}</p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#E4E7EC] overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#102A56] hover:text-[#155EEF] transition cursor-pointer gap-4"
              >
                <span>{faq.q}</span>
                <span className="p-1 rounded-lg bg-[#F7F9FC] text-[#667085] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#475467] leading-relaxed border-t border-[#E4E7EC] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E7EC] text-center space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-[#102A56]">{t('faq_no_answer_h')}</h3>
        <p className="text-xs sm:text-sm text-[#667085] max-w-md mx-auto">{t('faq_no_answer_desc')}</p>
        <div>
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <WhatsAppLogo className="w-4 h-4 fill-white" />
            <span>WhatsApp ilə Sual Ver: {WHATSAPP_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
