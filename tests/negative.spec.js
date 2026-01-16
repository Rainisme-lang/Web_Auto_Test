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

  // 監聽 dialog 事件
  let dialogAppeared = false;
  page.on('dialog', async dialog => {
    console.log(`Alert message: ${dialog.message()}`);
    dialogAppeared = true;
    await page.waitForTimeout(3000);
    await dialog.accept();
  });

  // 結帳流程
  await cart.gotoCart();
  await cart.clickPlaceOrder();
  await order.submit();

  await page.waitForTimeout(5000);

  // 驗證是否有出現彈窗 (針對 WebKit issue)
  expect(dialogAppeared, 'Dialog/Alert should verify').toBeTruthy();
});
