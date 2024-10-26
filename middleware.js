import { NextResponse } from "next/server";

export function middleware(request) {
    const isLogin = () => {
        const accessToken = request.cookies.get("access_token");
        return !!accessToken;
    };

    if (isLogin()) {
        console.log("isLogin", request.nextUrl.pathname);
        if (request.nextUrl.pathname === "/auth") {
            return NextResponse.redirect(new URL("/studio", request.url));
        }
    } else {
        console.log("isLogin", request.nextUrl.pathname);
        if (request.nextUrl.pathname !== "/auth") {
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/auth", request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
