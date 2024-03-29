import {Like} from '@project/libs/app/types'

export class LikeEntity implements Like {
  public blogId: string;
  public userId: string;

  constructor(like: Like) {
    this.populate(like);
  }

  public toPlainObject() {
    return {
      blogId: this.blogId,
      userId: this.userId
    };
  }

  public populate(data: Like): void {
    this.blogId = data.blogId;
    this.userId = data.userId;
  }

  static fromObject(data: Like): LikeEntity {
    return new LikeEntity(data);
  }
}
