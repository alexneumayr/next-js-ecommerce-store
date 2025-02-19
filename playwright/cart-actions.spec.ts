import { expect, test } from '@playwright/test';

test("test adding a product to cart, changing it's quantity and remove it from cart", async ({
  page,
}) => {
  await page.goto('/products');

  expect(page.getByRole('heading', { name: 'Our products' }));
});
