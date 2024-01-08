import {Blog, BlogContent, BlogStatus, BlogType} from '@project/libs/app/types'

export class BlogEntity implements Blog {
  public type: BlogType;
  public id?: string;
  public content: BlogContent;
  public createdDate?: Date;
  public postedDate?: Date;
  public status?: BlogStatus;
  public author: string;
  public tags?: string[];
  public repost?: boolean;
  public repostId?: string;

  constructor(blog: Blog) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      type: this.type,
      id: this.id,
      author: this.author,
      createdDate: this.createdDate,
      postedDate: this.postedDate,
      repost: this.repost,
      repostId: this.repostId,
      status: this.status,
      tags: this.tags,
      content: this.content
    };
  }

  public populate(data: Blog): void {
    this.type = data.type;
    this.id = data.id;
    this.author = data.author;
    this.createdDate = data.createdDate;
    this.postedDate = data.postedDate;
    this.repost = data.repost;
    this.repostId = data.repostId;
    this.status = data.status;
    this.tags = data.tags;
    this.content = data.content;
  }

  public repostBlog(data: {repostId: string}) {
    this.repost = true;
    this.createdDate = new Date();
    this.postedDate = new Date();
    this.repostId = data.repostId;
  }

  static fromObject(data: Blog): BlogEntity {
    return new BlogEntity(data);
  }
}
