import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Calculator } from '../components/Calculator';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN, Subscriber } from '../types';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Zap, 
  Award, 
  Percent, 
  Check 
} from 'lucide-react';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000, RATE_AZN_TO_TRY } from '../utils/calculator';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
  onOpenAuth: () => void;
  currentSubscriber: Subscriber | null;
}

interface RecentTransfer {
  id: string;
  from: string;
  to: string;
  amount: string;
  payout: string;
  bankPair: string;
  timeAgo: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAuth,
  currentSubscriber,
}) => {
  const { t } = useLanguage();
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    t('wa_exchange')
  )}`;

  const azerbaijanBanks = [
    { name: 'Kapital Bank (Birbank)', status: t('banks_status_24') },
    { name: 'PAŞA Bank', status: t('banks_status_24') },
    { name: 'ABB (Beynəlxalq Bank)', status: t('banks_status_24') },
    { name: 'Leobank (Unibank)', status: t('banks_status_24') },
    { name: 'AccessBank', status: t('banks_status_active') },
    { name: 'Bank Respublika', status: t('banks_status_active') },
  ];

  const turkeyBanks = [
    { name: 'Ziraat Bankası', status: t('banks_status_fast') },
    { name: 'Türkiye İş Bankası', status: t('banks_status_fast') },
    { name: 'Garanti BBVA', status: t('banks_status_fast') },
    { name: 'Vakıf Katılım / VakıfBank', status: t('banks_status_fast') },
    { name: 'YapıKredi', status: t('banks_status_fast') },
    { name: 'QNB Finansbank', status: t('banks_status_fast') },
  ];

  const recentTransfers: RecentTransfer[] = [
    { id: '1', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '8,000 ₺', payout: '264.80 ₼', bankPair: 'Ziraat ➔ Birbank', timeAgo: '2 dəq əvvəl' },
    { id: '2', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '35,000 ₺ (VIP)', payout: '1,172.50 ₼', bankPair: 'İş Bankası ➔ PAŞA Bank', timeAgo: '6 dəq əvvəl' },
    { id: '3', from: '🇦🇿 Bakı', to: '🇹🇷 Türkiyə', amount: '102 ₼', payout: '3,000 ₺', bankPair: 'Birbank ➔ Garanti BBVA', timeAgo: '11 dəq əvvəl' },
    { id: '4', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '15,000 ₺', payout: '496.50 ₼', bankPair: 'VakıfBank ➔ ABB', timeAgo: '17 dəq əvvəl' },
    { id: '5', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '50,000 ₺ (VIP)', payout: '1,675.00 ₼', bankPair: 'YapıKredi ➔ Leobank', timeAgo: '24 dəq əvvəl' },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 py-4 sm:py-10">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Brand Statement & Authentic Value Proposition */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Founder Seal Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#E4E7EC] text-[#155EEF] text-xs font-bold shadow-md">
              <span className="text-sm">🇹🇷</span>
              <span className="tracking-wide text-[#101828]">{FOUNDER_NAME} — <span className="text-[#155EEF]">{SLOGAN}</span></span>
              <span className="text-sm">🇦🇿</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#102A56] tracking-tight leading-[1.15]">
                {t('hero_h1_line1')}{' '}
                <span className="block text-[#155EEF]">{t('hero_h1_line2')}</span>
              </h1>
              <p className="text-[#475467] text-sm sm:text-base leading-relaxed">{t('hero_desc')} <strong className="text-[#101828] font-semibold">{t('hero_desc_bold')}</strong> {t('hero_desc_end')}</p>
            </div>

            {/* Official Conditions Terminal Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E7EC] space-y-3.5 shadow-2xl">
              <div className="text-[11px] font-bold text-[#101828] uppercase tracking-wider flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
                <div className="flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 text-[#155EEF]" />
                  <span>{t('hero_rates_title')}</span>
                </div>
                <span className="text-[#155EEF] font-mono text-[10px] bg-[#EEF4FF] px-2 py-0.5 rounded border border-[#C7D7FD] font-bold">{t('hero_rates_badge')}</span>
              </div>

              {/* Rate 1 */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <span className="text-[#475467] font-semibold flex items-center gap-2 min-w-0">
                  <span>🇹🇷➔🇦🇿</span>
                  <span className="text-[#101828]">{t('hero_rate1_label')}</span>
                </span>
                <span className="font-mono font-bold text-[#155EEF] bg-[#F7F9FC] px-3 py-1 rounded-lg border border-[#E4E7EC] tabular-nums shrink-0">
                  1,000 ₺ = {RATE_STANDARD_PER_1000.toFixed(2)} ₼
                </span>
              </div>

              {/* Rate 2 VIP */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#102A56] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#102A56]" />
                  <span>{t('hero_rate2_label')}</span>
                </span>
                <span className="font-mono font-black text-[#102A56] bg-[#EEF4FF] px-3 py-1 rounded-lg border border-[#C7D7FD] tabular-nums">
                  1,000 ₺ = {RATE_VIP_PER_1000.toFixed(2)} ₼ ⭐
                </span>
              </div>

              {/* Rate 3 */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#475467] font-semibold flex items-center gap-2">
                  <span>🇦🇿➔🇹🇷</span>
                  <span className="text-[#101828]">{t('hero_rate3_label')}</span>
                </span>
                <span className="font-mono font-bold text-[#155EEF] bg-[#F7F9FC] px-3 py-1 rounded-lg border border-[#E4E7EC] tabular-nums">
                  34 ₼ = 1,000 ₺
                </span>
              </div>

              {/* Transparent Commission & Limit */}
              <div className="pt-2 border-t border-[#E4E7EC] flex items-center justify-between text-xs font-mono">
                <span className="text-[#475467]">{t('hero_commission_label')}:</span>
                <span className="font-bold text-[#155EEF]">{t('hero_commission_value')}</span>
              </div>

              <div className="text-[11px] text-[#475467] bg-[#EEF4FF] p-2.5 rounded-xl border border-[#E4E7EC] text-center font-medium">
                <strong className="text-[#101828]">{t('hero_min_note')}:</strong> {t('hero_min_desc')}</div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 btn-whatsapp-premium py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center cursor-pointer"
              >
                <WhatsAppLogo className="w-5 h-5 fill-white shrink-0 mr-2" />
                <span>WhatsApp: {WHATSAPP_PHONE}</span>
              </a>

              {!currentSubscriber && (
                <button
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto btn-dark-elevated py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-[#155EEF]" />
                  <span>{t('hero_login_btn')}</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-left">
              <div className="p-3 rounded-xl bg-white border border-[#E4E7EC]">
                <div className="text-lg sm:text-xl font-black text-[#155EEF] font-mono tabular-nums">100%</div>
                <div className="text-[10px] sm:text-[11px] text-[#475467] mt-0.5">{t('bar_guarantee')}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E4E7EC]">
                <div className="text-lg sm:text-xl font-black text-[#102A56] font-mono tabular-nums">5–15 Dəq</div>
                <div className="text-[10px] sm:text-[11px] text-[#475467] mt-0.5">{t('hero_metric_speed')}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E4E7EC]">
                <div className="text-lg sm:text-xl font-black text-[#155EEF] font-mono tabular-nums">20 ₺</div>
                <div className="text-[10px] sm:text-[11px] text-[#475467] mt-0.5">{t('hero_metric_fee')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Calculator */}
          <div className="lg:col-span-7">
            <Calculator />
          </div>
        </div>
      </section>

      {/* 2. Live Transfer Activity Feed (Real-time proof) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#E4E7EC]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#12B76A]"></span>
              </span>
              <span className="text-xs font-bold text-[#101828] tracking-wide uppercase font-mono">{t('feed_ticker')}</span>
            </div>
            <span className="text-[11px] text-[#475467] font-mono">
              Orta icraat müddəti: <strong className="text-[#155EEF]">{t('feed_avg_value')}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-3">
            {recentTransfers.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white border border-[#E4E7EC] space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#475467] font-medium">{item.from} ➔ {item.to}</span>
                  <span className="text-[#155EEF] font-mono text-[10px] bg-[#EEF4FF] px-1.5 py-0.5 rounded border border-[#C7D7FD] font-bold">{t('feed_confirmed')}</span>
                </div>
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-xs font-bold text-[#101828]">{item.amount}</span>
                  <span className="text-xs font-bold text-[#155EEF]">{item.payout}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#475467] pt-1 border-t border-[#E4E7EC]">
                  <span>{item.bankPair}</span>
                  <span className="font-mono">{item.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Transparent Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#E4E7EC] text-[#155EEF] text-xs font-bold">
            <Percent className="w-3.5 h-3.5" />
            <span>{t('comp_why')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101828] tracking-tight">{t('comp_h2')}</h2>
          <p className="text-[#475467] text-xs sm:text-sm">{t('comp_desc')}</p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white border border-[#E4E7EC] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F7F9FC] text-[#475467] font-semibold border-b border-[#E4E7EC]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">{t('comp_col1')}</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#155EEF] bg-[#EEF4FF] border-x border-[#C7D7FD] font-bold">{t('comp_col2')}</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#475467]">{t('comp_col3')}</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#475467]">{t('comp_col4')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC] text-[#475467]">
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#101828]">{t('comp_row1')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#155EEF] bg-[#EEF4FF] border-x border-[#C7D7FD] font-mono">
                    ⚡ 5 – 15 Dəqiqə (Kartdan-karta)
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">{t('comp_speed_bank')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">{t('comp_speed_trad')}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#101828]">{t('hero_commission_label')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#101828] bg-[#EEF4FF] border-x border-[#C7D7FD] font-mono">{t('hero_commission_value')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">{t('comp_fee_bank')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">{t('comp_fee_trad')}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#101828]">{t('comp_row3')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#155EEF] bg-[#EEF4FF] border-x border-[#C7D7FD] font-mono">{t('comp_rate_us')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">{t('comp_rate_bank')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">{t('comp_rate_trad')}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#101828]">{t('comp_row4')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#101828] bg-[#EEF4FF] border-x border-[#C7D7FD]">{t('comp_docs_us')}</td>
                  <td className="py-3.5 px-4 sm:px-6">{t('comp_docs_bank')}</td>
                  <td className="py-3.5 px-4 sm:px-6">{t('comp_docs_trad')}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#101828]">{t('comp_row5')}</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#155EEF] bg-[#EEF4FF] border-x border-[#C7D7FD]">{t('comp_support_us')}</td>
                  <td className="py-3.5 px-4 sm:px-6">{t('comp_support_bank')}</td>
                  <td className="py-3.5 px-4 sm:px-6">{t('comp_support_trad')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Two Distinct Transfer Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#E4E7EC] text-[#155EEF] text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>{t('dir_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101828] tracking-tight">{t('dir_h2')}</h2>
          <p className="text-[#475467] text-xs sm:text-sm">{t('dir_desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Türkiyədən Azərbaycana */}
          <div className="p-6 rounded-2xl bg-white border border-[#E4E7EC] hover:border-[#93C5FD] shadow-xl transition space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🇹🇷</span>
                <span className="text-[#475467] font-bold">➔</span>
                <span className="text-3xl">🇦🇿</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EEF4FF] text-[#155EEF] border border-[#C7D7FD] font-mono">{t('dir_tr_az_badge')}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#101828]">{t('dir_tr_az_title')}</h3>
              <p className="text-xs text-[#475467] mt-1">{t('dir_tr_az_desc')}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E4E7EC] space-y-2 text-xs sm:text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-[#475467]">Minimum Məbləğ:</span>
                <span className="font-bold text-[#101828]">{t('dir_min_value')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#475467]">1,000 ₺ – 31,000 ₺:</span>
                <span className="font-bold text-[#155EEF] tabular-nums">1,000 ₺ = 33.10 ₼</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#475467]">31,000 ₺+ VIP:</span>
                <span className="font-bold text-[#102A56] tabular-nums">1,000 ₺ = 33.50 ₼ ⭐</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-[#E4E7EC]">
                <span className="text-[#475467]">Komissiya:</span>
                <span className="font-bold text-[#155EEF]">{t('bar_commission_value')}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(t('wa_from_tr'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp-premium py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>{t('dir_send_tr')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: Azərbaycandan Türkiyəyə */}
          <div className="p-6 rounded-2xl bg-white border border-[#E4E7EC] hover:border-[#155EEF] shadow-xl transition space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🇦🇿</span>
                <span className="text-[#475467] font-bold">➔</span>
                <span className="text-3xl">🇹🇷</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EEF4FF] text-[#155EEF] border border-[#C7D7FD] font-mono">{t('dir_az_tr_badge')}</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#101828]">{t('dir_az_tr_title')}</h3>
              <p className="text-xs text-[#475467] mt-1">{t('dir_az_tr_desc')}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E4E7EC] space-y-2 text-xs sm:text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-[#475467]">İcraat Müddəti:</span>
                <span className="font-bold text-[#155EEF]">{t('dir_azn_time_value')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#475467]">Tətbiq Edilən Kurs:</span>
                <span className="font-bold text-[#101828] tabular-nums">{t('dir_azn_rate_value')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#475467]">Komissiya Haqqı:</span>
                <span className="font-bold text-[#155EEF]">Hər 1,000 ₺ üçün 20 ₺</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-[#E4E7EC]">
                <span className="text-[#475467]">Türkiyə Bankları:</span>
                <span className="font-bold text-[#101828]">{t('dir_azn_banks_value')}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(t('wa_from_az'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp-premium py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>{t('dir_send_az')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Visual 3-Step Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#101828] tracking-tight">{t('steps_h2')}</h2>
            <p className="text-[#475467] text-xs sm:text-sm">{t('steps_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-white border border-[#E4E7EC] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] text-[#155EEF] font-mono font-black flex items-center justify-center text-sm border border-[#93C5FD]">
                1
              </div>
              <h3 className="text-sm font-bold text-[#101828]">{t('step1_title')}</h3>
              <p className="text-xs text-[#475467] leading-relaxed">{t('step1_desc')}</p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-white border border-[#E4E7EC] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] text-[#102A56] font-mono font-black flex items-center justify-center text-sm border border-[#93C5FD]">
                2
              </div>
              <h3 className="text-sm font-bold text-[#101828]">{t('step2_title')}</h3>
              <p className="text-xs text-[#475467] leading-relaxed">{t('step2_desc')}</p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-white border border-[#E4E7EC] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] text-[#155EEF] font-mono font-black flex items-center justify-center text-sm border border-[#155EEF]/40">
                3
              </div>
              <h3 className="text-sm font-bold text-[#101828]">{t('step3_title')}</h3>
              <p className="text-xs text-[#475467] leading-relaxed">{t('step3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner Banks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FC] border border-[#E4E7EC] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#E4E7EC] text-[#155EEF] text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('banks_badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101828] tracking-tight">{t('banks_h2')}</h2>
            <p className="text-[#475467] text-xs sm:text-sm">{t('banks_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Azerbaijan Banks */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#155EEF] flex items-center gap-2 uppercase tracking-wider font-mono">
                <span>🇦🇿</span>
                <span>{t('banks_az')}</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {azerbaijanBanks.map((bank, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-[#E4E7EC] flex items-center justify-between text-xs text-[#101828]"
                  >
                    <span className="font-semibold truncate">{bank.name}</span>
                    <span className="text-[10px] text-[#155EEF] font-mono shrink-0 pl-1">{bank.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Turkey Banks */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#102A56] flex items-center gap-2 uppercase tracking-wider font-mono">
                <span>🇹🇷</span>
                <span>{t('banks_tr')}</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {turkeyBanks.map((bank, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-[#E4E7EC] flex items-center justify-between text-xs text-[#101828]"
                  >
                    <span className="font-semibold truncate">{bank.name}</span>
                    <span className="text-[10px] text-[#102A56] font-mono shrink-0 pl-1">{bank.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Founder's Guarantee Seal & Hotline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#102A56] border border-[#102A56] text-center space-y-5 shadow-[0_16px_40px_rgba(16,42,86,0.18)] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-[#12B76A]" />
            <span>{t('guarantee_badge')}</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {FOUNDER_NAME} — {SLOGAN}
            </h2>
            <p className="text-white/75 text-sm max-w-2xl mx-auto leading-relaxed">{t('guarantee_desc')}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-whatsapp-premium py-3.5 px-8 rounded-xl text-base font-black shadow-xl flex items-center justify-center cursor-pointer"
            >
              <WhatsAppLogo className="w-5 h-5 fill-white shrink-0 mr-2" />
              <span>{t('guarantee_btn')}: {WHATSAPP_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
