import { motion } from 'framer-motion'
import { useId } from 'react'
import { INGREDIENTS } from '../data/menu'
import { LayerArt, SPEC } from './layers'

/**
 * Hamburguesa por capas. `exploded` separa las capas; con `onSelect` cada capa es clickeable.
 * El orden de `layers` es de arriba hacia abajo.
 */
export default function ExplodedBurger({ layers, exploded, selected, onSelect, size = 240, intro = false, showLabels = true, labelsRight = false }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gap = exploded ? 16 : -8
  // Sin onSelect es decorativa (tarjetas del menú): divs no focuseables.
  const Layer = onSelect ? motion.button : motion.div
  const a11y = (info, isSel) => (onSelect ? { type: 'button', 'aria-label': `${info.name}: ${info.desc}`, 'aria-pressed': isSel } : { 'aria-hidden': true })

  return (
    <div className="relative mx-auto flex flex-col items-center" style={{ width: size }}>
      {layers.map((key, i) => {
        const info = INGREDIENTS[key]
        const isSel = selected === i
        const dim = selected != null && !isSel
        const left = !labelsRight && i % 2 === 0

        return (
          <Layer
            key={`${key}-${i}`}
            {...a11y(info, isSel)}
            onClick={onSelect && (() => onSelect(isSel ? null : i))}
            className={`group relative block outline-none ${onSelect ? 'cursor-pointer' : ''}`}
            style={{ width: `${SPEC[key].w}%`, zIndex: layers.length - i }}
            initial={intro ? { y: -300, opacity: 0 } : false}
            animate={{ marginTop: i === 0 ? 0 : gap, y: 0, opacity: dim ? 0.35 : 1, scale: isSel ? 1.08 : 1 }}
            transition={{
              type: 'spring', stiffness: 260, damping: 22,
              delay: intro ? (layers.length - i) * 0.08 : exploded ? i * 0.03 : 0,
            }}
            whileHover={onSelect && { scale: isSel ? 1.08 : 1.04 }}
          >
            <span
              className="block rounded-lg transition-[filter] group-focus-visible:outline-2 group-focus-visible:outline-mustard"
              style={{ filter: isSel ? 'drop-shadow(0 0 12px #ffc72c)' : undefined }}
            >
              <LayerArt k={key} size={size} id={`${uid}l${i}`} />
            </span>

            {showLabels && (
              <motion.span
                className={`pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap ${left ? 'right-full flex-row-reverse pr-2' : 'left-full pl-2'}`}
                initial={false}
                animate={{ opacity: exploded ? 1 : 0, x: exploded ? 0 : left ? 20 : -20 }}
                transition={{ delay: exploded ? 0.15 + i * 0.04 : 0 }}
              >
                <span className="h-px w-4 bg-mustard/60 sm:w-8" />
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${isSel ? 'border-mustard bg-mustard text-ink' : 'border-white/15 bg-coal/90 text-cream backdrop-blur'}`}>
                  {info.name}
                </span>
              </motion.span>
            )}
          </Layer>
        )
      })}
    </div>
  )
}
