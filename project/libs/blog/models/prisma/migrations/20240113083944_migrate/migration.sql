/*
  Warnings:

  - You are about to drop the column `author` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `repost_author` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "author",
DROP COLUMN "repost_author",
ADD COLUMN     "repost_user_id" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;
