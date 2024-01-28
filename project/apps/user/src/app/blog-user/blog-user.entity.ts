import {AuthUser} from '@project/libs/app/types'
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUND } from './blog-user.constants';
import { BlogUserModel } from './blog-user.model';
export class BlogUserEntity implements AuthUser {
  public passwordHash: string;
  public id?: string;
  public email: string;
  public name: string;
  public avatarId: string;
  public createdAt: Date;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPlainObject() {
    return {
      passwordHash: this.passwordHash,
      id: this.id,
      email: this.email,
      name: this.name,
      avatarId: this.avatarId,
      createdAt: this.createdAt
    };
  }

  public populate(data: AuthUser): void {
    this.avatarId = data.avatarId;
    this.email = data.email;
    this.name = data.name;
    this.id = data.id;
    this.passwordHash = data.passwordHash;
    this.createdAt = data.cteatedAt ?? new Date();
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUND);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: BlogUserModel): BlogUserEntity {
    return new BlogUserEntity({...data, id: data._id});
  }
}
