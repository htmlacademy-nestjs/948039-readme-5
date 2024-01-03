import { BlogContent, BlogType } from '@project/libs/app/types';

export class CreateBlogDto {
  public type: BlogType;
  public content: BlogContent;
  public author: string;
  public tags: string[];
}
