import React, { useState } from 'react';
import { CustomerRequirement } from '../types/requirement';
import { Logo } from './Logo';
import {
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Printer,
  Phone,
  Mail,
  Building2,
  Calendar,
  Layers,
} from 'lucide-react';

interface StepSuccessProps {
  data: CustomerRequirement;
  onReset: () => void;
  referenceNumber: string;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({
  data,
  onReset,
  referenceNumber,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReference = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(referenceNumber);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = referenceNumber;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const clientName = data.customer?.name || data.customerName || 'Private Client';
  const projectType = data.project?.type || data.projectType || 'Architecture';
  const services = data.services || 'Design Consultation';

  return (
    <div className="w-full max-w-3xl mx-auto py-8 sm:py-16 px-4 sm:px-6 flex flex-col items-center text-center animate-fade-in">
      {/* Authoritative Studio Logo Asset */}
      <div className="mb-6 p-4 sm:p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs inline-block">
        <Logo variant="horizontal" />
      </div>

      {/* Success Badge */}
      <div className="w-14 h-14 rounded-full bg-[#FFF0F0] border border-[#E22026]/30 flex items-center justify-center text-[#E22026] mb-4 shadow-xs">
        <CheckCircle2 className="w-8 h-8 stroke-[2]" />
      </div>

      {/* 11. Customer Confirmation Screen Headline & Supporting Text */}
      <h1 className="font-display text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight leading-tight">
        Thank You
      </h1>

      <p className="mt-2.5 font-display text-xl sm:text-2xl text-[#111111] font-normal max-w-xl">
        Your project requirement has been received by M M Design Atelier.
      </p>

      <p className="mt-2 text-sm text-[#52525B] max-w-lg leading-relaxed">
        We'll review your requirements and get in touch with you.
      </p>

      {/* 12. Reference Number Card with Copy Action */}
      <div className="mt-8 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm w-full max-w-lg text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
          <div>
            <span className="text-[11px] uppercase font-mono text-[#71717A] font-semibold tracking-wider block">
              Reference Number
            </span>
            <span
              id="display-reference-number"
              className="font-mono text-xl sm:text-2xl text-[#E22026] font-bold tracking-wider block mt-1"
            >
              {referenceNumber}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyReference}
            id="copy-reference-button"
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              copied
                ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                : 'bg-[#F4F4F6] hover:bg-[#E5E7EB] text-[#111111] border border-[#D1D5DB]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#71717A]" />
                <span>Copy Reference Number</span>
              </>
            )}
          </button>
        </div>

        {/* Concise Project Dossier Reference Details */}
        <div className="grid grid-cols-2 gap-4 text-xs pt-4">
          <div>
            <span className="text-[#71717A] block font-mono text-[10px] uppercase">Client Name</span>
            <span className="font-semibold text-[#111111] text-sm mt-0.5 block truncate">
              {clientName}
            </span>
          </div>
          <div>
            <span className="text-[#71717A] block font-mono text-[10px] uppercase">Project Type</span>
            <span className="font-semibold text-[#111111] text-sm mt-0.5 block truncate">
              {projectType}
            </span>
          </div>
          <div>
            <span className="text-[#71717A] block font-mono text-[10px] uppercase">Services In Scope</span>
            <span className="font-medium text-[#111111] mt-0.5 block truncate">
              {services}
            </span>
          </div>
          <div>
            <span className="text-[#71717A] block font-mono text-[10px] uppercase">Status</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF0F0] text-[#E22026] text-[11px] font-semibold mt-0.5">
              NEW
            </span>
          </div>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="mt-10 w-full max-w-2xl text-left">
        <h3 className="font-display text-sm font-semibold text-[#111111] uppercase tracking-wider text-center mb-5">
          What Happens Next
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs">
            <span className="font-mono text-xs text-[#E22026] font-bold block mb-1">
              Phase 01
            </span>
            <h4 className="font-display text-sm font-semibold text-[#111111]">
              Architectural Review
            </h4>
            <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
              Our studio partners review your space requirements and location specifics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs">
            <span className="font-mono text-xs text-[#E22026] font-bold block mb-1">
              Phase 02
            </span>
            <h4 className="font-display text-sm font-semibold text-[#111111]">
              Concept Moodboards
            </h4>
            <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
              We curate initial spatial references and materiality boards aligned with your style.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs">
            <span className="font-mono text-xs text-[#E22026] font-bold block mb-1">
              Phase 03
            </span>
            <h4 className="font-display text-sm font-semibold text-[#111111]">
              Studio Consultation
            </h4>
            <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
              Meet our team at the atelier or on site to discuss layout plans and fees.
            </p>
          </div>
        </div>
      </div>

      {/* Studio Concierge Information */}
      <div className="mt-8 p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] max-w-md w-full text-center">
        <p className="text-xs text-[#52525B]">
          Visiting the studio? Please share your reference number with our front desk.
        </p>
        <div className="flex items-center justify-center gap-4 mt-2.5 text-xs font-medium text-[#111111]">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#E22026]" />
            Studio Concierge
          </span>
          <span className="text-[#D1D5DB]">|</span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#E22026]" />
            consult@mmdesignatelier.com
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-lg border border-[#D1D5DB] bg-white hover:bg-[#F4F4F6] text-xs font-medium text-[#111111] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-[#71717A]" />
          <span>Print / Save Copy</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2.5 rounded-lg bg-[#111111] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start New Requirement</span>
        </button>
      </div>
    </div>
  );
};
