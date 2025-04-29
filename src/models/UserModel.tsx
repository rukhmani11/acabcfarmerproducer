export interface UserModel {
  UserId: string,
  FirstName: string;
  LastName: string;
  PhoneNumber: number;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  UserName: string;
  Roles: any[];
  SocietyId: string;
}

export interface AuthModel {
  Token: string;
  UserId: string;
  UserName: string;
  Roles: string[];
 
}

export interface LoginResponse {
  isSuccess: boolean;
  user: UserModel;
}

export interface ResetPasswordModel {
  UserId: string,
  Password: string;
  ConfirmPassword: string;
  
}