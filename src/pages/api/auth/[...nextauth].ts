import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const res = await fetch(
          "https://listme-jrz7u49it-cauegraciolip.vercel.app/api/user/authenticate",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message);
        }
        return {
          name: data.data.name,
          image: data.data.image,
          email: data.data.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
