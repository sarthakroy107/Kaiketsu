import NextAuth, { JWT } from "next-auth";
import Google from "next-auth/providers/google";

// const GOOGLE_AUTHORIZATION_URL =
//   "https://accounts.google.com/o/oauth2/v2/auth?" +
//   new URLSearchParams({
//     prompt: "consent",
//     access_type: "offline",
//     response_type: "code",
//     scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.force-ssl",
//   });

  async function refreshGoogleAccessToken(token: any) {
    console.log("refreshGoogleAccessToken");
    try {
      const url =
        "https://oauth2.googleapis.com/token?" +
        new URLSearchParams({
          client_id: process.env.AUTH_GOOGLE_ID!,
          client_secret: process.env.AUTH_GOOGLE_SECRET!,
          grant_type: "refresh_token",
          refresh_token: token.googleRefreshToken,
        });
  
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }

      return {
        ...token,
        googleAccessToken: refreshedTokens.access_token,
        googleAccessTokenExpiresAt: Date.now() + refreshedTokens.expires_in * 1000,
        googleRefreshToken:
        refreshedTokens.refresh_token ?? token.googleRefreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.log(error);
      
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.force-ssl",
        },
      },
    }),
  ],

  callbacks: {
    jwt: async({account,token, user, }) => {
      if(account && user) {
        if (account.provider === "google") {
          return {
            ...token,
            googleAccessToken: account.access_token,
            googleRefreshToken: account.refresh_token,
            googleUsername: account.providerAccountId,
            googleAccessTokenExpiresAt: (account.expires_at || 0) * 1000,
          };
        }
      }

      if (token.googleAccessTokenExpiresAt) {
        //@ts-ignore
        if (Date.now() > token.googleAccessTokenExpiresAt) {
          return await refreshGoogleAccessToken(token);
        }
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user.googleAccessToken = token.googleAccessToken as string;
      session.user.googleRefreshToken = token.googleRefreshToken as string;
      session.user.googleUsername = token.googleUsername as string;
      session.user.googleAccessTokenExpiresAt = token.googleAccessTokenExpiresAt as number;

      return session;
    },
  },
});
