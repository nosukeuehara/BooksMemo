export interface BookViewData {
  id: string;
  title: string;
  author: string;
  borrowedDate: Date;
  dueDate: Date;
  returned: boolean;
  review: string;
}