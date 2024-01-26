export interface IAdmin {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
