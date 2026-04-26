# CONTRIBUTING

感谢关注 Nexus Profile / 星枢主页。

## 本地开发

```bash
cd backend
cp .env.example .env
npm install
npx prisma db push
npm run dev

cd ../frontend
npm install
npm run dev
```

## 提交规范

建议使用：

- `feat:` 新功能
- `fix:` 修复
- `docs:` 文档
- `chore:` 工程维护
- `refactor:` 重构

## Pull Request 要求

- 描述变更目的
- 说明是否影响部署
- 涉及 UI 时附截图
- 涉及接口时说明兼容性
