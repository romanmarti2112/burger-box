import { AnimatePresence, motion } from 'framer-motion'
import { CakeSlice, CupSoda, Layers, Plus, Utensils, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BREADS, CATEGORIES, PRODUCTS, SAUCES, money } from '../data/menu'
import BurgerLab from './BurgerLab'
import ExplodedBurger from './ExplodedBurger'

const ICON = { sides: Utensils, drinks: CupSoda, desserts: CakeSlice }

export default function Menu({ onAdd }) {
  const [cat, setCat] = useState('burgers')
  const [active, setActive] = useState(PRODUCTS.find((p) => p.id === 'bacon'))
  const [hovered, setHovered] = useState(null)
  const [sheet, setSheet] = useState(false)

  useEffect(() => {
    if (!sheet) return
    const onKey = (e) => e.key === 'Escape' && setSheet(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  const items = PRODUCTS.filter((p) => (cat === 'veggie' ? p.veggie : p.category === cat))
  const hasLab = items.some((p) => p.layers)

  const openLab = (p) => {
    setActive(p)
    setSheet(true)
  }

  return (
    <section id="menu" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-flame">La carta</p>
          <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">
            Menú <span className="text-mustard">interactivo</span>
          </h2>
          <p className="mt-3 max-w-md text-cream/60">Pasá el cursor por una burger y mirala desarmarse capa por capa. Todas vienen con papas y salsa.</p>
        </div>

        <div role="tablist" aria-label="Categorías" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className="relative rounded-full px-4 py-2 text-sm font-semibold uppercase"
            >
              {cat === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-mustard" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className={`relative ${cat === c.id ? 'text-ink' : 'text-cream/70 hover:text-cream'}`}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-12 grid gap-8 ${hasLab ? 'lg:grid-cols-[1fr_440px]' : ''}`}>
        <motion.ul layout className={`grid gap-4 sm:grid-cols-2 ${hasLab ? '' : 'lg:grid-cols-3'}`}>
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => {
              const Icon = ICON[p.category]
              const isActive = active?.id === p.id && p.layers
              if (p.layers)
                return (
                  <PosterCard
                    key={p.id}
                    p={p}
                    i={i}
                    active={isActive}
                    exploded={hovered === p.id}
                    onEnter={() => (setHovered(p.id), setActive(p))}
                    onLeave={() => setHovered(null)}
                    onLab={() => openLab(p)}
                    onAdd={() => onAdd({ product: p, bread: BREADS[0], sauce: SAUCES[1], extras: [] })}
                  />
                )
              return (
                <motion.li
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-coal p-5 transition-colors hover:border-white/25"
                >
                  <div className="flex h-44 items-center justify-center">
                    <Icon size={72} strokeWidth={1.2} className="text-mustard transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl uppercase">{p.name}</h3>
                    <span className="font-display text-xl text-mustard">{money(p.price)}</span>
                  </div>
                  <p className="mt-1 flex-1 text-sm text-cream/60">{p.desc}</p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags?.map((t) => (
                      <span key={t} className="rounded-full bg-flame/15 px-2 py-0.5 text-[11px] font-semibold uppercase text-flame">{t}</span>
                    ))}
                    {p.demo && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] uppercase text-cream/50">Demo</span>}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onAdd({ product: p })}
                      aria-label={`Agregar ${p.name}`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mustard py-2 text-xs font-bold uppercase text-ink"
                    >
                      <Plus size={14} /> Agregar
                    </motion.button>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>

        {hasLab && active && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto rounded-3xl [scrollbar-width:thin]">
              <BurgerLab key={active.id} burger={active} onAdd={onAdd} />
            </div>
          </aside>
        )}
      </div>

      {/* Despiece en mobile: bottom sheet */}
      <AnimatePresence>
        {sheet && active && (
          <motion.div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(false)}>
            <button type="button" onClick={() => setSheet(false)} aria-label="Cerrar" className="absolute right-4 top-3 rounded-full bg-coal p-2">
              <X size={18} />
            </button>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Despiece ${active.name}`}
              className="max-h-[88vh] w-full overflow-y-auto overflow-x-hidden rounded-t-3xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <BurgerLab
                key={active.id}
                burger={active}
                size={160}
                onAdd={(item) => {
                  onAdd(item)
                  setSheet(false)
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Tarjeta estilo póster de Instagram: color propio, foto real y, al hover, despiece realista.
function PosterCard({ p, i, active, exploded, onEnter, onLeave, onLab, onAdd }) {
  const t = p.theme
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: i * 0.04 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ background: t.bg }}
      className={`relative flex flex-col overflow-hidden rounded-3xl ring-offset-4 ring-offset-ink transition-shadow ${active ? 'ring-2 ring-mustard' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 px-5 pt-5">
        <h3 className="font-display text-4xl uppercase leading-[0.85]" style={{ color: t.title, textShadow: '3px 3px 0 #d8231b' }}>
          {p.name.replace('BB ', 'BB\n').split('\n').map((w) => <span key={w} className="block">{w}</span>)}
        </h3>
        <span className="rounded-full bg-ink/85 px-3 py-1 font-display text-lg text-mustard">{money(p.price)}</span>
      </div>

      <div className="relative h-60">
        <motion.img
          src={p.img}
          alt={`${p.name}: ${p.desc}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '50% 62%' }}
          animate={{ opacity: exploded ? 0 : 1, scale: exploded ? 1.1 : 1 }}
          transition={{ duration: 0.35 }}
        />
        <motion.div className="absolute inset-0 flex items-center justify-center" initial={false} animate={{ opacity: exploded ? 1 : 0 }} aria-hidden="true">
          <ExplodedBurger layers={p.layers} exploded={exploded} size={150} showLabels={false} />
        </motion.div>
        {p.tags?.map((tag) => (
          <span key={tag} className="absolute bottom-8 right-4 z-10 rotate-6 rounded-md bg-ink px-2 py-0.5 font-display text-xs uppercase text-mustard">{tag}</span>
        ))}
      </div>

      {/* Curva inferior como en los pósters */}
      <div className="relative -mt-6 flex flex-1 flex-col rounded-t-[50%_2.5rem] px-5 pb-5 pt-7 text-center" style={{ background: t.arc }}>
        <p className="flex-1 font-[Fredoka] text-lg font-bold lowercase leading-tight" style={{ color: t.text }}>
          {p.lines.map((l) => <span key={l} className="block">{l}</span>)}
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onLab} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink/85 py-2.5 text-xs font-bold uppercase text-mustard transition hover:bg-ink">
            <Layers size={14} /> Despiece
          </button>
          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={onAdd} aria-label={`Agregar ${p.name}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-mustard py-2.5 text-xs font-bold uppercase text-ink shadow-[0_4px_0_#000]">
            <Plus size={14} /> Agregar
          </motion.button>
        </div>
      </div>
    </motion.li>
  )
}
