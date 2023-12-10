import {Blog, BlogStatus, BlogType} from '@project/libs/app/types'

export class BlogEntity implements Blog {
  public type: BlogType.Video;
  public id: string;
  public contentId: string;
  public createdDate: Date;
  public postedDate: Date;
  public status: BlogStatus;
  public author: string;
  public tags: string[];
  public repost: boolean;
  public repostId: string;

  constructor(blog: Blog) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      type: this.type,
      id: this.id,
      author: this.author,
      contentId: this.contentId,
      createdDate: this.createdDate,
      postedDate: this.postedDate,
      repost: this.repost,
      repostId: this.repostId,
      status: this.status,
      tags: this.tags,
    };
  }

  public populate(data: Blog): void {
    this.type = BlogType.Video;
    this.id = data.id;
    this.author = data.author;
    this.contentId = data.contentId;
    this.createdDate = data.createdDate;
    this.postedDate = data.postedDate;
    this.repost = data.repost;
    this.repostId = data.repostId;
    this.status = data.status;
    this.tags = data.tags;
  }

  public repostBlog(data: {repostId: string}) {
    this.repost = true;
    this.createdDate = new Date();
    this.postedDate = new Date();
    this.repostId = data.repostId;
  }
}
