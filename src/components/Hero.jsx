import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, MessageCircle, Sparkles, Star } from 'lucide-react'
import { useState } from 'react'
import { BUSINESS, PRODUCTS } from '../data/menu'
import { whatsappUrl } from '../lib/cart'
import { useBranch } from '../lib/branch'
import ExplodedBurger from './ExplodedBurger'

const hero = PRODUCTS.find((p) => p.id === 'bacon')

export default function Hero() {
  const [exploded, setExploded] = useState(false)
  const { branch } = useBranch()
  const wa = whatsappUrl(`¡Hola Burger Box ${branch.label}! Quiero hacer un pedido 🍔`, branch.whatsapp)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const rotate = useTransform(scrollY, [0, 600], [0, -8])

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-24">
      {/* Glow + grilla de fondo */}
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[520px] w-[520px] rounded-full bg-mustard/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[400px] w-[400px] rounded-full bg-flame/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-coal/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider">
            <Star size={14} className="fill-mustard text-mustard" /> {BUSINESS.rating} en Google · {branch.label}
          </motion.p>

          <h1 className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl xl:text-8xl">
            {['Adictos', 'al', 'sabor.'].map((w, i) => (
              <motion.span key={w} className={`block ${i === 2 ? 'neon text-mustard' : ''}`} initial={{ opacity: 0, y: 60, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.1 + i * 0.12, type: 'spring', stiffness: 120 }}>
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 max-w-md text-lg text-cream/70">
            Burgers smash de verdad: costra crocante, cheddar que chorrea y salsas de la casa. Todas con papas.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="flex items-center gap-2 rounded-full bg-mustard px-6 py-3.5 font-display uppercase text-ink shadow-[0_0_30px_rgba(255,199,44,.35)] transition hover:-translate-y-0.5">
              <Sparkles size={18} /> Ver menú interactivo
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 font-bold uppercase text-ink transition hover:-translate-y-0.5">
              <MessageCircle size={18} /> Pedir por WhatsApp
            </a>
            <a href="#ubicacion" className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold uppercase transition hover:border-mustard hover:text-mustard">
              <MapPin size={18} /> Cómo llegar
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y, rotate }} className="relative flex justify-center py-10" onMouseEnter={() => setExploded(true)} onMouseLeave={() => setExploded(false)} onClick={() => setExploded((e) => !e)}>
          <div className="absolute bottom-6 h-8 w-64 rounded-[50%] bg-black/70 blur-xl" />
          <ExplodedBurger layers={hero.layers} exploded={exploded} size={260} intro showLabels />
          <motion.span
            animate={{ rotate: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute right-2 top-4 rotate-6 rounded-xl bg-flame px-3 py-2 font-display text-sm uppercase text-ink sm:right-10"
          >
            10% off efectivo
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
