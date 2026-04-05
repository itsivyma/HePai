# ADR-001: 引入 Apple Liquid Glass 設計語言

- **狀態**: 提議中 (Proposed)
- **日期**: 2026-04-05
- **決策者**: HePai 開發團隊
- **相關**: UI/UX 設計系統、深色模式支援

---

## 背景與動機

HePai（合拍）是一款四部合聲學習輔助 Web 應用，目前採用以 **shadcn/ui + Radix UI + Tailwind CSS** 為基礎的設計系統，搭配 CSS 自訂屬性（HSL 色彩體系）進行主題管理。現有設計已包含基礎的 glassmorphism 效果（`.glass`、`.glass-strong`、`.glass-subtle`），但尚未支援深色模式。

**Apple Liquid Glass** 是 Apple 在 WWDC 2025（2025 年 6 月 9 日）發布的全新統一設計語言，橫跨 iOS 26、iPadOS 26、macOS Tahoe 26、watchOS 26、tvOS 26 及 visionOS 26。其核心概念是一種「數位超材料（digital meta-material）」——能動態折射光線、如水般流動，並根據背景內容自適應調整色調、對比度與透明度。

引入 Liquid Glass 風格的目的：
1. 提升應用的視覺品質與現代感
2. 與 Apple 生態系設計語言保持一致
3. 為未來深色模式支援打下架構基礎
4. 強化現有玻璃擬態效果的表現力

---

## 一、Apple Liquid Glass 核心設計原則

### 1.1 視覺特性

| 特性 | 說明 |
|------|------|
| **折射（Lensing）** | 背景內容透過玻璃層產生微妙的光線偏折，模擬真實光學效果 |
| **高光層（Specular Highlights）** | 動態光線反射，回應環境與動作 |
| **自適應陰影（Adaptive Shadows）** | 根據上下文產生深度分離效果 |
| **色彩回應（Chromatic Response）** | 色調由周圍內容決定 |
| **彈性變形（Elastic Morphing）** | 玻璃表面在展開時改變厚度 |
| **鮮明度（Vibrancy）** | 文字後方高度模糊並著色的背景，確保對比度 ≥ 4.5:1 |

### 1.2 材質變體

| 變體 | 透明度 | 使用場景 |
|------|--------|----------|
| **Regular** | 中等透明，全自適應 | 大部分 UI 元素（預設） |
| **Clear** | 高透明，需調光層 | 媒體豐富的背景 |
| **Identity** | 無玻璃效果 | 條件性停用場景 |

### 1.3 形狀系統

- **固定形狀（Fixed）**: 固定圓角半徑，不隨容器變化
- **膠囊形（Capsule）**: 半徑 = 容器高度 / 2
- **同心形狀（Concentric）**: 半徑 = 父容器半徑 - 間距，實現巢狀和諧

---

## 二、現有設計系統盤點

### 2.1 當前色彩體系（Light Mode Only）

```css
/* 檔案: src/index.css */
:root {
  --background: 210 25% 97%;     /* 淺藍灰背景 */
  --foreground: 220 15% 18%;     /* 深色文字 */
  --primary: 192 72% 42%;        /* 青藍色主色 */
  --accent: 210 72% 55%;         /* 亮藍強調色 */
  --success: 152 60% 42%;        /* 綠色成功 */
  --warning: 38 92% 50%;         /* 橙色警告 */
  --destructive: 0 75% 55%;      /* 紅色破壞性 */
  --secondary: 210 20% 93%;      /* 淺灰次要 */
  --muted: 210 15% 94%;          /* 靜音灰 */
  --card: 210 20% 99%;           /* 卡片背景 */
  --border: 210 18% 90%;         /* 邊框 */
  --radius: 1rem;                /* 基礎圓角 */
}
```

### 2.2 現有 Glass 效果

```css
/* 檔案: src/index.css */
.glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.35);
}
.glass-strong {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.glass-subtle {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
```

### 2.3 架構特點

- **Dark Mode 配置**: `tailwind.config.ts` 已設定 `darkMode: ["class"]`，但 `index.css` 中**無 `.dark` 變體定義**
- **shadcn/ui 元件**: 51+ 個元件，全部透過 CSS 變數引用色彩
- **字體**: Display = Outfit，Body = Noto Sans TC
- **動畫**: 使用 Framer Motion + Tailwind CSS animate
- **底部導覽列**: 已使用 `.glass-strong` 效果

---

## 三、開源生態系調研（截至 2026 年 4 月）

### 3.1 可直接整合的函式庫

#### Tier 1：成熟度高 / 維護良好

| 函式庫 | Stars | 特點 | 適用性評估 |
|--------|-------|------|-----------|
| **[liquid-glass-react](https://github.com/rdev/liquid-glass-react)** | ~4,700 | SVG displacement mapping、多種折射模式（standard/polar/prominent/shader）、色差效果、彈性變形、滑鼠互動 | **高** — React + TypeScript，可直接用於核心元件 |
| **[Ein UI](https://ui.eindev.ir/)** | — | 19+ 元件，shadcn 相容、Radix UI 基礎、Tailwind CSS v4、內建深色模式、完整 TypeScript、WCAG 無障礙 | **高** — 架構方向相容（shadcn + Radix），但依賴 Tailwind CSS v4，本專案目前使用 v3.4，需先升級或確認 v3 相容性 |
| **[@callstack/liquid-glass](https://github.com/callstack/liquid-glass)** | ~1,300 | 使用原生 iOS 26 API 的真正 Liquid Glass 效果 | **不適用** — 僅限 React Native iOS |

#### Tier 2：聚焦型 / 較新

| 函式庫 | 特點 | 適用性評估 |
|--------|------|-----------|
| **[Liquid Glass UI](https://liquidglassui.org/)** | React 18+、Next.js 優化、60fps 動畫、GPU 加速、WCAG 2.1 AA | **中高** — 成熟度待觀察 |
| **[@creativoma/liquid-glass](https://www.npmjs.com/package/@creativoma/liquid-glass)** | React wrapper、Tailwind + SVG filters | **中** — 輕量方案 |
| **[liquidglass-tailwind](https://github.com/Tontoon7/liquidglass-tailwind)** | Tailwind 外掛、glass 元件類、無障礙 fallback | **中** — 可作為 Tailwind utility 補充 |
| **[ReactBits Fluid Glass](https://www.reactbits.dev/components/fluid-glass)** | Copy-paste 動畫玻璃元件 | **低** — 個別元件參考用 |

### 3.2 推薦整合方案

**主要方案: Ein UI + 自訂 Liquid Glass 工具類**

理由：
1. Ein UI 與現有技術棧完全一致（shadcn/Radix/Tailwind/TypeScript）
2. 安裝方式 `npx shadcn@latest add @einui/glass-card` 符合現有元件管理流程
3. 內建深色模式支援，減少額外工作量
4. WCAG 無障礙支援
5. 可選擇性引入個別元件，不需要全面替換

**輔助方案: liquid-glass-react**

用途：用於需要進階折射/lensing 效果的高價值元件（如啟動畫面、核心 CTA 按鈕），提供更接近原生 Liquid Glass 的視覺體驗。

---

## 四、實施方案

### 4.1 Phase 1 — 深色模式色彩體系 + Liquid Glass 工具類

**影響檔案**: `src/index.css`

新增 `.dark` 選擇器下的 CSS 變數，以及升級版 Liquid Glass 工具類：

```css
@layer base {
  :root {
    /* === 現有 Light Mode 色彩保持不變 === */
    --background: 210 25% 97%;
    --foreground: 220 15% 18%;
    --card: 210 20% 99%;
    --card-foreground: 220 15% 18%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 15% 18%;
    --primary: 192 72% 42%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 20% 93%;
    --secondary-foreground: 220 15% 25%;
    --muted: 210 15% 94%;
    --muted-foreground: 215 12% 50%;
    --accent: 210 72% 55%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 75% 55%;
    --destructive-foreground: 0 0% 100%;
    --warning: 38 92% 50%;
    --warning-foreground: 38 92% 15%;
    --success: 152 60% 42%;
    --success-foreground: 0 0% 100%;
    --border: 210 18% 90%;
    --input: 210 18% 90%;
    --ring: 192 72% 42%;
    --radius: 1rem;

    /* Liquid Glass 光模式 tokens */
    --glass-bg: 0 0% 100% / 0.72;
    --glass-bg-strong: 0 0% 100% / 0.85;
    --glass-bg-subtle: 0 0% 100% / 0.55;
    --glass-border: 0 0% 100% / 0.35;
    --glass-border-strong: 0 0% 100% / 0.4;
    --glass-border-subtle: 0 0% 100% / 0.25;
    --glass-highlight: 0 0% 100% / 0.15;
    --glass-shadow: 220 60% 20% / 0.12;
  }

  .dark {
    /* === Dark Mode 色彩（保留相同色相，調整明度/飽和度） === */
    --background: 220 20% 10%;
    --foreground: 210 15% 92%;
    --card: 220 18% 13%;
    --card-foreground: 210 15% 92%;
    --popover: 220 18% 13%;
    --popover-foreground: 210 15% 92%;
    --primary: 192 72% 48%;       /* 青藍色微提亮以保持辨識度 */
    --primary-foreground: 220 20% 10%;
    --secondary: 215 18% 18%;
    --secondary-foreground: 210 15% 80%;
    --muted: 215 15% 16%;
    --muted-foreground: 215 12% 55%;
    --accent: 210 72% 60%;        /* 亮藍微提亮 */
    --accent-foreground: 220 20% 10%;
    --destructive: 0 72% 50%;
    --destructive-foreground: 0 0% 100%;
    --warning: 38 88% 55%;
    --warning-foreground: 38 92% 10%;
    --success: 152 55% 45%;
    --success-foreground: 220 20% 10%;
    --border: 215 15% 20%;
    --input: 215 15% 20%;
    --ring: 192 72% 48%;

    --sidebar-background: 220 18% 11%;
    --sidebar-foreground: 210 15% 85%;
    --sidebar-primary: 192 72% 48%;
    --sidebar-primary-foreground: 220 20% 10%;
    --sidebar-accent: 215 15% 16%;
    --sidebar-accent-foreground: 210 15% 85%;
    --sidebar-border: 215 15% 18%;
    --sidebar-ring: 192 72% 48%;

    /* Liquid Glass 暗模式 tokens */
    --glass-bg: 0 0% 100% / 0.06;
    --glass-bg-strong: 0 0% 100% / 0.10;
    --glass-bg-subtle: 0 0% 100% / 0.03;
    --glass-border: 0 0% 100% / 0.12;
    --glass-border-strong: 0 0% 100% / 0.18;
    --glass-border-subtle: 0 0% 100% / 0.08;
    --glass-highlight: 0 0% 100% / 0.06;
    --glass-shadow: 0 0% 0% / 0.4;
  }
}
```

升級版 Liquid Glass 工具類：

```css
@layer utilities {
  /* === Liquid Glass 效果（自適應 Light/Dark） === */
  .liquid-glass {
    background: hsl(var(--glass-bg));
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid hsl(var(--glass-border));
    box-shadow:
      0 8px 32px -8px hsl(var(--glass-shadow)),
      inset 0 1px 0 0 hsl(var(--glass-highlight));
  }

  .liquid-glass-strong {
    background: hsl(var(--glass-bg-strong));
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid hsl(var(--glass-border-strong));
    box-shadow:
      0 8px 32px -8px hsl(var(--glass-shadow)),
      inset 0 1px 0 0 hsl(var(--glass-highlight));
  }

  .liquid-glass-subtle {
    background: hsl(var(--glass-bg-subtle));
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    border: 1px solid hsl(var(--glass-border-subtle));
    box-shadow:
      0 4px 16px -4px hsl(var(--glass-shadow)),
      inset 0 0.5px 0 0 hsl(var(--glass-highlight));
  }

  /* 高光偽元素 — 模擬 Liquid Glass 頂部光線 */
  .liquid-glass-shine::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      180deg,
      hsl(var(--glass-highlight)) 0%,
      transparent 100%
    );
    border-radius: inherit;
    pointer-events: none;
  }

  /* 無障礙 fallback */
  @media (prefers-reduced-transparency: reduce) {
    .liquid-glass,
    .liquid-glass-strong,
    .liquid-glass-subtle {
      background: hsl(var(--card));
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .liquid-glass,
    .liquid-glass-strong,
    .liquid-glass-subtle {
      transition: none !important;
      animation: none !important;
    }
  }
}
```

### 4.2 Phase 2 — Tailwind 配置擴展

**影響檔案**: `tailwind.config.ts`

```ts
// 新增至 theme.extend 中
colors: {
  // ...現有色彩保持不變...
  glass: {
    bg: "hsl(var(--glass-bg))",
    "bg-strong": "hsl(var(--glass-bg-strong))",
    "bg-subtle": "hsl(var(--glass-bg-subtle))",
    border: "hsl(var(--glass-border))",
    highlight: "hsl(var(--glass-highlight))",
    shadow: "hsl(var(--glass-shadow))",
  },
},
```

### 4.3 Phase 3 — 元件層級整合

依優先級逐步替換現有元件：

| 優先級 | 元件 | 當前效果 | 目標效果 |
|--------|------|----------|----------|
| **P0** | BottomTabBar | `.glass-strong` | `.liquid-glass-strong` + 高光 |
| **P0** | PageHeader (sticky) | `backdrop-blur` | `.liquid-glass` |
| **P1** | Card（B/C/D 模組） | `bg-card shadow-sm` | `.liquid-glass-subtle` |
| **P1** | Dialog/Sheet overlay | `bg-black/80` | `.liquid-glass-strong` |
| **P2** | 進度圓環（B6） | 實色填充 | 玻璃材質 + 內發光 |
| **P2** | 按鈕（主要 CTA） | `bg-primary` | `bg-primary` + `.liquid-glass-shine` |
| **P3** | Toast 通知 | Sonner 預設 | `.liquid-glass` |
| **P3** | Tooltip/Popover | `bg-popover` | `.liquid-glass-subtle` |

### 4.4 Phase 4 — 深色模式切換機制

**影響檔案**: 已安裝 `next-themes`（v0.3.0），需整合至 `App.tsx`

```tsx
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* 現有路由結構 */}
    </ThemeProvider>
  );
}
```

在 `E2_Preferences.tsx`（使用者偏好設定頁）加入主題切換 UI。

---

## 五、深色模式 + Liquid Glass 相容性設計

### 5.1 設計原則

1. **色相一致**: Dark Mode 保留 Light Mode 的所有色相（hue），僅調整明度（lightness）和飽和度（saturation）
2. **主色提亮**: Primary（192° 青藍）和 Accent（210° 亮藍）在暗模式下微幅提亮（+6~+5% lightness），確保在深色背景上保持辨識度
3. **玻璃自適應**: Glass tokens 在暗模式下大幅降低白色佔比（72% → 6%），模擬真實玻璃在暗環境中的行為
4. **強化陰影**: 暗模式下陰影不透明度從 12% 提升至 40%，增強深度感
5. **邊框微光**: 暗模式下邊框保留微弱白邊（12%），模擬 Liquid Glass 的邊緣折射效果

### 5.2 對比度保證

| 場景 | Light Mode | Dark Mode |
|------|-----------|-----------|
| 文字/背景 | 220 15% 18% on 210 25% 97% → **12.3:1** | 210 15% 92% on 220 20% 10% → **11.8:1** |
| Primary/背景 | 192 72% 42% on white → **3.2:1**（大文字） | 192 72% 48% on 220 20% 10% → **4.8:1** |
| Glass 上文字 | 透過 vibrancy 效果確保 | 透過提高 glass-bg-strong 不透明度確保 |

---

## 六、技術限制與風險

### 6.1 瀏覽器相容性

| 特性 | Chrome/Edge | Safari | Firefox | 參考 |
|------|-------------|--------|---------|------|
| `backdrop-filter: blur()` | 完整支援 | 完整支援 | 支援（v103+） | [caniuse](https://caniuse.com/css-backdrop-filter) |
| `backdrop-filter: saturate()` | 完整支援 | 完整支援 | 支援（v103+） | [MDN](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter) |
| SVG `feDisplacementMap` 折射 | 支援 | **不支援** | **不支援** | [MDN](https://developer.mozilla.org/docs/Web/SVG/Element/feDisplacementMap) |
| `inset` box-shadow | 完整支援 | 完整支援 | 完整支援 | [caniuse](https://caniuse.com/mdn-css_properties_box-shadow_inset) |

**結論**: Phase 1-3 的純 CSS 方案可作為主流瀏覽器的基線體驗，並在不完全支援的環境中透過 `prefers-reduced-transparency` 媒體查詢優雅降級。僅在考慮使用 `liquid-glass-react` 的 SVG 折射模式時需提供 Chromium-only 的增強體驗。

### 6.2 效能考量

- **限制同時使用 `backdrop-filter` 的元素數量至 3-5 個**
  - 每個 `backdrop-filter` 都會觸發 GPU 合成層
  - 在捲動區域中避免使用（除了 sticky header）
- **使用 `will-change: transform` 提升至合成器層**（僅在動畫時）
- **針對低階裝置**提供 `prefers-reduced-transparency` fallback

### 6.3 風險矩陣

| 風險 | 可能性 | 影響 | 緩解措施 |
|------|--------|------|----------|
| Glass 效果影響捲動效能 | 中 | 中 | 限制使用元素數量、lazy rendering |
| 深色模式下對比度不足 | 低 | 高 | 透過 glass-bg-strong 變體保證可讀性 |
| 第三方庫停止維護 | 中 | 低 | Phase 1-3 為純 CSS，不依賴第三方庫 |
| 舊瀏覽器不支援 | 低 | 低 | 不支援 `backdrop-filter` 時自然降級為半透明實色背景；搭配 `prefers-reduced-transparency` 提供全不透明 fallback |

---

## 七、遷移策略

### 7.1 漸進式遷移（推薦）

```
Phase 1 (Week 1-2): 深色模式色彩體系 + Liquid Glass CSS tokens
  ├─ 新增 .dark CSS 變數
  ├─ 新增 liquid-glass-* 工具類
  ├─ 新增無障礙 fallback
  └─ 整合 ThemeProvider

Phase 2 (Week 2-3): Tailwind 配置 + 核心元件
  ├─ 擴展 tailwind.config.ts
  ├─ 替換 BottomTabBar (.glass-strong → .liquid-glass-strong)
  ├─ 替換 PageHeader
  └─ 視覺回歸測試

Phase 3 (Week 3-4): 全面元件遷移
  ├─ Card、Dialog、Sheet 元件
  ├─ Toast、Tooltip、Popover
  ├─ 主題切換 UI (E2_Preferences)
  └─ 端對端測試

Phase 4 (Optional): 進階效果
  ├─ 評估引入 liquid-glass-react（折射效果）
  ├─ 評估引入 Ein UI 元件（額外 glass 元件）
  └─ 動態高光 / 互動效果
```

### 7.2 向後相容

- 現有 `.glass`、`.glass-strong`、`.glass-subtle` 類**保留不變**，避免破壞現有頁面
- 新增 `.liquid-glass-*` 系列作為增強版替代
- 遷移完成後，可選擇性將舊 `.glass-*` 類標記為 deprecated 或作為別名指向新類

---

## 八、決策

### 採用方案

1. **自訂 Liquid Glass CSS token 系統**（Phase 1-3）
   - 以 CSS 自訂屬性為基礎，完全掌控效果
   - 原生支援 Light/Dark 模式切換
   - 無外部依賴，長期可維護性最高

2. **漸進式引入，不破壞現有設計**
   - 保留所有現有色彩值
   - 新增 `.liquid-glass-*` 系列，與 `.glass-*` 並存
   - 逐元件遷移，每階段可獨立驗證

3. **深色模式同步實施**
   - 利用已安裝的 `next-themes` 套件
   - Dark Mode 色彩保持色相一致性
   - Glass tokens 自動適應亮/暗模式

### 不採用方案

| 方案 | 不採用原因 |
|------|-----------|
| 全面替換為 Ein UI | 雖然技術棧相容，但 51+ 個 shadcn 元件的全面替換風險過高 |
| 引入 liquid-glass-react 作為核心依賴 | SVG 折射在 Safari/Firefox 不支援，作為 Web 應用不可接受 |
| 使用 liquidglass-tailwind 外掛 | 太新（1 star, 3 commits），穩定性未經驗證 |
| 延遲深色模式至單獨迭代 | Glass 效果在亮/暗模式下行為差異大，同步設計可避免返工 |

---

## 九、參考資料

### Apple 官方資源
- [Apple Newsroom: Liquid Glass 發布](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Meet Liquid Glass — WWDC25 Session 219](https://developer.apple.com/videos/play/wwdc2025/219/)
- [Get to know the new design system — WWDC25 Session 356](https://developer.apple.com/videos/play/wwdc2025/356/)
- [Liquid Glass Developer Documentation](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass)
- [Adopting Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass)

### 技術參考
- [CSS-Tricks: Getting Clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)
- [LogRocket: How to create Liquid Glass effects with CSS and SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- [LogRocket: Adopting Apple's Liquid Glass — Examples and Best Practices](https://blog.logrocket.com/ux-design/adopting-liquid-glass-examples-best-practices/)
- [FlyonUI: Implement Liquid Glass Effects in Tailwind CSS](https://flyonui.com/blog/liquid-glass-effects-in-tailwind-css/)

### 開源函式庫
- [liquid-glass-react](https://github.com/rdev/liquid-glass-react) — React SVG 折射元件（~4,700 stars）
- [Ein UI](https://ui.eindev.ir/) — shadcn 相容 Liquid Glass 元件庫
- [Liquid Glass UI](https://liquidglassui.org/) — React 玻璃元件
- [liquidglass-tailwind](https://github.com/Tontoon7/liquidglass-tailwind) — Tailwind 外掛
