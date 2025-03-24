"use server";

import { auth } from "@clerk/nextjs/server";
import { MarketOutlook } from "@prisma/client";

export async function updateUser(data){
    
    // Check user is logged In or not 
    const { useId } = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    // Check user exists in the database
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    // If user not exists in DB throw an error
    if(!user) throw new Error("User not found");

    try 
    {
        const result = await db.$transaction( 
        
                async (tx) => 
                {
                    
                    // We are performing 3 API calls here.
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
                                demandLevel: "Medium",
                                topSkills: [],
                                marketOutlook: "Neutral",
                                keytrends: [],
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
            return result.user;
        
    } 
    catch (error) 
    { 
        console.error("Error updating user and Industry:", error,message);
        throw new Error("Failed to update Profile.");
    }

}