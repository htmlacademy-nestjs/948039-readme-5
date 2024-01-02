/*
  Warnings:

  - You are about to drop the column `content_id` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "content_id",
ALTER COLUMN "repost_id" DROP NOT NULL,
ALTER COLUMN "repost_author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "link_blogs" ALTER COLUMN "description" DROP NOT NULL;
