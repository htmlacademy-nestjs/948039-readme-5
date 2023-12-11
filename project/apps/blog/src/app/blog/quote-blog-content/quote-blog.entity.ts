import {QuoteBlogContent} from '@project/libs/app/types'

export class QuoteBlogEntity implements QuoteBlogContent {
  public quote: string;
  public id: string;
  public author: string;

  constructor(blog: QuoteBlogEntity) {
    this.populate(blog);
  }


  public toPlainObject() {
    return {
      quote: this.quote,
      author: this.author,
      id: this.id,
    };
  }

  public populate(data: QuoteBlogEntity): void {
    this.quote = data.quote;
    this.id = data.id;
    this.author = data.author;
  }
}
