import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Calculator } from '../components/Calculator';
import { 
  Calculator as CalcIcon, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Percent,
  Clock,
  Building2
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME } from '../types';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000 } from '../utils/calculator';

interface CalculatorPageProps {
  onNavigate: (page: NavPage) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onNavigate,
}) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F9FC] border border-[#E4E7EC] text-[#155EEF] text-xs font-semibold">
          <CalcIcon className="w-3.5 h-3.5 text-[#155EEF]" />
          <span>{t('calc_page_badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#102A56] tracking-tight">
          Türkiyə Lirəsi & Manat{' '}
          <span className="text-[#155EEF]">{t('calc_page_h1_calc')}</span>
        </h1>
        <p className="text-[#475467] text-xs sm:text-base leading-relaxed">{t('calc_page_intro')}</p>
      </div>

      {/* Main Full Calculator */}
      <div className="max-w-3xl mx-auto">
        <Calculator initialAmount={15000} />
      </div>

      {/* Comparison: MIHValyuta vs Regular Banks */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E4E7EC] space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#102A56] tracking-tight">
            MIHValyuta ({FOUNDER_NAME}) vs Standart Bank Köçürmələri
          </h2>
          <p className="text-[#667085] text-xs sm:text-sm">{t('calc_vs_desc')}</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E4E7EC]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F7F9FC] text-[#475467] uppercase text-xs font-semibold">
              <tr>
                <th className="py-3.5 px-5">{t('calc_vs_col_feat')}</th>
                <th className="py-3.5 px-5 bg-[#EEF4FF] text-[#155EEF] font-bold border-x border-[#C7D7FD]">{t('calc_vs_col_us')}</th>
                <th className="py-3.5 px-5 text-[#667085]">{t('calc_vs_col_bank')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC] text-[#475467]">
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#102A56]">{t('calc_vs_r1')}</td>
                <td className="py-3.5 px-5 font-bold text-[#027A48] bg-[#F7F9FC] border-x border-[#C7D7FD]">
                  Yalnız və yalnız TRY ⇄ AZN (Dəqiq ixtisaslaşma)
                </td>
                <td className="py-3.5 px-5 text-[#667085]">{t('calc_vs_r1_bank')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#102A56]">{t('calc_vs_r2')}</td>
                <td className="py-3.5 px-5 font-bold text-[#155EEF] bg-[#F7F9FC] border-x border-[#C7D7FD] font-mono">{t('calc_vs_r2_us')}</td>
                <td className="py-3.5 px-5 text-[#667085]">{t('calc_vs_r2_bank')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#102A56]">{t('calc_vs_r3')}</td>
                <td className="py-3.5 px-5 font-bold text-[#027A48] bg-[#F7F9FC] border-x border-[#C7D7FD] font-mono">{t('calc_vs_r3_us')}</td>
                <td className="py-3.5 px-5 text-[#667085]">{t('calc_vs_r3_bank')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#102A56]">{t('comp_row1')}</td>
                <td className="py-3.5 px-5 font-bold text-[#027A48] bg-[#F7F9FC] border-x border-[#C7D7FD] font-mono">{t('calc_vs_r4_us')}</td>
                <td className="py-3.5 px-5 text-[#667085]">{t('calc_vs_r4_bank')}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-[#102A56]">{t('calc_vs_r5')}</td>
                <td className="py-3.5 px-5 font-bold text-[#155EEF] bg-[#F7F9FC] border-x border-[#C7D7FD] font-mono">
                  {WHATSAPP_PHONE}
                </td>
                <td className="py-3.5 px-5 text-[#667085]">{t('calc_vs_r5_bank')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Calculation Examples */}
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#102A56] text-center">{t('calc_ex_h')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#667085]">{t('calc_ex_min')}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#F7F9FC] text-[#475467] font-mono">33.10 qəpik</span>
            </div>
            <div className="text-2xl font-black text-[#102A56] font-mono tabular-nums">1,000 ₺</div>
            <div className="text-xs text-[#667085] space-y-1.5 pt-2.5 border-t border-[#E4E7EC]">
              <div>Komissiya (hər 1000-ə 20 ₺): <strong className="text-[#155EEF] font-mono">20 ₺</strong></div>
              <div>Xalis Lirə: <strong className="text-[#344054] font-mono">980 ₺</strong></div>
              <div>Təhvil alınacaq: <strong className="text-[#027A48] font-mono">~32.44 AZN</strong></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E4E7EC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#667085]">{t('calc_ex_10k')}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#F7F9FC] text-[#475467] font-mono">33.10 qəpik</span>
            </div>
            <div className="text-2xl font-black text-[#102A56] font-mono tabular-nums">10,000 ₺</div>
            <div className="text-xs text-[#667085] space-y-1.5 pt-2.5 border-t border-[#E4E7EC]">
              <div>Komissiya (10 × 20 ₺): <strong className="text-[#155EEF] font-mono">200 ₺</strong></div>
              <div>Xalis Lirə: <strong className="text-[#344054] font-mono">9,800 ₺</strong></div>
              <div>Təhvil alınacaq: <strong className="text-[#027A48] font-mono">~324.38 AZN</strong></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#155EEF] space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#155EEF] text-white font-black text-[10px] px-2.5 py-0.5 rounded-bl-lg">
              VIP KURS ⭐
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#155EEF]">{t('calc_ex_50k')}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#EEF4FF] text-[#155EEF] font-mono font-bold">33.50 qəpik</span>
            </div>
            <div className="text-2xl font-black text-[#102A56] font-mono tabular-nums">50,000 ₺</div>
            <div className="text-xs text-[#667085] space-y-1.5 pt-2.5 border-t border-[#E4E7EC]">
              <div>Komissiya (50 × 20 ₺): <strong className="text-[#155EEF] font-mono">1,000 ₺</strong></div>
              <div>Xalis Lirə: <strong className="text-[#344054] font-mono">49,000 ₺</strong></div>
              <div>Təhvil alınacaq: <strong className="text-[#027A48] font-mono">~1,641.50 AZN</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
