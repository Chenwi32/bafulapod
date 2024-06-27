import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes to be protected
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

// Route protection
export default clerkMiddleware((auth, req) => {
    if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
