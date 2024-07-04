import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");

  if (!token && request.nextUrl.pathname.startsWith("/chat")) {
    return Response.redirect(new URL("/", request.url));
  }

  // Allow request to proceed if token is present
  return NextResponse.next();
}

export const config = {
  matcher: ["/chat"],
};
