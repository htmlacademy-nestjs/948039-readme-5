import {BaseBlogContent} from '@project/libs/app/types'

export class BaseBlogContentEntity implements BaseBlogContent {
  public id: string;

  constructor(blog: BaseBlogContent) {
    this.populate(blog);
  }

  public toPlainObject() {
    return {
      id: this.id,
    };
  }

  public populate(data: BaseBlogContent): void {
    this.id = data.id;
  }
}
