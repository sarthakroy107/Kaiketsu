// @types\next-auth.d.ts
import { User } from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      googleAccessToken: string | undefined;
      googleRefreshToken: string | undefined;
      googleUsername: string | undefined;
      googleAccessTokenExpiresAt: number | undefined;
    } & User
  }
  
  interface JWT {
    googleAccessToken: string | undefined;
    googleRefreshToken: string | undefined;
    googleUsername: string | undefined;
    googleAccessTokenExpiresAt: number | undefined;
  }
}
