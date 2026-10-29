export type AspectRatio = '1:1' | '9:16' | '16:9' | '4:5' | '3:4';

export type PromoType = 'discount_percent' | 'discount_fixed' | 'bogo' | 'flash_sale' | 'combo' | 'new_menu';

export type ThemeStyle = 'fiery-red' | 'warm-cafe' | 'dark-luxury' | 'matcha-zen' | 'vibrant-orange' | 'neon-night' | 'pastel-sweet';

export interface FoodAsset {
  id: string;
  name: string;
  category: 'burger' | 'drink' | 'coffee' | 'asian' | 'western' | 'dessert';
  imageUrl: string;
  badge?: string;
}

export interface PromoTemplate {
  id: string;
  title: string;
  description: string;
  aspectRatio: AspectRatio;
  theme: ThemeStyle;
  promoType: PromoType;
  headline: string;
  subheadline: string;
  tagline: string;
  productTitle: string;
  originalPrice: number;
  promoPrice: number;
  productImage: string;
  brandName: string;
  validUntil: string;
  terms: string;
  selectedBadges: string[];
}

export interface CampaignState {
  id: string;
  name: string;
  aspectRatio: AspectRatio;
  theme: ThemeStyle;
  promoType: PromoType;
  headline: string;
  subheadline: string;
  tagline: string;
  productTitle: string;
  originalPrice: number;
  promoPrice: number;
  productImage: string;
  productScale: number;
  productGlow: boolean;
  productShadow: boolean;
  brandName: string;
  brandLogo: string;
  brandInstagram: string;
  brandWhatsApp: string;
  orderLink: string;
  validUntil: string;
  terms: string;
  showQrCode: boolean;
  deliveryPlatforms: {
    gofood: boolean;
    grabfood: boolean;
    shopeefood: boolean;
  };
  selectedBadges: string[];
  customBgUrl: string;
  fontStyle: 'bebas' | 'outfit' | 'playfair';
  updatedAt: number;
}
