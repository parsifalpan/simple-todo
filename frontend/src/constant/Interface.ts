export interface ITodoItem {
  readonly id?: number;
  title: string;
  content: string;
  status: number;
  priority: number,
  readonly created_at?: string,
  expire_date: string
}

export interface IUser {
  readonly id: string;
  readonly username: string;
  email: string;
  first_name: string;
  last_name: string;
}