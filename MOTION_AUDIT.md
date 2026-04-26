# MOTION_AUDIT.md

## 结论

上一版特效的问题不是少，而是噪声过多、目的不清。当前已改为 Motion System v2：减少循环噪声，保留首屏字形动效、轻量磁吸、卡片纵深和安静材质层。

## 修正原则

| 问题 | 修正 |
|---|---|
| 扫描线显脏 | 已禁用 |
| 光球太抢戏 | 降低透明度并加大 blur |
| 鼠标光晕太重 | 缩小尺寸、降低透明度 |
| 动效节奏不统一 | 增加 motion tokens |
| 可访问性不足 | 增加 prefers-reduced-motion |
| hover 太机械 | 增加轻量磁吸卡片 |

## Motion Tokens

- `--ease-out-expo`
- `--ease-out-quart`
- `--ease-in-out-quart`
- `--motion-fast`
- `--motion-base`
- `--motion-slow`

## 保留的主记忆点

1. 首屏字形入场
2. 安静的档案馆材质背景
3. 轻量磁吸卡片
4. 卡片微光扫与纵深
