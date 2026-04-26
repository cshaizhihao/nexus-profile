# DESIGN_SYSTEM.md

## 视觉方向

Nexus Profile 的前台不是 SaaS 官网，也不是后台模板，而是“个人数字档案馆”。关键词：克制、纸张质感、档案索引、杂志式标题、轻微数字感。

## 设计原则

1. 内容先于装饰：特效必须服务导航、身份或作品展示。
2. 一屏一个记忆点：首屏保留字形入场，其它区域只做微交互。
3. 低饱和高质感：避免廉价霓虹和高亮渐变。
4. 动效短、轻、可关闭：遵守 prefers-reduced-motion。
5. 前后台同源：后台也使用 archive surface，不出现割裂的白板管理系统。

## Tokens

### Color

- `--ink`: 主文字
- `--muted`: 次级文字
- `--paper`: 页面底色
- `--card`: 卡片材质
- `--line`: 边框线
- `--accent`: 暖色强调

### Typography

- Display: serif，大标题，低行高，负字距
- UI: system sans，用于按钮、导航、表单
- Mono: JetBrains Mono / SFMono，用于编号、标签、状态

### Motion

- `--motion-fast`: 160ms，按钮/导航 hover
- `--motion-base`: 260ms，卡片 hover
- `--motion-slow`: 620ms，首屏进入
- `--ease-out-expo`: 入场/响应
- `--ease-in-out-quart`: 页面移动

## 组件规范

### Archive Card

用于承载主要内容，必须有：
- 轻边框
- 半透明纸张材质
- 柔和阴影
- hover 只允许轻微上浮

### Bento Card

用于入口和摘要，不写长文本。每张卡只表达一个动作或一个指标。

### Dock

底部快速入口，只服务核心路径，不超过 4 个主项。

## 禁止项

- 不再添加强扫描线
- 不再添加大量粒子
- 不再使用高饱和紫蓝渐变
- 不再让背景动效抢内容
- 不再让首页解释项目功能
