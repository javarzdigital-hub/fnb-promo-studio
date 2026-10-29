import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Clock, 
  Phone
} from 'lucide-react';
import type { CampaignState } from '../types';
import { THEME_CONFIGS, BADGE_OPTIONS } from '../data/presets';

interface CanvasPreviewProps {
  campaign: CampaignState;
}

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ campaign }, ref) => {
    const theme = THEME_CONFIGS[campaign.theme] || THEME_CONFIGS['fiery-red'];

    // Aspect ratio container dimensions & sizing
    const ratioDimensions: Record<string, { container: string; maxW: string }> = {
      '1:1': { container: 'aspect-square w-[540px]', maxW: 'max-w-[540px]' },
      '9:16': { container: 'aspect-[9/16] w-[420px]', maxW: 'max-w-[420px]' },
      '4:5': { container: 'aspect-[4/5] w-[480px]', maxW: 'max-w-[480px]' },
      '16:9': { container: 'aspect-[16/9] w-[680px]', maxW: 'max-w-[680px]' },
      '3:4': { container: 'aspect-[3/4] w-[480px]', maxW: 'max-w-[480px]' },
    };

    const currentDims = ratioDimensions[campaign.aspectRatio] || ratioDimensions['1:1'];

    // Calculate discount percentages and savings
    const savings = Math.max(0, campaign.originalPrice - campaign.promoPrice);
    const discountPercent = campaign.originalPrice > 0 
      ? Math.round((savings / campaign.originalPrice) * 100) 
      : 0;

    // Font style classes
    const fontClass = campaign.fontStyle === 'bebas'
      ? 'font-bebas tracking-wider'
      : campaign.fontStyle === 'playfair'
      ? 'font-playfair'
      : 'font-display font-black tracking-tight';

    return (
      <div className="flex flex-col items-center justify-center p-2 w-full select-none">
        {/* Aspect Ratio Badge above canvas */}
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Preview • Format <strong>{campaign.aspectRatio}</strong></span>
        </div>

        {/* Outer Shadow Wrapper */}
        <div className="relative shadow-2xl shadow-black/80 rounded-2xl overflow-hidden border border-slate-800/80">
          {/* THE ACTUAL CANVAS ELEMENT CAPTURED FOR EXPORT */}
          <div
            ref={ref}
            id="fnb-poster-canvas"
            className={`relative flex flex-col justify-between overflow-hidden text-white transition-all duration-300 ${currentDims.container} ${currentDims.maxW}`}
            style={{
              background: campaign.customBgUrl
                ? `url(${campaign.customBgUrl}) center/cover no-repeat`
                : undefined,
            }}
          >
            {/* Background Gradients & Glow Effects if no custom image */}
            {!campaign.customBgUrl && (
              <>
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-95`} />
                {/* Radial Spotlight Behind Food */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 55%, ${theme.accent} 0%, transparent 65%)`
                  }}
                />
                {/* Halftone / Subtle texture */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              </>
            )}

            {/* TOP SECTION: Brand Header & Badges */}
            <div className="relative z-10 p-5 sm:p-6 pb-2">
              <div className="flex items-center justify-between gap-3">
                {/* Brand Identity */}
                <div className="flex items-center gap-2.5">
                  {campaign.brandLogo ? (
                    <img 
                      src={campaign.brandLogo} 
                      alt="Brand Logo" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/40 shadow-md"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-lg shadow-sm">
                      🍽️
                    </div>
                  )}
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base tracking-wide uppercase drop-shadow-md">
                      {campaign.brandName || 'Brand Resto'}
                    </h3>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest font-medium">
                      Authentic Culinary
                    </p>
                  </div>
                </div>

                {/* Floating Tagline Pill */}
                {campaign.tagline && (
                  <div className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase shadow-lg backdrop-blur-sm border border-white/20 ${theme.tagColor}`}>
                    {campaign.tagline}
                  </div>
                )}
              </div>

              {/* Badges Row (Halal, Best Seller, Chef Pick, etc.) */}
              {campaign.selectedBadges.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {campaign.selectedBadges.map((badgeId) => {
                    const badge = BADGE_OPTIONS.find((b) => b.id === badgeId);
                    if (!badge) return null;
                    return (
                      <span
                        key={badge.id}
                        className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full shadow-md border border-white/15 ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* MAIN HEADLINE & SUBHEAD */}
              <div className="mt-4 text-center">
                <h2 
                  className={`text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.95] drop-shadow-xl ${fontClass}`}
                  style={{
                    textShadow: '0 4px 18px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)'
                  }}
                >
                  <span className="bg-gradient-to-b from-white via-white to-amber-100 bg-clip-text text-transparent">
                    {campaign.headline || 'PROMO SPESIAL'}
                  </span>
                </h2>
                {campaign.subheadline && (
                  <p className="mt-1.5 text-xs sm:text-sm text-white/90 font-medium max-w-[85%] mx-auto drop-shadow-md line-clamp-2">
                    {campaign.subheadline}
                  </p>
                )}
              </div>
            </div>

            {/* MIDDLE SECTION: Food Hero Showcase + Floating Price Stamp */}
            <div className="relative z-10 flex-1 flex items-center justify-center my-1 px-4">
              <div className="relative w-full flex items-center justify-center">
                {/* Backplate Glow */}
                {campaign.productGlow && (
                  <div 
                    className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full blur-2xl opacity-60 pointer-events-none"
                    style={{ backgroundColor: theme.accent }}
                  />
                )}

                {/* Food Image with scale and shadow */}
                <div 
                  className="relative transition-transform duration-200"
                  style={{ transform: `scale(${campaign.productScale / 100})` }}
                >
                  <img
                    src={campaign.productImage}
                    alt={campaign.productTitle}
                    crossOrigin="anonymous"
                    className={`max-h-[220px] sm:max-h-[260px] md:max-h-[300px] w-auto object-contain rounded-2xl ${
                      campaign.productShadow ? 'drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]' : ''
                    }`}
                  />
                </div>

                {/* Floating Price & Discount Stamp */}
                <div className="absolute -bottom-3 right-2 sm:right-6 bg-slate-950/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border-2 border-amber-400 shadow-2xl shadow-black/80 flex flex-col items-center rotate-[-3deg] transform hover:rotate-0 transition">
                  {/* Discount percentage tag */}
                  {discountPercent > 0 && (
                    <span className="bg-red-600 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase mb-1 shadow-sm animate-pulse">
                      HEMAT {discountPercent}%!
                    </span>
                  )}
                  {/* Original Strikethrough Price */}
                  {campaign.originalPrice > campaign.promoPrice && (
                    <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                      Rp {campaign.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                  {/* Main Promo Price */}
                  <span className={`text-lg sm:text-2xl font-black tracking-tight ${theme.textColor}`}>
                    Rp {campaign.promoPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-amber-400 mt-0.5 tracking-wider">
                    {campaign.promoType === 'bogo' ? 'DAPAT 2 PORSI!' : 'HARGA PROMO'}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Title Bar (Sub-hero) */}
            {campaign.productTitle && (
              <div className="relative z-10 px-6 py-1 text-center">
                <span className="inline-block bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/10 shadow-sm">
                  🍴 {campaign.productTitle}
                </span>
              </div>
            )}

            {/* BOTTOM SECTION: Footer, Validity, Delivery Badges, QR Code & Contacts */}
            <div className="relative z-10 p-4 sm:p-5 pt-2 bg-gradient-to-t from-black/85 via-black/60 to-transparent">
              <div className="flex items-end justify-between gap-3">
                {/* Left: Validity, Terms, & Social Order Contacts */}
                <div className="flex-1 space-y-1.5">
                  {/* Valid Until Pill */}
                  {campaign.validUntil && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Periode: {campaign.validUntil}</span>
                    </div>
                  )}

                  {/* Delivery Platform Logos */}
                  {(campaign.deliveryPlatforms.gofood || campaign.deliveryPlatforms.grabfood || campaign.deliveryPlatforms.shopeefood) && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[10px] text-white/60 font-medium">Tersedia di:</span>
                      <div className="flex items-center gap-1.5">
                        {campaign.deliveryPlatforms.gofood && (
                          <span className="bg-red-500/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                            GoFood
                          </span>
                        )}
                        {campaign.deliveryPlatforms.grabfood && (
                          <span className="bg-emerald-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                            GrabFood
                          </span>
                        )}
                        {campaign.deliveryPlatforms.shopeefood && (
                          <span className="bg-orange-500/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                            ShopeeFood
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Handles & Phone */}
                  <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] text-white/80 pt-1">
                    {campaign.brandInstagram && (
                      <span className="flex items-center gap-1 font-medium">
                        <svg className="w-3 h-3 fill-current text-pink-400" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        {campaign.brandInstagram}
                      </span>
                    )}
                    {campaign.brandWhatsApp && (
                      <span className="flex items-center gap-1 font-semibold text-emerald-300">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        {campaign.brandWhatsApp}
                      </span>
                    )}
                  </div>

                  {/* T&C Small Text */}
                  {campaign.terms && (
                    <p className="text-[9px] text-white/50 leading-tight pt-0.5 line-clamp-1">
                      {campaign.terms}
                    </p>
                  )}
                </div>

                {/* Right: QR Code for Table Order / Digital Menu */}
                {campaign.showQrCode && (
                  <div className="flex flex-col items-center bg-white p-1.5 rounded-xl shadow-lg border border-slate-200">
                    <QRCodeSVG 
                      value={campaign.orderLink || 'https://google.com'} 
                      size={52}
                      level="M"
                    />
                    <span className="text-[8px] font-black text-slate-900 tracking-tighter mt-0.5">
                      SCAN MENU
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
