import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { BRANCHES } from '../data/menu'
import { useBranch } from '../lib/branch'

export default function BranchPicker() {
  const { chosen, setBranch } = useBranch()
  return (
    <AnimatePresence>
      {!chosen && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div role="dialog" aria-modal="true" aria-label="Elegí tu sucursal" initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} className="w-full max-w-md rounded-3xl border border-white/10 bg-coal p-6 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mustard font-display text-xl text-ink">FS</span>
            <h2 className="mt-4 font-display text-3xl uppercase text-mustard">¿A qué sucursal vas a pedir?</h2>
            <div className="mt-6 grid gap-3">
              {Object.values(BRANCHES).map((b) => (
                <button key={b.id} type="button" onClick={() => setBranch(b.id)} className="flex items-center justify-center gap-2 rounded-full bg-mustard py-4 font-display text-lg uppercase text-ink transition hover:-translate-y-0.5">
                  <MapPin size={18} /> {b.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
