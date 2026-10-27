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
        <div className="relative bg-white border border-[#E4E7EC] text-[#101828] text-xs py-2 px-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 max-w-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-1.5 -left-1.5 bg-[#EEF4FF] text-[#475467] hover:text-[#101828] rounded-full p-0.5 border border-[#E4E7EC] cursor-pointer"
            title={t('nav_close')}
          >
            <X className="w-3 h-3" />
          </button>
          <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping shrink-0" />
          <div>
            <div className="font-bold text-[#155EEF] flex items-center gap-1.5">
              <span>{t('wa_live')}</span>
              <span className="text-[9px] bg-[#EEF4FF] text-[#155EEF] px-1.5 py-0.2 rounded font-mono font-bold">24/7</span>
            </div>
            <div className="text-[11px] text-[#101828] font-mono font-bold">{WHATSAPP_PHONE}</div>
          </div>
        </div>
      )}

      {/* WhatsApp Circular Button */}
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('guarantee_btn')}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#128C7E] hover:bg-[#25D366] text-white shadow-[0_8px_24px_rgba(18,140,126,0.28)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#C7D7FD]"
        title={`WhatsApp ilə əlaqə: ${WHATSAPP_PHONE}`}
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute -inset-1 rounded-full bg-[#00F5D4] opacity-25 animate-ping -z-10 group-hover:opacity-50" />
        <WhatsAppLogo className="w-7 h-7 fill-white" />
        {/* Status dot */}
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00F5D4] border-2 border-[#07090D]" />
      </a>
    </div>
  );
};
