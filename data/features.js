import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI Guidance",
    description: "Receive AI-driven career advice tailored to personalized career.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Resume Creation",
    description: "Create ATS-friendly resumes with AI assistance for better job applications.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description: "Practice role-specific questions with AI feedback to boost confidence.",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Industry Insights",
    description: "Stay updated on industry trends, salaries, and job market analysis instantly.",
  },
];