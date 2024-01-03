import {PhotoBlogContent} from '@project/libs/app/types'

export class PhotoBlogEntity implements PhotoBlogContent {
  public path: string;
  public id: string;
  public name: string;
  public blogId: string;

  constructor(blog: PhotoBlogContent) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      path: this.path,
      name: this.name,
      id: this.id,
      blogId: this.blogId,
    };
  }

  public populate(data: PhotoBlogContent): void {
    this.path = data.path;
    this.id = data.id;
    this.name = data.name;
    this.blogId = data.blogId;
  }

  static fromObject(data: PhotoBlogContent): PhotoBlogEntity {
    return new PhotoBlogEntity(data);
  }
}
