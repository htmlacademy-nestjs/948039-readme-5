import { SortDirection, SortType } from '@project/libs/app/types';

export const NOT_CREATE_BLOG_CONTENT = 'Blog content can not created';
export const NOT_FOUND_BLOG = 'Blog not found';
export const NOT_FOUND_BLOG_CONTENT = 'Blog content not found';

export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT = SortType.Date;

export const MAX_TAGS_COUNT = 8;
export const MIN_TAG_LENGHT = 3;
export const MAX_TAG_LENGHT = 10;
export const REGEXP_TAG = /^[a-zA-Zа-яА-Я][a-zA-Z0-9_#]{2,9}$/;
