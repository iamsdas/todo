/*
  Warnings:

  - You are about to drop the column `userId` on the `ListItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_userId_fkey";

-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "ListItem" ADD FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
