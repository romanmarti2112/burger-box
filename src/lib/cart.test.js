// node src/lib/cart.test.js
import assert from 'node:assert/strict'
import { PRODUCTS } from '../data/menu.js'
import { addLine, setQty, totals, whatsappMessage } from './cart.js'

const bacon = PRODUCTS.find((p) => p.id === 'bacon')
const fries = PRODUCTS.find((p) => p.id === 'fries-s')

let cart = addLine([], { product: bacon, bread: 'Liso', sauce: 'Box', extras: ['egg', 'cheese'] })
cart = addLine(cart, { product: bacon, bread: 'Liso', sauce: 'Box', extras: ['cheese', 'egg'] }) // mismo item, otro orden
cart = addLine(cart, { product: fries })
assert.equal(cart.length, 2)
assert.equal(cart[0].qty, 2)

// (13900 + 800 + 1000) * 2 + 4500 = 35900
assert.deepEqual(totals(cart, false), { subtotal: 35900, discount: 0, total: 35900 })
assert.deepEqual(totals(cart, true), { subtotal: 35900, discount: 3590, total: 32310 })

assert.equal(setQty(cart, cart[1].key, 0).length, 1)
assert.match(whatsappMessage(cart, { name: 'Ana', mode: 'pickup', cash: true }), /2x BB Bacon \(pan Liso, salsa Box, \+Huevo, \+Cheese\)/)
console.log('cart ok')
