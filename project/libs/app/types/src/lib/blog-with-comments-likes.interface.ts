import { BlogContent } from './blog-content.interface';
import { BlogStatus } from './blog-status.enum';
import { BlogType } from './blog-type.enum';

export interface BlogWithCommentsLikes {
  type: BlogType;
  createdDate?: Date;
  postedDate?: Date;
  id?: string;
  status?: BlogStatus;
  userId: string;
  tags?: string[];
  repost?: boolean;
  repostId?: string;
  content: BlogContent;
  comments: number;
  likes: number;
}
