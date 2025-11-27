import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// Protect routes: proxy if not logged in
export async  function middleware(request) {
  // Read NextAuth session cookie
 const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); // depending on environment

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Session exists, allow access
  return NextResponse.next();
}

// Apply middleware only to these pages
export const config = {
  matcher: ["/menu/add", "/manage-products"], 
};
