import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Subscriber } from '../types';
import { formatPhoneDisplay, normalizePhone } from '../utils/phone';
import { SmsOtpStep } from './SmsOtpStep';
import {
  Mail,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  LogOut,
  User,
} from 'lucide-react';

interface SubscriberAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscriber: Subscriber | null;
  onLoginSuccess: (sub: Subscriber) => void;
  onLogout: () => void;
}

export const SubscriberAuthModal: React.FC<SubscriberAuthModalProps> = ({
  isOpen,
  onClose,
  currentSubscriber,
  onLoginSuccess,
  onLogout,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState(currentSubscriber?.name || '');
  const [email, setEmail] = useState(currentSubscriber?.email || '');
  const [phone, setPhone] = useState(currentSubscriber?.phone || '+90 ');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [whatsappStatus, setWhatsappStatus] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpPhone, setOtpPhone] = useState('');
  const [retryAfterSec, setRetryAfterSec] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (retryAfterSec <= 0) return;
    const timer = window.setTimeout(() => setRetryAfterSec((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [retryAfterSec]);

  if (!isOpen) return null;

  const sendOtp = async (normalized: string) => {
    const res = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: normalized }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || t('auth_sms_fail'));
    }
    setOtpPhone(normalized);
    setOtpStep(true);
    setRetryAfterSec(Number(data.retryAfterSec) || 45);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setWhatsappStatus('');

    if (!name.trim()) {
      setErrorMsg(t('auth_name_required'));
      return;
    }

    const normalized = normalizePhone(phone);
    if (!normalized) {
      setErrorMsg(t('auth_phone_invalid'));
      return;
    }

    setLoading(true);
    try {
      if (!otpStep) {
        await sendOtp(normalized);
        setSuccessMsg(t('auth_sms_sent'));
        return;
      }

      if (!otpCode || otpCode.replace(/\D/g, '').length < 4) {
        setErrorMsg(t('auth_otp_short'));
        return;
      }

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalized,
          email: email.trim() || undefined,
          otpCode: otpCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t('auth_register_error'));
      }

      const sent = data.whatsappStatus === 'sent' || data.twilioStatus === 'sent';
      setWhatsappStatus(
        sent
          ? t('auth_wa_sent')
          : t('auth_wa_queued')
      );
      setSuccessMsg(t('auth_success', { name: name.split(' ')[0] }));
      onLoginSuccess(data.subscriber);
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('auth_network');
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#101828]/45 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[94vh] overflow-y-auto bg-white border border-[#E4E7EC] rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 shadow-[0_24px_60px_rgba(16,42,86,0.22)] relative pb-[calc(1.25rem+env(safe-area-inset-bottom))] animate-slide-up">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#155EEF] rounded-t-3xl sm:rounded-t-2xl" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#EEF4FF] text-[#475467] hover:text-[#101828] transition cursor-pointer"
          aria-label={t('nav_close')}
        >
          <X className="w-5 h-5" />
        </button>

        {currentSubscriber ? (
          <div className="text-center space-y-5 pt-2">
            <div className="w-16 h-16 rounded-full bg-[#EEF4FF] border border-[#C7D7FD] text-[#155EEF] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#155EEF] font-semibold text-xs mb-2 border border-[#C7D7FD]">
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
                <span>{t('auth_active')}</span>
              </div>
              <h3 className="text-xl font-bold text-[#101828]">{currentSubscriber.name}</h3>
              {currentSubscriber.phone && (
                <p className="text-sm font-mono text-[#155EEF] mt-1">
                  {formatPhoneDisplay(currentSubscriber.phone)}
                </p>
              )}
              {currentSubscriber.email && !currentSubscriber.email.includes('@phone.mihvalyuta') && (
                <p className="text-xs font-mono text-[#475467] mt-0.5">{currentSubscriber.email}</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E4E7EC] text-xs text-left space-y-1.5">
              <div className="flex justify-between gap-3">
                <span className="text-[#475467]">{t('auth_status')}</span>
                <span className="font-bold text-[#155EEF]">{t('banks_status_active')}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#475467]">{t('nav_login')}</span>
                <span className="font-mono text-[#101828]">{currentSubscriber.loginTime}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#475467]">{t('auth_wa_label')}</span>
                <span className="font-bold text-[#155EEF]">{t('auth_wa_owner')}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl btn-neon-primary text-xs sm:text-sm cursor-pointer"
              >
                Tamam
              </button>
              <button
                onClick={onLogout}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#EEF4FF] hover:bg-[#FEF3F2] text-[#475467] hover:text-[#B42318] border border-[#E4E7EC] text-xs font-semibold cursor-pointer transition"
              >
                <LogOut className="w-4 h-4" />
                Çıxış
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 pt-1">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FD] text-[#155EEF] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('auth_badge')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#101828]">{t('auth_title')}</h3>
              <p className="text-xs text-[#475467] leading-relaxed">{t('auth_desc')}</p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1">{t('auth_name')}<span className="text-[#D92D20]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#475467] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('auth_name_ph')}
                    className="input-field w-full pl-10 pr-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1">{t('auth_phone')}<span className="text-[#D92D20]">*</span>
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-[#475467] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (otpStep) {
                        setOtpStep(false);
                        setOtpCode('');
                        setSuccessMsg('');
                      }
                    }}
                    placeholder="+90 541 158 30 05"
                    className="input-field w-full pl-10 pr-4 py-3 text-sm"
                  />
                </div>
                <p className="text-[11px] text-[#475467] mt-1">{t('auth_phone_hint')}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1">
                  Email <span className="text-[#475467] font-medium">{t('auth_optional')}</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#475467] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth_email_ph')}
                    className="input-field w-full pl-10 pr-4 py-3 text-sm"
                  />
                </div>
              </div>

              {otpStep && (
                <SmsOtpStep
                  phone={otpPhone || normalizePhone(phone) || phone}
                  code={otpCode}
                  onCodeChange={setOtpCode}
                  resendBusy={loading}
                  retryAfterSec={retryAfterSec}
                  onResend={async () => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    const normalized = normalizePhone(phone);
                    if (!normalized) {
                      setErrorMsg(t('otp_phone_bad'));
                      return;
                    }
                    setLoading(true);
                    try {
                      await sendOtp(normalized);
                      setOtpCode('');
                      setSuccessMsg(t('otp_resent'));
                    } catch (err: unknown) {
                      const message = err instanceof Error ? err.message : 'SMS göndərilmədi.';
                      setErrorMsg(message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                />
              )}

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2.5 rounded-lg bg-[#ECFDF5] border border-[#A6F4C5] text-[#027A48] text-xs font-semibold space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                  {whatsappStatus && <p className="text-[#027A48] text-[11px]">{whatsappStatus}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl btn-neon-primary text-xs sm:text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  otpStep ? t('auth_loading_verify') : t('auth_loading_sms')
                ) : (
                  <>
                    {otpStep ? t('auth_verify') : t('auth_submit')}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#475467] text-center flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>{t('auth_privacy')}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
