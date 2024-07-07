import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

console.log({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
});
export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const userSession = await User.findOne({
          email: session.user.email,
        });
        session.user.id = userSession._id.toString();
        return session;
      } catch (error) {
        console.log(error);
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const isUserExists = await User.findOne({
          email: profile.email,
        });

        if (!isUserExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("signin fail", error);
      }
    },
  },
});

export { handler as GET, handler as POST };
