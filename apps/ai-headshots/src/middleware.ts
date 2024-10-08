import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = process.env.NODE_ENV === "production" ? request.cookies.get("__Secure-next-auth.session-token") : request.cookies.get("next-auth.session-token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed if token is present
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
