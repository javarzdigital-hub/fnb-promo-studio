import React from 'react';
import { 
  X, 
  Trash2, 
  Download, 
  Upload, 
  BookmarkCheck, 
  ArrowRight,
  Clock,
  Plus
} from 'lucide-react';
import type { CampaignState } from '../types';

interface SavedDesignsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDesigns: CampaignState[];
  onLoadDesign: (design: CampaignState) => void;
  onSaveCurrentDesign: () => void;
  onDeleteDesign: (id: string) => void;
  onExportAllJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SavedDesignsDrawer: React.FC<SavedDesignsDrawerProps> = ({
  isOpen,
  onClose,
  savedDesigns,
  onLoadDesign,
  onSaveCurrentDesign,
  onDeleteDesign,
  onExportAllJson,
  onImportJson,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col p-5 shadow-2xl text-slate-100 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base text-white">
              Desain Saya ({savedDesigns.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button: Save Current */}
        <div className="py-3">
          <button
            onClick={onSaveCurrentDesign}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Simpan Desain yang Sedang Dibuat</span>
          </button>
        </div>

        {/* List of Saved Designs */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-2">
          {savedDesigns.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500 text-xl">
                📂
              </div>
              <p className="text-sm font-semibold text-slate-300">Belum ada desain tersimpan</p>
              <p className="text-xs text-slate-500 mt-1">
                Klik tombol di atas untuk menyimpan kampanye promo yang sedang Anda rancang.
              </p>
            </div>
          ) : (
            savedDesigns.map((design) => (
              <div
                key={design.id}
                className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-3 group transition"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    onLoadDesign(design);
                    onClose();
                  }}
                >
                  <img
                    src={design.productImage}
                    alt={design.productTitle}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded">
                        {design.aspectRatio}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">
                        {design.name || design.headline}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {design.brandName} • Rp {design.promoPrice.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[9px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(design.updatedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onLoadDesign(design);
                      onClose();
                    }}
                    className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-900 rounded-lg transition"
                    title="Buka & Edit"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteDesign(design.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Backup & Restore */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onExportAllJson}
            disabled={savedDesigns.length === 0}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white disabled:opacity-40 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup JSON</span>
          </button>

          <label className="flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={onImportJson}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
