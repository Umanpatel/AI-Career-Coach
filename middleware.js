import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
])

// If user request for protected route without Login
// They will redirected to SignIn Page
export default clerkMiddleware( async (auth, req ) => {
  // console.log("Middleware executed for:", req.nextUrl.pathname);
  const authObj  = await auth()  // wait for auth which gives logged in user.
  if(!authObj.userId && isProtectedRoute(req)) {
    // const {redirectToSignIn} = await auth()
    return authObj.redirectToSignIn()
  }
  return NextResponse.next(); // what ever comes next, we can continue our app
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};