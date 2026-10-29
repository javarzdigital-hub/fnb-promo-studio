import React, { useState } from 'react';
import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  Sparkles
} from 'lucide-react';
import type { CampaignState } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  campaign: CampaignState;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  canvasRef,
  campaign,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getCleanFileName = (ext: string) => {
    const slug = (campaign.brandName || 'fnb-promo')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    return `${slug}-${campaign.aspectRatio.replace(':', '-')}-${Date.now()}.${ext}`;
  };

  const handleDownload = async (format: 'png' | 'jpeg') => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      const options = {
        pixelRatio: 2.5, // Ultra crisp output
        quality: 0.95,
        cacheBust: true,
      };

      const dataUrl = format === 'png' 
        ? await toPng(canvasRef.current, options)
        : await toJpeg(canvasRef.current, options);

      const link = document.createElement('a');
      link.download = getCleanFileName(format);
      link.href = dataUrl;
      link.click();

      triggerConfetti();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Gagal mengekspor gambar. Pastikan gambar tidak terkena blokir CORS.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImageToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      const blob = await toBlob(canvasRef.current, {
        pixelRatio: 2,
        quality: 0.95,
      });
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedImage(true);
        triggerConfetti();
        setTimeout(() => setCopiedImage(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
      alert('Gagal menyalin gambar langsung ke clipboard pada browser ini. Silakan gunakan tombol Download.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCaption = () => {
    const fullCaption = `🚨 PROMO SPESIAL DARI ${campaign.brandName.toUpperCase()}! 🚨\n\n` +
      `🔥 ${campaign.headline} 🔥\n${campaign.subheadline}\n\n` +
      `💸 Dari Rp ${campaign.originalPrice.toLocaleString('id-ID')} JADI Rp ${campaign.promoPrice.toLocaleString('id-ID')}!\n` +
      `📅 Berlaku s/d: ${campaign.validUntil}\n` +
      `📝 ${campaign.terms}\n\n` +
      `📲 Info & Pemesanan:\nWhatsApp: ${campaign.brandWhatsApp}\nInstagram: ${campaign.brandInstagram}`;
    
    navigator.clipboard.writeText(fullCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Ekspor Visual Promosi F&B
            </h3>
            <p className="text-xs text-slate-400">
              Format {campaign.aspectRatio} • Siap diposting ke media sosial & cetak
            </p>
          </div>
        </div>

        {/* Export Options Cards */}
        <div className="space-y-3 mb-6">
          {/* Option 1: Ultra HD PNG */}
          <button
            disabled={isExporting}
            onClick={() => handleDownload('png')}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 hover:border-orange-500 transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500 text-slate-950 font-black text-xs flex items-center justify-center">
                PNG
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-orange-400 transition">
                  Download Ultra HD PNG (Rekomendasi)
                </p>
                <p className="text-xs text-slate-400">
                  Resolusi tinggi 2.5x, sangat tajam untuk Instagram & cetak akrilik
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-orange-400 group-hover:translate-y-0.5 transition" />
          </button>

          {/* Option 2: Copy Directly to Clipboard */}
          <button
            disabled={isExporting}
            onClick={handleCopyImageToClipboard}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                {copiedImage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                  {copiedImage ? 'Gambar Berhasil Disalin!' : 'Salin Gambar ke Clipboard'}
                </p>
                <p className="text-xs text-slate-400">
                  Langsung Paste (Ctrl+V) ke WhatsApp Web atau Telegram
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">
              {copiedImage ? 'Tersalin' : 'Salin'}
            </span>
          </button>

          {/* Option 3: Download JPEG */}
          <button
            disabled={isExporting}
            onClick={() => handleDownload('jpeg')}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">
                JPG
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-slate-200 transition">
                  Download Standar JPEG
                </p>
                <p className="text-xs text-slate-400">
                  Ukuran file lebih ringan, cocok untuk status WhatsApp & banner website
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          {/* Option 4: Copy Caption */}
          <button
            onClick={handleCopyCaption}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">
                {copiedCaption ? 'Teks Caption Berhasil Disalin!' : 'Salin Teks Caption & Hashtag Sekaligus'}
              </span>
            </div>
            {copiedCaption ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Loading Indicator */}
        {isExporting && (
          <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-orange-400 animate-pulse">
            <span className="w-3 h-3 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></span>
            Sedang merender grafis resolusi tinggi...
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
