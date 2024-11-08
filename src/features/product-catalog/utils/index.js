import { SORT_OPTIONS } from '@/features/product-catalog/constants';

export function filterProducts(rawProducts, filters) {
  return rawProducts.filter(product => {
    if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.brand && !product.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
      return false;
    }
    if (filters.category && !product.category.toLowerCase().includes(filters.category.toLowerCase())) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (product.rating < filters.minRating) {
      return false;
    }

    return true;
  });
}

const sortFunctions = {
  [SORT_OPTIONS.PRICE]: (a, b) => a.price - b.price,
  [SORT_OPTIONS.RATING]: (a, b) => b.rating - a.rating,
  [SORT_OPTIONS.NAME]: (a, b) => a.name.localeCompare(b.name),
};

export function sortProducts(products, sortBy) {
  return products.sort(sortFunctions[sortBy] || (() => 0));
}

export function generateMockProducts(count) {
  const categories = [
    'Smartphones', 'Laptops', 'Headphones', 'Cameras',
    'Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories',
    'Furniture', 'Kitchen Appliances', 'Home Decor', 'Lighting',
    'Fitness Equipment', 'Sports Gear', 'Books', 'Gaming',
    'Beauty', 'Toys', 'Automotive', 'Garden',
  ];

  const brands = [
    // Tech Giants
    'Apple', 'Samsung', 'Google', 'Microsoft', 'Sony',
    'LG', 'Huawei', 'OnePlus', 'Xiaomi', 'Oppo',

    // Computer & Gaming
    'Dell', 'HP', 'Lenovo', 'Asus', 'Acer',
    'Nintendo', 'PlayStation', 'Xbox', 'Razer', 'MSI',

    // Fashion & Sports
    'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok',
    'Gucci', 'Louis Vuitton', 'Zara', 'H&M', 'Uniqlo',

    // Home & Appliances
    'Bosch', 'Philips', 'Dyson', 'KitchenAid', 'Whirlpool',
    'IKEA', 'Herman Miller', 'Steelcase', 'West Elm', 'Crate & Barrel',

    // Various Industries
    'Canon', 'Nikon', 'GoPro', 'Bose', 'Sennheiser',
    'Tesla', 'BMW', 'Mercedes', 'Toyota', 'Honda',
  ];

  const productNames = {
    'Smartphones': ['Galaxy', 'iPhone', 'Pixel', 'Mate', 'Nord', 'Reno', 'Mi', 'Edge'],
    'Laptops': ['ThinkPad', 'MacBook', 'ZenBook', 'XPS', 'Spectre', 'Surface', 'Legion', 'Blade'],
    'Headphones': ['AirPods', 'QuietComfort', 'WH-1000XM', 'FreeBuds', 'Momentum', 'Elite', 'Studio'],
    'Cameras': ['EOS', 'Alpha', 'Z-Series', 'PowerShot', 'Lumix', 'X-Series', 'OM System'],
    'Men\'s Clothing': ['Oxford', 'Chino', 'Denim', 'Polo', 'Blazer', 'Cardigan', 'Bomber'],
    'Women\'s Clothing': ['Wrap Dress', 'Blouse', 'Maxi', 'Cardigan', 'Blazer', 'Jumpsuit'],
    'Shoes': ['Air Max', 'Ultraboost', 'Classic', 'Superstar', 'Chuck', 'Cortez', 'Stan Smith'],
    'Accessories': ['Watch', 'Wallet', 'Backpack', 'Sunglasses', 'Belt', 'Scarf'],
    'Furniture': ['Sofa', 'Armchair', 'Desk', 'Bed Frame', 'Bookshelf', 'Cabinet'],
    'Kitchen Appliances': ['Blender', 'Coffee Maker', 'Air Fryer', 'Stand Mixer', 'Food Processor'],
    'Home Decor': ['Vase', 'Mirror', 'Rug', 'Throw Pillow', 'Wall Art', 'Clock'],
    'Lighting': ['Pendant', 'Floor Lamp', 'Table Lamp', 'Chandelier', 'Sconce'],
    'Fitness Equipment': ['Treadmill', 'Bike', 'Rower', 'Weights', 'Bench', 'Yoga Mat'],
    'Sports Gear': ['Racket', 'Ball', 'Gloves', 'Helmet', 'Bat', 'Board'],
    'Books': ['Novel', 'Biography', 'Cookbook', 'Guide', 'Atlas', 'Encyclopedia'],
    'Gaming': ['Console', 'Controller', 'Headset', 'Mouse', 'Keyboard', 'Monitor'],
    'Beauty': ['Serum', 'Cream', 'Mask', 'Palette', 'Brush Set', 'Perfume'],
    'Toys': ['Robot', 'Puzzle', 'Blocks', 'Doll', 'Car', 'Board Game'],
    'Automotive': ['Charger', 'Mount', 'Camera', 'Speaker', 'Light Kit'],
    'Garden': ['Tool Set', 'Planter', 'Fountain', 'Mower', 'Trimmer'],
  };

  const variants = ['Pro', 'Plus', 'Max', 'Elite', 'Ultra'];
  const years = ['2023', '2024'];

  return Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const productType = productNames[category][Math.floor(Math.random() * productNames[category].length)];
    const variant = variants[Math.floor(Math.random() * variants.length)];
    const year = years[Math.floor(Math.random() * years.length)];

    const name = `${productType} ${variant} ${year}`;

    return {
      id: i,
      name,
      category,
      brand: brands[Math.floor(Math.random() * brands.length)],
      price: Number((Math.random() * 950 + 50).toFixed(2)),
      rating: Number((Math.random() * 9 + 1).toFixed(1)),
      imageUrl: `https://picsum.photos/400?random=${i}`,
    };
  });
}
