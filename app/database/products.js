const products = [
  {
    id: 1,
    name: 'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
    image: 'intenso.png',
    price: 20.0,
  },
  {
    id: 2,
    name: 'PHIXERO P500 SSD Internal Hard Drive 1TB',
    image: 'phixero.png',
    price: 25.0,
  },
  {
    id: 3,
    name: 'TP-LINK ER605 5 Port Dual/Multiple WAN VPN Router',
    image: 'tp-link.png',
    price: 30.0,
  },
  {
    id: 4,
    name: 'Apple iPhone 15 (128GB) - Black',
    image: 'iphone.png',
    price: 800.0,
  },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((product) => product.id === id);
}
