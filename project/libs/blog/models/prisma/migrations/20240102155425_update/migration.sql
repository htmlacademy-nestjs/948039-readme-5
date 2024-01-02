/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `blogs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blog_id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[blog_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blogs_id_key" ON "blogs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_blog_id_key" ON "comments"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_blog_id_key" ON "likes"("blog_id");
