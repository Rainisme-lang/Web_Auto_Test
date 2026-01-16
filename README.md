# Demoblaze 自動化測試專案
這是一個使用 [Playwright] 針對 [Demoblaze](https://www.demoblaze.com/) 網站開發的自動化測試專案。


## 專案功能
此專案包含以下測試場景：
- 商品瀏覽與購買流程
- 購物車功能驗證
- 表單驗證測試


## 安裝依賴 (Prerequisites & Installation)
系統請先安裝 [Node.js](https://nodejs.org/)

1.  **複製專案**：
    

2.  **安裝專案依賴套件**：
    執行以下指令來安裝 `package.json` 中定義的所有套件：
    ```bash
    npm install
    ```

3.  **安裝 Playwright 瀏覽器**：
    這將下載 Chrome, Firefox 和 WebKit 的執行檔：
    ```bash
    npx playwright install
    ```


### 執行所有測試
這會在所有設定的瀏覽器 (Chromium, Firefox, WebKit) 中以無頭模式 (Headless) 執行所有測試：
```bash
npx playwright test
```

### 執行特定測試檔案
例如，只執行 Demoblaze 的購買流程測試：
```bash
npx playwright test tests/demoblaze.e2e.spec.js
```

例如，只執行負面測試：
```bash
npx playwright test tests/negative.spec.js
```

### 視覺化執行 (Headed Mode)
如果您想看到瀏覽器開啟並執行測試動作：
```bash
npx playwright test --headed
```

## 專案結構
- `pages/`: Page Object Model (POM) 頁面物件
- `tests/`: 測試腳本 (.spec.js)
