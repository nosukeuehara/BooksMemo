export interface BookViewData {
  id: string;
  title: string;
  author: string;
  borrowedDate: Date;
  dueDate: Date;
  returned: boolean;
  review: string;
}

export interface UpdateResult {
  error?: string;
  result?: BookViewData;
}

export interface UserInfo {
  id: string;
  name: string | null;
  email: string;
}