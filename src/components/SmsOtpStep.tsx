import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ShieldCheck } from 'lucide-react';
import { formatPhoneDisplay } from '../utils/phone';

interface SmsOtpStepProps {
  phone: string;
  code: string;
  onCodeChange: (value: string) => void;
  onResend: () => void;
  resendBusy: boolean;
  retryAfterSec: number;
}

export const SmsOtpStep: React.FC<SmsOtpStepProps> = ({
  phone,
  code,
  onCodeChange,
  onResend,
  resendBusy,
  retryAfterSec,
}) => {
  const { t } = useLanguage();
  return (
    <div>
      <label className="block text-xs font-semibold text-[#101828] mb-1">{t('otp_label')}<span className="text-[#D92D20]">*</span>
      </label>
      <div className="relative">
        <ShieldCheck className="w-4 h-4 text-[#475467] absolute left-3.5 top-3.5" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          maxLength={8}
          value={code}
          onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, '').slice(0, 8))}
          placeholder={t('otp_ph')}
          className="input-field w-full pl-10 pr-4 py-3 text-sm font-mono tracking-[0.28em]"
        />
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <p className="text-[11px] text-[#475467]">
          {t('otp_sent_to', { phone: formatPhoneDisplay(phone) })}
        </p>
        <button
          type="button"
          disabled={resendBusy || retryAfterSec > 0}
          onClick={onResend}
          className="text-[11px] font-semibold text-[#155EEF] hover:text-[#155EEF]/80 disabled:text-[#475467]/50 disabled:cursor-not-allowed cursor-pointer"
        >
          {retryAfterSec > 0 ? t('otp_resend_in', { n: retryAfterSec }) : t('otp_resend')}
        </button>
      </div>
    </div>
  );
};
