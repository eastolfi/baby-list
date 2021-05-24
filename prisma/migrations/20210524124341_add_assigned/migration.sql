/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "available" BOOLEAN DEFAULT true,
ADD COLUMN     "assigned" TEXT,
ALTER COLUMN "done" DROP NOT NULL;
