import { BUSINESS, EXTRAS, money } from '../data/menu.js'

// Misma burger con mismas opciones = misma línea del carrito.
export const lineKey = ({ product, bread, sauce, extras = [] }) => [product.id, bread, sauce, [...extras].sort().join('+')].join('|')

export const linePrice = ({ product, extras = [] }) =>
  product.price + EXTRAS.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price, 0)

export function addLine(cart, item) {
  const key = lineKey(item)
  const hit = cart.find((l) => l.key === key)
  return hit ? cart.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l)) : [...cart, { ...item, key, qty: 1 }]
}

export const setQty = (cart, key, qty) => (qty <= 0 ? cart.filter((l) => l.key !== key) : cart.map((l) => (l.key === key ? { ...l, qty } : l)))

export function totals(cart, cash) {
  const subtotal = cart.reduce((s, l) => s + linePrice(l) * l.qty, 0)
  const discount = cash ? Math.round(subtotal * BUSINESS.cashDiscount) : 0
  return { subtotal, discount, total: subtotal - discount }
}

export function whatsappMessage(cart, { name, mode, address, cash }) {
  const { subtotal, discount, total } = totals(cart, cash)
  const lines = cart.map((l) => {
    const opts = [l.bread && `pan ${l.bread}`, l.sauce && `salsa ${l.sauce}`, ...(l.extras ?? []).map((id) => `+${EXTRAS.find((e) => e.id === id).name}`)].filter(Boolean)
    return `• ${l.qty}x ${l.product.name}${opts.length ? ` (${opts.join(', ')})` : ''} — ${money(linePrice(l) * l.qty)}`
  })
  return [
    `¡Hola Burger Box! 🍔 Quiero hacer un pedido:`,
    '',
    ...lines,
    '',
    `Subtotal: ${money(subtotal)}`,
    discount ? `Desc. efectivo 10%: -${money(discount)}` : null,
    `*Total: ${money(total)}*`,
    '',
    `Nombre: ${name || '-'}`,
    `Entrega: ${mode === 'delivery' ? `Delivery a ${address || '-'}` : 'Retiro en el local'}`,
    `Pago: ${cash ? 'Efectivo' : 'Transferencia'}`,
  ]
    .filter((x) => x !== null)
    .join('\n')
}

export const whatsappUrl = (text) => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`
