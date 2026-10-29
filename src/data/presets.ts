import type { FoodAsset, PromoTemplate, ThemeStyle, CampaignState } from '../types';

export const FOOD_ASSETS: FoodAsset[] = [
  {
    id: 'burger-truffle',
    name: 'Gourmet Truffle Beef Burger',
    category: 'burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    badge: 'Best Seller'
  },
  {
    id: 'boba-brownsugar',
    name: 'Brown Sugar Fresh Milk Boba',
    category: 'drink',
    imageUrl: 'https://images.unsplash.com/photo-1558857563-b37cf5a452ef?auto=format&fit=crop&w=1000&q=80',
    badge: 'Customer Favorite'
  },
  {
    id: 'iced-caramel-latte',
    name: 'Artisan Iced Caramel Macchiato',
    category: 'coffee',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    badge: 'Signature Brew'
  },
  {
    id: 'japanese-ramen',
    name: 'Spicy Chashu Tonkotsu Ramen',
    category: 'asian',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    badge: 'Super Gurih'
  },
  {
    id: 'woodfire-pizza',
    name: 'Classic Pepperoni Overload Pizza',
    category: 'western',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    badge: 'Cheesy Goodness'
  },
  {
    id: 'crispy-chicken',
    name: 'Golden Korean Crispy Chicken Wings',
    category: 'western',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
    badge: 'Extra Crispy'
  },
  {
    id: 'sushi-mentai',
    name: 'Flame-Torched Salmon Mentai Platter',
    category: 'asian',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80',
    badge: 'Premium Grade'
  },
  {
    id: 'french-croissant',
    name: 'Almond Butter French Croissant',
    category: 'dessert',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
    badge: 'Fresh Daily'
  },
  {
    id: 'matcha-latte',
    name: 'Ceremonial Uji Matcha Latte',
    category: 'drink',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80',
    badge: '100% Organic'
  },
  {
    id: 'sate-ayam',
    name: 'Sate Ayam Bumbu Kacang Madura',
    category: 'asian',
    imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1000&q=80',
    badge: 'Resep Nusantara'
  }
];

export const BADGE_OPTIONS = [
  { id: 'halal', label: '100% HALAL', icon: '✨', bg: 'bg-emerald-600 text-white' },
  { id: 'bestseller', label: 'BEST SELLER ⭐', icon: '⭐', bg: 'bg-amber-500 text-slate-950 font-bold' },
  { id: 'chefrecom', label: "CHEF'S PICK 👨‍🍳", icon: '👨‍🍳', bg: 'bg-rose-600 text-white' },
  { id: 'spicy', label: 'EXTRA PEDAS 🌶️🔥', icon: '🌶️', bg: 'bg-red-600 text-white' },
  { id: 'limited', label: 'HANYA HARI INI ⏳', icon: '⏳', bg: 'bg-orange-500 text-white' },
  { id: 'freeongkir', label: 'FREE ONGKIR 🛵', icon: '🛵', bg: 'bg-blue-600 text-white' },
  { id: 'fresh', label: 'DIBUAT SEGAR SETIAP HARI', icon: '🌿', bg: 'bg-teal-600 text-white' },
];

export const THEME_CONFIGS: Record<ThemeStyle, {
  name: string;
  gradient: string;
  accent: string;
  cardBg: string;
  tagColor: string;
  priceBadge: string;
  textColor: string;
}> = {
  'fiery-red': {
    name: 'Fiery Red (High Energy / Fast Food)',
    gradient: 'from-red-950 via-rose-900 to-amber-950',
    accent: '#ef4444',
    cardBg: 'bg-red-950/70 border-red-500/30',
    tagColor: 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-red-500/30',
    priceBadge: 'bg-amber-400 text-slate-950',
    textColor: 'text-white'
  },
  'vibrant-orange': {
    name: 'Vibrant Orange (Appetizing & Cheerful)',
    gradient: 'from-orange-950 via-amber-900 to-slate-950',
    accent: '#f97316',
    cardBg: 'bg-orange-950/60 border-orange-500/30',
    tagColor: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/30',
    priceBadge: 'bg-amber-400 text-slate-950',
    textColor: 'text-white'
  },
  'dark-luxury': {
    name: 'Dark Luxury (Gourmet, Steak & Bistro)',
    gradient: 'from-zinc-950 via-stone-900 to-neutral-950',
    accent: '#eab308',
    cardBg: 'bg-zinc-900/80 border-amber-500/30',
    tagColor: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold shadow-amber-500/20',
    priceBadge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black',
    textColor: 'text-amber-100'
  },
  'warm-cafe': {
    name: 'Warm Cafe (Coffee, Bakery & Brunch)',
    gradient: 'from-stone-900 via-amber-950/70 to-neutral-900',
    accent: '#d97706',
    cardBg: 'bg-stone-900/70 border-amber-700/40',
    tagColor: 'bg-amber-700 text-amber-50 shadow-amber-700/20',
    priceBadge: 'bg-amber-300 text-stone-950 font-bold',
    textColor: 'text-stone-100'
  },
  'matcha-zen': {
    name: 'Matcha Zen (Japanese & Healthy Food)',
    gradient: 'from-emerald-950 via-teal-900 to-slate-950',
    accent: '#10b981',
    cardBg: 'bg-emerald-950/60 border-emerald-500/30',
    tagColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/30',
    priceBadge: 'bg-emerald-400 text-slate-950 font-bold',
    textColor: 'text-emerald-50'
  },
  'neon-night': {
    name: 'Neon Street Food (Late Night Vibes)',
    gradient: 'from-slate-950 via-purple-950 to-indigo-950',
    accent: '#8b5cf6',
    cardBg: 'bg-slate-900/80 border-purple-500/40',
    tagColor: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-fuchsia-500/40',
    priceBadge: 'bg-cyan-400 text-slate-950 font-black',
    textColor: 'text-white'
  },
  'pastel-sweet': {
    name: 'Sweet Pastels (Dessert, Ice Cream & Boba)',
    gradient: 'from-rose-950 via-pink-900/60 to-purple-950',
    accent: '#ec4899',
    cardBg: 'bg-pink-950/50 border-pink-500/30',
    tagColor: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-pink-500/20',
    priceBadge: 'bg-pink-300 text-slate-950 font-bold',
    textColor: 'text-pink-50'
  }
};

export const PRESET_TEMPLATES: PromoTemplate[] = [
  {
    id: 'template-bogo',
    title: 'BUY 1 GET 1 FREE (BOGO)',
    description: 'Format paling efektif untuk mendongkrak omset & kunjungan pelanggan baru.',
    aspectRatio: '1:1',
    theme: 'fiery-red',
    promoType: 'bogo',
    tagline: 'PROMO SPESIAL MINGGU INI 🔥',
    headline: 'BUY 1 GET 1 FREE',
    subheadline: 'Beli 1 Gourmet Truffle Burger, GRATIS 1 French Fries & Drink!',
    productTitle: 'Gourmet Truffle Burger Duo',
    originalPrice: 70000,
    promoPrice: 35000,
    productImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    brandName: 'Burgerology Bistro',
    validUntil: '31 Oktober 2026',
    terms: '*Berlaku Dine-in & Takeaway. Kuota terbatas 50 porsi/hari.',
    selectedBadges: ['bestseller', 'halal']
  },
  {
    id: 'template-flashsale',
    title: 'FLASH SALE 50% OFF',
    description: 'Menciptakan urgensi tinggi dengan diskon setengah harga terbatas.',
    aspectRatio: '9:16',
    theme: 'vibrant-orange',
    promoType: 'flash_sale',
    tagline: '⚡ FLASH SALE 2 JAM AJA!',
    headline: 'DISKON 50% SEMUA MENU',
    subheadline: 'Segarkan harimu dengan Brown Sugar Fresh Milk Boba favoritmu!',
    productTitle: 'Brown Sugar Boba Series',
    originalPrice: 38000,
    promoPrice: 19000,
    productImage: 'https://images.unsplash.com/photo-1558857563-b37cf5a452ef?auto=format&fit=crop&w=1000&q=80',
    brandName: 'Tealand Boba Bar',
    validUntil: 'Hanya Hari Ini (14:00 - 16:00)',
    terms: '*Maksimal pembelian 2 cup/transaksi. Tunjukkan postingan ini ke kasir.',
    selectedBadges: ['limited', 'bestseller']
  },
  {
    id: 'template-combokeyang',
    title: 'PAKET KENYANG COMBO HEMAT',
    description: 'Menonjolkan nilai hemat paket makanan + minuman lengkap.',
    aspectRatio: '4:5',
    theme: 'dark-luxury',
    promoType: 'combo',
    tagline: 'LUNCH DEAL HEMAT MAKSIMAL 🥩',
    headline: 'PAKET MEWAH, HARGA RAMAH',
    subheadline: 'Nikmati Salmon Mentai Platter + Iced Green Tea Segar!',
    productTitle: 'Salmon Mentai Bento Special',
    originalPrice: 85000,
    promoPrice: 49000,
    productImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80',
    brandName: 'Kuroda Japanese Kitchen',
    validUntil: 'Setiap Senin - Jumat (11.00 - 15.00)',
    terms: '*Harga belum termasuk pajak resto. Berlaku kelipatan.',
    selectedBadges: ['chefrecom', 'halal']
  },
  {
    id: 'template-coffeebreak',
    title: 'AFTERNOON COFFEE & CROISSANT',
    description: 'Visual estetik untuk kafe, coffee shop & bakery santai.',
    aspectRatio: '1:1',
    theme: 'warm-cafe',
    promoType: 'discount_fixed',
    tagline: '☕ WAKTUNYA NONGKRONG SORE',
    headline: 'COFFEE & PASTRY PAIRING',
    subheadline: 'Kombinasi sempurna Iced Caramel Macchiato & Warm Croissant.',
    productTitle: 'Artisan Coffee Combo',
    originalPrice: 55000,
    promoPrice: 35000,
    productImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    brandName: 'Senja Roastery Cafe',
    validUntil: 'Setiap Hari (15:00 - 18:00)',
    terms: '*Tersedia dine-in & takeaway. WiFi kencang & smoking area tersedia.',
    selectedBadges: ['fresh']
  },
  {
    id: 'template-newmenu',
    title: 'NEW SIGNATURE LAUNCH',
    description: 'Pengenalan menu baru dengan visual eksklusif dan menggoda selera.',
    aspectRatio: '16:9',
    theme: 'matcha-zen',
    promoType: 'new_menu',
    tagline: '✨ MENU BARU TELAH HADIR!',
    headline: 'AUTHENTIC MATCHA EXPERIENCE',
    subheadline: 'Dibuat langsung dengan bubuk Ceremonial Matcha import dari Uji, Kyoto.',
    productTitle: 'Kyoto Ceremonial Matcha Series',
    originalPrice: 42000,
    promoPrice: 29000,
    productImage: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80',
    brandName: 'Zencha Tea Atelier',
    validUntil: 'Periode Launching s/d Akhir Bulan',
    terms: '*Diskon 30% khusus pembelian via Direct Order / WhatsApp.',
    selectedBadges: ['chefrecom']
  }
];

export const INITIAL_CAMPAIGN: CampaignState = {
  id: 'campaign-default',
  name: 'Promo Buy 1 Get 1 Burgerology',
  aspectRatio: '1:1',
  theme: 'fiery-red',
  promoType: 'bogo',
  tagline: 'PROMO SPESIAL MINGGU INI 🔥',
  headline: 'BUY 1 GET 1 FREE',
  subheadline: 'Beli 1 Gourmet Truffle Burger, GRATIS 1 French Fries & Drink!',
  productTitle: 'Gourmet Truffle Burger Duo',
  originalPrice: 70000,
  promoPrice: 35000,
  productImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
  productScale: 100,
  productGlow: true,
  productShadow: true,
  brandName: 'Burgerology Bistro',
  brandLogo: '',
  brandInstagram: '@burgerology.id',
  brandWhatsApp: '0812-3456-7890',
  orderLink: 'https://bit.ly/order-burgerology',
  validUntil: '31 Oktober 2026',
  terms: '*Berlaku Dine-in & Takeaway. Kuota terbatas 50 porsi/hari.',
  showQrCode: true,
  deliveryPlatforms: {
    gofood: true,
    grabfood: true,
    shopeefood: true
  },
  selectedBadges: ['bestseller', 'halal'],
  customBgUrl: '',
  fontStyle: 'bebas',
  updatedAt: Date.now()
};

export const AI_HOOK_TEMPLATES = [
  {
    tone: '🔥 FOMO & Urgent (Mendesak)',
    headline: 'JANGAN SAMPAI KEHABISAN!',
    subheadline: 'Diskon kilat hanya untuk 50 pemesan pertama hari ini.',
    tagline: '⚠️ KUOTA MAKIN MENIPIS!'
  },
  {
    tone: '🤤 Foodie & Menggugah Selera',
    headline: 'GURIH, MELELEH, NAGIH!',
    subheadline: 'Sensasi kelezatan premium yang bikin lidah kamu nggak mau berhenti ngunyah.',
    tagline: '✨ RASA BINTANG LIMA, HARGA BERSAHABAT'
  },
  {
    tone: '⚡ Gen-Z & Santai',
    headline: 'HEALING TERBAIK YA MAKAN!',
    subheadline: 'Lagi bad mood? Traktir diri kamu dengan menu favorit diskon gede-gedean.',
    tagline: '🤙 DOMPET AMAN, PERUT SENANG'
  },
  {
    tone: '👨‍👩‍👧‍👦 Paket Hemat Keluarga / Ramean',
    headline: 'MAKAN RAMEAN LEBIH HEMAT',
    subheadline: 'Satu paket lengkap buat nongkrong seru bareng sahabat atau keluarga tercinta.',
    tagline: '🎉 KENYANG MAKSIMAL, HEMAT HINGGA 40%'
  },
  {
    tone: '☕ Cozy & Chill Time',
    headline: 'WAKTU NYA PAUSE SEBENTAR',
    subheadline: 'Temani sore harimu dengan seduhan kopi terbaik dan kudapan manis pilihan.',
    tagline: '🌿 SENJA & SECANGKIR HANGAT'
  }
];

export const CAPTION_TEMPLATES = [
  {
    title: 'Instagram Feed Hook (Viral & Engaging)',
    generate: (c: CampaignState) => `🚨 STOP SCROLLING! PROMO GILA DARI ${c.brandName.toUpperCase()}! 🚨

Laper tapi pengen tetep hemat? Tenang, ${c.brandName} punya kabar gembira buat kalian semua! 🎉

🔥 *${c.headline}* 🔥
${c.subheadline}

💰 Harga Normal: ~Rp ${c.originalPrice.toLocaleString('id-ID')}~
🏷️ Cuma: *Rp ${c.promoPrice.toLocaleString('id-ID')}*! (Hemat Rp ${(c.originalPrice - c.promoPrice).toLocaleString('id-ID')})

📅 Berlaku sampai: ${c.validUntil}
📝 ${c.terms}

Yuk tag temen/ayank kamu yang mau kamu ajak makan bareng sekarang juga di kolom komentar! 👇

📲 Order gampang via:
- WhatsApp: ${c.brandWhatsApp}
- Link di Bio kami: ${c.brandInstagram}
- Tersedia di GoFood, GrabFood, & ShopeeFood!

#kuliner #promoFNB #diskonmakanan #promokuliner #${c.brandName.replace(/\s+/g, '').toLowerCase()} #makanenak #promohariini #foodies`
  },
  {
    title: 'WhatsApp Broadcast Format (Singkat & To the Point)',
    generate: (c: CampaignState) => `*PROMO SPESIAL HARI INI DARI ${c.brandName.toUpperCase()}* 🍔✨

Halo food lovers! Nikmati penawaran spesial terbatas:

⭐ *${c.headline}* ⭐
${c.subheadline}

💸 Dari ~Rp ${c.originalPrice.toLocaleString('id-ID')}~ jadi *Rp ${c.promoPrice.toLocaleString('id-ID')}* aja!

🗓️ Berlaku s/d: *${c.validUntil}*
⚠️ *Catatan:* ${c.terms}

Pesan sekarang sebelum kehabisan slot harian ya kak! 
Balas chat ini dengan format:
*"Halo Kak, mau order promo ${c.productTitle}"*

Atau order via link: ${c.orderLink || 'https://wa.me/'}`
  }
];
