import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CanvasPreview } from './components/CanvasPreview';
import { EditorSidebar } from './components/EditorSidebar';
import { ExportModal } from './components/ExportModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { SavedDesignsDrawer } from './components/SavedDesignsDrawer';
import type { CampaignState, AspectRatio, PromoTemplate } from './types';
import { INITIAL_CAMPAIGN } from './data/presets';
import { Check } from 'lucide-react';

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Main Campaign State
  const [campaign, setCampaign] = useState<CampaignState>(() => {
    const saved = localStorage.getItem('fnb_active_campaign');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CAMPAIGN;
      }
    }
    return INITIAL_CAMPAIGN;
  });

  // Saved Designs List in LocalStorage
  const [savedDesigns, setSavedDesigns] = useState<CampaignState[]>(() => {
    const saved = localStorage.getItem('fnb_saved_designs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Modal States
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isSavedDesignsOpen, setIsSavedDesignsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save active campaign
  useEffect(() => {
    localStorage.setItem('fnb_active_campaign', JSON.stringify(campaign));
  }, [campaign]);

  // Save designs list to localStorage
  useEffect(() => {
    localStorage.setItem('fnb_saved_designs', JSON.stringify(savedDesigns));
  }, [savedDesigns]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Update Campaign Helper
  const handleCampaignChange = (updated: Partial<CampaignState>) => {
    setCampaign((prev) => ({
      ...prev,
      ...updated,
      updatedAt: Date.now(),
    }));
  };

  // Apply a template
  const handleApplyTemplate = (tmpl: PromoTemplate) => {
    setCampaign((prev) => ({
      ...prev,
      aspectRatio: tmpl.aspectRatio,
      theme: tmpl.theme,
      promoType: tmpl.promoType,
      tagline: tmpl.tagline,
      headline: tmpl.headline,
      subheadline: tmpl.subheadline,
      productTitle: tmpl.productTitle,
      originalPrice: tmpl.originalPrice,
      promoPrice: tmpl.promoPrice,
      productImage: tmpl.productImage,
      brandName: tmpl.brandName,
      validUntil: tmpl.validUntil,
      terms: tmpl.terms,
      selectedBadges: tmpl.selectedBadges,
      updatedAt: Date.now(),
    }));
    showToast(`Template "${tmpl.title}" berhasil diterapkan!`);
  };

  // Switch Aspect Ratio
  const handleSelectRatio = (ratio: AspectRatio) => {
    handleCampaignChange({ aspectRatio: ratio });
  };

  // Reset to default
  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mereset desain ke setelan awal?')) {
      setCampaign(INITIAL_CAMPAIGN);
      showToast('Kanvas telah direset ke setelan awal.');
    }
  };

  // Save current design to Saved Designs
  const handleSaveCurrentDesign = () => {
    const newDesign: CampaignState = {
      ...campaign,
      id: `design-${Date.now()}`,
      name: `${campaign.brandName} - ${campaign.headline}`,
      updatedAt: Date.now(),
    };
    setSavedDesigns((prev) => [newDesign, ...prev]);
    showToast('Desain berhasil disimpan ke koleksi Anda!');
  };

  // Load a saved design
  const handleLoadDesign = (design: CampaignState) => {
    setCampaign(design);
    showToast(`Memuat desain "${design.name || design.headline}"`);
  };

  // Delete saved design
  const handleDeleteDesign = (id: string) => {
    setSavedDesigns((prev) => prev.filter((d) => d.id !== id));
    showToast('Desain dihapus dari koleksi.');
  };

  // Export JSON Backup
  const handleExportAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedDesigns, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `fnb-promo-backup-${Date.now()}.json`);
    dl.click();
    showToast('File backup JSON berhasil diunduh.');
  };

  // Import JSON Backup
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setSavedDesigns(parsed);
            showToast(`Berhasil merestore ${parsed.length} desain!`);
          }
        } catch (err) {
          alert('Format file JSON tidak valid.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentRatio={campaign.aspectRatio}
        onSelectRatio={handleSelectRatio}
        onApplyTemplate={handleApplyTemplate}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenSavedDesigns={() => setIsSavedDesignsOpen(true)}
        savedCount={savedDesigns.length}
        onReset={handleReset}
      />

      {/* Main Workspace: Left Canvas Preview, Right Editor Controls */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Center Canvas Preview Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
          <CanvasPreview ref={canvasRef} campaign={campaign} />
        </main>

        {/* Right Editor Sidebar */}
        <aside className="w-full lg:w-auto shrink-0">
          <EditorSidebar campaign={campaign} onChange={handleCampaignChange} />
        </aside>
      </div>

      {/* Modals & Drawers */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        canvasRef={canvasRef}
        campaign={campaign}
      />

      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      <SavedDesignsDrawer
        isOpen={isSavedDesignsOpen}
        onClose={() => setIsSavedDesignsOpen(false)}
        savedDesigns={savedDesigns}
        onLoadDesign={handleLoadDesign}
        onSaveCurrentDesign={handleSaveCurrentDesign}
        onDeleteDesign={handleDeleteDesign}
        onExportAllJson={handleExportAllJson}
        onImportJson={handleImportJson}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-orange-500/50 shadow-2xl shadow-orange-500/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
