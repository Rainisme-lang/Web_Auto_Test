class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // this.laptopsCategory = page.locator('a:has-text("Laptops")');
    this.CategoryLink = (name) => page.locator(`a:has-text("${name}")`);
    this.productLink = (name) => page.locator(`a:has-text("${name}")`);
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  // async selectCategoryLaptops() {
  //   await this.laptopsCategory.click();
  // }

  async selectCategory(name) {
    await this.CategoryLink(name).click();
  }

  async selectProduct(name) {
    await this.productLink(name).click();
  }
}

module.exports = { HomePage };
