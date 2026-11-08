import { ArrowLeft, CheckCircle2, Landmark, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useState, type SubmitEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { CheckoutSection } from '../components/checkout/CheckoutSection'
import { OptionCard } from '../components/checkout/OptionCard'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { Logo } from '../components/ui/Logo'
import { inputClass, TextField } from '../components/ui/TextField'
import { FREE_SHIPPING_MIN, PAYMENT_METHODS, PROVINCES, SHIPPING_METHODS } from '../data/checkout'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/catalog'
import { getField } from '../lib/form'
import { placeOrder } from '../services/orders'
import type { PaymentMethod, ShippingMethod } from '../types/checkout'

const FORM_ID = 'checkout-form'

function CheckoutHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <p className="flex items-center gap-2 text-sm font-medium text-zinc-600">
          <ShieldCheck className="size-4" aria-hidden />
          Checkout Aman
        </p>
      </div>
    </header>
  )
}

function CenteredMessage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <CheckoutHeader />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        {children}
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const { lines, subtotal, clear } = useCart()
  const [shipping, setShipping] = useState<ShippingMethod>('jne')
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<{ id: string; email: string } | null>(null)

  const shippingMethod = SHIPPING_METHODS.find((m) => m.value === shipping) ?? SHIPPING_METHODS[0]
  const isFree = shippingMethod.freeEligible && subtotal >= FREE_SHIPPING_MIN
  const shippingCost = isFree ? 0 : shippingMethod.price

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const field = (key: string) => getField(form, key).trim()

    setSubmitting(true)
    setError('')
    const email = field('email')
    try {
      // Card details are intentionally NOT sent: use a payment gateway (Midtrans/Xendit/Stripe) SDK.
      const { orderId } = await placeOrder({
        email,
        shippingMethod: shipping,
        paymentMethod: payment,
        address: {
          fullName: field('fullName'),
          phone: field('phone'),
          address: field('address'),
          city: field('city'),
          province: field('province'),
          postalCode: field('postalCode'),
        },
        items: lines.map(({ productId, size, quantity }) => ({ productId, size, quantity })),
      })
      clear()
      setOrder({ id: orderId, email })
      window.scrollTo({ top: 0 })
    } catch {
      setError('Pesanan gagal dibuat. Periksa koneksi lalu coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  if (order) {
    return (
      <CenteredMessage>
        <title>Pesanan Berhasil — HikeHub</title>
        <CheckCircle2 className="size-16 text-green-600" strokeWidth={1.5} aria-hidden />
        <h1 className="mt-6 text-2xl font-bold">Terima kasih, pesananmu diterima!</h1>
        <p className="mt-3 text-sm text-zinc-600">
          Nomor pesanan <span className="font-semibold text-zinc-900">{order.id}</span>. Detail
          pesanan dan instruksi pembayaran sudah kami kirim ke{' '}
          <span className="font-semibold text-zinc-900">{order.email}</span>.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Lanjut Belanja
        </Link>
      </CenteredMessage>
    )
  }

  if (lines.length === 0) {
    return (
      <CenteredMessage>
        <title>Keranjang Kosong — HikeHub</title>
        <ShoppingBag className="size-14 text-zinc-300" strokeWidth={1.5} aria-hidden />
        <h1 className="mt-6 text-2xl font-bold">Keranjangmu masih kosong</h1>
        <p className="mt-3 text-sm text-zinc-600">
          Yuk cari jaket atau sepatu yang cocok untuk pendakian berikutnya.
        </p>
        <Link
          to="/#shop"
          className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Mulai Belanja
        </Link>
      </CenteredMessage>
    )
  }

  return (
    <div className="min-h-dvh bg-zinc-50">
      <title>Checkout — HikeHub</title>
      <CheckoutHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Kembali belanja
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Checkout</h1>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
          <form id={FORM_ID} onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <CheckoutSection
              step={1}
              title="Kontak"
              action={
                !user && (
                  <Link
                    to="/login?redirect=/checkout"
                    className="text-sm font-medium underline hover:text-zinc-600"
                  >
                    Masuk
                  </Link>
                )
              }
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={user?.email}
                placeholder="nama@email.com"
                hint="Konfirmasi pesanan akan dikirim ke email ini."
                required
              />
            </CheckoutSection>

            <CheckoutSection step={2} title="Alamat Pengiriman">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Nama penerima"
                  name="fullName"
                  autoComplete="name"
                  defaultValue={user?.name}
                  required
                />
                <TextField
                  label="Nomor HP"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  pattern="^(\+62|62|0)8[0-9]{8,11}$"
                  title="Gunakan format nomor HP Indonesia, mis. 081234567890"
                  required
                />
                <TextField
                  label="Alamat lengkap"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
                  className="sm:col-span-2"
                  required
                />
                <TextField
                  label="Kota / Kabupaten"
                  name="city"
                  autoComplete="address-level2"
                  required
                />
                <div>
                  <label
                    htmlFor="province"
                    className="mb-1.5 block text-sm font-medium text-zinc-800"
                  >
                    Provinsi
                  </label>
                  <select
                    id="province"
                    name="province"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Pilih provinsi
                    </option>
                    {PROVINCES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <TextField
                  label="Kode pos"
                  name="postalCode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  title="Kode pos 5 digit"
                  maxLength={5}
                  required
                />
              </div>
            </CheckoutSection>

            <CheckoutSection step={3} title="Metode Pengiriman">
              <div className="space-y-3">
                {SHIPPING_METHODS.map((method) => {
                  const free = method.freeEligible && subtotal >= FREE_SHIPPING_MIN
                  return (
                    <OptionCard
                      key={method.value}
                      name="shipping"
                      value={method.value}
                      checked={shipping === method.value}
                      onSelect={() => {
                        setShipping(method.value)
                      }}
                    >
                      <img src={method.logo} alt="" className="h-7 w-14 object-contain" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{method.label}</p>
                        <p className="text-xs text-zinc-500">{method.eta}</p>
                      </div>
                      <p className="text-sm font-semibold">
                        {free ? (
                          <>
                            <span className="mr-1.5 text-xs font-normal text-zinc-400 line-through">
                              {formatPrice(method.price)}
                            </span>
                            <span className="text-green-700">Gratis</span>
                          </>
                        ) : (
                          formatPrice(method.price)
                        )}
                      </p>
                    </OptionCard>
                  )
                })}
              </div>
            </CheckoutSection>

            <CheckoutSection step={4} title="Pembayaran">
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <OptionCard
                    key={method.value}
                    name="payment"
                    value={method.value}
                    checked={payment === method.value}
                    onSelect={() => {
                      setPayment(method.value)
                    }}
                  >
                    <p className="flex-1 text-sm font-semibold">{method.label}</p>
                    {method.logo ? (
                      <img src={method.logo} alt="" className="h-6 w-12 object-contain" />
                    ) : (
                      <Landmark className="size-5 text-zinc-500" aria-hidden />
                    )}
                  </OptionCard>
                ))}
              </div>

              {payment === 'card' && (
                <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-zinc-50 p-4">
                  <TextField
                    label="Nomor kartu"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    className="col-span-2"
                    required
                  />
                  <TextField
                    label="Berlaku hingga"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    required
                  />
                  <TextField
                    label="CVV"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="123"
                    required
                  />
                </div>
              )}
              {payment === 'paypal' && (
                <p className="mt-4 rounded-lg bg-zinc-50 p-4 text-sm text-zinc-600">
                  Kamu akan diarahkan ke PayPal untuk menyelesaikan pembayaran.
                </p>
              )}
              {payment === 'transfer' && (
                <p className="mt-4 rounded-lg bg-zinc-50 p-4 text-sm text-zinc-600">
                  Nomor Virtual Account (BCA, BNI, BRI, Mandiri) akan muncul setelah pesanan dibuat.
                  Bayar dalam 24 jam.
                </p>
              )}
            </CheckoutSection>
          </form>

          <OrderSummary formId={FORM_ID} shippingCost={shippingCost} submitting={submitting} />
        </div>
      </main>
    </div>
  )
}
