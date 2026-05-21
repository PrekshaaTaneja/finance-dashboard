import type { User } from "./user";

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}