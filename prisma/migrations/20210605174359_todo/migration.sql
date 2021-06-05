/*
  Warnings:

  - You are about to drop the column `title` on the `ListItem` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `ListItem` table. All the data in the column will be lost.
  - Added the required column `listId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListItem" DROP CONSTRAINT "ListItem_userEmail_fkey";

-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "title",
DROP COLUMN "userEmail",
ADD COLUMN     "listId" INTEGER NOT NULL,
ALTER COLUMN "body" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TodoList" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT,
    "title" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListItem" ADD FOREIGN KEY ("listId") REFERENCES "TodoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoList" ADD FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
