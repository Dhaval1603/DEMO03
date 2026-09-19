import React, { useRef, useState } from 'react';
import { CustomerRequirement, UploadedFileRecord } from '../types/requirement';
import { NavigationControls } from './NavigationControls';
import { UploadCloud, FileText, Trash2, AlertCircle } from 'lucide-react';

interface StepUploadsProps {
  data: CustomerRequirement;
  onUpdate: (fields: Partial<CustomerRequirement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepUploads: React.FC<StepUploadsProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const newRecords: UploadedFileRecord[] = [];
    const maxFileSize = 25 * 1024 * 1024; // 25MB safety limit

    Array.from(files).forEach((file) => {
      if (file.size > maxFileSize) {
        setUploadError(`File "${file.name}" exceeds 25MB limit and was skipped.`);
        return;
      }

      const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const isImage = file.type.startsWith('image/');

      const record: UploadedFileRecord = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          record.previewUrl = e.target?.result as string;
          record.dataUrl = e.target?.result as string;
          onUpdate({ uploadedFiles: [...data.uploadedFiles, record] });
        };
        reader.readAsDataURL(file);
      } else {
        newRecords.push(record);
      }
    });

    if (newRecords.length > 0) {
      onUpdate({ uploadedFiles: [...data.uploadedFiles, ...newRecords] });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (id: string) => {
    onUpdate({
      uploadedFiles: data.uploadedFiles.filter((f) => f.id !== id),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-[#71717A] font-semibold">
          Step 08 • Supplementary Documents
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mt-2 leading-tight">
          Upload Site Photos & Plans
        </h2>
        <p className="text-sm text-[#52525B] mt-2.5">
          Optional. Share any existing site photographs, architectural drawings, or Pinterest references.
        </p>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        id="file-dropzone"
        className={`p-8 sm:p-12 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center flex flex-col items-center justify-center ${
          isDragging
            ? 'border-[#E22026] bg-[#FFF8F8] scale-[1.005]'
            : 'border-[#D1D5DB] bg-white hover:border-[#E22026]/70 hover:bg-[#FFFBFB]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.dwg,.dxf,.zip,.doc,.docx"
          onChange={handleFileInputChange}
          className="hidden"
          id="hidden-file-input"
        />

        <div className="w-14 h-14 rounded-full bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026] mb-4 shadow-xs">
          <UploadCloud className="w-7 h-7 stroke-[1.8]" />
        </div>

        <h3 className="font-display text-lg text-[#111111] font-semibold">
          Drag & Drop or Click to Select Files
        </h3>
        <p className="text-xs text-[#71717A] mt-1 max-w-sm">
          Supports site photographs (JPEG, PNG), floor plans (PDF), sketches, or CAD files.
        </p>

        {/* Format badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
          {['Site Photos', 'CAD / Floor Plans', 'Reference Images', 'PDF Briefs'].map((item) => (
            <span
              key={item}
              className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#F4F4F6] text-[#71717A] border border-[#E5E7EB]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {uploadError && (
        <div className="mt-4 p-3 rounded-lg bg-[#FFF0F0] border border-[#FCA5A5] text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded Files Display */}
      {data.uploadedFiles.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#111111] font-semibold">
              Uploaded Items ({data.uploadedFiles.length})
            </h4>
            <span className="text-[11px] text-[#71717A]">
              Transmitted securely with consultation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="p-3 rounded-lg bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded-md bg-[#F4F4F6] border border-[#E5E7EB] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-[#F4F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#E22026] shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-[#111111] truncate max-w-[180px] sm:max-w-[220px]">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-[#71717A] mt-0.5 font-mono">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  className="p-2 text-[#71717A] hover:text-[#E22026] rounded-md hover:bg-[#F4F4F6] transition-colors shrink-0 cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        canNext={true}
        nextLabel="Review Requirement Brief"
      />
    </div>
  );
};
