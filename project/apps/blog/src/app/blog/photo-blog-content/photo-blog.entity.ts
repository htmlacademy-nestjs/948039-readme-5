import {PhotoBlogContent} from '@project/libs/app/types'

export class PhotoBlogEntity implements PhotoBlogContent {
  public path: string;
  public id: string;
  public name: string;

  constructor(blog: PhotoBlogEntity) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      path: this.path,
      name: this.name,
      id: this.id,
    };
  }

  public populate(data: PhotoBlogEntity): void {
    this.path = data.path;
    this.id = data.id;
    this.name = data.name;
  }
}
