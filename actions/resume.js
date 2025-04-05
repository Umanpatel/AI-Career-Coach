import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
export async function improveWithAI({ current, type }) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        industryInsight: true,
      },
    });
  
    if (!user) throw new Error("User not found");
  
    // type: "experience" | "education" | "projects"
    const prompt = `
      As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
      Make it more impactful, quantifiable, and aligned with industry standards.
      Current content: "${current}"
  
      Requirements:
      1. Use action verbs
      2. Include metrics and results where possible
      3. Highlight relevant technical skills
      4. Keep it concise but detailed
      5. Focus on achievements over responsibilities
      6. Use industry-specific keywords
      
      Format the response as a single paragraph without any additional text or explanations.
    `;
  
    // Gemini API call to improve content
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const improvedContent = response.text().trim();
      return improvedContent;
    } catch (error) {
      console.error("Error improving content:", error);
      throw new Error("Failed to improve content");
    }
  }