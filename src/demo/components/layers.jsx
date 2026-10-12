// Capas realistas en SVG. Cada capa se dibuja en un viewBox de W x H
// (px a tamaño 240) y escala uniforme con la burger.

// PRNG determinístico: misma capa = mismas manchas en cada render.
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646

// Ancho (% del pan), alto (px a size 240), rugosidad de bordes.
export const SPEC = {
  bunTop: { w: 100, h: 74, rough: 2 },
  bunMid: { w: 97, h: 22, rough: 2 },
  bunBottom: { w: 98, h: 36, rough: 2 },
  sauce: { w: 94, h: 14, rough: 3 },
  pickleSauce: { w: 94, h: 14, rough: 3 },
  qpSauce: { w: 94, h: 14, rough: 3 },
  hotSauce: { w: 94, h: 14, rough: 3 },
  cheese: { w: 104, h: 22, rough: 3 },
  patty: { w: 106, h: 32, rough: 9 },
  veggiePatty: { w: 98, h: 30, rough: 5 },
  lettuce: { w: 110, h: 20, rough: 7 },
  tomato: { w: 96, h: 14, rough: 2 },
  onion: { w: 98, h: 16, rough: 3 },
  crispyOnion: { w: 104, h: 22, rough: 4 },
  bacon: { w: 108, h: 16, rough: 6 },
  pickle: { w: 92, h: 12, rough: 1 },
  egg: { w: 104, h: 20, rough: 6 },
}

const SAUCE_COLOR = { sauce: ['#ffb27a', '#e8733a'], pickleSauce: ['#f4f1dc', '#cfd3a8'], qpSauce: ['#f7d9a6', '#e0a865'], hotSauce: ['#ff5a2a', '#c21d0e'] }

// Puntos de una línea ondulada irregular.
const pts = (W, y, amp, n, seed, phase = 0) => {
  const r = rng(seed)
  return Array.from({ length: n + 1 }, (_, i) => [(W * i) / n, y + Math.sin(i * 1.7 + phase) * amp + (r() - 0.5) * amp])
}
const line = (p) => 'M' + p.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
const wave = (...a) => line(pts(...a))
// Franja cerrada entre dos ondas (arriba y abajo).
const band = (top, bottom) => line([...top, ...bottom.reverse()]) + 'Z'

function draw(key, W, H, id) {
  const r = rng(key.length * 97 + W)
  const g = (gid) => `url(#${id}${gid})`

  switch (key) {
    case 'bunTop':
      return (
        <>
          <defs>
            <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffb54a" />
              <stop offset=".55" stopColor="#f2891a" />
              <stop offset="1" stopColor="#b9560c" />
            </linearGradient>
            <radialGradient id={id + 'h'} cx=".35" cy=".25" r=".35">
              <stop offset="0" stopColor="#fff6d8" stopOpacity=".85" />
              <stop offset="1" stopColor="#fff6d8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={`M3 ${H - 8} C3 ${H * 0.3} ${W * 0.22} 2 ${W / 2} 2 C${W * 0.78} 2 ${W - 3} ${H * 0.3} ${W - 3} ${H - 8} Q${W - 3} ${H - 2} ${W - 14} ${H - 2} L14 ${H - 2} Q3 ${H - 2} 3 ${H - 8}Z`} fill={g('a')} />
          <ellipse cx={W * 0.4} cy={H * 0.32} rx={W * 0.32} ry={H * 0.24} fill={g('h')} />
          <path d={`M10 ${H - 6} Q${W / 2} ${H - 12} ${W - 10} ${H - 6} L${W - 12} ${H} L12 ${H}Z`} fill="#f6d593" />
        </>
      )
    case 'bunBottom':
      return (
        <>
          <defs>
            <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f39b2d" />
              <stop offset="1" stopColor="#b85a10" />
            </linearGradient>
          </defs>
          <path d={`M2 6 L${W - 2} 6 L${W - 4} ${H - 12} Q${W - 6} ${H - 1} ${W - 26} ${H - 1} L26 ${H - 1} Q6 ${H - 1} 4 ${H - 12}Z`} fill={g('a')} />
          <path d={`M2 6 Q${W / 2} -2 ${W - 2} 6 L${W - 2} 12 Q${W / 2} 16 2 12Z`} fill="#f2c56e" />
        </>
      )
    case 'bunMid':
      return (
        <>
          <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#ee8f22" />
          <rect x="3" y="1" width={W - 6} height={H * 0.32} rx="4" fill="#f6cf7f" />
          <rect x="3" y={H * 0.66} width={W - 6} height={H * 0.32} rx="4" fill="#f0bf63" />
        </>
      )
    case 'patty':
    case 'veggiePatty': {
      const veg = key === 'veggiePatty'
      const spots = Array.from({ length: 34 }, () => [r() * W, 4 + r() * (H - 8), 1 + r() * 3.5, r()])
      return (
        <>
          <defs>
            <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={veg ? '#a8874a' : '#6b3414'} />
              <stop offset=".5" stopColor={veg ? '#7c6233' : '#3b1a08'} />
              <stop offset="1" stopColor={veg ? '#4f3d1e' : '#1e0c03'} />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width={W - 4} height={H - 4} rx={H * 0.42} fill={g('a')} />
          {spots.map(([x, y, s, t], i) => (
            <circle key={i} cx={x} cy={y} r={s} fill={veg ? (t > 0.5 ? '#d9c18a' : '#5b4524') : t > 0.6 ? '#9a5222' : t > 0.3 ? '#5a2a0e' : '#120501'} opacity=".85" />
          ))}
          <path d={wave(W, 4, 1.5, 14, 7)} stroke={veg ? '#e3c98e' : '#a35a26'} strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round" />
        </>
      )
    }
    case 'cheese': {
      const drips = Array.from({ length: 6 }, (_, i) => [W * (0.08 + i * 0.17 + r() * 0.06), H * (0.55 + r() * 0.45), 4 + r() * 4])
      return (
        <>
          <defs>
            <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd84a" />
              <stop offset="1" stopColor="#f2a900" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width={W - 2} height={H * 0.48} rx="5" fill={g('a')} />
          {drips.map(([x, len, w], i) => (
            <path key={i} d={`M${x - w} ${H * 0.4} L${x - w * 0.6} ${len - w} Q${x} ${len + w * 0.4} ${x + w * 0.6} ${len - w} L${x + w} ${H * 0.4}Z`} fill={g('a')} />
          ))}
          <rect x="6" y="3" width={W * 0.7} height="2.5" rx="1.2" fill="#fff4b8" opacity=".7" />
        </>
      )
    }
    case 'lettuce':
      return (
        <>
          <defs>
            <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d6f590" />
              <stop offset=".5" stopColor="#97d54a" />
              <stop offset="1" stopColor="#5f9e27" />
            </linearGradient>
          </defs>
          <path d={band(pts(W, 5, 3, 22, 3), pts(W, H - 5, 3, 22, 9))} fill={g('a')} />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${W * (0.06 + i * 0.11)} ${H * 0.3} q6 ${H * 0.25} 2 ${H * 0.45}`} stroke="#effcc8" strokeWidth="1.2" fill="none" opacity=".7" />
          ))}
        </>
      )
    case 'tomato':
      return (
        <>
          {[0, 1, 2].map((s) => {
            const x0 = 2 + (s * (W - 4)) / 3
            const w = (W - 4) / 3 + 6
            return (
              <g key={s}>
                <rect x={x0 - (s ? 6 : 0)} y="1" width={w} height={H - 2} rx={H / 2} fill="#c9200f" />
                <rect x={x0 + 3 - (s ? 6 : 0)} y="3" width={w - 6} height={H - 6} rx={H / 2} fill="#ec4a2c" />
                {[0.3, 0.7].map((f) => (
                  <ellipse key={f} cx={x0 - (s ? 6 : 0) + w * f} cy={H / 2} rx={w * 0.14} ry={H * 0.22} fill="#ff9a6a" />
                ))}
              </g>
            )
          })}
        </>
      )
    case 'onion':
    case 'crispyOnion': {
      const crispy = key === 'crispyOnion'
      const cols = crispy ? ['#f7c66a', '#e09a33', '#c27420', '#ffd98a'] : ['#8a4612', '#b2671f', '#6b330b', '#c98538']
      return (
        <>
          <rect x="4" y={H * 0.35} width={W - 8} height={H * 0.4} rx={H * 0.2} fill={crispy ? '#b9761f' : '#6b330b'} />
          {Array.from({ length: crispy ? 70 : 46 }, (_, i) => {
            const x = 4 + r() * (W - 16)
            const y = 3 + r() * (H - 6)
            const len = crispy ? 6 + r() * 12 : 10 + r() * 18
            return <path key={i} d={`M${x} ${y} q${len / 2} ${(r() - 0.5) * 8} ${len} ${(r() - 0.5) * 6}`} stroke={cols[i % 4]} strokeWidth={crispy ? 2.4 : 3} fill="none" strokeLinecap="round" />
          })}
        </>
      )
    }
    case 'bacon':
      return (
        <>
          {[0, 1].map((s) => (
            <g key={s} transform={`translate(0 ${s * 3})`}>
              <path d={band(pts(W, 3 + s * 2, 2.5, 10, 4 + s, s), pts(W, H - 6 + s, 2.5, 10, 6 + s, s))} fill={s ? '#7a1a10' : '#a3291a'} />
              <path d={wave(W, H * 0.42 + s, 2, 10, 4 + s, s)} stroke="#f5cdb2" strokeWidth="2.6" fill="none" opacity=".9" />
            </g>
          ))}
        </>
      )
    case 'pickle':
      return (
        <>
          {Array.from({ length: 6 }, (_, i) => {
            const cx = W * (0.09 + i * 0.165)
            return (
              <g key={i}>
                <ellipse cx={cx} cy={H / 2} rx={W * 0.085} ry={H / 2 - 1} fill="#4e6b16" />
                <ellipse cx={cx} cy={H / 2} rx={W * 0.065} ry={H / 2 - 3} fill="#a9bf4e" />
                <ellipse cx={cx} cy={H / 2} rx={W * 0.03} ry={H / 4} fill="#d8e39a" />
              </g>
            )
          })}
        </>
      )
    case 'egg':
      return (
        <>
          <path d={`${wave(W, 3, 2.5, 12, 11)} L${W - 2} ${H - 3} L2 ${H - 3}Z`} fill="#fffaf0" />
          <ellipse cx={W * 0.55} cy={H * 0.45} rx={W * 0.13} ry={H * 0.38} fill="#ffad0a" />
          <ellipse cx={W * 0.52} cy={H * 0.32} rx={W * 0.04} ry={H * 0.1} fill="#ffe7a0" />
        </>
      )
    default: {
      const [c1, c2] = SAUCE_COLOR[key]
      return (
        <>
          <defs>
            <linearGradient id={id + 'a'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={c1} />
              <stop offset="1" stopColor={c2} />
            </linearGradient>
          </defs>
          <path d={`${wave(W, 3, 1.5, 12, 5)} L${W} ${H * 0.6} L${W * 0.72} ${H * 0.62} Q${W * 0.69} ${H} ${W * 0.66} ${H * 0.62} L${W * 0.3} ${H * 0.62} Q${W * 0.27} ${H * 0.95} ${W * 0.24} ${H * 0.62} L0 ${H * 0.6}Z`} fill={g('a')} />
          <rect x={W * 0.1} y="3" width={W * 0.5} height="2" rx="1" fill="#fff" opacity=".55" />
        </>
      )
    }
  }
}

// Una capa: SVG + filtro de bordes irregulares y grano de textura.
export function LayerArt({ k, size, id }) {
  const s = SPEC[k]
  const W = 2.4 * s.w
  const H = s.h
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={(H * size) / 240} overflow="visible" className="block drop-shadow-[0_6px_8px_rgba(0,0,0,.55)]">
      <defs>
        <filter id={id + 'f'} x="-10%" y="-40%" width="120%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={s.rough} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" result="ng" />
          <feComponentTransfer in="ng" result="nl">
            <feFuncR type="linear" slope=".35" intercept=".7" />
            <feFuncG type="linear" slope=".35" intercept=".7" />
            <feFuncB type="linear" slope=".35" intercept=".7" />
          </feComponentTransfer>
          <feComposite in="nl" in2="d" operator="in" result="nm" />
          <feBlend in="d" in2="nm" mode="multiply" />
        </filter>
      </defs>
      <g filter={`url(#${id}f)`}>{draw(k, W, H, id)}</g>
    </svg>
  )
}
