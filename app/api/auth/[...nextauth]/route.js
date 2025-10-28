/*
import NextAuth from "next-auth/next";

// ✅ This pattern works in every bundler (handles default vs CJS)
import * as Google from "next-auth/providers/google";
const GoogleProvider = Google.default ?? Google;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      const admins = (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase());
      session.user.isAdmin = admins.includes(
        (session.user.email || "").toLowerCase()
      );
      return session;
    },
  },
});

export { handler as GET, handler as POST };
*/