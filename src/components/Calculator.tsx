import React, { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  calculateExchange, 
  buildWhatsAppExchangeUrl, 
  RATE_STANDARD_PER_1000, 
  RATE_VIP_PER_1000, 
  MIN_TL_AMOUNT,
} from '../utils/calculator';
import { 
  ArrowRightLeft, 
  AlertTriangle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Banknote,
  Receipt,
  Zap,
} from 'lucide-react';
import { WHATSAPP_PHONE, FOUNDER_NAME } from '../types';
import { WhatsAppLogo } from './WhatsAppLogo';

interface CalculatorProps {
  initialAmount?: number;
  initialFrom?: 'TRY' | 'AZN';
  initialTo?: 'TRY' | 'AZN';
  className?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({
  initialAmount = 5000,
  initialFrom = 'TRY',
  initialTo = 'AZN',
  className = '',
}) => {
  const { t } = useLanguage();
  const [fromAmount, setFromAmount] = useState<number>(initialAmount);
  const [fromCurrency, setFromCurrency] = useState<'TRY' | 'AZN'>(initialFrom);
  const [toCurrency, setToCurrency] = useState<'TRY' | 'AZN'>(initialTo);
  const [copied, setCopied] = useState(false);

  // Exact exchange calculation (TRY ⇄ AZN only)
  const calc = useMemo(() => {
    return calculateExchange(fromAmount, fromCurrency, toCurrency);
  }, [fromAmount, fromCurrency, toCurrency]);

  const selectDirection = (from: 'TRY' | 'AZN') => {
    if (from === 'TRY') {
      setFromCurrency('TRY');
      setToCurrency('AZN');
      if (fromAmount < MIN_TL_AMOUNT || fromAmount === 100) {
        setFromAmount(5000);
      }
    } else {
      setFromCurrency('AZN');
      setToCurrency('TRY');
      if (fromAmount > 2000) {
        setFromAmount(100);
      }
    }
  };

  const handleSwapCurrencies = () => {
    if (fromCurrency === 'TRY') {
      selectDirection('AZN');
    } else {
      selectDirection('TRY');
    }
  };

  const presetAmountsTRY = [
    { label: '1,000 ₺ (Min)', value: 1000 },
    { label: '3,000 ₺', value: 3000 },
    { label: '5,000 ₺', value: 5000 },
    { label: '10,000 ₺', value: 10000 },
    { label: '20,000 ₺', value: 20000 },
    { label: '31,000 ₺ (VIP ⭐)', value: 31000 },
    { label: '50,000 ₺', value: 50000 },
  ];

  const presetAmountsAZN = [
    { label: '34 ₼ (=1k ₺)', value: 34 },
    { label: '100 ₼', value: 100 },
    { label: '200 ₼', value: 200 },
    { label: '500 ₼', value: 500 },
    { label: '1,000 ₼', value: 1000 },
    { label: '2,000 ₼', value: 2000 },
  ];

  const handleCopySummary = () => {
    const text = `MIHValyuta.com (${FOUNDER_NAME}) Valyuta Hesablaması:\n• İstiqamət: ${calc.fromCurrency === 'TRY' ? t('dir_tr_az_title') : t('dir_az_tr_title')}\n• Göndərilən: ${calc.fromAmount.toLocaleString('az-AZ')} ${calc.fromCurrency}\n• Məzənnə: ${calc.rateDescription}\n• Komissiya: ${calc.commissionTL} ₺ (Hər 1,000 ₺-yə 20 ₺)\n• Xalis Alınacaq: ~${calc.receivedAmount.toLocaleString('az-AZ', { minimumFractionDigits: 2 })} ${calc.toCurrency}\n• İcraat: 5-15 dəqiqə\n• Əlaqə WhatsApp: ${WHATSAPP_PHONE}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const whatsappUrl = buildWhatsAppExchangeUrl(calc);

  // VIP Threshold progress calculation
  const vipThreshold = 31000;
  const isVipEligible = fromCurrency === 'TRY' && fromAmount >= vipThreshold;
  const vipProgressPercent = fromCurrency === 'TRY' ? Math.min(100, Math.round((fromAmount / vipThreshold) * 100)) : 0;
  const remainingForVip = Math.max(0, vipThreshold - fromAmount);

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl bg-white border border-[#E4E7EC] shadow-[0_12px_32px_rgba(16,42,86,0.08)] p-4 sm:p-6 md:p-8 space-y-6 ${className}`}
    >
      {/* Precision Neon Top Edge Accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl sm:rounded-t-3xl bg-[#155EEF]" />

      {/* Terminal Title & Copy Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E7EC]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FD] text-[#155EEF] text-xs font-bold mb-1 font-mono">
            <span className="live-dot" />
            <span className="tracking-wide">{t('calc_badge')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#101828] tracking-tight">{t('calc_h2')}</h2>
        </div>

        <button
          onClick={handleCopySummary}
          className="self-start sm:self-auto btn-dark-elevated px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#155EEF]" />
              <span className="text-[#155EEF] font-bold">{t('calc_copied')}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#475467]" />
              <span>{t('calc_copy')}</span>
            </>
          )}
        </button>
      </div>

      {/* Step 1: Direction Segmented Switcher */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#475467] uppercase tracking-wider">{t('calc_direction_label')}</label>
          <button
            type="button"
            onClick={handleSwapCurrencies}
            className="btn-dark-elevated text-xs text-[#155EEF] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#C7D7FD] cursor-pointer"
          >
            <ArrowRightLeft className="w-3 h-3 text-[#155EEF]" />
            <span>{t('calc_swap')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card: TRY -> AZN */}
          <button
            type="button"
            onClick={() => selectDirection('TRY')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative ${
              fromCurrency === 'TRY'
                ? 'bg-[#EEF4FF] border-[#155EEF] shadow-[0_4px_16px_rgba(21,94,239,0.10)] ring-1 ring-[#155EEF]/25'
                : 'bg-[#F7F9FC] border-[#E4E7EC] hover:border-[#C7D7FD] text-[#475467]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇹🇷</span>
                <span className="text-[#475467] font-bold">➔</span>
                <span className="text-2xl">🇦🇿</span>
              </div>
              {fromCurrency === 'TRY' && (
                <span className="px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#155EEF] text-[10px] font-bold border border-[#C7D7FD] font-mono">
                  SEÇİLDİ
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-[#101828]">{t('dir_tr_az_title')}</div>
            <div className="text-xs font-mono font-bold text-[#155EEF] mt-1 tabular-nums">
              1,000 ₺ = 33.10 ₼
            </div>
            <div className="text-[11px] text-[#475467] mt-0.5">{t('calc_vip_for')}<span className="text-[#102A56] font-bold">33.50 ₼ VIP ⭐</span>
            </div>
          </button>

          {/* Card: AZN -> TRY */}
          <button
            type="button"
            onClick={() => selectDirection('AZN')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative ${
              fromCurrency === 'AZN'
                ? 'bg-[#EEF4FF] border-[#155EEF] shadow-[0_4px_16px_rgba(21,94,239,0.10)] ring-1 ring-[#155EEF]/25'
                : 'bg-[#F7F9FC] border-[#E4E7EC] hover:border-[#C7D7FD] text-[#475467]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇦🇿</span>
                <span className="text-[#475467] font-bold">➔</span>
                <span className="text-2xl">🇹🇷</span>
              </div>
              {fromCurrency === 'AZN' && (
                <span className="px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#155EEF] text-[10px] font-bold border border-[#C7D7FD] font-mono">
                  SEÇİLDİ
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-[#101828]">{t('dir_az_tr_title')}</div>
            <div className="text-xs font-mono font-bold text-[#155EEF] mt-1 tabular-nums">
              34 ₼ = 1,000 ₺
            </div>
            <div className="text-[11px] text-[#475467] mt-0.5">{t('calc_azn_direct')}</div>
          </button>
        </div>
      </div>

      {/* Step 2: Amount Entry Box */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[#475467] uppercase tracking-wider block">{t('calc_amount_label')}</label>

        {/* Input Box with Nested Dark Layer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC] focus-within:border-[#155EEF] transition-all space-y-2">
          <div className="flex items-center justify-between text-xs text-[#475467]">
            <span className="font-semibold text-[#101828]">
              {fromCurrency === 'TRY' ? '🇹🇷 Türk Lirəsi (₺)' : '🇦🇿 Azərbaycan Manatı (₼)'}
            </span>
            <span className="font-mono text-[#155EEF] bg-[#EEF4FF] px-2 py-0.5 rounded font-bold border border-[#C7D7FD]">
              {fromCurrency === 'TRY' ? t('calc_min_try') : t('calc_min_azn')}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={fromAmount === 0 ? '' : fromAmount}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setFromAmount(isNaN(val) ? 0 : val);
              }}
              placeholder={fromCurrency === 'TRY' ? '5000' : '200'}
              className="w-full bg-transparent text-3xl sm:text-4xl md:text-5xl font-black text-[#101828] focus:outline-none font-mono tracking-tight tabular-nums placeholder-[#98A2B3]"
            />
            <div className="shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#EEF4FF] border border-[#E4E7EC] text-[#101828] font-bold text-xs sm:text-base font-mono">
              {fromCurrency === 'TRY' ? '₺ TRY' : '₼ AZN'}
            </div>
          </div>
        </div>

        {/* VIP Threshold Meter (Only for TRY) */}
        {fromCurrency === 'TRY' && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#EEF4FF] border border-[#E4E7EC] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#101828]">
                <Sparkles className="w-3.5 h-3.5 text-[#102A56]" />
                <span>{t('calc_vip_label')}</span>
              </span>
              {isVipEligible ? (
                <span className="text-[#155EEF] font-bold font-mono text-[11px] bg-[#EEF4FF] px-2 py-0.5 rounded border border-[#C7D7FD]">{t('calc_vip_active')}</span>
              ) : (
                <span className="text-[#475467] font-mono text-[11px]">
                  Qalır: <strong className="text-[#101828]">{remainingForVip.toLocaleString('az-AZ')} ₺</strong>
                </span>
              )}
            </div>

            <div className="h-2 w-full rounded-full bg-[#F7F9FC] overflow-hidden border border-[#E4E7EC]">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isVipEligible ? 'bg-[#155EEF]' : 'bg-[#93C5FD]'
                }`}
                style={{ width: `${vipProgressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Minimum 1,000 TL Alert */}
        {fromCurrency === 'TRY' && fromAmount > 0 && fromAmount < MIN_TL_AMOUNT && (
          <div className="p-3.5 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#D92D20] mt-0.5" />
            <div>
              <strong className="block font-bold text-[#102A56]">{t('calc_min_alert_title')}</strong>
              <span className="text-[12px] opacity-90">{t('calc_min_alert_desc')}</span>
            </div>
          </div>
        )}

        {/* Presets Row */}
        <div className="space-y-1.5">
          <div className="text-[11px] text-[#475467] font-medium">{t('calc_presets')}</div>
          <div className="flex flex-wrap gap-2">
            {(fromCurrency === 'TRY' ? presetAmountsTRY : presetAmountsAZN).map((preset) => {
              const isSelected = fromAmount === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setFromAmount(preset.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#155EEF] text-white shadow-sm'
                      : 'bg-[#EEF4FF] hover:bg-[#1c2432] text-[#101828] border border-[#E4E7EC]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 3: Financial Receipt Breakdown */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[#475467] uppercase tracking-wider block flex items-center gap-1.5">
          <Receipt className="w-3.5 h-3.5 text-[#155EEF]" />
          <span>{t('calc_receipt_label')}</span>
        </label>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC] space-y-3 shadow-inner">
          {/* Rate Row */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E7EC] text-xs sm:text-sm">
            <div>
              <span className="text-[#475467] font-medium">Tətbiq Edilən Məzənnə:</span>
              <span className="block text-[11px] text-[#475467]/70 mt-0.5">{calc.rateDescription}</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-[#101828] text-sm sm:text-base tabular-nums">
                {fromCurrency === 'TRY'
                  ? `1,000 ₺ = ${calc.appliedRatePer1000.toFixed(2)} ₼`
                  : `34 ₼ = 1,000 ₺`}
              </span>
              {calc.isVipTier && (
                <span className="block text-[11px] text-[#102A56] font-bold">{t('calc_vip_rate')}</span>
              )}
            </div>
          </div>

          {/* Commission Row */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E7EC] text-xs sm:text-sm">
            <div>
              <span className="text-[#475467] font-medium">Xidmət Komissiyası:</span>
              <span className="block text-[11px] text-[#475467]/70 mt-0.5">{t('hero_commission_value')}</span>
            </div>
            <div className="text-right font-mono font-bold text-[#155EEF] text-sm sm:text-base tabular-nums">
              <span>{calc.commissionTL.toLocaleString('az-AZ')} ₺</span>
            </div>
          </div>

          {/* Final Payout Amount Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div>
              <span className="text-sm sm:text-base font-extrabold text-[#101828] block">
                {toCurrency === 'AZN' ? t('calc_payout_azn') : t('calc_payout_try')}
              </span>
              <span className="text-xs text-[#155EEF] flex items-center gap-1 font-semibold mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('calc_speed')}</span>
              </span>
            </div>

            <div className="text-left sm:text-right">
              {calc.isValidMin ? (
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#155EEF] font-mono tracking-tight block tabular-nums">
                  ~{calc.receivedAmount.toLocaleString('az-AZ', { minimumFractionDigits: 2 })} {calc.toCurrency === 'AZN' ? '₼' : '₺'}
                </span>
              ) : (
                <span className="text-xs text-[#D92D20] font-mono font-bold">{t('calc_min_required')}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: WhatsApp Action Button */}
      <div className="pt-1">
        {calc.isValidMin ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-whatsapp-premium py-4 px-6 rounded-2xl text-base sm:text-lg font-black shadow-xl flex items-center justify-center cursor-pointer"
          >
            <WhatsAppLogo className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0 mr-2.5" />
            <span>{t('calc_wa_btn')}</span>
            <span className="hidden md:inline ml-3 bg-black/25 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
              {WHATSAPP_PHONE}
            </span>
          </a>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC] text-[#475467] font-bold text-sm cursor-not-allowed">
            <AlertTriangle className="w-4 h-4 text-[#102A56]" />
            <span>{t('calc_wa_disabled')}</span>
          </div>
        )}
      </div>

      {/* Trust & Guarantee Bottom Seal */}
      <div className="pt-2 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#475467]">
        <div className="flex items-center gap-2 text-[#155EEF] font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('calc_guarantee')}</span>
        </div>
        <div className="flex items-center gap-2 text-[#475467] font-mono text-[11px]">
          <span>Birbank</span> • <span>Kapital</span> • <span>ABB</span> • <span>Ziraat</span> • <span>İş Bankası</span>
        </div>
      </div>
    </div>
  );
};
