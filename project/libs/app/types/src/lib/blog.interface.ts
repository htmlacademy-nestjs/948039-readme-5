import { BlogStatus } from './blog-status.enum';
import { BlogType } from './blog-type.enum';

export interface Blog {
  type: BlogType;
  contentId: string;
  createdDate: Date;
  postedDate: Date;
  id?: string;
  status: BlogStatus;
  author: string;
  tags: string[];
  repost: boolean;
  repostId?: string;
}
