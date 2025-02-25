import { expect, test } from '@playwright/test';
import { calculateTotal } from '../util/calculateTotal';

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

export const twoChosenProducts = [
  {
    id: 1,
    name: 'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
    slug: 'intenso-speed-line-64gb-memory-stick-usb-3-2-gen-1x1-black',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817004/wtfusfu0xivvs1ldnews.jpg',
    price: 2000,
    description: `<b>The Intenso Speed Line is a powerful USB stick for all users who value fast data transfer.</b><div><br /></div><div>Thanks to its USB 3.2 Gen1x1 interface, it can reach up to 10 times higher transfer speeds than standard USB 2.0 sticks.</div><div><br /></div><div>Furthermore, the Speed Line is characterised by particularly high storage capacities of up to 256 GB, which is why it offers sufficient storage space for countless photos, videos, music and other memory-intensive files.</div>`,
    amount: 1,
    subtotal: 2000,
  },
  {
    id: 3,
    name: 'TP-LINK ER605 5 Port Dual/Multiple WAN VPN Router',
    slug: 'tp-link-er605-5-port-dual',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816864/ksjqyixa6xfnjm7gm0cs.jpg',
    price: 3000,
    description: `<ul><li>Integrated with Omada SDN Centralized Cloud Management and Intelligent Monitoring</li></ul><div><br /></div><ul><li>Centralized management</li></ul><div><br /></div><ul><li>Cloud access and Omada app for maximum convenience and easy management</li></ul><div><br /></div><ul><li>Five Gigabit ports</li></ul><div><br /></div><ul><li>Wired high-speed connectivity</li></ul><div><br /></div><ul><li>Up to 4 WAN ports: 1 Gigabit WAN port and 3 Gigabit WAN/LAN ports with load balancing increase the usage rate of multi-line broadband connections</li></ul>`,
    amount: 1,
    subtotal: 3000,
  },
];

test('testing full shopping process (checkout flow, payment page, thank you page)', async ({
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

  await page.goto('/');

  // Check if the header is correctly displayed on the homepage
  await checkHeader();

  /* For every product of "twoChosenProducts" it checks the product details page
  and adds it to the cart */
  for (const chosenProduct of twoChosenProducts) {
    await page.getByTestId('products-link').click();
    await page.waitForURL('/products');

    await expect(
      page.getByRole('heading', { name: 'Products Overview' }),
    ).toBeVisible();
    for (const product of products) {
      await expect(page.getByTestId(`product-${product.slug}`)).toBeVisible();
      await expect(page.getByRole('img', { name: product.name })).toBeVisible();
      await expect(
        page.getByRole('img', { name: product.name }),
      ).toHaveAttribute('src', product.image);
      await expect(page.getByText(product.name)).toBeVisible();
    }
    await page.getByTestId(`product-${chosenProduct.slug}`).click();
    await page.waitForURL(`/products/${chosenProduct.slug}`);
    await expect(
      page.getByRole('heading', { name: chosenProduct.name }),
    ).toBeVisible();

    await checkHeader();

    await expect(page.getByTestId('product-image')).toBeVisible();
    await expect(page.getByTestId('product-image')).toHaveAttribute(
      'src',
      chosenProduct.image,
    );

    await expect(page.getByTestId('product-price')).toBeVisible();
    await expect(page.getByTestId('product-price')).toHaveText(
      String((chosenProduct.price / 100).toFixed(2)),
    );

    await expect(page.getByTestId('product-quantity')).toBeVisible();
    await expect(page.getByTestId('product-quantity')).toHaveAttribute(
      'value',
      '1',
    );
    await expect(page.getByTestId('product-add-to-cart')).toBeVisible();
    await page.getByTestId('product-add-to-cart').click();
    await expect(page.getByTestId('cart-count')).toHaveText(
      String(++itemsInCart),
    );
  }

  await page.getByTestId('cart-link').click();
  await page.waitForURL('/cart');

  // Checks the cart page

  await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
  await checkHeader();

  /* Checks if all products of "twoChosenProducts" are being shown correctly
  on the cart page and clicks the "Proceed to checkout" button */
  for (const chosenProduct of twoChosenProducts) {
    await expect(
      page.getByTestId(`cart-product-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(page.getByText(chosenProduct.name)).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-quantity-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-quantity-${chosenProduct.slug}`),
    ).toHaveValue(String(chosenProduct.amount));
    await expect(
      page.getByTestId(`cart-product-remove-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-quantity-increment-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-quantity-increment-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-subtotal-${chosenProduct.slug}`),
    ).toHaveText(String((chosenProduct.subtotal / 100).toFixed(2)));
  }
  await expect(page.getByTestId('cart-total')).toBeVisible();
  await expect(page.getByTestId('cart-total')).toHaveText(
    String((calculateTotal(twoChosenProducts) / 100).toFixed(2)),
  );
  await expect(page.getByTestId('cart-checkout')).toBeVisible();
  await page.getByTestId('cart-checkout').click();
  await page.waitForURL('/checkout');

  // Checks the checkout page

  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  await checkHeader();

  /* Checks if all products of "twoChosenProducts" are being shown correctly
  on the checkout page */
  for (const chosenProduct of twoChosenProducts) {
    await expect(
      page.getByTestId(`cart-product-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(page.getByText(chosenProduct.name)).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-quantity-${chosenProduct.slug}`),
    ).toBeVisible();
    await expect(
      page.getByTestId(`cart-product-quantity-${chosenProduct.slug}`),
    ).toHaveText(String(chosenProduct.amount));
    await expect(
      page.getByTestId(`cart-product-subtotal-${chosenProduct.slug}`),
    ).toHaveText(String((chosenProduct.subtotal / 100).toFixed(2)));
  }

  // Checks if all input fields are visible, fills them in and clicks the "Buy now" button

  await expect(page.getByTestId('checkout-first-name')).toBeVisible();
  await page.getByTestId('checkout-first-name').fill('Martin');

  await expect(page.getByTestId('checkout-last-name')).toBeVisible();
  await page.getByTestId('checkout-last-name').fill('Mueller');

  await expect(page.getByTestId('checkout-email')).toBeVisible();
  await page.getByTestId('checkout-email').fill('martin@mueller.com');

  await expect(page.getByTestId('checkout-address')).toBeVisible();
  await page.getByTestId('checkout-address').fill('Martinstraße 20');

  await expect(page.getByTestId('checkout-city')).toBeVisible();
  await page.getByTestId('checkout-city').fill('Wien');

  await expect(page.getByTestId('checkout-postal-code')).toBeVisible();
  await page.getByTestId('checkout-postal-code').fill('1130');

  await expect(page.getByTestId('checkout-country')).toBeVisible();
  await page.getByTestId('checkout-country').fill('Österreich');

  await expect(page.getByTestId('checkout-credit-card')).toBeVisible();
  await page.getByTestId('checkout-credit-card-name').fill('Martin Mueller');

  await expect(page.getByTestId('checkout-credit-card')).toBeVisible();
  await page.getByTestId('checkout-credit-card').fill('1234567890123456');

  await expect(page.getByTestId('checkout-expiration-date')).toBeVisible();
  await page.getByTestId('checkout-expiration-date').fill('10/10');

  await expect(page.getByTestId('checkout-security-code')).toBeVisible();
  await page.getByTestId('checkout-security-code').fill('123');

  await expect(page.getByTestId('checkout-confirm-order')).toBeVisible();
  await page.getByTestId('checkout-confirm-order').click();
  itemsInCart = 0;
  await expect(page.getByTestId('cart-count')).toHaveText(String(itemsInCart));
  await page.waitForURL('/thankyou');

  // Checks the thank you page

  await expect(page).toHaveTitle(/Thank you for your order/);
  await checkHeader();
});
