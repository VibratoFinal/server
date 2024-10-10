import { Users } from "@/modules/auth/entity/auth.entity";

declare global {
  namespace Express {
    interface Request {
      user?: Users;
    }
  }
}
