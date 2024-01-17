import {Comment} from '@project/libs/app/types'

export class CommentEntity implements Comment {
  public id?: string;
  public message: string;
  public blogId: string;
  public userId: string;

  constructor(like: Comment) {
    this.populate(like);
  }

  public toPlainObject() {
    return {
      id: this.id,
      blogId: this.blogId,
      userId: this.userId,
      message: this.message
    };
  }

  public populate(data: Comment): void {
    this.id = data.id;
    this.blogId = data.blogId;
    this.userId = data.userId;
    this.message = data.message;
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
