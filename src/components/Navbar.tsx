import React from 'react';
import { 
  Sparkles, 
  Download, 
  Cloud, 
  BookmarkCheck,
  RefreshCw
} from 'lucide-react';
import type { AspectRatio, PromoTemplate } from '../types';
import { PRESET_TEMPLATES } from '../data/presets';

interface NavbarProps {
  currentRatio: AspectRatio;
  onSelectRatio: (ratio: AspectRatio) => void;
  onApplyTemplate: (template: PromoTemplate) => void;
  onOpenExport: () => void;
  onOpenDeployGuide: () => void;
  onOpenSavedDesigns: () => void;
  savedCount: number;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRatio,
  onSelectRatio,
  onApplyTemplate,
  onOpenExport,
  onOpenDeployGuide,
  onOpenSavedDesigns,
  savedCount,
  onReset,
}) => {
  const ratios: { label: string; value: AspectRatio; desc: string; icon: string }[] = [
    { label: '1:1', value: '1:1', desc: 'Feed / Square', icon: '⏹️' },
    { label: '9:16', value: '9:16', desc: 'Story / Reels', icon: '📱' },
    { label: '4:5', value: '4:5', desc: 'IG Portrait', icon: '🖼️' },
    { label: '16:9', value: '16:9', desc: 'Landscape / Banner', icon: '🖥️' },
    { label: '3:4', value: '3:4', desc: 'Table Tent / Menu', icon: '📋' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
            <span className="text-2xl">🍔</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-lg text-white tracking-tight">
                Taste<span className="text-orange-500">Craft</span>
              </h1>
              <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                F&B Visual Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Generator Banner Promosi & Menu Resto Interaktif
            </p>
          </div>
        </div>

        {/* Center: Aspect Ratio Switcher */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          <span className="text-xs font-medium text-slate-500 px-2 hidden md:inline">Format:</span>
          {ratios.map((r) => (
            <button
              key={r.value}
              onClick={() => onSelectRatio(r.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentRatio === r.value
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title={r.desc}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
              <span className="text-[10px] opacity-75 hidden xl:inline">({r.desc})</span>
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Presets Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Template Cepat</span>
            </button>
            <div className="absolute right-0 mt-1 w-64 p-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
              <p className="text-[11px] font-semibold text-slate-400 px-2 py-1 mb-1">Pilih Template Promo:</p>
              {PRESET_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => onApplyTemplate(tmpl)}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition flex flex-col gap-0.5"
                >
                  <span className="font-semibold text-orange-400">{tmpl.title}</span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">{tmpl.subheadline}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Designs Drawer */}
          <button
            onClick={onOpenSavedDesigns}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition relative"
            title="Desain Tersimpan"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Desain Saya</span>
            {savedCount > 0 && (
              <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* GitHub & Vercel Connect */}
          <button
            onClick={onOpenDeployGuide}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-indigo-500/40 text-xs font-semibold text-indigo-300 hover:text-white transition group shadow-sm"
            title="Panduan Hubungkan ke GitHub & Vercel"
          >
            <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">GitHub & Vercel</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            title="Reset ke Template Awal"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Export Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-orange-500/25 transition transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Visual HD</span>
          </button>
        </div>
      </div>
    </header>
  );
};
