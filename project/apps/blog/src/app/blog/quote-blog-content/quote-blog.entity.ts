import {QuoteBlogContent} from '@project/libs/app/types'

export class QuoteBlogEntity implements QuoteBlogContent {
  public quote: string;
  public id: string;
  public author: string;
  public blogId: string;

  constructor(blog: QuoteBlogContent) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      quote: this.quote,
      author: this.author,
      id: this.id,
      blogId: this.blogId,
    };
  }

  public populate(data: QuoteBlogContent): void {
    this.quote = data.quote;
    this.id = data.id;
    this.author = data.author;
    this.blogId = data.blogId;
  }

  static fromObject(data: QuoteBlogContent): QuoteBlogEntity {
    return new QuoteBlogEntity(data);
  }
}
