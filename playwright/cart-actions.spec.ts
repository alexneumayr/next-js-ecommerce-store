import { expect, test } from '@playwright/test';

const products = [
  {
    id: 1,
    name: 'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
    slug: 'intenso-speed-line-64gb-memory-stick-usb-3-2-gen-1x1-black',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817004/wtfusfu0xivvs1ldnews.jpg',
    price: 2000,
    description: `<b>The Intenso Speed Line is a powerful USB stick for all users who value fast data transfer.</b><div><br /></div><div>Thanks to its USB 3.2 Gen1x1 interface, it can reach up to 10 times higher transfer speeds than standard USB 2.0 sticks.</div><div><br /></div><div>Furthermore, the Speed Line is characterised by particularly high storage capacities of up to 256 GB, which is why it offers sufficient storage space for countless photos, videos, music and other memory-intensive files.</div>`,
  },
  {
    id: 2,
    name: 'PHIXERO P500 SSD Internal Hard Drive 1TB',
    slug: 'phixero-p500-ssd',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816942/ytaga7llufbgdmluxzok.jpg',
    price: 2500,
    description: `<b>Increase Efficiency</b><div><br /></div><div>Experience the efficiency of 3D NAND, where our advanced components are designed for optimal performance from start to finish, resulting in very low power consumption of the PHIXERO P500.</div><div><br /></div><div>With the PHIXERO internal SSD, you can get your system up and running in just under 8 seconds.</div><div><br /></div><div>With read speeds of 550 MB/s and write speeds of 480 MB/s, you can run more demanding applications.</div>`,
  },
  {
    id: 3,
    name: 'TP-LINK ER605 5 Port Dual/Multiple WAN VPN Router',
    slug: 'tp-link-er605-5-port-dual',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816864/ksjqyixa6xfnjm7gm0cs.jpg',
    price: 3000,
    description: `<ul><li>Integrated with Omada SDN Centralized Cloud Management and Intelligent Monitoring</li></ul><div><br /></div><ul><li>Centralized management</li></ul><div><br /></div><ul><li>Cloud access and Omada app for maximum convenience and easy management</li></ul><div><br /></div><ul><li>Five Gigabit ports</li></ul><div><br /></div><ul><li>Wired high-speed connectivity</li></ul><div><br /></div><ul><li>Up to 4 WAN ports: 1 Gigabit WAN port and 3 Gigabit WAN/LAN ports with load balancing increase the usage rate of multi-line broadband connections</li></ul>`,
  },
  {
    id: 4,
    name: 'Apple iPhone 15 (128GB) - Black',
    slug: 'apple-iphone-15',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817051/mpfx2uxosmluqjvdgb0w.jpg',
    price: 80000,
    description: `<b>DYNAMIC ISLAND COMES ON THE IPHONE 15</b><div><br /></div><div><ul><li>Dynamic Island brings clues and live activities forward - so you don't miss anything when you're doing something else.</li><li>See who's calling, whether your flight is on time, and more.</li></ul><div><br /></div><b>Innovative design</b></div><div><b><br /></b>The iPhone 15 has a robust design made of dyed glass and aluminium. It is protected from water and dust. The ceramic shield front is harder than any smartphone glass. And the 6.1 inch Super Retina XDR display is up to 2x brighter in the sun than that of the iPhone 14.</div>`,
  },
];

const singleChosenProduct = {
  id: 1,
  name: 'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
  slug: 'intenso-speed-line-64gb-memory-stick-usb-3-2-gen-1x1-black',
  image:
    'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817004/wtfusfu0xivvs1ldnews.jpg',
  price: 2000,
  description: `<b>The Intenso Speed Line is a powerful USB stick for all users who value fast data transfer.</b><div><br /></div><div>Thanks to its USB 3.2 Gen1x1 interface, it can reach up to 10 times higher transfer speeds than standard USB 2.0 sticks.</div><div><br /></div><div>Furthermore, the Speed Line is characterised by particularly high storage capacities of up to 256 GB, which is why it offers sufficient storage space for countless photos, videos, music and other memory-intensive files.</div>`,
};

test("test adding a product to cart, changing it's quantity and removing it from cart", async ({
  page,
}) => {
  /* Variable used to check if the quantity displayed next to the cart icon
  in the header is correct */
  let itemsInCart = 0;
  // Function that checks if all elements are visible in the header
  async function checkHeader() {
    await expect(page.getByTestId('cart-link')).toBeVisible();
    await expect(page.getByTestId('cart-count')).toBeVisible();
    await expect(page.getByTestId('cart-count')).toHaveText(
      String(itemsInCart),
    );
    await expect(page.getByTestId('products-link')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Site logo' })).toBeVisible();
  }

  await page.goto('/products');

  // Test the products overview page

  await expect(
    page.getByRole('heading', { name: 'Products Overview' }),
  ).toBeVisible();

  await expect(page.getByTestId('products-link')).toBeVisible();

  await checkHeader();

  for (const product of products) {
    await expect(page.getByTestId(`product-${product.slug}`)).toBeVisible();
    await expect(page.getByRole('img', { name: product.name })).toBeVisible();
    await expect(page.getByRole('img', { name: product.name })).toHaveAttribute(
      'src',
      product.image,
    );
    await expect(page.getByText(product.name)).toBeVisible();
  }

  await page.getByTestId(`product-${singleChosenProduct.slug}`).click();
  await page.waitForURL(`/products/${singleChosenProduct.slug}`);

  // Test the product details page

  await expect(
    page.getByRole('heading', { name: singleChosenProduct.name }),
  ).toBeVisible();

  await checkHeader();

  await expect(page.getByTestId('product-image')).toBeVisible();
  await expect(page.getByTestId('product-image')).toHaveAttribute(
    'src',
    singleChosenProduct.image,
  );

  await expect(page.getByTestId('product-price')).toBeVisible();
  await expect(page.getByTestId('product-price')).toHaveText(
    String((singleChosenProduct.price / 100).toFixed(2)),
  );

  await expect(page.getByTestId('product-quantity')).toBeVisible();
  await expect(page.getByTestId('product-quantity')).toHaveAttribute(
    'value',
    '1',
  );
  await expect(page.getByTestId('product-add-to-cart')).toBeVisible();
  await page.getByTestId('product-add-to-cart').click();
  itemsInCart = 1;
  await expect(page.getByTestId('cart-count')).toHaveText(String(itemsInCart));

  await page.getByTestId('product-quantity').fill('2');
  await page.getByTestId('product-add-to-cart').click();
  itemsInCart = 2;
  await expect(page.getByTestId('cart-count')).toHaveText(String(itemsInCart));

  await page.getByTestId('cart-link').click();
  await page.waitForURL('/cart');

  // Test the cart page

  await checkHeader();

  await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
  await expect(
    page.getByTestId(`cart-product-${singleChosenProduct.slug}`),
  ).toBeVisible();
  await expect(page.getByText(singleChosenProduct.name)).toBeVisible();
  await expect(
    page.getByTestId(`cart-product-quantity-${singleChosenProduct.slug}`),
  ).toBeVisible();
  await expect(
    page.getByTestId(`cart-product-quantity-${singleChosenProduct.slug}`),
  ).toHaveValue('2');
  await expect(
    page.getByTestId(`cart-product-remove-${singleChosenProduct.slug}`),
  ).toBeVisible();
  await expect(
    page.getByTestId(
      `cart-product-quantity-increment-${singleChosenProduct.slug}`,
    ),
  ).toBeVisible();
  await expect(
    page.getByTestId(
      `cart-product-quantity-decrement-${singleChosenProduct.slug}`,
    ),
  ).toBeVisible();

  await page
    .getByTestId(`cart-product-quantity-increment-${singleChosenProduct.slug}`)
    .click();
  await expect(
    page.getByTestId(`cart-product-quantity-${singleChosenProduct.slug}`),
  ).toHaveValue('3');
  await expect(page.getByTestId('cart-count')).toHaveText('3');

  await page
    .getByTestId(`cart-product-quantity-increment-${singleChosenProduct.slug}`)
    .click();
  await expect(
    page.getByTestId(`cart-product-quantity-${singleChosenProduct.slug}`),
  ).toHaveValue('4');
  await expect(page.getByTestId('cart-count')).toHaveText('4');

  await page
    .getByTestId(`cart-product-quantity-decrement-${singleChosenProduct.slug}`)
    .click();
  await expect(
    page.getByTestId(`cart-product-quantity-${singleChosenProduct.slug}`),
  ).toHaveValue('3');
  await expect(page.getByTestId('cart-count')).toHaveText('3');

  await page
    .getByTestId(`cart-product-remove-${singleChosenProduct.slug}`)
    .click();
  await expect(
    page.getByTestId(`cart-product-${singleChosenProduct.slug}`),
  ).toHaveCount(0);
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});
