class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.placeOrderBtn = page.locator('button:has-text("Place Order")');
  }

  async gotoCart() {
    await this.page.click('a:has-text("Cart")');
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }
}

module.exports = { CartPage };
