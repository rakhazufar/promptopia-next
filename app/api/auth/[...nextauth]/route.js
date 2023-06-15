import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import User from "@models/user";
import { connectToDB } from "@utils/database";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) { return baseUrl },
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({profile}) {
            try {
                connectToDB()
                    //check if user already exist or not
                    console.log(profile)
                    const userExists = await User.findOne({
                        email: profile.email
                    })
    
                    //if not exist, create new user
                    if(!userExists) {
                        console.log("akan reg user")
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(/\s/g, '').toLowerCase(),
                            image: profile.picture
                        })
                        console.log("sudah reg user")
                    }
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}
