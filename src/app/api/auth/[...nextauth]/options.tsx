import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../../lib/data/prisma";
import bcrypt from "bcrypt";
// 1. Import the Adapter type from next-auth
import type { Adapter } from "next-auth/adapters"; 

export const authOptions: NextAuthOptions = {
  // 2. Add "as Adapter" right here to silence the mismatch
  adapter: PrismaAdapter(prisma) as Adapter, 
  session: { strategy: "jwt" },
  pages: { 
    signIn: '/authentication/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
        
        // Return the user object, including the isStaff boolean
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // The 'user' object is only passed in the very first time the user logs in
      if (user) {
        token.sub = user.id;
        // Bind the role from the database to the JWT token
        token.isStaff = (user as any).isStaff; 
      }
      return token;
    },
    async session({ session, token }) {
      // Bind the role from the JWT token to the active browser session
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).isStaff = token.isStaff;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};