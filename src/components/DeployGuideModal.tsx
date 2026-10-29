import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2500);
  };

  const gitCommands = [
    {
      title: 'Langkah 1: Inisialisasi & Commit Kode Lokal',
      desc: 'Jalankan di terminal dalam folder c:\\Users\\UC\\Projects\\fnb-promo-studio:',
      cmd: `cd c:\\Users\\UC\\Projects\\fnb-promo-studio
git init
git add .
git commit -m "feat: initial release of TasteCraft F&B Visual Studio"
git branch -M main`
    },
    {
      title: 'Langkah 2: Hubungkan ke Repository GitHub Anda',
      desc: 'Buat repository baru di github.com/new lalu sambungkan URL-nya:',
      cmd: `git remote add origin https://github.com/USERNAME_ANDA/fnb-promo-studio.git
git push -u origin main`
    },
    {
      title: 'Langkah 3: Deploy Otomatis ke Vercel (1-Click)',
      desc: 'Buka Vercel dan impor repository GitHub Anda:',
      cmd: `# Atau jalankan via Vercel CLI langsung dari terminal:
npx vercel --prod`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 border border-indigo-500/30 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">
                Hubungkan ke GitHub & Vercel
              </h3>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Siap Deploy
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Aplikasi ini sudah dilengkapi dengan konfigurasi <code>vercel.json</code>, Vite, dan Tailwind CSS siap pakai.
            </p>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="space-y-4 mb-6">
          {gitCommands.map((step, idx) => {
            const isCopied = copiedStep === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 ml-7">
                      {step.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(step.cmd, idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Perintah</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative group ml-7">
                  <pre className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-emerald-400 font-mono overflow-x-auto">
                    {step.cmd}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 transition group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 fill-current text-white group-hover:text-orange-400 transition" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-orange-400 transition">
                  Buat Repo di GitHub
                </p>
                <p className="text-[10px] text-slate-400">github.com/new</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </a>

          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 transition group"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition" />
              <div>
                <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                  Impor ke Vercel (1-Click)
                </p>
                <p className="text-[10px] text-slate-400">vercel.com/new</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
          </a>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Setiap kali Anda <code>git push</code>, Vercel akan otomatis build & update website Anda!</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
