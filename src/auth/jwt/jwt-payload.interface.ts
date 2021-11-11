import { Role } from "../enum/role.enum";

export interface JwtPayload {
  username: string;
  role: Role;
}