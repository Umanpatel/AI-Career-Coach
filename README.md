# AI Career Coach 🚀

AI Career Coach is an intelligent career development platform that leverages AI to provide personalized career guidance, resume building, cover letter generation, and interview preparation.

## Overview

AI Career Coach helps professionals accelerate their careers through:
- AI-powered resume building with ATS optimization
- Intelligent cover letter generation
- Industry-specific interview preparation
- Real-time market insights and salary data
- Personalized career guidance

## Tech Stack

![image](https://github.com/user-attachments/assets/d418811c-68e0-447e-935d-0f6d9196f492)

![image](https://github.com/user-attachments/assets/261cb983-ee27-4514-bfc1-c1cd58b53b5a)

![image](https://github.com/user-attachments/assets/1455fe83-c6e5-495c-8cc6-fb2eae2cac55)


### Frontend
- Next.js 14: App router, server components, server actions
- TailwindCSS: Styling and responsive design
- Shadcn/ui: Component library
- React Hook Form: Form handling and validation
- Zod: Schema validation
- MDEditor: Markdown editing and preview

### Backend
- Next.js Server Actions: API endpoints
- Prisma: Database ORM
- PostgreSQL: Database
- Google Gemini AI: AI content generation
- Clerk: Authentication and user management

### Tools & Libraries
- html2pdf.js: PDF generation
- date-fns: Date formatting
- Recharts: Data visualization
- Lucide Icons: Icon library
- Sonner: Toast notifications

### Project Goals
- Provide personalized career development tools using AI
- Help users create professional documents optimized for ATS
- Offer industry-specific interview practice
- Deliver real-time market insights for better career decisions

## Features

### 1. Resume Builder
- Interactive form-based resume creation
- AI-powered content improvement suggestions
- Markdown preview and editing
- PDF export with professional formatting
- ATS-friendly formatting

### 2. Cover Letter Generator
- Context-aware cover letter generation
- Industry-specific customization
- Easy editing and formatting
- One-click content copying

### 3. Interview Preparation
- Industry-specific practice questions
- Real-time scoring and feedback
- Performance analytics
- AI-generated improvement tips

### 4. Industry Insights Dashboard
- Real-time market trends
- Salary data visualization
- In-demand skills tracking
- Growth opportunities analysis

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/ai-career-coach.git
cd ai-career-coach
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Configure the following environment variables:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY=

- NEXT_PUBLIC_CLERK_SIGN_IN_URL= "Add your sign-in page route"
- NEXT_PUBLIC_CLERK_SIGN_UP_URL= "Add your sign-up page route"
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL= "Add your onboarding page route"
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="Add your onboarding page route"

- DATABASE_URL= "Add Your NeonDB Connection String"
- GEMINI_API_KEY= "Add your Gemini API Key"

### Step 4: Database Setup
1. Start your PostgreSQL server
2. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

### Step 5: Start Development Server
```bash
npm run dev
```

