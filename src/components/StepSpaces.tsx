import React, { useState } from 'react';
import { CustomerRequirement } from '../types/requirement';
import { SPACES_BY_CATEGORY } from '../data/consultationData';
import { NavigationControls } from './NavigationControls';
import { Plus, Check, Trash2, Box } from 'lucide-react';

interface StepSpacesProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepSpaces: React.FC<StepSpacesProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [newSpaceInput, setNewSpaceInput] = useState('');

  const toggleSpace = (category: string, space: string) => {
    const currentList = data.selectedSpaces[category] || [];
    const exists = currentList.includes(space);

    const updatedCategoryList = exists
      ? currentList.filter((s) => s !== space)
      : [...currentList, space];

    onUpdate({
      selectedSpaces: {
        ...data.selectedSpaces,
        [category]: updatedCategoryList,
      },
    });
  };

  const handleAddCustomSpace = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSpaceInput.trim();
    if (!trimmed) return;

    if (!data.customSpaces.includes(trimmed)) {
      onUpdate({
        customSpaces: [...data.customSpaces, trimmed],
      });
    }
    setNewSpaceInput('');
  };

  const handleRemoveCustomSpace = (space: string) => {
    onUpdate({
      customSpaces: data.customSpaces.filter((s) => s !== space),
    });
  };

  // Count total selected spaces
  let totalCount = data.customSpaces.length;
  Object.values(data.selectedSpaces).forEach((list) => {
    totalCount += list.length;
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 04 • Spatial Program
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          Which spaces are in scope?
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Select all rooms, zones, and exterior realms you would like designed. You can also add custom spaces below.
        </p>

        {/* Counter Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F4F6] border border-[#E5E7EB] text-xs text-[#52525B]">
          <Box className="w-3.5 h-3.5 text-[#E22026]" />
          <span>
            Selected Areas: <strong className="text-[#E22026] font-semibold">{totalCount}</strong>
          </span>
        </div>
      </div>

      {/* Spatial Categories */}
      <div className="space-y-6">
        {SPACES_BY_CATEGORY.map((cat) => {
          const selectedInCat = data.selectedSpaces[cat.category] || [];

          return (
            <div
              key={cat.category}
              className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E7EB] shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
                <h3 className="font-display text-base font-semibold text-[#111111]">
                  {cat.category}
                </h3>
                {selectedInCat.length > 0 && (
                  <span className="text-xs font-mono text-[#E22026] font-medium">
                    {selectedInCat.length} selected
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.spaces.map((space) => {
                  const isSelected = selectedInCat.includes(space);

                  return (
                    <button
                      key={space}
                      type="button"
                      onClick={() => toggleSpace(cat.category, space)}
                      id={`space-${space.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-2 cursor-pointer select-none border ${
                        isSelected
                          ? 'border-[#E22026] bg-[#FFF0F0] text-[#E22026] shadow-xs ring-1 ring-[#E22026]/20'
                          : 'border-[#E5E7EB] bg-white text-[#52525B] hover:border-[#B4B9C4] hover:text-[#111111]'
                      }`}
                    >
                      <span>{space}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#E22026] stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3 h-3 text-[#A1A1AA]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Custom Spaces Section */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
          <h3 className="font-display text-base font-semibold text-[#111111] mb-2">
            Custom or Bespoke Areas
          </h3>
          <p className="text-xs text-[#71717A] mb-4">
            Need a specific architectural volume not listed above? Add it directly to your brief:
          </p>

          <form onSubmit={handleAddCustomSpace} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newSpaceInput}
              onChange={(e) => setNewSpaceInput(e.target.value)}
              placeholder="e.g., Courtyard Observatory, Koi Pond, Wine Cellar..."
              className="flex-1 px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg text-xs text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#E22026] focus:ring-1 focus:ring-[#E22026] transition-colors"
            />
            <button
              type="submit"
              disabled={!newSpaceInput.trim()}
              className="px-4 py-2.5 rounded-lg bg-[#111111] hover:bg-black text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {data.customSpaces.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#E5E7EB]">
              {data.customSpaces.map((space) => (
                <div
                  key={space}
                  className="px-3 py-1.5 rounded-lg text-xs bg-[#FFF0F0] border border-[#E22026]/40 text-[#E22026] font-medium flex items-center gap-2"
                >
                  <span>{space}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomSpace(space)}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={totalCount > 0}
        validationError={
          totalCount === 0 ? 'Please select at least one space or zone in scope' : null
        }
      />
    </div>
  );
};
