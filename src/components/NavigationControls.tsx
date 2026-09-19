import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface NavigationControlsProps {
  onBack?: () => void;
  onNext: () => void;
  canNext?: boolean;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  isSubmitting?: boolean;
  validationError?: string | null;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onBack,
  onNext,
  canNext,
  nextDisabled,
  nextLabel = 'Continue',
  backLabel = 'Back',
  isSubmitting = false,
  validationError,
}) => {
  const isEnabled = canNext !== undefined ? canNext : nextDisabled !== undefined ? !nextDisabled : true;
  return (
    <div className="w-full mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Back button */}
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          id="nav-back-button"
          className="w-full sm:w-auto px-5 py-3 rounded-lg text-sm font-medium text-[#52525B] hover:text-[#111111] bg-white hover:bg-[#F4F4F6] border border-[#E5E7EB] hover:border-[#D1D5DB] flex items-center justify-center gap-2 transition-all order-2 sm:order-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>
      ) : (
        <div className="hidden sm:block order-1" />
      )}

      {/* Validation warning & Next/Submit trigger */}
      <div className="flex flex-col sm:items-end w-full sm:w-auto order-1 sm:order-2">
        {validationError && (
          <p className="text-xs text-[#E22026] font-medium mb-2 text-center sm:text-right">
            {validationError}
          </p>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!isEnabled || isSubmitting}
          id="nav-next-button"
          className={`w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-2.5 transition-all duration-200 ${
            isEnabled && !isSubmitting
              ? 'bg-[#E22026] text-white hover:bg-[#C81A20] shadow-sm cursor-pointer active:scale-[0.99]'
              : 'bg-[#F4F4F6] text-[#A1A1AA] border border-[#E5E7EB] cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Transmitting Brief...</span>
            </>
          ) : (
            <>
              <span>{nextLabel}</span>
              {nextLabel.includes('Submit') ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
