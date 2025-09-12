import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
// اینجا میتونی Provider بذاری (ایمیل یا گوگل یا Credential)
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: ایمیل و پسورد رو با دیتابیس چک کن
        return { id: "user-id", name: "test user", email: credentials.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
