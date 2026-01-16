class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addToCartBtn = page.locator('a:has-text("Add to cart")');
  }

  async addToCart() {
    // 監聽彈窗 alert，並確保在點擊後等待彈窗出現才繼續
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartBtn.click();

    const dialog = await dialogPromise;
    await dialog.accept();
  }
}

module.exports = { ProductPage };
