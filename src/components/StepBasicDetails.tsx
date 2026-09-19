import React, { useState } from 'react';
import { CustomerRequirement, ProjectCondition } from '../types/requirement';
import { NavigationControls } from './NavigationControls';
import { User, MapPin } from 'lucide-react';

interface StepBasicDetailsProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CONDITIONS: { id: ProjectCondition; label: string; desc: string }[] = [
  { id: 'New Construction', label: 'New Construction', desc: 'Ground-up architecture & masterplanning' },
  { id: 'Renovation', label: 'Renovation', desc: 'Structural or spatial reconfiguration of existing building' },
  { id: 'Interior Fit-out', label: 'Interior Fit-Out', desc: 'Shell exists; complete interior atmosphere & joinery' },
  { id: 'Extension', label: 'Extension', desc: 'Adding floors, wings, or outdoor living pavilions' },
];

const AREA_UNITS: CustomerRequirement['projectAreaUnit'][] = ['sq ft', 'sq yards', 'sq meters', 'acres'];

export const StepBasicDetails: React.FC<StepBasicDetailsProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validatePhone = (phone: string) => {
    return phone.replace(/\D/g, '').length >= 10;
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return true; // Optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isNameValid = data.customerName.trim().length >= 2;
  const isPhoneValid = validatePhone(data.phone);
  const isEmailValid = validateEmail(data.email);
  const canProceed = isNameValid && isPhoneValid && isEmailValid;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 03 • Project Identity & Scale
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          Client & Site Parameters
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Tell us where your project is located and how the studio can reach you for your follow-up design presentation.
        </p>
      </div>

      <div className="space-y-8">
        {/* Client Contact Dossier */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB] mb-6">
            <User className="w-4 h-4 text-[#E22026]" />
            <h3 className="font-display text-lg text-[#111111] font-semibold">
              Principal Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Customer Name */}
            <div>
              <label
                htmlFor="input-customer-name"
                className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2"
              >
                Client / Organization Name <span className="text-[#E22026]">*</span>
              </label>
              <div className="relative">
                <input
                  id="input-customer-name"
                  type="text"
                  required
                  value={data.customerName}
                  onChange={(e) => onUpdate({ customerName: e.target.value })}
                  onBlur={() => handleBlur('customerName')}
                  placeholder="e.g., Alok Sharma / Vertex Studio"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none transition-colors ${
                    touched.customerName && !isNameValid
                      ? 'border-[#E22026] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]'
                      : 'border-[#D1D5DB] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]'
                  }`}
                />
              </div>
              {touched.customerName && !isNameValid && (
                <p className="text-xs text-[#E22026] mt-1.5 font-medium">Please enter your name</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="input-phone"
                className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2"
              >
                Contact Phone / WhatsApp <span className="text-[#E22026]">*</span>
              </label>
              <div className="relative">
                <input
                  id="input-phone"
                  type="tel"
                  required
                  value={data.phone}
                  onChange={(e) => onUpdate({ phone: e.target.value })}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none transition-colors ${
                    touched.phone && !isPhoneValid
                      ? 'border-[#E22026] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]'
                      : 'border-[#D1D5DB] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]'
                  }`}
                />
              </div>
              {touched.phone && !isPhoneValid && (
                <p className="text-xs text-[#E22026] mt-1.5 font-medium">
                  Please provide a valid 10-digit phone number
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="input-email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2"
              >
                Email Address <span className="text-xs text-[#71717A] lowercase font-normal">(optional — for design proposal dossier)</span>
              </label>
              <input
                id="input-email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                onBlur={() => handleBlur('email')}
                placeholder="client@domain.com"
                className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none transition-colors ${
                  touched.email && !isEmailValid
                    ? 'border-[#E22026] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]'
                    : 'border-[#D1D5DB] focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026]'
                }`}
              />
              {touched.email && !isEmailValid && (
                <p className="text-xs text-[#E22026] mt-1.5 font-medium">
                  Please provide a valid email format (e.g. client@domain.com)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Site Location & Condition */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB] mb-6">
            <MapPin className="w-4 h-4 text-[#E22026]" />
            <h3 className="font-display text-lg text-[#111111] font-semibold">
              Site Location & Physical Scope
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Location */}
            <div>
              <label
                htmlFor="input-location"
                className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2"
              >
                Project Location / City / Neighborhood
              </label>
              <input
                id="input-location"
                type="text"
                value={data.projectLocation}
                onChange={(e) => onUpdate({ projectLocation: e.target.value })}
                placeholder="e.g., Jubilee Hills, Hyderabad / Bandra West, Mumbai"
                className="w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] transition-colors"
              />
            </div>

            {/* Approximate Scale/Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="input-area"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111111]"
                >
                  Estimated Scale / Area
                </label>
                <div className="flex rounded-md overflow-hidden border border-[#D1D5DB] text-[11px]">
                  {AREA_UNITS.map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => onUpdate({ projectAreaUnit: unit })}
                      className={`px-2.5 py-0.5 transition-colors cursor-pointer capitalize ${
                        data.projectAreaUnit === unit
                          ? 'bg-[#111111] text-white font-medium'
                          : 'bg-white text-[#71717A] hover:bg-[#F4F4F6]'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
              <input
                id="input-area"
                type="text"
                value={data.projectArea}
                onChange={(e) => onUpdate({ projectArea: e.target.value })}
                placeholder="e.g., 4,500"
                className="w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] transition-colors"
              />
            </div>
          </div>

          {/* Condition selector */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
              Site Condition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CONDITIONS.map((cond) => {
                const isSelected = data.projectCondition === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => onUpdate({ projectCondition: cond.id })}
                    id={`cond-opt-${cond.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all ${
                      isSelected
                        ? 'border-[#E22026] ring-1 ring-[#E22026]/30 bg-[#FFFBFB] shadow-xs'
                        : 'border-[#E5E7EB] bg-white hover:border-[#B4B9C4]'
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold ${
                        isSelected ? 'text-[#E22026]' : 'text-[#111111]'
                      }`}
                    >
                      {cond.label}
                    </div>
                    <div className="text-[11px] text-[#71717A] mt-1 leading-snug">
                      {cond.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={canProceed}
        validationError={
          !isNameValid
            ? 'Please provide your name or organization'
            : !isPhoneValid
            ? 'Please enter a valid contact phone number'
            : null
        }
      />
    </div>
  );
};
