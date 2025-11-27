# 🇮🇷 IranTour Guide

> پلتفرم جامع رویدادهای فرهنگی، مذهبی، علمی، هنری و گردشگری ایران

## 🚀 شروع سریع

### نصب Dependencies
```bash
pnpm install
```

### راه‌اندازی Database
```bash
cp .env.example .env.local
# ویرایش .env.local و تنظیم DATABASE_URL

pnpm db:generate
pnpm db:migrate
```

### اجرای پروژه
```bash
pnpm dev
```

پروژه در `http://localhost:3000` اجرا می‌شود.

## 📚 مستندات

مستندات کامل در پوشه `docs/` موجود است.

## 🛠️ تکنولوژی‌ها

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4.0
- **Database:** PostgreSQL + Prisma
- **Auth:** NextAuth.js
- **AI:** OpenAI API

## 📄 لایسنس

MIT