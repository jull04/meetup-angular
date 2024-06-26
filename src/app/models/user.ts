export interface User {
  id: number;
  email: string;
  password: string;
  fio: string;
  roles: Role[];
}

export interface Role {
  name: string;
}

export interface UserRoleUpdateBody {
  names: string[];
  userId: number;
}