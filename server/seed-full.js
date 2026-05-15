const products = [
  { 
    name: 'MacBook Pro M3 14"', 
    category: 'Laptops', 
    price: 18500, 
    stock: 12, 
    description: 'Apple MacBook Pro with M3 chip, 16GB RAM, 512GB SSD — perfect for professionals.', 
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'MacBook Air M2 13"', 
    category: 'Laptops', 
    price: 12500, 
    stock: 20, 
    description: 'Apple MacBook Air with M2 chip, 8GB RAM, 256GB SSD — ultra thin and light.', 
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'iPhone 15 Pro Max', 
    category: 'Phones', 
    price: 14500, 
    stock: 15, 
    description: '256GB, Titanium, 5G — the most powerful iPhone ever.', 
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'iPhone 15 Pro', 
    category: 'Phones', 
    price: 11500, 
    stock: 25, 
    description: '128GB, Titanium, 5G — pro camera system.', 
    image: 'https://images.unsplash.com/photo-1696434303191-2bd15866cc3b?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'Samsung Galaxy S24 Ultra', 
    category: 'Phones', 
    price: 13500, 
    stock: 18, 
    description: '256GB, AI features, S Pen — the ultimate Android experience.', 
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'Sony WH-1000XM5', 
    category: 'Accessories', 
    price: 2800, 
    stock: 40, 
    description: 'Premium noise-canceling wireless headphones with 30hr battery.', 
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'AirPods Pro 2nd Gen', 
    category: 'Accessories', 
    price: 2200, 
    stock: 35, 
    description: 'Active noise cancellation, spatial audio, sweat resistant.', 
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'Samsung Galaxy Watch 6', 
    category: 'Smart Devices', 
    price: 2500, 
    stock: 22, 
    description: 'Smartwatch with health tracking, GPS, and 40hr battery.', 
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'Dell XPS 15', 
    category: 'Laptops', 
    price: 15000, 
    stock: 10, 
    description: '15.6" OLED, Intel i7, 16GB RAM, 512GB SSD — stunning display.', 
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'HP EliteBook 840 G10', 
    category: 'Laptops', 
    price: 9800, 
    stock: 14, 
    description: '14" FHD, Intel i5, 8GB RAM, 256GB SSD — business ready.', 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: 'USB-C Hub 7-in-1', 
    category: 'Cables & Chargers', 
    price: 350, 
    stock: 60, 
    description: 'Multiport adapter with HDMI, USB-A, SD card reader.', 
    image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
  { 
    name: '65W GaN Fast Charger', 
    category: 'Cables & Chargers', 
    price: 280, 
    stock: 50, 
    description: 'Universal fast charging for laptops, phones, and tablets.', 
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80',
    tenantId: 'default-tenant', 
    isActive: true 
  },
]