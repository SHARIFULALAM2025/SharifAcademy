import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/"];
const PUBLIC_PREFIXES = [
  "/_next",
  "/favicon.ico",
  "/api/auth",
  "/images",
  "/assets",
];

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }


  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {

    const registerUrl = new URL("/register", request.url);
    registerUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(registerUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};