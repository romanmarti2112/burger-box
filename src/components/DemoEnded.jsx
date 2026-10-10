import { MessageCircle } from 'lucide-react'

// Cartel de demo vencida: tapa todo el sitio. Para sacarlo, poner DEMO_ENDED = false en App.jsx.
const CONTACT = '2617598659'

export default function DemoEnded() {
  return (
    <div role="alertdialog" aria-modal="true" aria-label="Demo finalizada" className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-4 backdrop-blur-xl">
      <div className="w-full max-w-md rounded-3xl border border-mustard/40 bg-coal p-8 text-center shadow-[0_0_80px_rgba(255,199,44,.2)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-flame">Aviso</p>
        <h2 className="mt-2 font-display text-5xl uppercase leading-none text-mustard">Demo finalizada</h2>
        <div className="my-6 h-px bg-white/10" />
        <p className="font-display text-3xl uppercase">Viña Studio</p>
        <p className="mt-4 text-cream/70">Para continuar con el sitio, hablá con</p>
        <p className="mt-1 font-display text-4xl text-mustard">{CONTACT}</p>
        <a
          href={`https://wa.me/549${CONTACT}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3.5 font-bold uppercase text-ink transition hover:-translate-y-0.5"
        >
          <MessageCircle size={18} /> Escribir por WhatsApp
        </a>
      </div>
    </div>
  )
}
