import { NextResponse } from "next/server";

// Protect specific pages
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // List of protected routes
  const protectedRoutes = ["/add-product", "/manage-products"];

  // Check if the current request is for a protected route
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    // Check NextAuth session cookie
    const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");

    if (!token) {
      // Redirect to login page if not logged in
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If logged in or route is public, continue
  return NextResponse.next();
}

// Specify which routes the middleware should apply to
export const config = {
  matcher: ["/add-product/:path*", "/manage-products/:path*"],
};
