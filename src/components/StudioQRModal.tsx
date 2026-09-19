import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

interface StudioQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioQRModal: React.FC<StudioQRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    currentUrl
  )}&color=111111&bgcolor=ffffff&margin=10`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#71717A] hover:text-[#111111] rounded-lg hover:bg-[#F4F4F6] transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Studio Logo in Modal */}
        <div className="mb-5 inline-flex justify-center">
          <Logo variant="compact" />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 rounded-full bg-[#FFF0F0] text-[#E22026] mb-2">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="font-display text-2xl text-[#111111] font-semibold tracking-tight">
            Studio Reception QR
          </h3>
          <p className="text-xs text-[#52525B] mt-1 max-w-xs mx-auto leading-relaxed">
            Invite walk-in studio clients to scan this code with their smartphone camera to begin their personalized design consultation.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-xl shadow-xs mx-auto w-64 h-64 flex items-center justify-center border border-[#E5E7EB]">
          <img
            src={qrApiUrl}
            alt="M M Design Atelier QR Consultation Code"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Studio Link Copy */}
        <div className="mt-6 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 bg-[#FAFAFB] border border-[#E5E7EB] p-2 rounded-lg text-xs font-mono text-[#52525B]">
            <span className="truncate flex-1 px-2 text-left">{currentUrl}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md bg-[#111111] text-white hover:bg-black flex items-center gap-1.5 transition-colors text-xs font-sans font-medium whitespace-nowrap cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#71717A] px-1">
            <span>Scan with iOS Camera or Android Lens</span>
            <button
              type="button"
              onClick={() => window.open(currentUrl, '_blank')}
              className="hover:text-[#E22026] inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              Open Tab <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
