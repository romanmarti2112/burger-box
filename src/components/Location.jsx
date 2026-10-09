import { motion } from 'framer-motion'
import { Clock, MapPin, Navigation, Phone, Star } from 'lucide-react'
import { BUSINESS } from '../data/menu'

// lucide v1 ya no trae íconos de marcas.
export const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)

// Abierto Martes–Domingo 20:00–00:00, hora de Mendoza.
export function isOpenNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Mendoza', weekday: 'short', hour: 'numeric', hourCycle: 'h23' })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return parts.weekday !== 'Mon' && Number(parts.hour) >= 20
}

export default function Location() {
  const { lat, lng } = BUSINESS.coords
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const open = isOpenNow()

  return (
    <section id="ubicacion" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-flame">Dónde estamos</p>
      <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">
        Vení a <span className="text-mustard">la box</span>
      </h2>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10">
          <iframe
            title="Mapa Burger Box"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
            className="absolute inset-0 h-full w-full [filter:invert(.92)_hue-rotate(180deg)_saturate(.7)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-sm font-semibold backdrop-blur">
            <Star size={14} className="fill-mustard text-mustard" /> {BUSINESS.rating} en Google
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
          <Card icon={MapPin} title="Dirección">
            {BUSINESS.address}
            <span className="block text-cream/50">{BUSINESS.venue}</span>
          </Card>
          <Card icon={Clock} title="Horarios">
            <span className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold uppercase ${open ? 'bg-green-500/15 text-green-400' : 'bg-flame/15 text-flame'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-green-400' : 'bg-flame'}`} /> {open ? 'Abierto ahora' : 'Cerrado · abre 20 h'}
            </span>
            {BUSINESS.hours.map((h) => (
              <span key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-cream/60">{h.time}</span>
              </span>
            ))}
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Action href={directions} icon={Navigation} label="Cómo llegar" primary />
            <Action href={`tel:${BUSINESS.phone.replace(/\D/g, '')}`} icon={Phone} label="Llamar" />
            <Action href={BUSINESS.instagram} icon={Instagram} label="@burger_box__" wide />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Card = ({ icon: Icon, title, children }) => (
  <div className="rounded-3xl border border-white/10 bg-coal p-5">
    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mustard">
      <Icon size={16} /> {title}
    </p>
    <div className="space-y-1 text-cream/90">{children}</div>
  </div>
)

const Action = ({ href, icon: Icon, label, primary, wide }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold uppercase transition hover:-translate-y-0.5 ${wide ? 'col-span-2' : ''} ${primary ? 'bg-mustard text-ink' : 'border border-white/15 hover:border-mustard hover:text-mustard'}`}
  >
    <Icon size={18} /> {label}
  </a>
)
