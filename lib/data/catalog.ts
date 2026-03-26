import { CategoryMeta, Product, ProductCategory, Testimonial } from '@/lib/types/entities';

export const categoryMeta: Record<ProductCategory, CategoryMeta> = {
  laptops: {
    slug: 'laptops',
    label: 'Laptops',
    shortLabel: 'Laptop Deals',
    heroTitle: 'Premium Laptops for Work & Play',
    heroSubtitle: 'Gaming, business, and budget laptops with reliable local support.',
    heroImage:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80',
    seoTitle: 'Laptops Vengavasal | Foto Palace',
    seoDescription: 'Shop Dell, HP, ASUS laptops at Foto Palace, Vengavasal.'
  },
  'gaming-desktops': {
    slug: 'gaming-desktops',
    label: 'Gaming Desktops',
    shortLabel: 'Gaming PCs',
    heroTitle: 'Ultimate Gaming Desktops - Built to Win',
    heroSubtitle: 'High-FPS setups, RGB aesthetics, and custom upgrades for every gamer.',
    heroImage:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80',
    seoTitle: 'Gaming Desktop Store Vengavasal | Foto Palace',
    seoDescription: 'Explore pre-built and custom gaming desktops with upgrade options.'
  },
  printers: {
    slug: 'printers',
    label: 'Printers',
    shortLabel: 'Printers',
    heroTitle: 'Reliable Printers for Every Need',
    heroSubtitle: 'Home, office, and bulk printing solutions with expert recommendations.',
    heroImage:
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1600&q=80',
    seoTitle: 'Printer Shop Vengavasal | Foto Palace',
    seoDescription: 'Inkjet, laser, and wireless multifunction printers from top brands.'
  },
  cctv: {
    slug: 'cctv',
    label: 'CCTV',
    shortLabel: 'Security CCTV',
    heroTitle: 'Secure Your World with CCTV',
    heroSubtitle: 'Smart surveillance systems with professional installation support.',
    heroImage:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80',
    seoTitle: 'CCTV Installation Vengavasal | Foto Palace',
    seoDescription: 'Wireless IP cameras, DVR kits, and night-vision solutions for home and office.'
  },
  'assembled-desktops': {
    slug: 'assembled-desktops',
    label: 'Assembled Desktops',
    shortLabel: 'Custom Builds',
    heroTitle: 'Custom Assembled Desktops - Tailored for You',
    heroSubtitle: 'Component-level customization, testing, and in-store assembly by experts.',
    heroImage:
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1600&q=80',
    seoTitle: 'Assembled Desktop Vengavasal | Foto Palace',
    seoDescription: 'Get performance desktops assembled to your exact budget and needs.'
  },
  accessories: {
    slug: 'accessories',
    label: 'IT Accessories',
    shortLabel: 'Accessories',
    heroTitle: 'All IT Accessories Under One Roof',
    heroSubtitle: 'Peripherals, cables, monitors, power backup, and more for every setup.',
    heroImage:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=80',
    seoTitle: 'IT Accessories Vengavasal | Foto Palace',
    seoDescription: 'Find keyboards, mice, headphones, UPS, and essential accessories.'
  }
};

export const heroSlides = [
  {
    title: 'Foto Palace - No 1 Tech Store',
    subtitle: 'Best Deals on Tech in Vengavasal',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80'
  },
  {
    title: 'Gaming Setups That Perform',
    subtitle: 'Custom builds, RGB, and future-ready upgrades',
    image:
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1800&q=80'
  },
  {
    title: 'Business Tech Made Simple',
    subtitle: 'Laptops, printers, CCTV, and accessories under one roof',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80'
  }
];

export const defaultProducts: Product[] = [
  {
    id: 'dell-g15-gaming',
    title: 'Dell G15 Gaming Laptop',
    category: 'laptops',
    brand: 'Dell',
    priceRange: '₹78,000 - ₹95,000',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', 'RTX 3050'],
    features: ['RGB Keyboard', '144Hz Display'],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The Dell G15 is a powerhouse gaming laptop designed for high-performance gaming. Featuring the latest Intel Core i7 processor and NVIDIA RTX 3050 graphics, it delivers smooth visuals on its fast 144Hz display.',
    isFeatured: true,
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'hp-probook-440',
    title: 'HP ProBook 440',
    category: 'laptops',
    brand: 'HP',
    priceRange: '₹56,000 - ₹68,000',
    specs: ['Intel Core i5', '8GB RAM', '512GB SSD'],
    features: ['Business Ready', 'Lightweight'],
    images: [
      'https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Perfect for business professionals, the HP ProBook 440 offers essential security and durability in a stylish design. Lightweight and ready for any task.',
    isFeatured: true,
    displayOrder: 2,
    status: 'active'
  },
  {
    title: 'ASUS VivoBook Budget',
    category: 'laptops',
    brand: 'ASUS',
    priceRange: '₹42,000 - ₹49,000',
    specs: ['Ryzen 5', '8GB RAM', '512GB SSD'],
    features: ['Under ₹50,000', 'Fast SSD'],
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80'
    ],
    isFeatured: false,
    displayOrder: 3,
    status: 'active'
  },
  {
    id: 'gaming-pc-entry',
    title: 'Entry-Level Gaming PC',
    category: 'gaming-desktops',
    brand: 'Custom',
    priceRange: '₹80,000+',
    specs: ['Ryzen 5 7600', '16GB RAM', 'RTX 4060'],
    features: ['RGB Fans', 'Upgradeable'],
    images: [
      'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Start your gaming journey with this powerful entry-level desktop. High frame rates in 1080p and a beautiful RGB design.',
    isFeatured: true,
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'esports-rig',
    title: 'Pro Esports Rig',
    category: 'gaming-desktops',
    brand: 'Custom',
    priceRange: '₹1.5L+',
    specs: ['Intel i7 14700K', '32GB RAM', 'RTX 4070 Ti'],
    features: ['Liquid Cooling', 'High FPS Ready'],
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A professional-grade gaming machine built for esports. With liquid cooling and the latest high-end components, it handles any game at competitive frame rates.',
    isFeatured: true,
    displayOrder: 2,
    status: 'active'
  },
  {
    id: 'hp-smart-tank-580',
    title: 'HP Smart Tank 580',
    category: 'printers',
    brand: 'HP',
    priceRange: '₹16,000 - ₹21,000',
    specs: ['Wireless', 'Print/Scan/Copy', '15 ppm'],
    features: ['Low Print Cost', 'Home Office'],
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'High-volume printing made easy with the HP Smart Tank 580. Features low-cost ink bottles and robust wireless connectivity.',
    isFeatured: true,
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'canon-lbp-2900',
    title: 'Canon Laser LBP 2900',
    category: 'printers',
    brand: 'Canon',
    priceRange: '₹12,000 - ₹16,000',
    specs: ['Laser', '18 ppm', 'USB'],
    features: ['Office Volume', 'Sharp Text'],
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The legendary Canon LBP 2900 is known for its reliability and sharp laser printing. Perfect for small offices and student workloads.',
    isFeatured: false,
    displayOrder: 2,
    status: 'active'
  },
  {
    id: '8-ch-cctv',
    title: '8-Channel CCTV Kit',
    category: 'cctv',
    brand: 'Hikvision',
    priceRange: '₹24,000 - ₹39,000',
    specs: ['8 Cameras', 'Night Vision', 'DVR'],
    features: ['24/7 Recording', 'Mobile App View'],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Complete security solution for your home or business. Includes 8 high-definition night-vision cameras and a 24/7 recording DVR.',
    isFeatured: true,
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'wireless-ip-cam',
    title: 'Wireless IP Security Cam',
    category: 'cctv',
    brand: 'CP Plus',
    priceRange: '₹2,500 - ₹5,000',
    specs: ['WiFi', 'Night Vision', 'Motion Alerts'],
    features: ['Quick Install', 'Remote Access'],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Simple and effective wireless security cam. Monitor your home from anywhere via the mobile app.',
    isFeatured: false,
    displayOrder: 2,
    status: 'active'
  },
  {
    id: 'creator-workstation',
    title: 'Creator Workstation Build',
    category: 'assembled-desktops',
    brand: 'Custom',
    priceRange: '₹95,000 - ₹1,40,000',
    specs: ['Ryzen 7', '32GB RAM', '1TB NVMe'],
    features: ['Quiet Build', 'Future Upgrade Path'],
    images: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Designed for video editors, 3D artists, and developers. A silent yet powerful machine that scales with your creative needs.',
    isFeatured: true,
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'peripherals-combo',
    title: 'Gaming Peripherals Combo',
    category: 'accessories',
    brand: 'Mixed',
    priceRange: '₹2,999 - ₹12,999',
    specs: ['Mechanical Keyboard', 'Gaming Mouse', 'Headset'],
    features: ['RGB', 'Low Latency'],
    images: [
      'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Upgrade your gaming setup with this high-quality peripherals combo. Features mechanical precision and immersive sound.',
    isFeatured: true,
    displayOrder: 1,
    status: 'active'
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    customerName: 'Rahul K.',
    quote: 'Best place in Vengavasal for gaming and laptop deals. Excellent service.',
    rating: 5,
    location: 'Vengavasal',
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    customerName: 'Meena S.',
    quote: 'Bought office printers in bulk. Great price and quick support.',
    rating: 5,
    location: 'Gar-Ali',
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];

export const printerComparison = [
  {
    type: 'Inkjet',
    speed: '10-20 ppm',
    cost: '₹0.5 - ₹1',
    bestFor: 'Photos/Home'
  },
  {
    type: 'Laser',
    speed: '20-40 ppm',
    cost: '₹0.2 - ₹0.5',
    bestFor: 'Office/Volume'
  }
];

export const productFeaturesByCategory: Record<ProductCategory, string[]> = {
  laptops: ['Gaming laptops with RGB keyboards', 'Business ultrabooks', 'Budget options under ₹50,000'],
  'gaming-desktops': ['Pre-built and custom assembly', 'RGB lighting + liquid cooling', 'Entry to pro price tiers'],
  printers: ['Inkjet and laser options', 'Wireless multifunction models', 'Bulk deals for offices'],
  cctv: ['Wireless IP cameras', '4/8-channel DVR kits', 'Night vision and mobile app support'],
  'assembled-desktops': ['Select parts by budget', 'In-store assembly & testing', 'Performance-focused recommendations'],
  accessories: ['Gaming peripherals', 'Cables/hubs/chargers', 'Bags, stands, UPS, and monitors']
};
