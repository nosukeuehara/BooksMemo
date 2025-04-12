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
  [key: string]: any; // 他の任意のプロパティを許可
}