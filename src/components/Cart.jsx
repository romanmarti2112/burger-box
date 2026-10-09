import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Send, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EXTRAS, money } from '../data/menu'
import { useBranch } from '../lib/branch'
import { linePrice, totals, whatsappMessage, whatsappUrl } from '../lib/cart'

export function CartButton({ count, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Abrir pedido, ${count} productos`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-mustard px-5 py-4 font-display uppercase text-ink shadow-[0_10px_40px_rgba(255,199,44,.45)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingBag size={20} /> Pedido
      <AnimatePresence mode="popLayout">
        <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-6 min-w-6 place-items-center rounded-full bg-ink px-1.5 text-xs text-mustard">
          {count}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function Cart({ open, onClose, cart, onQty }) {
  const [name, setName] = useState('')
  const [mode, setMode] = useState('pickup')
  const [address, setAddress] = useState('')
  const [cash, setCash] = useState(true)
  const { branch } = useBranch()
  const { subtotal, discount, total } = totals(cart, cash)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const send = () => window.open(whatsappUrl(whatsappMessage(cart, { name, mode, address, cash, branch: branch.label }), branch.whatsapp), '_blank', 'noopener')

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Tu pedido"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-coal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="font-display text-2xl uppercase">Tu pedido</h2>
              <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 hover:bg-white/10">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {cart.length === 0 && <p className="py-16 text-center text-cream/50">Todavía no agregaste nada. El hambre no espera 🍔</p>}
              <AnimatePresence initial={false}>
                {cart.map((l) => (
                  <motion.div key={l.key} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="rounded-2xl bg-smoke p-4">
                    <div className="flex justify-between gap-3">
                      <p className="font-semibold">{l.product.name}</p>
                      <p className="font-semibold text-mustard">{money(linePrice(l) * l.qty)}</p>
                    </div>
                    {l.bread && (
                      <p className="mt-0.5 text-xs text-cream/50">
                        Pan {l.bread} · Salsa {l.sauce}
                        {l.extras.map((id) => ` · +${EXTRAS.find((e) => e.id === id).name}`)}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      <button type="button" onClick={() => onQty(l.key, l.qty - 1)} aria-label="Quitar uno" className="rounded-full border border-white/15 p-1.5 hover:border-mustard">
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center font-semibold">{l.qty}</span>
                      <button type="button" onClick={() => onQty(l.key, l.qty + 1)} aria-label="Sumar uno" className="rounded-full border border-white/15 p-1.5 hover:border-mustard">
                        <Plus size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {cart.length > 0 && (
              <footer className="space-y-3 border-t border-white/10 p-5 text-sm">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" aria-label="Tu nombre" className="w-full rounded-xl bg-smoke px-4 py-3 outline-none ring-mustard focus:ring-2" />
                <Toggle options={[['pickup', 'Retiro'], ['delivery', 'Delivery']]} value={mode} onChange={setMode} />
                {mode === 'delivery' && (
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección de entrega" aria-label="Dirección de entrega" className="w-full rounded-xl bg-smoke px-4 py-3 outline-none ring-mustard focus:ring-2" />
                )}
                <Toggle options={[[true, 'Efectivo -10%'], [false, 'Transferencia']]} value={cash} onChange={setCash} />

                <div className="space-y-1 pt-2">
                  <Row label="Subtotal" value={money(subtotal)} />
                  {discount > 0 && <Row label="Desc. efectivo" value={`-${money(discount)}`} className="text-flame" />}
                  <Row label="Total" value={money(total)} className="font-display text-xl uppercase text-mustard" />
                </div>

                <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={send} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] py-3.5 font-bold uppercase text-ink">
                  <Send size={18} /> Enviar por WhatsApp
                </motion.button>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Toggle({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-full bg-smoke p-1">
      {options.map(([v, label]) => (
        <button key={label} type="button" aria-pressed={value === v} onClick={() => onChange(v)} className={`rounded-full py-2 font-semibold transition ${value === v ? 'bg-mustard text-ink' : 'text-cream/70'}`}>
          {label}
        </button>
      ))}
    </div>
  )
}

const Row = ({ label, value, className = '' }) => (
  <div className={`flex justify-between ${className}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
)
