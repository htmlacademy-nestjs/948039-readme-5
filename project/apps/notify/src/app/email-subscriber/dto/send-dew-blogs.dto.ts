import { IsArray } from 'class-validator';

export class SendNewBLogsDto {
 @IsArray()
  public blogs: string[];
}
