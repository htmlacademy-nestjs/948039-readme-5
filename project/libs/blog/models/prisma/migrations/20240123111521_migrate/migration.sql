/*
  Warnings:

  - You are about to drop the column `path` on the `photo_blogs` table. All the data in the column will be lost.
  - Added the required column `photoId` to the `photo_blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photo_blogs" DROP COLUMN "path",
ADD COLUMN     "photoId" TEXT NOT NULL;
