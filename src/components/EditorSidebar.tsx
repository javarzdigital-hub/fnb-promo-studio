import React, { useState } from 'react';
import { 
  Tag, 
  Image as ImageIcon, 
  Store, 
  Palette, 
  Sparkles, 
  Upload, 
  Percent, 
  Copy, 
  Check, 
  QrCode,
  Wand2,
  Calendar
} from 'lucide-react';
import type { CampaignState, PromoType, ThemeStyle } from '../types';
import { 
  FOOD_ASSETS, 
  BADGE_OPTIONS, 
  THEME_CONFIGS, 
  AI_HOOK_TEMPLATES, 
  CAPTION_TEMPLATES 
} from '../data/presets';

interface EditorSidebarProps {
  campaign: CampaignState;
  onChange: (updated: Partial<CampaignState>) => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  campaign,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<'promo' | 'visual' | 'brand' | 'theme' | 'copy'>('promo');
  const [copiedCaptionIndex, setCopiedCaptionIndex] = useState<number | null>(null);

  // Handle custom image uploads (food or logo)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'productImage' | 'brandLogo' | 'customBgUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChange({ [field]: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle badge selection
  const handleToggleBadge = (badgeId: string) => {
    const exists = campaign.selectedBadges.includes(badgeId);
    const updated = exists
      ? campaign.selectedBadges.filter((b) => b !== badgeId)
      : [...campaign.selectedBadges, badgeId];
    onChange({ selectedBadges: updated });
  };

  // Copy caption to clipboard
  const handleCopyCaption = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCaptionIndex(index);
    setTimeout(() => setCopiedCaptionIndex(null), 2500);
  };

  // Apply AI Hook template
  const handleApplyHook = (hook: typeof AI_HOOK_TEMPLATES[0]) => {
    onChange({
      headline: hook.headline,
      subheadline: hook.subheadline,
      tagline: hook.tagline
    });
  };

  // Calculate discount percentage
  const savings = Math.max(0, campaign.originalPrice - campaign.promoPrice);
  const discountPercent = campaign.originalPrice > 0 
    ? Math.round((savings / campaign.originalPrice) * 100) 
    : 0;

  return (
    <div className="w-full lg:w-[460px] xl:w-[490px] bg-slate-900 border-l border-slate-800 flex flex-col h-[calc(100vh-61px)]">
      {/* Sidebar Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('promo')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
            activeTab === 'promo'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Promo & Harga</span>
        </button>

        <button
          onClick={() => setActiveTab('visual')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
            activeTab === 'visual'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Foto & Visual</span>
        </button>

        <button
          onClick={() => setActiveTab('brand')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
            activeTab === 'brand'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Brand & Info</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
            activeTab === 'theme'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Gaya & Tema</span>
        </button>

        <button
          onClick={() => setActiveTab('copy')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
            activeTab === 'copy'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-300" />
          <span>AI Caption</span>
        </button>
      </div>

      {/* Tab Contents (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
        {/* ==================== TAB 1: PROMO & HARGA ==================== */}
        {activeTab === 'promo' && (
          <div className="space-y-4">
            {/* AI Hook Inspiration Box */}
            <div className="bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900 border border-amber-500/30 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Hook Generator Otomatis
                </span>
                <span className="text-[10px] text-slate-400">Pilih gaya:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AI_HOOK_TEMPLATES.map((hook, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyHook(hook)}
                    className="text-[11px] bg-slate-800/90 hover:bg-amber-600 hover:text-white text-slate-300 px-2.5 py-1 rounded-md transition border border-slate-700/60"
                  >
                    {hook.tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Tagline Header */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pita / Tagline Atas
              </label>
              <input
                type="text"
                value={campaign.tagline}
                onChange={(e) => onChange({ tagline: e.target.value })}
                placeholder="Contoh: PROMO SPESIAL MINGGU INI 🔥"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Main Headline */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Judul Promo Utama (Headline)
              </label>
              <input
                type="text"
                value={campaign.headline}
                onChange={(e) => onChange({ headline: e.target.value })}
                placeholder="Contoh: BUY 1 GET 1 FREE"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-bold focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Subheadline */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subjudul / Penjelasan Promo
              </label>
              <textarea
                value={campaign.subheadline}
                onChange={(e) => onChange({ subheadline: e.target.value })}
                rows={2}
                placeholder="Contoh: Beli 1 Gourmet Truffle Burger, GRATIS 1 French Fries & Drink!"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Promo Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kategori Skema Promo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bogo', label: 'Buy 1 Get 1 (BOGO)' },
                  { id: 'flash_sale', label: 'Flash Sale' },
                  { id: 'combo', label: 'Paket Combo' },
                  { id: 'discount_percent', label: 'Diskon Persen' },
                  { id: 'discount_fixed', label: 'Potongan Harga' },
                  { id: 'new_menu', label: 'Menu Baru' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => onChange({ promoType: type.id as PromoType })}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition ${
                      campaign.promoType === type.id
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Controls & Calculation Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-orange-500" />
                  Kalkulasi Harga & Penghematan
                </span>
                {discountPercent > 0 && (
                  <span className="text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Hemat {discountPercent}%!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Harga Normal (Rp)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={campaign.originalPrice}
                    onChange={(e) => onChange({ originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-orange-400 font-semibold mb-1">
                    Harga Promo (Rp)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={campaign.promoPrice}
                    onChange={(e) => onChange({ promoPrice: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-orange-500/50 rounded-lg px-3 py-2 text-sm font-bold text-orange-400 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {savings > 0 && (
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-900">
                  <span>Konsumen menghemat:</span>
                  <span className="font-extrabold text-emerald-400">
                    Rp {savings.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
            </div>

            {/* Validity Period */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Masa Berlaku Promo
              </label>
              <input
                type="text"
                value={campaign.validUntil}
                onChange={(e) => onChange({ validUntil: e.target.value })}
                placeholder="Contoh: 31 Oktober 2026 / Hanya Hari Ini"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Syarat & Ketentuan (T&C)
              </label>
              <input
                type="text"
                value={campaign.terms}
                onChange={(e) => onChange({ terms: e.target.value })}
                placeholder="Contoh: *Berlaku Dine-in & Takeaway. Kuota terbatas 50 porsi/hari."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* ==================== TAB 2: FOTO & VISUAL ==================== */}
        {activeTab === 'visual' && (
          <div className="space-y-4">
            {/* Product Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nama Produk / Menu
              </label>
              <input
                type="text"
                value={campaign.productTitle}
                onChange={(e) => onChange({ productTitle: e.target.value })}
                placeholder="Contoh: Gourmet Truffle Beef Burger"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Custom Photo Upload */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-dashed border-slate-700 hover:border-orange-500/70 transition">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-6 h-6 text-orange-400 mb-1" />
                <span className="text-xs font-semibold text-slate-200">
                  Upload Foto Produk Sendiri
                </span>
                <span className="text-[10px] text-slate-500">
                  PNG / JPG transparan atau latar bersih
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'productImage')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Curated Food Gallery */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Atau Pilih dari Galeri Makanan HD:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 bg-slate-950/70 rounded-xl border border-slate-800">
                {FOOD_ASSETS.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => onChange({ 
                      productImage: asset.imageUrl,
                      productTitle: asset.name 
                    })}
                    className={`relative rounded-lg overflow-hidden border group transition ${
                      campaign.productImage === asset.imageUrl
                        ? 'border-orange-500 ring-2 ring-orange-500/30'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img 
                      src={asset.imageUrl} 
                      alt={asset.name} 
                      className="w-full h-16 object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1">
                      <p className="text-[10px] font-medium text-white truncate text-center">
                        {asset.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Scale Slider */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                <span>Ukuran Foto Produk:</span>
                <span className="font-bold text-orange-400">{campaign.productScale}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                value={campaign.productScale}
                onChange={(e) => onChange({ productScale: Number(e.target.value) })}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Visual Enhancements Toggles */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onChange({ productGlow: !campaign.productGlow })}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition ${
                  campaign.productGlow
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Efek Cahaya (Glow)</span>
              </button>

              <button
                onClick={() => onChange({ productShadow: !campaign.productShadow })}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition ${
                  campaign.productShadow
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <span>Bayangan (Shadow)</span>
              </button>
            </div>

            {/* Badges / Stickers Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Stiker / Badge Visual
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BADGE_OPTIONS.map((badge) => {
                  const isSelected = campaign.selectedBadges.includes(badge.id);
                  return (
                    <button
                      key={badge.id}
                      onClick={() => handleToggleBadge(badge.id)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition flex items-center gap-1 ${
                        isSelected
                          ? `${badge.bg} border-transparent font-bold shadow-md`
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: BRAND & INFO ==================== */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            {/* Restaurant Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nama Restoran / Brand
              </label>
              <input
                type="text"
                value={campaign.brandName}
                onChange={(e) => onChange({ brandName: e.target.value })}
                placeholder="Contoh: Burgerology Bistro"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Logo Upload */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {campaign.brandLogo ? (
                  <img src={campaign.brandLogo} alt="Logo" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                    LOGO
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-200">Logo Resto</p>
                  <p className="text-[10px] text-slate-500">Format PNG / JPG transparan</p>
                </div>
              </div>
              <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-200 cursor-pointer">
                Unggah
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'brandLogo')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Social Handles */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Akun Instagram
                </label>
                <input
                  type="text"
                  value={campaign.brandInstagram}
                  onChange={(e) => onChange({ brandInstagram: e.target.value })}
                  placeholder="@brand_resto"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nomor WhatsApp Order
                </label>
                <input
                  type="text"
                  value={campaign.brandWhatsApp}
                  onChange={(e) => onChange({ brandWhatsApp: e.target.value })}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Delivery Platforms Checklist */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tampilkan Badge Layanan Pesan Antar:
              </label>
              <div className="flex gap-2">
                {[
                  { key: 'gofood', label: 'GoFood', color: 'text-red-400' },
                  { key: 'grabfood', label: 'GrabFood', color: 'text-emerald-400' },
                  { key: 'shopeefood', label: 'ShopeeFood', color: 'text-orange-400' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-xs cursor-pointer hover:border-slate-700 transition"
                  >
                    <input
                      type="checkbox"
                      checked={campaign.deliveryPlatforms[item.key as keyof typeof campaign.deliveryPlatforms]}
                      onChange={(e) =>
                        onChange({
                          deliveryPlatforms: {
                            ...campaign.deliveryPlatforms,
                            [item.key]: e.target.checked,
                          },
                        })
                      }
                      className="accent-orange-500 rounded"
                    />
                    <span className={`font-semibold ${item.color}`}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* QR Code Settings */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-amber-400" />
                  QR Code Menu / Pemesanan
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={campaign.showQrCode}
                    onChange={(e) => onChange({ showQrCode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              {campaign.showQrCode && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Link Tujuan QR (URL Web / WhatsApp / Linktree)
                  </label>
                  <input
                    type="url"
                    value={campaign.orderLink}
                    onChange={(e) => onChange({ orderLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: GAYA & TEMA ==================== */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            {/* Color Palette Themes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Pilih Skema Warna F&B
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(THEME_CONFIGS).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => onChange({ theme: key as ThemeStyle })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                      campaign.theme === key
                        ? 'border-orange-500 bg-orange-500/10 ring-1 ring-orange-500'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full shadow-sm shrink-0" 
                      style={{ backgroundColor: config.accent }}
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-200 truncate">{config.name.split('(')[0]}</p>
                      <p className="text-[10px] text-slate-500 truncate">{config.name.split('(')[1]?.replace(')', '') || ''}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Gaya Tipografi Headline
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bebas', name: 'Bebas Neue', desc: 'Bold & Striking' },
                  { id: 'outfit', name: 'Outfit Modern', desc: 'Clean & Tech' },
                  { id: 'playfair', name: 'Playfair Serif', desc: 'Artisan & Bistro' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange({ fontStyle: f.id as any })}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      campaign.fontStyle === f.id
                        ? 'border-orange-500 bg-orange-500/15 text-orange-400 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="block text-sm">{f.name}</span>
                    <span className="text-[10px] text-slate-500 block">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Background Image */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Latar Belakang Khusus
                </span>
                {campaign.customBgUrl && (
                  <button
                    onClick={() => onChange({ customBgUrl: '' })}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Hapus Custom BG
                  </button>
                )}
              </div>
              <input
                type="text"
                value={campaign.customBgUrl}
                onChange={(e) => onChange({ customBgUrl: e.target.value })}
                placeholder="URL Gambar Latar Belakang (Opsional)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* ==================== TAB 5: AI CAPTION ==================== */}
        {activeTab === 'copy' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 p-3.5 rounded-xl border border-orange-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h4 className="text-xs font-bold text-orange-300">
                  Copywriting & Caption Otomatis
                </h4>
              </div>
              <p className="text-[11px] text-slate-400">
                Teks promosi disesuaikan secara dinamis dengan nama produk, harga promo, dan kontak resto Anda.
              </p>
            </div>

            {CAPTION_TEMPLATES.map((tmpl, index) => {
              const generatedText = tmpl.generate(campaign);
              const isCopied = copiedCaptionIndex === index;

              return (
                <div key={index} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">
                      {tmpl.title}
                    </span>
                    <button
                      onClick={() => handleCopyCaption(generatedText, index)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
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
                          <span>Salin Caption</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg whitespace-pre-wrap font-sans max-h-48 overflow-y-auto border border-slate-800/80 leading-relaxed">
                    {generatedText}
                  </pre>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
