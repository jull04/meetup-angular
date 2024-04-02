export interface User {
  id: number;
  email: string;
  password: string;
  roles: UserRoles;
}

export interface UserRoles {
	isUser: boolean;
	isAdmin: boolean;
}