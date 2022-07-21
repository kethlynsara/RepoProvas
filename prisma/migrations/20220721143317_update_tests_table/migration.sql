/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "sessions";

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
