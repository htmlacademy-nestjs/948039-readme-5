import { BlogContent } from './blog-content.interface';
import { BlogStatus } from './blog-status.enum';
import { BlogType } from './blog-type.enum';

export interface Blog {
  type: BlogType;
  createdDate?: Date;
  postedDate?: Date;
  id?: string;
  status?: BlogStatus;
  author: string;
  tags?: string[];
  repost?: boolean;
  repostId?: string;
  content: BlogContent;
}
