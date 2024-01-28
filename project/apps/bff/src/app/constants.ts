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

export const MIN_PASSWORD_LENGHT = 6;
export const MAX_PASSWORD_LENGHT = 12;

export const MAX_TAGS_COUNT = 8;
export const MIN_TAG_LENGHT = 3;
export const MAX_TAG_LENGHT = 10;
export const REGEXP_TAG = /^[a-zA-Zа-яА-Я][a-zA-Z0-9_#]{2,9}$/;

export const MIN_COMMENT_LENGHT = 10;
export const MAX_COMMENT_LENGHT = 300;

export const MIN_USERNAME_LENGHT = 3;
export const MAX_USERNAME_LENGHT = 50;
