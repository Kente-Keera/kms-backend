/*
  Warnings:

  - The `tag` column on the `Khowledge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[employee]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Khowledge" DROP COLUMN "tag",
ADD COLUMN     "tag" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "employee" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "mes" TEXT,
    "rating" INTEGER,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "khowledgeId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_employee_key" ON "User"("employee");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_khowledgeId_fkey" FOREIGN KEY ("khowledgeId") REFERENCES "Khowledge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
