import {TextBlogContent} from '@project/libs/app/types'

export class TextBlogEntity implements TextBlogContent {
  public name: string;
  public id: string;
  public annotation: string;
  public content: string;
  public blogId: string;

  constructor(blog: TextBlogContent) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      name: this.name,
      annotation: this.annotation,
      content: this.content,
      id: this.id,
      blogId: this.blogId,
    };
  }

  public populate(data: TextBlogContent): void {
    this.name = data.name;
    this.id = data.id;
    this.annotation = data.annotation;
    this.content = data.content;
    this.blogId = data.blogId;
  }

  static fromObject(data: TextBlogContent): TextBlogEntity {
    return new TextBlogEntity(data);
  }
}
