-- AlterTable
ALTER TABLE "Khowledge" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Khowledge" ADD CONSTRAINT "Khowledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
