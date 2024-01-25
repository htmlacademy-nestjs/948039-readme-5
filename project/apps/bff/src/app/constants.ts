import { SortDirection, SortType } from '@project/libs/app/types';

export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT = SortType.Date;

export const DEFAULT_COMMENT_PAGE_COUNT = 1;
export const DEFAULT_COMMENT_COUNT_LIMIT = 50;

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
]

export const MAX_PHOTO_SIZE = 1048576;
export const MAX_AVATAR_SIZE = 1048576 / 2;
