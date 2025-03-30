"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Server Actions to update user profile
export async function updateUser(data){
    
    // Check user is logged In or not 
    const { userId } = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    // Check user exists in the database
    const user = await db.user.findUnique({
        where: {
            ClerkUserId: userId,
        },
    });
    // If user not exists in DB throw an error
    if(!user) throw new Error("User not found");

    try 
    {
        const result = await db.$transaction( 
        
                async (tx) => 
                {
                    // We are performing 3 Transactions(TX) /API calls here.
                    // 1: find if the industry exists
                    let industryInsight = await tx.industryInsight.findUnique({
                        where: {
                            industry: data.industry,
                        },
                    });
                    // 2: If industry does not exist, create it with default values - will replace 
                    // it with AI later
                    if(!industryInsight){
                        industryInsight = await tx.industryInsight.create({
                            data: {
                                industry: data.industry,
                                salaryRanges: [],
                                growthRate: 0,
                                demandLevel: "MEDIUM",
                                topSkills: [],
                                marketOutlook: "NEUTRAL",
                                keyTrends: undefined, // Remove this field if it's not in schema
                                recommendedSkills: [],
                                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            },
                        });
                    }

                    // 3: Update user
                    const updatedUser = await tx.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            industry: data.industry,
                            experience: data.experience,
                            bio: data.bio,
                            skills: data.skills,
                        },
                    });
                    return {updatedUser,industryInsight};
                },  
                {
                    timeout: 10000,
                }
            );
            return {success:true, ...result};
        
    } 
    catch (error) 
    { 
        console.error("Error updating user and Industry:", error.message);
        throw new Error("Failed to update Profile.");
    }
}


// Server Actions for fetching the onboarding status
export async function getUserOnboardingStatus(){
    // Check user is logged In or not 
    const { userId } = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    // Check user exists in the database
    const user = await db.user.findUnique({
        where: {
            ClerkUserId: userId,
        },
    });
    // If user not exists in DB throw an error
    if(!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where: {
                ClerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });
        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error fetching onboarding status:", error.message);
        throw new Error("Failed to fetch onboarding status." + error.message);
    }
}