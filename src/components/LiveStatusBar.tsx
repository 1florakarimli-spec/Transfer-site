import React, { useEffect, useState } from 'react';
import { Subscriber } from '../types';
import { RATE_TRY_TO_AZN_STANDARD, RATE_TRY_TO_AZN_VIP, RATE_AZN_TO_TRY } from '../utils/calculator';
import { Sparkles, UserCheck, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LiveStatusBarProps {
  currentSubscriber: Subscriber | null;
  onOpenAuth: () => void;
}

export const LiveStatusBar: React.FC<LiveStatusBarProps> = ({
  currentSubscriber,
  onOpenAuth,
}) => {
  const { lang, t } = useLanguage();
  const [bakuTime, setBakuTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setBakuTime(
        now.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'az-AZ', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <div className="bg-[#102A56] border-b border-[#155EEF]/30 text-xs py-2 px-3 sm:px-6 select-none relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-0.5">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold text-[10px] sm:text-[11px] shrink-0">
            <span className="live-dot" />
            <span className="tracking-wide">{t('bar_live')}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-white/70 text-[11px] shrink-0 pl-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('bar_baku_time')}:</span>
            <span className="text-white font-semibold tabular-nums">{bakuTime}</span>
          </div>

          <div className="h-3 w-px bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-[11px] text-white shrink-0 font-mono">
            <span className="inline-flex items-center text-[#93C5FD]">
              TR <ArrowRight className="w-3 h-3 mx-0.5" /> AZ
            </span>
            <span className="text-white/60">1,000 ₺ =</span>
            <span className="font-bold text-white tabular-nums">
              {RATE_TRY_TO_AZN_STANDARD.toFixed(2)} ₼
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#155EEF]/30 px-3 py-1 rounded-lg border border-[#377DFF]/40 text-white shrink-0 font-mono">
            <span className="inline-flex items-center gap-1 font-bold text-[#C7D7FD]">
              <Sparkles className="w-3 h-3" />
              <span>{t('bar_vip_label')}:</span>
            </span>
            <span className="font-black tabular-nums">
              {RATE_TRY_TO_AZN_VIP.toFixed(2)} ₼
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-[11px] text-white shrink-0 font-mono">
            <span className="text-white/60">{t('bar_from_baku')}</span>
            <span className="font-bold tabular-nums">
              {RATE_AZN_TO_TRY.toFixed(0)} ₼ = 1,000 ₺
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-white/70 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 shrink-0 font-mono">
            <span>{t('bar_commission')}:</span>
            <span className="font-bold text-white">{t('bar_commission_value')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden md:flex items-center gap-1 text-[11px] text-white/80">
            <ShieldCheck className="w-3.5 h-3.5 text-[#12B76A]" />
            <span>{t('bar_guarantee')}</span>
          </div>

          {currentSubscriber ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-white/15 border border-white/20 px-3 py-1 rounded-full text-white font-bold text-[11px] cursor-pointer hover:bg-white/25 transition min-h-8"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px]">
                {currentSubscriber.name || currentSubscriber.phone || currentSubscriber.email}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-white text-[#155EEF] px-3 py-1 rounded-full font-semibold text-[11px] cursor-pointer hover:bg-[#EEF4FF] transition min-h-8"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('bar_login')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
