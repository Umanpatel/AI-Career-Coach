import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries"
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/onboarding-form";

const OnboardingPage = async () => {

  // Check if user is already onboarded 
  // We will use Server Actions for fetching the onboarding status for this
  const { isOnboarded } = await  getUserOnboardingStatus();
  if(isOnboarded){
    // Redirect to the home page
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage
