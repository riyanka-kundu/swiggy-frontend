import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ROLE } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get(ACCESS_TOKEN)?.value ||
    request.cookies.get(REFRESH_TOKEN)?.value ||
    request.cookies.get("partnerToken")?.value;

  const role = request.cookies.get(USER_ROLE)?.value;
  const isLoggedIn = Boolean(token);

  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isPartnerDashboard = pathname.startsWith("/partner/dashboard");
  const isHomePage = pathname === "/";

  // 1. Auth pages (/signin, /signup) -> redirect logged in users away
  if (isLoggedIn && isAuthPage) {
    const destination = role === "restaurant_owner" ? "/partner/dashboard" : "/";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 2. Partner Dashboard (/partner/dashboard/*) -> restaurant owners only
  if (isPartnerDashboard) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "restaurant_owner") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 3. Home page (/) -> restaurant owners get redirected to dashboard
  if (isLoggedIn && role === "restaurant_owner" && isHomePage) {
    return NextResponse.redirect(new URL("/partner/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)",
  ],
};

