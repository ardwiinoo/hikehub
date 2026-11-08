# HikeHub

Landing page toko perlengkapan hiking. Static untuk sekarang, siap dihubungkan ke backend API.

## Stack

React 19 + Vite + TypeScript (strict), React Router v8, Tailwind CSS v4, ESLint (typescript-eslint strict), Prettier, pnpm.

## Scripts

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # typecheck + production build
pnpm lint       # eslint
pnpm format     # prettier (+ sort class tailwind)
```

## Halaman

| Route                 | Isi                                                     |
| --------------------- | ------------------------------------------------------- |
| `/`                   | Landing page + katalog dengan filter                    |
| `/login`, `/register` | Auth (mendukung `?redirect=/checkout`)                  |
| `/checkout`           | Form alamat, pengiriman, pembayaran + ringkasan pesanan |

## Struktur

```
public/                 favicon & icon
src/
  assets/               images, brands (logo partner/kurir/payment), videos (auth)
  components/
    layout/             Header, Footer, RootLayout
    home/               Hero, Perks, CategoryShowcase, Partners
    product/            ProductShop, FilterPanel, ProductCard, ProductArt
    checkout/           CheckoutSection, OptionCard, OrderSummary
    auth/               AuthLayout, GoogleButton
    ui/                 TextField, PasswordField, Logo, Spinner
  context/              CartProvider & AuthProvider (state global + localStorage)
  data/                 data static: catalog, products, checkout (kurir, payment, provinsi)
  hooks/                useProductFilters, useCart, useAuth
  lib/                  helper kecil (format harga, storage, form, redirect)
  pages/                HomePage, LoginPage, RegisterPage, CheckoutPage, NotFoundPage
  services/             auth.ts & orders.ts -> stub, ganti dengan fetch ke API
  types/                tipe Product, Cart, Auth, Checkout
  router.tsx            definisi route
```

## Menghubungkan ke API

- `src/services/auth.ts` & `src/services/orders.ts` masih simulasi (delay). Ganti isinya dengan
  `fetch` ke backend; signature fungsi tidak perlu berubah.
- Auth saat ini hanya menyimpan `{ name, email }` di localStorage. Untuk produksi gunakan session
  cookie httpOnly dari backend, jangan simpan token di localStorage.
- Field kartu di checkout sengaja **tidak** ikut dikirim. Gunakan SDK payment gateway
  (Midtrans/Xendit/Stripe) agar data kartu tidak lewat server sendiri.

`Product` di `src/types/product.ts` sudah berbentuk JSON-friendly. Ganti `PRODUCTS` di `App.tsx`
dengan hasil fetch dari API (mis. via TanStack Query), lalu teruskan ke `useProductFilters`.
Untuk katalog besar, filter sebaiknya dipindah ke server (kirim `filters` sebagai query params).

## Gambar produk

Belum ada foto produk, jadi kartu memakai ilustrasi SVG (`ProductArt`) yang diwarnai sesuai warna
produk. Saat foto tersedia, tambahkan field `image` di `Product` dan render `<img>` di `ProductCard`.

## Deploy

Ini SPA, jadi server perlu fallback semua route ke `index.html` (Vercel/Netlify: rewrite `/* -> /index.html`).
