import {VideoBlogContent} from '@project/libs/app/types'

export class VideoBlogEntity implements VideoBlogContent {
  public name: string;
  public link: string;
  public id: string;

  constructor(blog: VideoBlogContent) {
    this.populate(blog);
  }

  public toPlainObject() {
    return {
      name: this.name,
      link: this.link,
      id: this.id,
    };
  }

  public populate(data: VideoBlogContent): void {
    this.name = data.name;
    this.id = data.id;
    this.link = data.link;
  }
}
