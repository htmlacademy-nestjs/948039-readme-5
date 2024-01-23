export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  UsersInfo = 'http://localhost:3001/api/user',
  Blog = 'http://localhost:3002/api/blog',
  File = 'http://localhost:3003/api/files',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
