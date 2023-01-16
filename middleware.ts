// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (request.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.redirect(
        new URL("/api/auth/unauthorized", request.url)
      );
    }

    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRoles = ["admin", "super-user", "SEO"];

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!validRoles.includes(session.user.role)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(
        new URL("/api/auth/unauthorized", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};
