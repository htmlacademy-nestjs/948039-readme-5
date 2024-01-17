import { IsMongoId } from 'class-validator';

export class RepostBlogDto {
  @IsMongoId()
  userId: string;
}
