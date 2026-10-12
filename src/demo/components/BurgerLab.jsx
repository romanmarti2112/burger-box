import { AnimatePresence, motion } from 'framer-motion'
import { Layers, Plus, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { BREADS, EXTRAS, INGREDIENTS, SAUCES, money } from '../data/menu'
import { linePrice } from '../lib/cart'
import ExplodedBurger from './ExplodedBurger'

// Panel "despiece": hamburguesa desglosada + ficha del ingrediente + personalización.
// El padre lo monta con key={burger.id} para resetear el estado al cambiar de burger.
export default function BurgerLab({ burger, onAdd, size = 180 }) {
  const [exploded, setExploded] = useState(true)
  const [selected, setSelected] = useState(null)
  const [bread, setBread] = useState(BREADS[0])
  const [sauce, setSauce] = useState(SAUCES[1])
  const [extras, setExtras] = useState([])

  const info = selected != null ? INGREDIENTS[burger.layers[selected]] : null
  const allergens = [...new Set(burger.layers.flatMap((k) => INGREDIENTS[k].allergens))]
  const price = linePrice({ product: burger, extras })
  const toggleExtra = (id) => setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]))

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-smoke to-coal p-5 sm:p-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-mustard/20 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">Burger Lab · Despiece</p>
          <AnimatePresence mode="wait">
            <motion.h3 key={burger.id} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="font-display text-3xl uppercase sm:text-4xl">
              {burger.name}
            </motion.h3>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => setExploded((e) => !e)}
          className="flex shrink-0 items-center gap-2 rounded-full border border-mustard/40 px-3 py-2 text-xs font-semibold uppercase text-mustard transition hover:bg-mustard hover:text-ink"
        >
          <Layers size={14} /> {exploded ? 'Armar' : 'Desarmar'}
        </button>
      </div>

      {/* pr deja lugar a las etiquetas, que van todas a la derecha */}
      <div className="relative flex min-h-[340px] items-center justify-center py-6 pr-40" onMouseEnter={() => setExploded(true)}>
        <ExplodedBurger layers={burger.layers} exploded={exploded} selected={selected} onSelect={setSelected} size={size} intro labelsRight />
      </div>

      <p className="mb-3 text-center text-xs text-cream/50">Tocá una capa para ver su ficha</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={info ? info.name + selected : 'total'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-2xl border border-white/10 bg-ink/60 p-4"
          aria-live="polite"
        >
          <p className="font-display text-lg uppercase text-mustard">{info ? info.name : 'Toda la burger'}</p>
          <p className="mt-1 text-sm text-cream/70">{info ? info.desc : `${burger.layers.length} capas · ${burger.desc}. Viene con papas.`}</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <ShieldAlert size={14} className="text-cream/50" />
            {(info ? info.allergens : allergens).length === 0 ? (
              <span className="text-xs text-cream/50">Sin alérgenos principales</span>
            ) : (
              (info ? info.allergens : allergens).map((a) => (
                <span key={a} className="rounded-full bg-flame/15 px-2 py-0.5 text-xs text-flame">{a}</span>
              ))
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 space-y-3 text-sm">
        <Chips label="Pan" options={BREADS} value={bread} onChange={setBread} />
        <Chips label="Salsa" options={SAUCES} value={sauce} onChange={setSauce} />
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wider text-cream/50">Adicionales</p>
          <div className="flex flex-wrap gap-2">
            {EXTRAS.map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={extras.includes(e.id)}
                onClick={() => toggleExtra(e.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${extras.includes(e.id) ? 'border-flame bg-flame text-ink' : 'border-white/15 hover:border-flame'}`}
              >
                + {e.name} {money(e.price)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => onAdd({ product: burger, bread, sauce, extras })}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-mustard py-3.5 font-display text-lg uppercase text-ink shadow-[0_0_30px_rgba(255,199,44,.35)]"
      >
        <Plus size={18} /> Agregar · {money(price)}
      </motion.button>
    </div>
  )
}

function Chips({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-1.5 text-xs uppercase tracking-wider text-cream/50">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${value === o ? 'border-mustard bg-mustard text-ink' : 'border-white/15 hover:border-mustard'}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
