// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    isStaff: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      isStaff: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    isStaff: boolean;
  }
}