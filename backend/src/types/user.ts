import type { IUser } from "@/models/user";

export type AuthenticatedRequest = Request & {
  user: IUser;
}
