import { PrismaClient } from '@prisma/client';

/**
 * テスト用 Prisma クライアント
 * DATABASE_URL は .env.test で設定すること
 */
const prisma = new PrismaClient();

/**
 * 全テーブルをリセットする（テスト間のデータ汚染を防ぐ）
 * 外部キー制約の順序に従って削除する
 */
export async function resetDatabase(): Promise<void> {
  await prisma.$transaction([
    prisma.planComment.deleteMany(),
    prisma.problemComment.deleteMany(),
    prisma.plan.deleteMany(),
    prisma.problem.deleteMany(),
    prisma.visitRecord.deleteMany(),
    prisma.dailyReport.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.staff.deleteMany(),
  ]);
}

export { prisma };
