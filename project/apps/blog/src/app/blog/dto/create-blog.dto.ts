import { BlogContentCreate, BlogType, LinkBlogContentCreate, PhotoBlogContentCreate, QuoteBlogContentCreate, TextBlogContentCreate, VideoBlogContentCreate } from '@project/libs/app/types';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';

export class CreateBlogDto {
  @IsEnum(BlogType)
  public type: BlogType;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type((opts) => {
    const type = opts.object.type;
    if(type === BlogType.Video) {
      return VideoBlogContentCreate
    }
    if(type === BlogType.Text) {
      return TextBlogContentCreate
    }
    if(type === BlogType.Link) {
      return LinkBlogContentCreate
    }
    if(type === BlogType.Photo) {
      return PhotoBlogContentCreate
    }
    if(type === BlogType.Quote) {
      return QuoteBlogContentCreate
    }
  } )
  public content: BlogContentCreate;

  @IsMongoId()
  public userId: string;

  @Transform(({value}: {value: string[]}) => {
    if (Array.isArray(value)) {
      const lowerCaseItems = value.map(v => v.toLowerCase());
      return [... new Set(lowerCaseItems)];
    }
    return value;
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(8)
  @IsString({each: true})
  @IsNotEmpty({each: true})
  @MinLength(3,{each: true})
  @MaxLength(10,{each: true})
  @Matches(/^[a-zA-Zа-яА-Я][a-zA-Z0-9_#]{2,9}$/, {
    each: true,
    message: 'tag must start with a letter and can only contain letters, numbers, underscores and pound.',
  })
  tags: string[];
}
