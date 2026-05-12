export type DocumentItem = {
  id: string;
  title: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  isShared?: boolean;
};