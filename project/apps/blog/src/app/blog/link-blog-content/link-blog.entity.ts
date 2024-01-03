import {LinkBlogContent} from '@project/libs/app/types'

export class LinkBlogEntity implements LinkBlogContent {
  public link: string;
  public id: string;
  public description: string;
  public blogId: string;

  constructor(blog: LinkBlogContent) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      link: this.link,
      description: this.description,
      id: this.id,
      blogId: this.blogId,
    };
  }

  public populate(data: LinkBlogContent): void {
    this.link = data.link;
    this.id = data.id;
    this.description = data.description;
    this.blogId = data.blogId;
  }

  static fromObject(data: LinkBlogContent): LinkBlogEntity {
    return new LinkBlogEntity(data);
  }
}
