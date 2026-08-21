import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = nextUrl.pathname === "/login";
  const isCheckoutRoute = nextUrl.pathname === "/checkout";

  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAdminRoute && req.auth?.user.role !== "ADMIN") {
    console.log(isAdminRoute);
    console.log(req.auth?.user.role);
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isCheckoutRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/checkout"],
};
