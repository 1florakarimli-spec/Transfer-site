import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck,
  Building,
  Copy,
  Check,
  UserCheck
} from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN, DEFAULT_SUBSCRIBER_EMAIL } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState(FOUNDER_NAME);
  const [phone, setPhone] = useState('+90 541 158 30 05');
  const [email, setEmail] = useState(DEFAULT_SUBSCRIBER_EMAIL);
  const [amount, setAmount] = useState('5,000 TL');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = [
      `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Əlaqə və sifariş forması:`,
      `Ad: ${name || t('wa_not_specified')}`,
      `Email: ${email || t('wa_not_specified')}`,
      `Telefon: ${phone || t('wa_not_specified')}`,
      amount ? `Məbləğ: ${amount}` : '',
      message ? `Qeyd: ${message}` : '',
    ].filter(Boolean).join('\n');

    window.location.href = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(WHATSAPP_PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Sizinlə əlaqə saxlamaq istəyirəm.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F9FC] border border-[#E4E7EC] text-[#155EEF] text-xs font-semibold">
          <span>🇹🇷</span>
          <span>{FOUNDER_NAME} — {SLOGAN}</span>
          <span>🇦🇿</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#102A56] tracking-tight">
          {t('contact_h1_line1')} <span className="text-[#155EEF]">{t('contact_h1_highlight')}</span>
        </h1>
        <p className="text-[#475467] text-xs sm:text-base leading-relaxed">{t('contact_desc')}</p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-5">
          {/* Official Phone Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E4E7EC] space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>{t('contact_hotline')}</span>
              <button
                onClick={handleCopyPhone}
                className="text-xs text-[#667085] hover:text-[#155EEF] flex items-center gap-1 bg-[#F7F9FC] hover:bg-[#EEF4FF] px-2.5 py-1 rounded-lg border border-[#E4E7EC] cursor-pointer transition"
                title={t('contact_copy_title')}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#027A48]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('contact_copied') : t('contact_copy')}</span>
              </button>
            </div>

            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#102A56] tracking-tight">
              {WHATSAPP_PHONE}
            </div>

            <p className="text-xs text-[#667085] leading-relaxed">{t('contact_phone_desc')}</p>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>{t('contact_wa_btn')}</span>
            </a>
          </div>

          {/* Quick info list */}
          <div className="p-6 rounded-2xl bg-white border border-[#E4E7EC] space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102A56] block">{t('contact_hours_label')}</span>
                <span className="text-[#667085] text-xs">{t('contact_hours_value')}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102A56] block">{t('contact_email_label')}</span>
                <span className="text-[#667085] font-mono text-xs">{DEFAULT_SUBSCRIBER_EMAIL}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#102A56] block">{t('contact_location_label')}</span>
                <span className="text-[#667085] text-xs">{t('contact_location_value')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Inquiry Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E7EC] space-y-5 shadow-2xl"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#102A56]">{t('contact_form_h')}</h3>
              <p className="text-xs text-[#667085] mt-1">{t('contact_form_desc')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#475467]">{t('contact_name_label')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('contact_name_ph')}
                  className="w-full bg-[#F7F9FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#101828] focus:outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/15"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#475467]">{t('contact_phone_label')}</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('contact_phone_ph')}
                  className="w-full bg-[#F7F9FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#101828] focus:outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/15 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#475467]">{t('contact_email_label2')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-[#F7F9FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#101828] focus:outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/15 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#475467]">{t('contact_amount_label')}</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t('contact_amount_ph')}
                  className="w-full bg-[#F7F9FC] border border-[#E4E7EC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#101828] focus:outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/15 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#475467]">{t('contact_note_label')}</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('contact_note_ph')}
                className="w-full bg-[#F7F9FC] border border-[#E4E7EC] rounded-xl p-3.5 text-xs sm:text-sm text-[#101828] focus:outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-[#155EEF]/15 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>{t('contact_submit')}</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
