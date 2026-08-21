# nextjs-ai-nt2

โปรเจกต์เว็บแอปพลิเคชันที่พัฒนาด้วย Next.js 16 (App Router), React 19 และ TypeScript 5 โดยเน้นการทำงานร่วมกับ AI และระบบจัดการข้อมูลที่มีประสิทธิภาพ

## Tech Stack
- **Framework:** Next.js 16.3.1 (App Router)
- **Language:** TypeScript 5
- **Database:** MariaDB ผ่าน Prisma 7.9.1 (ใช้ @prisma/adapter-mariadb)
- **Authentication:** better-auth (Email/Password)
- **Styling:** Tailwind CSS v4 และ shadcn/ui
- **State Management:** Zustand
- **Validation:** Zod v4

## วิธีการติดตั้งและเริ่มใช้งาน (Getting Started)

1. คัดลอกไฟล์ตัวอย่าง environment:
   ```bash
   cp .env.example .env
   ```

2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

3. สร้าง Prisma Client:
   ```bash
   npx prisma generate
   ```

4. เริ่มรันเซิร์ฟเวอร์ในโหมดพัฒนา:
   ```bash
   npm run dev
   ```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## คำสั่งอื่นๆ ที่สำคัญ
- `npm run lint` - ตรวจสอบคุณภาพโค้ดด้วย ESLint
- `npm run build` - สร้างโปรเจกต์สำหรับ Production
- `npx prisma migrate dev` - รันการ migration ฐานข้อมูล
