import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth/core/types";
import { dbUsers } from "../../../database";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        email: { label: "email", type: "email", placeholder: "put your email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "put your password",
        },
      },

      async authorize(credentials): Promise<any> {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 259200,
    strategy: "jwt",
    updateAge: 86400,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      //console.log({ token, account, user });
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      //console.log({ session, token, user });
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
