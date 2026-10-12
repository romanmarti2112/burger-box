// DEMO de concepto: negocio, sucursales, teléfonos y precios ficticios.
// Precios en ARS. Alérgenos son estimaciones de demo, no datos oficiales.

export const BRANCHES = {
  lujan: {
    id: 'lujan',
    label: 'Sucursal Centro',
    address: 'Av. Siempreviva 1234, Ciudad de Mendoza',
    venue: null,
    phone: '0261 000-0001',
    whatsapp: '5492610000001',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Independencia,+Mendoza',
    coords: { lat: -32.8895, lng: -68.8458 },
  },
  maipu: {
    id: 'maipu',
    label: 'Sucursal Oeste',
    address: 'Calle Ejemplo 567, Godoy Cruz, Mendoza',
    venue: null,
    phone: '0261 000-0002',
    whatsapp: '5492610000002',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+General+San+Martin,+Mendoza',
    coords: { lat: -32.8975, lng: -68.8756 },
  },
}

export const BUSINESS = {
  name: 'Fuego Smash',
  tagline: 'Smash, cheddar y repetí.',
  address: 'Av. Siempreviva 1234, Ciudad de Mendoza',
  venue: null,
  phone: '0261 000-0001',
  whatsapp: '5492610000001',
  instagram: null,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Independencia,+Mendoza',
  coords: { lat: -32.8895, lng: -68.8458 },
  hours: [
    { days: 'Lunes', time: 'Cerrado' },
    { days: 'Martes a Domingo', time: '20:00 – 00:00' },
  ],
  cashDiscount: 0.1,
}

// Catálogo de capas: cada hamburguesa referencia estas claves de arriba hacia abajo.
export const INGREDIENTS = {
  bunTop: { name: 'Pan de papa', desc: 'Liso o con parmesano, tostado en manteca', allergens: ['Gluten', 'Lácteos', 'Huevo'] },
  bunMid: { name: 'Pan del medio', desc: 'Tapa extra para dividir los pisos', allergens: ['Gluten', 'Lácteos'] },
  bunBottom: { name: 'Base de pan', desc: 'Sella los jugos sin desarmarse', allergens: ['Gluten', 'Lácteos', 'Huevo'] },
  sauce: { name: 'Salsa Fuego', desc: 'La de la casa (o Tasty / Barbacoa)', allergens: ['Huevo', 'Mostaza'] },
  pickleSauce: { name: 'Salsa de pepinillo', desc: 'Cremosa, ácida, adictiva', allergens: ['Huevo', 'Mostaza'] },
  hotSauce: { name: 'Salsa hot fuego', desc: 'Picante con fondo dulce', allergens: ['Mostaza'] },
  qpSauce: { name: 'Salsa cuarto de libra', desc: 'La clásica, cremosa y especiada', allergens: ['Huevo', 'Mostaza'] },
  cheese: { name: 'Cheddar', desc: 'Doble feta fundida sobre la plancha', allergens: ['Lácteos'] },
  patty: { name: 'Medallón smash', desc: 'Carne smasheada, costra crocante', allergens: [] },
  veggiePatty: { name: 'Medallón yamaní', desc: 'Arroz yamaní y cebolla caramelizada', allergens: ['Soja'] },
  lettuce: { name: 'Lechuga', desc: 'Fresca, crocante, cortada al momento', allergens: [] },
  tomato: { name: 'Tomate', desc: 'Rodajas finas de estación', allergens: [] },
  onion: { name: 'Cebolla caramelizada', desc: 'Cocción lenta, punto dulce', allergens: [] },
  crispyOnion: { name: 'Cebolla crispy', desc: 'Frita, ultra crocante', allergens: ['Gluten'] },
  bacon: { name: 'Bacon crujiente', desc: 'Tiras doradas a la plancha', allergens: [] },
  pickle: { name: 'Pepinillos', desc: 'Agridulces, en rodajas', allergens: [] },
  egg: { name: 'Huevo a la plancha', desc: 'Yema a punto', allergens: ['Huevo'] },
}

// theme = colores del póster de Instagram (fondo, título); lines = texto de la curva inferior.
const b = (id, name, price, lines, layers, theme, tags = []) => ({
  id, name, price, lines, layers, theme, tags, desc: lines.join(', '), category: 'burgers',
})

export const PRODUCTS = [
  b('cheese', 'FS Cheese', 9900, ['medallón simple', 'cheddar x2', 'salsa fuego'], ['bunTop', 'sauce', 'cheese', 'patty', 'bunBottom'], { bg: '#c9701a', title: '#ffd400', arc: '#5a2e12', text: '#ff4a1c' }),
  b('classic', 'FS Classic', 10900, ['medallón simple', 'tomate y lechuga', 'cheddar x2', 'salsa fuego'], ['bunTop', 'sauce', 'lettuce', 'tomato', 'cheese', 'patty', 'bunBottom'], { bg: '#1f8a14', title: '#ffd400', arc: '#ffd400', text: '#5a2e12' }),
  { ...b('veggie', 'FS Veggie', 11500, ['medallón veggie', 'tomate y lechuga', 'cheddar x2', 'salsa fuego'], ['bunTop', 'sauce', 'lettuce', 'tomato', 'cheese', 'veggiePatty', 'bunBottom'], { bg: '#1f8a14', title: '#ffd400', arc: '#ffd400', text: '#5a2e12' }, ['Veggie']), veggie: true },
  b('onion', 'FS Onion', 13500, ['doble medallón', 'cebolla caramelizada', 'cheddar x4', 'salsa fuego'], ['bunTop', 'sauce', 'onion', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#4f0b48', title: '#3a3a3a', arc: '#ffd400', text: '#3a2a1a' }),
  b('crispy', 'FS Crispy', 13900, ['doble medallón', 'cebolla crispy', 'cheddar x4', 'salsa fuego'], ['bunTop', 'sauce', 'crispyOnion', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#f07a0c', title: '#5a2e12', arc: '#5a2e12', text: '#ffd400' }, ['Top']),
  b('bacon', 'FS Bacon', 13900, ['doble medallón', 'cheddar x4', 'salsa fuego', 'bacon'], ['bunTop', 'sauce', 'bacon', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#f2c800', title: '#5a2e12', arc: '#5a2e12', text: '#d8231b' }, ['Top']),
  b('pickle', 'FS Pickle', 14500, ['doble medallón', 'salsa cuarto de libra', 'salsa pepinillos', 'doble pan', 'lechuga', 'pepinillos'], ['bunTop', 'pickleSauce', 'pickle', 'cheese', 'patty', 'bunMid', 'qpSauce', 'lettuce', 'cheese', 'patty', 'bunBottom'], { bg: '#e0960a', title: '#d8231b', arc: '#7a4a1e', text: '#f2b01e' }, ['New!']),
  b('exotic', 'FS Exotic', 14500, ['doble medallón', 'cebolla crispy', 'salsa hot fuego', 'cheddar x4'], ['bunTop', 'hotSauce', 'crispyOnion', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#c8191e', title: '#3a3a3a', arc: '#5a2e12', text: '#4a4a4a' }, ['Picante']),
  b('triple', 'FS Triple Cheese', 15900, ['triple medallón', 'cheddar x6', 'salsa fuego'], ['bunTop', 'sauce', 'cheese', 'patty', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#6b3e1a', title: '#ffd400', arc: '#c9822e', text: '#5a2e12' }, ['Monstruo']),

  { id: 'fries-s', category: 'sides', name: 'Papas chicas', price: 4500, desc: 'Bastón, sal marina' },
  { id: 'fries-l', category: 'sides', name: 'Papas grandes', price: 8500, desc: 'Para compartir (o no)' },
  { id: 'fries-box', category: 'sides', name: 'Papas Fuego', price: 13000, desc: 'Con panceta y cheddar fundido', tags: ['Top'] },

]

export const EXTRAS = [
  { id: 'bacon', name: 'Bacon', price: 2500 },
  { id: 'patty', name: 'Medallón', price: 3500 },
  { id: 'cheese', name: 'Cheese', price: 1000 },
  { id: 'egg', name: 'Huevo', price: 800 },
]

export const BREADS = ['Liso', 'Parmesano']
export const SAUCES = ['Tasty', 'Fuego', 'Barbacoa']

export const CATEGORIES = [
  { id: 'burgers', label: 'Hamburguesas' },
  { id: 'sides', label: 'Papas' },
  { id: 'veggie', label: 'Veggie' },
]

export const money = (n) => '$' + n.toLocaleString('es-AR')
