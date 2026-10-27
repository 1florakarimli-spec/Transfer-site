import React, { useState } from 'react';
import { LOGO_IMAGE_URL, FOUNDER_NAME, SLOGAN } from '../types';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  spinning?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  spinning = true,
  className = '',
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-18 sm:h-18',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Circular Rotating Logo Badge with Gold Halo */}
      <div className="relative group shrink-0">
        {/* Golden halo aura effect matching poster */}
        <div className="absolute -inset-1 bg-[#155EEF]/20 rounded-full blur-[2px] opacity-80 group-hover:opacity-100 transition duration-500" />

        {/* Outer Ring & Rotating Badge */}
        <div
          className={`relative ${sizeClasses[size]} rounded-full p-[2px] bg-[#155EEF] shadow-sm overflow-hidden`}
        >
          <div
            className={`w-full h-full rounded-full bg-[#102A56] flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out ${
              spinning ? 'animate-spin-slow' : ''
            }`}
            title={`${FOUNDER_NAME} - ${SLOGAN}`}
          >
            {/* Real Logo Image */}
            {!imageError ? (
              <img
                src={LOGO_IMAGE_URL}
                alt={`${FOUNDER_NAME} Logo`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover rounded-full ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
              />
            ) : null}

            {/* Premium Gold Monogram Fallback Insignia from poster */}
            {(!imageLoaded || imageError) && (
              <div className="w-full h-full rounded-full bg-[#102A56] flex flex-col items-center justify-center border border-white/20">
                <span className="font-black text-white tracking-tighter text-xs sm:text-sm leading-none">
                  İM
                </span>
                <span className="text-[5.5px] sm:text-[6.5px] text-[#C7D7FD] tracking-widest uppercase font-bold mt-0.5">
                  VALYUTA
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand Text with Flags */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-[#102A56] text-sm sm:text-[15px] lg:text-base truncate">
              <span className="hidden sm:inline">IM GLOBAL TRANSFER</span>
              <span className="sm:hidden">IM GLOBAL</span>
            </span>
            <div className="flex items-center gap-0.5 text-xs shrink-0">
              <span title="Türkiyə">🇹🇷</span>
              <span title="Azərbaycan">🇦🇿</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#475467]">
            <span className="text-[#155EEF] font-semibold truncate">«{SLOGAN}»</span>
            <span className="hidden sm:inline text-[#D0D5DD]">•</span>
            <span className="hidden sm:inline text-[#475467] font-semibold tracking-wide">MIHValyuta.com</span>
          </div>
        </div>
      )}
    </div>
  );
};
