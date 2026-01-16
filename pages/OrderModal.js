class OrderModal {
  constructor(page) {
    this.page = page;
    this.total = page.locator('#totalm');
    this.nameInput = page.locator('#name');
    this.creditCardInput = page.locator('#card');
    this.purchaseBtn = page.locator('button:has-text("Purchase")');

    this.successTitle = page.locator('h2', { hasText: 'Thank you for your purchase!' });

    // 新增確認文字 locator（sweetalert modal 的內容通常在 p 裡）
    this.confirmText = page.locator('.sweet-alert p');
    // this.confirmText = page.locator('p.lead.text-muted');
  }

  async fillForm(name, creditCard) {
    await this.total.waitFor({ state: 'visible' }); // 確保元素可見

    // 監聽 total 文字變化
    await this.page.waitForFunction(
      (selector) => {
        const _el = document.querySelector(selector);
        // 使用 textContent 避免因為元素樣式（如動畫未完成時的 opacity/visibility）導致 innerText 為空
        const text = _el ? _el.textContent : '';
        const match = text.match(/Total:\s*([0-9.]+)/);
        return match && parseFloat(match[1]) > 0;
      },
      '#totalm'
    );

    await this.nameInput.fill(name);
    await this.creditCardInput.fill(creditCard);
  }

  async submit() {
    await this.purchaseBtn.click();
  }

  async getOrderInfo() {
    // 等待成功標題可見，確保 modal 已經出現
    await this.successTitle.waitFor({ state: 'visible' });

    const text = await this.confirmText.innerText();

    const id = text.match(/Id:\s*(\d+)/)?.[1] ?? null;
    const amount = text.match(/Amount:\s*([0-9.]+)/)?.[1] ?? null;

    return { id, amount };
  }
}

module.exports = { OrderModal };
