// Datos tomados de la carta pública (Canva vía linktr.ee/burger_box), Instagram y Google Maps.
// Precios en ARS. Alérgenos son estimaciones de demo, no datos oficiales.

export const BRANCHES = {
  lujan: {
    id: 'lujan',
    label: 'Luján de Cuyo',
    address: 'Calle San Martín 4426, Mayor Drummond, Luján de Cuyo, Mendoza',
    venue: 'Dentro de Charme',
    phone: '0261 623-0698',
    // ponytail: número inferido del teléfono público; confirmar que es el WhatsApp de pedidos.
    whatsapp: '5492616230698',
    mapsUrl: 'https://maps.app.goo.gl/WNeLGLLyQVgLgdwV6',
    coords: { lat: -32.9974501, lng: -68.8659294 },
  },
  maipu: {
    id: 'maipu',
    label: 'Maipú',
    // ponytail: dirección exacta de Maipú pendiente; coords tomadas del link de Maps.
    address: 'Maipú, Mendoza',
    venue: null,
    phone: '0261 333-7725',
    whatsapp: '5492613337725',
    mapsUrl: 'https://maps.app.goo.gl/Jfju58UEv9jGVWWj8',
    coords: { lat: -32.9769446, lng: -68.7944292 },
  },
}

export const BUSINESS = {
  name: 'Burger Box',
  tagline: 'Adictos al sabor.',
  address: 'Calle San Martín 4426, Mayor Drummond, Luján de Cuyo, Mendoza',
  venue: 'Dentro de Charme',
  phone: '0261 623-0698',
  // ponytail: número inferido del teléfono público; confirmar que es el WhatsApp de pedidos.
  whatsapp: '5492616230698',
  instagram: 'https://www.instagram.com/burger_box__/',
  mapsUrl: 'https://maps.app.goo.gl/WNeLGLLyQVgLgdwV6',
  coords: { lat: -32.9974501, lng: -68.8659294 },
  rating: 4.8,
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
  sauce: { name: 'Salsa Box', desc: 'La secreta de la casa (o Tasty / Barbacoa)', allergens: ['Huevo', 'Mostaza'] },
  pickleSauce: { name: 'Salsa de pepinillo', desc: 'Cremosa, ácida, adictiva', allergens: ['Huevo', 'Mostaza'] },
  hotSauce: { name: 'Salsa hot box', desc: 'Picante con fondo dulce', allergens: ['Mostaza'] },
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
  id, name, price, lines, layers, theme, tags, desc: lines.join(', '), img: `/img/${id}.png`, category: 'burgers',
})

export const PRODUCTS = [
  b('cheese', 'BB Cheese', 9900, ['medallón simple', 'cheddar x2', 'salsa box'], ['bunTop', 'sauce', 'cheese', 'patty', 'bunBottom'], { bg: '#c9701a', title: '#ffd400', arc: '#5a2e12', text: '#ff4a1c' }),
  b('classic', 'BB Classic', 10900, ['medallón simple', 'tomate y lechuga', 'cheddar x2', 'salsa box'], ['bunTop', 'sauce', 'lettuce', 'tomato', 'cheese', 'patty', 'bunBottom'], { bg: '#1f8a14', title: '#ffd400', arc: '#ffd400', text: '#5a2e12' }),
  { ...b('veggie', 'BB Veggie', 11500, ['medallón veggie', 'tomate y lechuga', 'cheddar x2', 'salsa box'], ['bunTop', 'sauce', 'lettuce', 'tomato', 'cheese', 'veggiePatty', 'bunBottom'], { bg: '#1f8a14', title: '#ffd400', arc: '#ffd400', text: '#5a2e12' }, ['Veggie']), veggie: true },
  b('onion', 'BB Onion', 13500, ['doble medallón', 'cebolla caramelizada', 'cheddar x4', 'salsa box'], ['bunTop', 'sauce', 'onion', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#4f0b48', title: '#3a3a3a', arc: '#ffd400', text: '#3a2a1a' }),
  b('crispy', 'BB Crispy', 13900, ['doble medallón', 'cebolla crispy', 'cheddar x4', 'salsa box'], ['bunTop', 'sauce', 'crispyOnion', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#f07a0c', title: '#5a2e12', arc: '#5a2e12', text: '#ffd400' }, ['Top']),
  b('bacon', 'BB Bacon', 13900, ['doble medallón', 'cheddar x4', 'salsa box', 'bacon'], ['bunTop', 'sauce', 'bacon', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#f2c800', title: '#5a2e12', arc: '#5a2e12', text: '#d8231b' }, ['Top']),
  b('pickle', 'BB Pickle', 14500, ['doble medallón', 'salsa cuarto de libra', 'salsa pepinillos', 'doble pan', 'lechuga', 'pepinillos'], ['bunTop', 'pickleSauce', 'pickle', 'cheese', 'patty', 'bunMid', 'qpSauce', 'lettuce', 'cheese', 'patty', 'bunBottom'], { bg: '#e0960a', title: '#d8231b', arc: '#7a4a1e', text: '#f2b01e' }, ['New!']),
  b('exotic', 'BB Exotic', 14500, ['doble medallón', 'cebolla crispy', 'salsa hot box', 'cheddar x4'], ['bunTop', 'hotSauce', 'crispyOnion', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#c8191e', title: '#3a3a3a', arc: '#5a2e12', text: '#4a4a4a' }, ['Picante']),
  b('triple', 'BB Triple Cheese', 15900, ['triple medallón', 'cheddar x6', 'salsa box'], ['bunTop', 'sauce', 'cheese', 'patty', 'cheese', 'patty', 'cheese', 'patty', 'bunBottom'], { bg: '#6b3e1a', title: '#ffd400', arc: '#c9822e', text: '#5a2e12' }, ['Monstruo']),

  { id: 'fries-s', category: 'sides', name: 'Papas chicas', price: 4500, desc: 'Bastón, sal marina' },
  { id: 'fries-l', category: 'sides', name: 'Papas grandes', price: 8500, desc: 'Para compartir (o no)' },
  { id: 'fries-box', category: 'sides', name: 'Papas Box', price: 13000, desc: 'Con panceta y cheddar fundido', tags: ['Top'] },

]

export const EXTRAS = [
  { id: 'bacon', name: 'Bacon', price: 2500 },
  { id: 'patty', name: 'Medallón', price: 3500 },
  { id: 'cheese', name: 'Cheese', price: 1000 },
  { id: 'egg', name: 'Huevo', price: 800 },
]

export const BREADS = ['Liso', 'Parmesano']
export const SAUCES = ['Tasty', 'Box', 'Barbacoa']

export const CATEGORIES = [
  { id: 'burgers', label: 'Hamburguesas' },
  { id: 'sides', label: 'Papas' },
  { id: 'veggie', label: 'Veggie' },
]

export const money = (n) => '$' + n.toLocaleString('es-AR')
