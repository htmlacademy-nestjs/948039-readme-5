-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "tags" TEXT[],
    "repost" BOOLEAN NOT NULL DEFAULT false,
    "repost_id" TEXT NOT NULL,
    "repost_author" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_blogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "text_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_blogs" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "quote_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viedo_blogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "viedo_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_blogs" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "link_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_blogs" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "photo_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "blog_id" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("user_id","blog_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "text_blogs_blog_id_key" ON "text_blogs"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "quote_blogs_blog_id_key" ON "quote_blogs"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "viedo_blogs_blog_id_key" ON "viedo_blogs"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "link_blogs_blog_id_key" ON "link_blogs"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "photo_blogs_blog_id_key" ON "photo_blogs"("blog_id");

-- CreateIndex
CREATE INDEX "comments_blog_id_idx" ON "comments"("blog_id");

-- CreateIndex
CREATE INDEX "likes_blog_id_idx" ON "likes"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_blog_id_key" ON "likes"("user_id", "blog_id");

-- AddForeignKey
ALTER TABLE "text_blogs" ADD CONSTRAINT "text_blogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_blogs" ADD CONSTRAINT "quote_blogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viedo_blogs" ADD CONSTRAINT "viedo_blogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_blogs" ADD CONSTRAINT "link_blogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_blogs" ADD CONSTRAINT "photo_blogs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
