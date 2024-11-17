import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
        // // Passwordless / email sign in
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        // }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "github") {
                try {
                    await connectDb();  // Reuse DB connection

                    const currentUser = await User.findOne({ email: email });
                    if (!currentUser) {
                        const newUser = new User.create({
                            email: user.email,
                            username: user.email.split('@')[0],
                            // Add other fields if needed
                        });
                        // await newUser.save();
                        user.name = newUser.username;
                        console.log(newUser);
                    } else {
                        user.name = currentUser.username;
                    }

                    return true;  // Return true for successful sign-in
                } catch (error) {
                    console.error("Database error:", error);
                    // return false;  // Fail sign-in if there's an issue
                }
            }

            // For other providers or if no GitHub, return true to allow sign-in
            return true;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const dbUser = await User.findOne({ email: session.user.email });
            session.user.name = dbUser.username;
            // session.user.id = token.id

            return session
        }
    }
});
export { authoptions as GET, authoptions as POST }
