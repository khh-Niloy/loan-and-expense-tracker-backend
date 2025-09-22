export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  isBlocked?: boolean;
  isActive?: isActive;
  isVerified?: boolean;
  credits?: number
}