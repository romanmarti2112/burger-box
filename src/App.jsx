import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import Cart, { CartButton } from './components/Cart'
import Hero from './components/Hero'
import Location, { Instagram } from './components/Location'
import Menu from './components/Menu'
import { BUSINESS } from './data/menu'
import { addLine, setQty } from './lib/cart'

const STRIP = ['Smash', 'Cheddar x4', 'Salsa Box', '10% off efectivo', 'Papas incluidas', 'Martes a domingo 20 h']

export default function App() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const close = useCallback(() => setOpen(false), [])

  const add = (item) => {
    setCart((c) => addLine(c, item))
    const id = Date.now()
    setToast({ id, name: item.product.name })
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 1800)
  }

  return (
    <div className="grain min-h-svh overflow-x-clip">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-display text-xl uppercase leading-none text-mustard">
            <img src="/img/logo.png" alt="" className="h-10 w-10 rounded-full" />
            Burger<span className="text-cream">Box</span>
          </a>
          <div className="flex items-center gap-5 text-sm font-semibold uppercase">
            <a href="#menu" className="hidden hover:text-mustard sm:block">Menú</a>
            <a href="#ubicacion" className="hidden hover:text-mustard sm:block">Ubicación</a>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-mustard">
              <Instagram />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />

        <div className="-rotate-2 overflow-hidden border-y-4 border-ink bg-mustard py-3 text-ink" aria-hidden="true">
          <div className="marquee flex w-max gap-8 font-display text-2xl uppercase">
            {[...STRIP, ...STRIP].map((s, i) => (
              <span key={i} className="flex items-center gap-8">
                {s} <span>✸</span>
              </span>
            ))}
          </div>
        </div>

        <Menu onAdd={add} />
        <Location />
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-cream/50">
        <p className="font-display text-3xl uppercase text-mustard">Burger Box</p>
        <p className="mt-1">{BUSINESS.tagline} · Demo / prototipo</p>
      </footer>

      <CartButton count={cart.reduce((s, l) => s + l.qty, 0)} onClick={() => setOpen(true)} />
      <Cart open={open} onClose={close} cart={cart} onQty={(key, qty) => setCart((c) => setQty(c, key, qty))} />

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-5 z-40 rounded-full bg-coal px-4 py-2.5 text-sm font-semibold shadow-xl ring-1 ring-mustard/40"
          >
            ✓ {toast.name} al pedido
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
