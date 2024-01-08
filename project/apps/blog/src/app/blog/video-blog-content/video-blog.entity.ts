import {VideoBlogContent} from '@project/libs/app/types'

export class VideoBlogEntity implements VideoBlogContent {
  public name: string;
  public link: string;
  public id: string;
  public blogId: string;

  constructor(blog: VideoBlogContent) {
    this.populate(blog);
  }

  public toPlainObject() {
    return {
      name: this.name,
      link: this.link,
      id: this.id,
      blogId: this.blogId
    };
  }

  public populate(data: VideoBlogContent): void {
    this.name = data.name;
    this.id = data.id;
    this.link = data.link;
    this.blogId = data.blogId;
  }

  static fromObject(data: VideoBlogContent): VideoBlogEntity {
    return new VideoBlogEntity(data);
  }
}
