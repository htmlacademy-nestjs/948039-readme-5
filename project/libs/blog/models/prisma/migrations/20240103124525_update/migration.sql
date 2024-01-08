-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft';
