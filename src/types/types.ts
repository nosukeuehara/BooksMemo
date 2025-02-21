export interface User {
  id: string;
  name: string;
  email: string;
  books: Book[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  borrowedDate: Date;
  dueDate: Date;
  returned: boolean;
}