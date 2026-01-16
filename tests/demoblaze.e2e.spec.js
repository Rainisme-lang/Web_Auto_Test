const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { OrderModal } = require('../pages/OrderModal');

test('Demoblaze Happy Path - Purchase Flow', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const order = new OrderModal(page);

  // 瀏覽商品
  await home.goto();
  await home.selectCategory('Laptops');
  await home.selectProduct('Sony vaio i5');

  // 加入購物車
  await product.addToCart();

  // 結帳流程
  await cart.gotoCart();
  await cart.clickPlaceOrder();
  await order.fillForm('Test User', '1234567890');
  await order.submit();

  // 結果驗證
  await expect(order.successTitle).toHaveText('Thank you for your purchase!');

  const { id, amount } = await order.getOrderInfo();
  console.log(`Order ID: ${id}, Amount: ${amount}`);
});
