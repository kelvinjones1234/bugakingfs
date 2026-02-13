export interface User {
  email: string;
  first_name: string;
  last_name: string;
  id?: number;
}

export interface FormErrors {
  [key: string]: string[] | string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: User;
}