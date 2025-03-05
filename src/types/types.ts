export interface User {
  id: string;
  name: string;
  email: string;
  books: BookInfo[];
}

export interface BookInfo {
  id: string;
  title: string;
  author: string;
  borrowedDate: Date;
  dueDate: Date;
  returned: boolean;
  review: string
}

