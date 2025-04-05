import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// server action to save resume
export async function saveResume(content){
    // Check user is logged In or not
      const { userId } = await auth();
      if (!userId) {
        throw new Error("Unauthorized");
      }
      // Check user exists in the database
      const user = await db.user.findUnique({
        where: {
          ClerkUserId: userId,
        },
      });
      // If user not exists in DB throw an error
      if (!user) throw new Error("User not found");

      try {
        const resume = await db.resume.upsert({
            where: {
              userId: user.id,
            },
            update: {
              content: content,
            },
            create: {
              content: content,
              userId: user.id,
            },
        });
        revalidatePath("/resume");
        return resume;
      } catch (error) {
        console.error("Error saving resume:", error.message);
        throw new Error("Failed to save resume");
      }
}


// Create server action to get a resume if resume is already created
export async function getResume(){
    const {userId} = await auth();
    if(!userId) {
        throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
        where: {
            ClerkUserId: userId,
        },
    });
    if(!user) throw new Error("User not found");

    return await db.resume.findUnique({
        where: { 
            userId: user.id,
        },
    });
}

// Create server action to improve description for experience with AI
