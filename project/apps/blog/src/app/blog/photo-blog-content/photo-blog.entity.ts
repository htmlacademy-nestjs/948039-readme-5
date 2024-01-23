import {PhotoBlogContent} from '@project/libs/app/types'

export class PhotoBlogEntity implements PhotoBlogContent {
  public photoId: string;
  public id: string;
  public name: string;
  public blogId: string;

  constructor(blog: PhotoBlogContent) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      photoId: this.photoId,
      name: this.name,
      id: this.id,
      blogId: this.blogId,
    };
  }

  public populate(data: PhotoBlogContent): void {
    this.photoId = data.photoId;
    this.id = data.id;
    this.name = data.name;
    this.blogId = data.blogId;
  }

  static fromObject(data: PhotoBlogContent): PhotoBlogEntity {
    return new PhotoBlogEntity(data);
  }
}
