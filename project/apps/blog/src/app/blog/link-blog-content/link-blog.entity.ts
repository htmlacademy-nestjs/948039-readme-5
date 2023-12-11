import {LinkBlogContent} from '@project/libs/app/types'

export class LinkBlogEntity implements LinkBlogContent {
  public link: string;
  public id: string;
  public description: string;

  constructor(blog: LinkBlogEntity) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      link: this.link,
      description: this.description,
      id: this.id,
    };
  }

  public populate(data: LinkBlogEntity): void {
    this.link = data.link;
    this.id = data.id;
    this.description = data.description;
  }
}
