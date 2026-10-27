import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER } from '../types';
import { WhatsAppLogo } from './WhatsAppLogo';
import { X } from 'lucide-react';

export const WhatsAppFloatingWidget: React.FC = () => {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    t('wa_widget')
  )}`;

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-2 pointer-events-auto">
      {/* Popover Bubble */}
      {showTooltip && (
        <div className="relative bg-white border border-[#E4E7EC] text-[#101828] text-xs py-2.5 pl-3 pr-3.5 rounded-xl shadow-[0_8px_24px_rgba(16,42,86,0.12)] flex items-center gap-2.5 max-w-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-2 -left-2 w-5 h-5 bg-white text-[#475467] hover:text-[#101828] rounded-full border border-[#E4E7EC] cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#155EEF]"
            aria-label={t('nav_close')}
          >
            <X className="w-3 h-3" />
          </button>
          <span className="w-2 h-2 rounded-full bg-[#12B76A] shrink-0" />
          <div>
            <div className="font-semibold text-[#102A56] flex items-center gap-1.5">
              <span>{t('wa_live')}</span>
              <span className="text-[10px] bg-[#ECFDF5] text-[#027A48] px-1.5 py-0.5 rounded font-semibold">24/7</span>
            </div>
            <div className="text-[11px] text-[#475467] font-medium tabular-nums">{WHATSAPP_PHONE}</div>
          </div>
        </div>
      )}

      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('guarantee_btn')}: ${WHATSAPP_PHONE}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_16px_rgba(37,211,102,0.28)] hover:bg-[#1DAA53] active:scale-[0.98] transition-colors duration-150 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <WhatsAppLogo className="w-7 h-7" />
      </a>
    </div>
  );
};
