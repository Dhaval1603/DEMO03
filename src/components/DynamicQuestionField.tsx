import React, { useState } from 'react';
import { QuestionConfig, QuestionOption } from '../types/questionEngine';
import { Check, HelpCircle, ChevronDown, ChevronUp, Plus, Minus, Info } from 'lucide-react';

interface DynamicQuestionFieldProps {
  question: QuestionConfig;
  value: any;
  onChange: (value: any) => void;
  allAnswers?: Record<string, any>;
}

export const DynamicQuestionField: React.FC<DynamicQuestionFieldProps> = ({
  question,
  value,
  onChange,
}) => {
  const [showHelp, setShowHelp] = useState(false);
  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSingleSelect = (opt: QuestionOption) => {
    if (opt.id === 'Other' && question.allowCustomInput) {
      setShowCustomInput(true);
      onChange('Other' + (customText ? `: ${customText}` : ''));
    } else {
      setShowCustomInput(false);
      onChange(opt.label || opt.id);
    }
  };

  const handleMultiSelect = (opt: QuestionOption) => {
    const current: string[] = Array.isArray(value) ? [...value] : [];
    const itemValue = opt.label || opt.id;
    const exists = current.includes(itemValue);

    if (exists) {
      const updated = current.filter((i) => i !== itemValue);
      onChange(updated);
    } else {
      // If choosing "Not Sure / Guidance", can either replace or append
      if (opt.isGuidance) {
        onChange([...current.filter((i) => !i.includes("I'm not sure")), itemValue]);
      } else {
        onChange([...current.filter((i) => !i.includes("I'm not sure")), itemValue]);
      }
    }
  };

  const handleCustomTextSubmit = (text: string) => {
    setCustomText(text);
    if (question.type === 'single_select') {
      onChange(text ? `Other: ${text}` : 'Other');
    } else if (question.type === 'multi_select') {
      const current: string[] = Array.isArray(value) ? [...value] : [];
      const filtered = current.filter((c) => !c.startsWith('Other:'));
      if (text.trim()) {
        onChange([...filtered, `Other: ${text.trim()}`]);
      } else {
        onChange(filtered);
      }
    }
  };

  return (
    <div
      id={`question-${question.id}`}
      className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all shadow-xs"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-medium text-[#111111] leading-snug">
              {question.question}
            </h3>
            {question.required ? (
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#E22026] border border-[#FEE2E2]">
                Required
              </span>
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                Optional
              </span>
            )}
          </div>
          {question.description && (
            <p className="text-xs sm:text-sm text-[#71717A] mt-1 leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        {/* Why are we asking this? Popover button */}
        {question.helpText && (
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1 text-[11px] text-[#71717A] hover:text-[#E22026] transition-colors shrink-0 py-1 px-2 rounded-md hover:bg-[#F9FAFB] border border-transparent hover:border-[#E5E7EB]"
            title="Why are we asking this?"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Why this matters</span>
            {showHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Expandable Help Text */}
      {showHelp && question.helpText && (
        <div className="my-3 p-3.5 rounded-lg bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#52525B] flex items-start gap-2.5 animate-fade-in">
          <Info className="w-4 h-4 text-[#E22026] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] mb-0.5">
              Studio Architectural Context
            </p>
            <p className="leading-relaxed">{question.helpText}</p>
          </div>
        </div>
      )}

      {/* QUESTION TYPES */}

      {/* 1. SINGLE SELECT */}
      {question.type === 'single_select' && question.options && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {question.options.map((opt) => {
            const optLabel = opt.label || opt.id;
            const isSelected =
              value === optLabel ||
              (opt.id === 'Other' && typeof value === 'string' && value.startsWith('Other'));

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSingleSelect(opt)}
                className={`text-left p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-[#E22026] bg-[#FEF2F2]/40 ring-1 ring-[#E22026]'
                    : 'border-[#E5E7EB] bg-[#FAFAFA] hover:bg-white hover:border-[#D1D5DB]'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isSelected ? 'text-[#111111]' : 'text-[#374151]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    {opt.isGuidance && (
                      <span className="text-[9px] uppercase tracking-wider font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        Guided
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <p className="text-[11px] text-[#71717A] mt-0.5 leading-normal">
                      {opt.description}
                    </p>
                  )}
                </div>

                <div
                  className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                    isSelected
                      ? 'border-[#E22026] bg-[#E22026] text-white'
                      : 'border-[#D1D5DB] bg-white'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. MULTI SELECT */}
      {question.type === 'multi_select' && question.options && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {question.options.map((opt) => {
            const optLabel = opt.label || opt.id;
            const currentArray: string[] = Array.isArray(value) ? value : [];
            const isSelected =
              currentArray.includes(optLabel) ||
              (opt.id === 'Other' && currentArray.some((c) => c.startsWith('Other')));

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleMultiSelect(opt)}
                className={`text-left p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-[#E22026] bg-[#FEF2F2]/40 ring-1 ring-[#E22026]'
                    : 'border-[#E5E7EB] bg-[#FAFAFA] hover:bg-white hover:border-[#D1D5DB]'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isSelected ? 'text-[#111111]' : 'text-[#374151]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    {opt.tag && (
                      <span className="text-[9px] uppercase tracking-wider font-mono px-1 py-0.2 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {opt.tag}
                      </span>
                    )}
                    {opt.isGuidance && (
                      <span className="text-[9px] uppercase tracking-wider font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        Guidance
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <p className="text-[11px] text-[#71717A] mt-0.5 leading-normal">
                      {opt.description}
                    </p>
                  )}
                </div>

                <div
                  className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#E22026] bg-[#E22026] text-white'
                      : 'border-[#D1D5DB] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Custom input field if "Other" or custom input enabled */}
      {question.allowCustomInput && (
        <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customText}
              onChange={(e) => handleCustomTextSubmit(e.target.value)}
              placeholder={question.customInputPlaceholder || 'Other requirement / custom detail...'}
              className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-md border border-[#E5E7EB] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] bg-white text-[#111111]"
            />
            {customText && (
              <button
                type="button"
                onClick={() => handleCustomTextSubmit('')}
                className="text-xs text-[#71717A] hover:text-[#111111] px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. TEXT */}
      {question.type === 'text' && (
        <div className="mt-3">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || 'Enter details...'}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] bg-[#FAFAFA] focus:bg-white text-[#111111] transition-colors"
          />
        </div>
      )}

      {/* 4. LONG TEXT */}
      {question.type === 'long_text' && (
        <div className="mt-3">
          <textarea
            rows={4}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || 'Enter notes or specific details...'}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] bg-[#FAFAFA] focus:bg-white text-[#111111] transition-colors"
          />
        </div>
      )}

      {/* 5. NUMBER */}
      {question.type === 'number' && (
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden bg-[#FAFAFA]">
            <button
              type="button"
              onClick={() => {
                const cur = Number(value) || 0;
                const next = Math.max(question.min ?? 0, cur - (question.step ?? 1));
                onChange(next);
              }}
              className="p-2.5 text-[#52525B] hover:bg-white hover:text-[#111111] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="w-20 text-center py-2 text-sm font-semibold bg-transparent focus:outline-none text-[#111111]"
            />
            <button
              type="button"
              onClick={() => {
                const cur = Number(value) || 0;
                const next = cur + (question.step ?? 1);
                onChange(next);
              }}
              className="p-2.5 text-[#52525B] hover:bg-white hover:text-[#111111] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {question.unit && <span className="text-xs text-[#71717A]">{question.unit}</span>}
        </div>
      )}

      {/* 6. BOOLEAN (YES / NO) */}
      {question.type === 'boolean' && (
        <div className="mt-4 grid grid-cols-2 gap-3 max-w-xs">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={`p-3 rounded-lg border text-center text-xs sm:text-sm font-medium transition-all ${
              value === true
                ? 'border-[#E22026] bg-[#FEF2F2] text-[#E22026] ring-1 ring-[#E22026]'
                : 'border-[#E5E7EB] bg-[#FAFAFA] text-[#374151] hover:bg-white'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={`p-3 rounded-lg border text-center text-xs sm:text-sm font-medium transition-all ${
              value === false
                ? 'border-[#111111] bg-[#F4F4F5] text-[#111111] ring-1 ring-[#111111]'
                : 'border-[#E5E7EB] bg-[#FAFAFA] text-[#374151] hover:bg-white'
            }`}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};
