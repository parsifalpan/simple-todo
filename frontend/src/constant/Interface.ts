export interface ITodoItem {
  readonly id?: number;
  title: string;
  content: string;
  status: number;
  priority: number,
  readonly created_at?: string,
  expire_date: string
}