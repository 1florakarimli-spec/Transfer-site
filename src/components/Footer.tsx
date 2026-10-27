import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN, DEFAULT_SUBSCRIBER_EMAIL } from '../types';
import { Logo } from './Logo';
import { 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Lock,
  Building2
} from 'lucide-react';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000 } from '../utils/calculator';
import { WhatsAppLogo } from './WhatsAppLogo';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    t('wa_footer')
  )}`;

  return (
    <footer className="bg-[#F7F9FC] border-t border-[#E4E7EC] text-[#475467] text-xs pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info with Flags */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" spinning={false} onClick={() => onNavigate('home')} />
            <p className="text-[#475467] text-xs sm:text-sm leading-relaxed max-w-sm">
              {t('footer_intro', { name: FOUNDER_NAME, slogan: SLOGAN })}
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#E4E7EC] space-y-1.5 text-[11px] max-w-sm">
              <div className="text-[#155EEF] font-bold flex items-center gap-1.5 pb-1 border-b border-[#E4E7EC]">
                <span>🇹🇷</span>
                <span>Rəsmi Məzənnə Şərtləri:</span>
                <span>🇦🇿</span>
              </div>
              <div>• Minimum göndəriş: <strong className="text-[#101828] font-mono">1,000 ₺</strong> (Aşağı qəbul edilmir)</div>
              <div>• 1,000 ₺ – 31,000 ₺: <strong className="text-[#155EEF] font-mono">1,000 ₺ = {RATE_STANDARD_PER_1000.toFixed(2)} ₼</strong></div>
              <div>• 31,000 ₺-dən yuxarı: <strong className="text-[#102A56] font-mono">1,000 ₺ = {RATE_VIP_PER_1000.toFixed(2)} ₼ VIP ⭐</strong></div>
              <div>• Komissiya: <strong className="text-[#155EEF] font-mono">{t('hero_commission_value')}</strong></div>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="space-y-3">
            <h4 className="text-[#101828] font-bold text-xs uppercase tracking-wider">{t('footer_nav_title')}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('footer_nav_home')}</button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('footer_nav_calc')}</button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('nav_about_group')}</button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('who-we-are')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('footer_nav_who')}</button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('footer_nav_history')}</button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('footer_nav_faq')}</button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#155EEF] transition cursor-pointer"
                >{t('footer_nav_contact')}</button>
              </li>
            </ul>
          </div>

          {/* Supported Banks */}
          <div className="space-y-3">
            <h4 className="text-[#101828] font-bold text-xs uppercase tracking-wider">{t('footer_banks_title')}</h4>
            <ul className="space-y-1.5 text-[11px] text-[#475467]">
              <li>🇦🇿 Kapital Bank / Birbank</li>
              <li>🇦🇿 PAŞA Bank</li>
              <li>🇦🇿 ABB (Beynəlxalq Bank)</li>
              <li>🇦🇿 Leobank & Unibank</li>
              <li>🇹🇷 Ziraat Bankası</li>
              <li>🇹🇷 Türkiye İş Bankası</li>
              <li>🇹🇷 Garanti BBVA</li>
              <li>🇹🇷 VakıfBank & YapıKredi</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-[#101828] font-bold text-xs uppercase tracking-wider">{t('footer_contact_title')}</h4>
            <div className="space-y-2.5">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#101828] hover:text-[#155EEF] font-mono font-bold text-sm transition"
              >
                <PhoneCall className="w-4 h-4 text-[#155EEF]" />
                <span>{WHATSAPP_PHONE}</span>
              </a>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl btn-whatsapp-premium text-xs font-bold transition"
              >
                <WhatsAppLogo className="w-3.5 h-3.5 fill-white" />
                <span>{t('guarantee_btn')}</span>
              </a>

              <div className="pt-2 text-[11px] text-[#475467] space-y-1 border-t border-[#E4E7EC]">
                <div>Rəsmi Bildiriş:</div>
                <div className="font-mono text-[#155EEF] font-bold">{DEFAULT_SUBSCRIBER_EMAIL}</div>
                <div className="text-[#155EEF] font-medium">{t('footer_sms_active')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#475467]">
          <div>
            © {new Date().getFullYear()} MIHValyuta.com — {FOUNDER_NAME}. Bütün hüquqlar qorunur. Türkiyə ⇄ Azərbaycan rəsmi valyuta xidməti.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#155EEF]">
              <ShieldCheck className="w-3.5 h-3.5" />{t('footer_ssl')}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#102A56]">
              <Clock className="w-3.5 h-3.5" />{t('footer_speed')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
