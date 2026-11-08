export const CATEGORIES = [
  {
    value: 'hardshell-jackets',
    label: 'Hardshell Jackets',
    group: 'clothing',
    keywords: 'jaket anti air',
  },
  { value: 'windbreaker', label: 'Windbreaker', group: 'clothing', keywords: 'jaket angin' },
  { value: 'vests', label: 'Vests', group: 'clothing', keywords: 'rompi' },
  {
    value: 'ski-snowboard-jackets',
    label: 'Ski & Snowboard Jackets',
    group: 'clothing',
    keywords: 'jaket salju',
  },
  { value: 'casual-shoes', label: 'Casual Shoes', group: 'footwear', keywords: 'sepatu santai' },
  {
    value: 'hiking-shoes',
    label: 'Hiking Shoes',
    group: 'footwear',
    keywords: 'sepatu gunung boot',
  },
] as const

export const COLORS = [
  { value: 'black', label: 'Hitam', hex: '#18181b' },
  { value: 'white', label: 'Putih', hex: '#fafafa' },
  { value: 'grey', label: 'Abu-abu', hex: '#9ca3af' },
  { value: 'navy', label: 'Navy', hex: '#1e3a5f' },
  { value: 'blue', label: 'Biru', hex: '#2f7fd8' },
  { value: 'green', label: 'Hijau', hex: '#2f855a' },
  { value: 'olive', label: 'Olive', hex: '#6b7139' },
  { value: 'brown', label: 'Cokelat', hex: '#7c4a2d' },
  { value: 'beige', label: 'Krem', hex: '#d6c3a1' },
  { value: 'red', label: 'Merah', hex: '#d63a3a' },
  { value: 'orange', label: 'Oranye', hex: '#ec7a1c' },
  { value: 'yellow', label: 'Kuning', hex: '#f5c518' },
] as const

export const APPAREL_SIZES = ['S', 'M', 'L', 'XL'] as const
export const SHOE_SIZES = ['39', '40', '41', '42', '43', '44'] as const

export const GENDERS = [
  { value: 'men', label: 'Pria' },
  { value: 'women', label: 'Wanita' },
] as const

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Unggulan' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
] as const
