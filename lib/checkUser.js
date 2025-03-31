import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async () => {
    // check if the user is logged in
    const user = await currentUser();
    if(!user){
        return null;
    }

    // try to query database
    try{
        const loggedInUser = await db.user.findUnique({
            where:{
                ClerkUserId: user.id
            }
        });
        // check if user already store inside our database or not
        if(loggedInUser){
            return  loggedInUser;
        }
        // if user not found, create a new user
        const name = `${user.firstName} ${user.lastName}`;
        const newUser = await db.user.create({
            data:{
                ClerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });
        return newUser;

    } catch(error) {
        console.log(error.message)
    }
}