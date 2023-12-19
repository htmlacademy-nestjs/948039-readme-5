import {AuthUser} from '@project/libs/app/types'
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUND } from './blog-user.constants';
import {Document} from 'mongoose'
export class BlogUserEntity implements AuthUser {
  public passwordHash: string;
  public id?: string;
  public email: string;
  public name: string;
  public avatar: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPlainObject() {
    return {
      passwordHash: this.passwordHash,
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
    };
  }

  public populate(data: AuthUser): void {
    this.avatar = data.avatar;
    this.email = data.email;
    this.name = data.name;
    this.id = data.id;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUND);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser & Document): BlogUserEntity {
    return new BlogUserEntity({...data, id: data._id});
  }
}
